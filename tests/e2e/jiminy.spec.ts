import { test, expect } from "@playwright/test";
import { existsSync, createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { resolve } from "node:path";

// Configure tracing at file scope; heavy model responses must not be traced.
test.use({ trace: process.env.ARS_TEST_MODELS ? "off" : "retain-on-failure" });

test("Jiminy answers sourced requests, rejects another game, and forgets chat on reload", async ({
  page,
}) => {
  await page.goto("./#/kh1fm/contents");
  await page
    .getByRole("button", {
      name: "Open Data Jiminy for Kingdom Hearts Final Mix",
    })
    .click();
  await expect(
    page.getByText(/AI DISCLAIMER: This is Data Jiminy/),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /What do I need for Ultima Weapon/ })
    .click();
  const answers = page.locator(".answer-text");
  await expect(answers.last()).toContainText("5 × Thunder Gem");
  await expect(
    page.locator(".answer-citations").getByRole("link").first(),
  ).toBeVisible();
  const input = page.getByRole("textbox", {
    name: "Ask about Kingdom Hearts Final Mix",
  });
  await input.fill("How do I meld commands in Birth by Sleep?");
  await page
    .getByRole("button", { name: "Ask Data Jiminy", exact: true })
    .click();
  await expect(answers.last()).toContainText("matching game journal");
  await page.screenshot({
    path: `test-results/${test.info().project.name}-jiminy.png`,
    fullPage: true,
  });
  await page.reload();
  await page
    .getByRole("button", {
      name: "Open Data Jiminy for Kingdom Hearts Final Mix",
    })
    .click();
  await expect(page.locator(".jiminy-exchange")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Close Data Jiminy", exact: true })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Open Data Jiminy for Kingdom Hearts Final Mix",
    }),
  ).toBeFocused();
});

test.describe("Real local-model acceptance", () => {
  // Tracing weight responses duplicates hundreds of MB through the DevTools channel.
  test("real pinned local models initialize and restore from cache with networking disabled", async ({
    page,
    context,
  }, info) => {
    test.skip(
      !process.env.ARS_TEST_MODELS || info.project.name !== "desktop-chromium",
      "Explicit heavyweight real-model acceptance",
    );
    test.setTimeout(360_000);
    const served: string[] = [];
    const localPath = (pathname: string) => {
      const match = pathname.match(
        /^\/([^/]+\/[^/]+)\/resolve\/([^/]+)\/(.+)$/,
      );
      return match
        ? resolve(".model-cache", match[1], match[2], match[3])
        : null;
    };
    // Stream real weight files over HTTP, not massive base64 CDP fulfill messages.
    const fixtureServer = createServer((request, response) => {
      const path = localPath(
        new URL(request.url!, "http://localhost").pathname,
      );
      if (!path || !existsSync(path)) {
        response.writeHead(404, { "Access-Control-Allow-Origin": "*" });
        response.end("Uncached test model resource");
        return;
      }
      response.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": path.endsWith(".json")
          ? "application/json"
          : "application/octet-stream",
        "Content-Length": statSync(path).size,
      });
      createReadStream(path).pipe(response);
    });
    await new Promise<void>((resolve) =>
      fixtureServer.listen(0, "127.0.0.1", resolve),
    );
    const fixturePort = (fixtureServer.address() as { port: number }).port;
    context.on("close", () => {
      fixtureServer.closeAllConnections();
      fixtureServer.close();
    });
    await context.route("https://huggingface.co/**", async (route) => {
      const url = new URL(route.request().url()),
        path = localPath(url.pathname);
      if (!path || !existsSync(path))
        return route.fulfill({
          status: 404,
          body: "Uncached test model resource",
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      served.push(path);
      return route.fulfill({
        status: 302,
        headers: {
          Location: `http://127.0.0.1:${fixturePort}${url.pathname}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    });
    await page.goto("./#/kh1fm/contents");
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await page.reload();
    await page
      .getByRole("button", {
        name: "Open Data Jiminy for Kingdom Hearts Final Mix",
      })
      .click();
    await page.getByRole("button", { name: "Download local models" }).click();
    let lastStatus = "";
    await expect
      .poll(
        async () => {
          const text = await page.locator(".model-status").innerText();
          if (text !== lastStatus) {
            console.log("MODEL STATUS:", text.replace(/\n/g, " | "));
            lastStatus = text;
          }
          if (text.includes("Local model unavailable")) throw new Error(text);
          return text.includes("Local models ready");
        },
        { timeout: 240_000, intervals: [1000] },
      )
      .toBe(true);
    expect(served.some((path) => path.endsWith("model_quantized.onnx"))).toBe(
      true,
    );
    expect(served.some((path) => path.endsWith("/model.onnx"))).toBe(true);
    const downloaded = served.length;
    await context.setOffline(true);
    await page.reload();
    await page
      .getByRole("button", {
        name: "Open Data Jiminy for Kingdom Hearts Final Mix",
      })
      .click();
    await expect(
      page.getByText("Local models ready", { exact: true }),
    ).toBeVisible({ timeout: 120_000 });
    expect(served.length).toBe(downloaded);
    await expect(page.locator(".jiminy-exchange")).toHaveCount(0);
    await page
      .getByRole("button", { name: /What do I need for Ultima Weapon/ })
      .click();
    await expect(page.locator(".answer-text").last()).toContainText(
      "Thunder Gem",
    );
    // Bypass deterministic lookup: exercise local embedding, retrieval and generation offline.
    const input = page.getByRole("textbox", {
      name: "Ask about Kingdom Hearts Final Mix",
    });
    await input.fill("What does Lucky Strike do?");
    await page
      .getByRole("button", { name: "Ask Data Jiminy", exact: true })
      .click();
    await expect(
      page.locator('.answer-citations a[href*="kh1fm-ability-lucky-strike"]'),
    ).toBeVisible({ timeout: 90_000 });
    await expect(page.locator(".answer-text").last()).not.toContainText(
      "No matching information",
    );
    expect(served.length).toBe(downloaded);
  });
});
