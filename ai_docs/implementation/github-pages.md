# Automatic GitHub Pages deployment

The production workflow is [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml). A push to **`master`**, including a merged pull request, validates the app and publishes its built `dist/` directory through GitHub Pages. The implementation branch and `mobile-friendly` are development destinations: merging there does not publish. Promote reviewed changes to `master` when they are ready for the live site.

The workflow also supports **Actions → Deploy Ars Arcanum to GitHub Pages → Run workflow**. Select `master`. Both jobs explicitly reject other branch refs, including a manual run selected on a development branch. No merge or deployment is performed merely by adding this workflow to a pull request.

## One-time repository setting

The user has completed the one-time change in [the repository’s Pages settings](https://github.com/didymusbenson/kh-tools/settings/pages): **Build and deployment → Source → GitHub Actions**. No further administrator setting is needed for this workflow. The workflow reads the existing Pages and custom-domain configuration; it does not attempt to enable Pages or modify repository settings. GitHub documents this publishing-source requirement in its [custom Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The `github-pages` environment may impose branch restrictions or approval rules. Allow `master` there. If that environment requires reviewers, GitHub will wait for its configured approval before publishing; remove that requirement only if fully automatic production releases are intended.

## Release sequence

1. Install the lockfile with Node 22 and `npm ci`. `ONNXRUNTIME_NODE_INSTALL_CUDA=skip` avoids the optional GPU binary download; the browser app uses the copied web runtime.
2. Run `npm test`, assemble and validate canonical content, then run `npm run coppermind:check` against the committed browser retrieval pack.
3. Read the Pages `base_path` and pass it to Vite as `BASE_URL`, with a trailing slash. A project URL gets `/kh-tools/`; a custom domain or root site gets `/`. The [configure-pages output contract](https://github.com/actions/configure-pages/blob/main/action.yml) defines these path values.
4. Run the production build, which includes TypeScript checking, runtime preparation, and service-worker generation. Upload only `dist/`.
5. Publish that artifact in a separate job after the build succeeds. Only this job has `pages: write` and `id-token: write`; it runs in the `github-pages` environment and exposes the resulting URL. A shared concurrency group serializes releases without cancelling an active deployment.

The workflow uses GitHub’s documented Pages actions and [`actions/setup-node@v7`](https://github.com/actions/setup-node/blob/main/README.md), verified against their official documentation during implementation. It requires no personal access token or deployment secret.

## Content and offline updates

When canonical game content changes, regenerate its browser Coppermind pack using [the seeding instructions](../../tools/coppermind/README.md) and run `npm run coppermind:package`, and commit the compressed export and database archive with that content. The deployment check stops a missing, stale, or inconsistent pack from being published. CI validates the export; it does not start a Chroma server or rebuild the game’s local database.

Asset, worker, data, and service-worker URLs use the configured base. Entry links use hash routes, so shared entry URLs work on Pages without a server rewrite. Existing installed clients receive the app’s update prompt when a new service worker is ready; their local progress is separate from the deployed files.

## Checking a release

Inspect the **Validate and build** and **Publish GitHub Pages** jobs in Actions. A failed check stops publication and leaves the last successful site in place. After the first successful run, open the deployment URL, enter KH1 Final Mix, open a shared entry, and confirm the guide can reload offline after installation. Data Jiminy’s local model setup remains its own first-use download.

The workflow’s YAML structure, production-branch guards, job dependency, permission scopes, command order, and artifact path have been checked locally. The Pages source setting is complete. A GitHub-hosted deployment cannot be confirmed until the workflow reaches `master` and its production run has completed.
