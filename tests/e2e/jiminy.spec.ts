import { test, expect } from "@playwright/test";
import { existsSync, createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { resolve } from "node:path";

// Configure tracing at file scope; heavy model responses must not be traced.
test.use({ trace: process.env.ARS_TEST_MODELS ? "off" : "retain-on-failure" });

test("Jiminy has empty memories and opens the full notice only on request", async ({ page }) => {
  const external: string[] = [];
  page.on("request", request => {
    if (/huggingface|coppermind.*old/.test(request.url())) external.push(request.url());
  });
  await page.goto("./#/kh1fm/worlds");
  const launcher = page.getByRole("button", { name: "Open Data Jiminy for Kingdom Hearts Final Mix" });
  await launcher.click();
  const panel = page.getByRole("dialog", { name: "Data Jiminy", exact: true });
  await expect(panel.getByText("Under construction", { exact: true })).toBeVisible();
  await expect(page.getByText(/AI DISCLAIMER: This is Data Jiminy/)).not.toBeVisible();
  const about = page.getByRole("button", { name: "About Data Jiminy", exact: true });
  await about.click();
  const notice = page.getByRole("dialog", { name: "About Data Jiminy", exact: true });
  await expect(notice).toBeVisible();
  await expect(notice.getByText(/AI DISCLAIMER: This is Data Jiminy/)).toBeVisible();
  await expect(notice.getByText(/pretrained model can make mistakes/)).toBeVisible();
  await page.screenshot({ path: `test-results/${test.info().project.name}-jiminy-about.png` });
  await page.keyboard.press("Escape");
  await expect(notice).not.toBeVisible();
  await expect(panel).toBeVisible();
  await expect(about).toBeFocused();
  await about.click();
  await page.getByRole("button", { name: "Close About Data Jiminy", exact: true }).click();
  await expect(about).toBeFocused();
  await page.getByRole("textbox", { name: "Ask about Kingdom Hearts Final Mix" }).fill("What do I need for Ultima Weapon?");
  await page.getByRole("button", { name: "Ask Data Jiminy", exact: true }).click();
  await expect(page.locator(".answer-text").last()).toContainText("still under construction");
  await expect(page.locator(".answer-citations")).toHaveCount(0);
  expect(external).toEqual([]);
  await page.screenshot({ path: `test-results/${test.info().project.name}-jiminy.png` });
  await page.keyboard.press("Escape");
  await expect(launcher).toBeFocused();
});

test("an update flushes old cached knowledge without deleting guide data or model files", async ({ page, context }) => {
  await page.goto("./#/kh1fm/worlds");
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  const urls = await page.evaluate(async () => {
    const root = new URL('.', location.href);
    const old = new URL('data/kh1fm-coppermind.json?__WB_REVISION__=old', root).href;
    const guide = new URL('data/keep-guide.json', root).href;
    const model = new URL('ort/keep-model.wasm', root).href;
    const cache = await caches.open('ars-arcanum-copperminds-v1');
    await cache.put(old, new Response(JSON.stringify({ thoughts: [{ text: 'Incorrect memory' }] })));
    await cache.put(guide, new Response('saved guide'));
    await cache.put(model, new Response('saved model'));
    localStorage.setItem('jiminy-flush-progress-sentinel', 'preserved');
    return { old, guide, model };
  });
  await page.reload();
  await expect.poll(() => page.evaluate(async old => { const cache = await caches.open('ars-arcanum-copperminds-v1'); return !!(await cache.match(old)); }, urls.old)).toBe(false);
  expect(await page.evaluate(async ({ guide, model }) => {
    const cache = await caches.open('ars-arcanum-copperminds-v1');
    return [!!(await cache.match(guide)), !!(await cache.match(model)), localStorage.getItem('jiminy-flush-progress-sentinel')];
  }, urls)).toEqual([true, true, 'preserved']);
  await context.setOffline(true);
  await page.reload();
  await page.getByRole("button", { name: "Open Data Jiminy for Kingdom Hearts Final Mix" }).click();
  await page.getByRole("textbox", { name: "Ask about Kingdom Hearts Final Mix" }).fill("Where are the Torn Pages?");
  await page.getByRole("button", { name: "Ask Data Jiminy", exact: true }).click();
  await expect(page.locator(".answer-text").last()).toContainText("still under construction");
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
    await page.goto("./#/kh1fm/worlds");
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
    const input = page.getByRole("textbox", { name: "Ask about Kingdom Hearts Final Mix" });
    await input.fill("What does Lucky Strike do?");
    await page.getByRole("button", { name: "Ask Data Jiminy", exact: true }).click();
    await expect(page.locator(".answer-text").last()).toContainText("still under construction");
    await expect(page.locator(".answer-citations")).toHaveCount(0);
    expect(served.length).toBe(downloaded);
  });
});
