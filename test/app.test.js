const { getQueriesForElement } = require("@testing-library/dom");
const { JSDOM, ResourceLoader } = require("jsdom");
const { build } = require("esbuild");
const path = require("path");

async function bundle() {
  const out = await build({
    logLevel: "error",
    entryPoints: [path.resolve(__dirname, "../src/app.jsx")],
    bundle: true,
    write: false,
    target: "es2019",
    define: { "process.env.NODE_ENV": '"development"', global: "window" },
    outdir: "./",
  });

  return out;
}

const buildResultPromise = bundle();

/**
 * JSDOM ResourceLoader for resolving requested resources against our bundle
 */
class BundledResourceLoader extends ResourceLoader {
  async fetch(url, options) {
    const { outputFiles } = await buildResultPromise;

    const byUrl = outputFiles.reduce((map, file) => {
      if (file.path.match(/\.js\.map/)) {
        return map;
      }

      map.set(`https://test.app${file.path}`, file.contents);
      return map;
    }, new Map());

    const match = byUrl.get(url);

    if (match) {
      return Promise.resolve(Buffer.from(match));
    }

    return super.fetch(url, options);
  }
}

/**
 * Create a JSDOM instance of a basic HTML page with our bundled app
 * loaded on the page.
 */
async function constructDOM(url) {
  const { outputFiles } = await buildResultPromise;

  const dom = new JSDOM(
    `<!DOCTYPE html><body><div id="root"></div></body></html>`,
    {
      resources: new BundledResourceLoader(),
      runScripts: "dangerously",
      url,
    }
  );

  const { window } = dom;

  /**
   * Inject JS files from the bundle into the DOM.
   */
  for (let out of outputFiles.filter((f) => f.path.match(/\.js$/))) {
    const scriptEl = window.document.createElement("script");

    scriptEl.src = out.path;
    window.document.body.appendChild(scriptEl);
  }

  return window;
}

const toMB = (bytes) => Math.floor(bytes / 1024 / 1024);

/**
 * Create a JSDOM instance for a given URL
 */
async function createBrowserRuntime(config) {
  const { url } = config;

  const window = await constructDOM(url);

  return window;
}

/**
 * Rudimentary test API. Creates a JSDOM instance and provides it to
 * the given implementation callback. Should dispose of the JSDOM instance after
 * the test is complete (or fails).
 */
function test(title, implementation) {
  let window;

  return new Promise(async (resolve, reject) => {
    try {
      await implementation(async (config) => {
        window = await createBrowserRuntime(config);

        return window;
      });

      if (window) {
        window.close();
        window = null;
      }

      resolve();
    } catch (e) {
      if (window) {
        window.close();
        window = null;
      }
      reject(e);
      console.log(`Failed: ${e}`);
    } finally {
      global.gc();
      console.log(
        `Finished ${title}: ${toMB(process.memoryUsage().heapUsed)} MB`
      );
    }
  });
}

async function run() {
  await test("1", async (browser) => {
    const window = await browser({
      url: "https://test.app",
    });

    const screen = getQueriesForElement(window.document.body);

    await screen.findByText(/Paragraph 1 Heading/);
  });
  await test("2", async (browser) => {
    const window = await browser({
      url: "https://test.app",
    });

    const screen = getQueriesForElement(window.document.body);

    await screen.findByText(/Paragraph 1 Heading/);
  });
  await test("3", async (browser) => {
    const window = await browser({
      url: "https://test.app",
    });

    const screen = getQueriesForElement(window.document.body);

    await screen.findByText(/Paragraph 1 Heading/);
  });
  await test("4", async (browser) => {
    const window = await browser({
      url: "https://test.app",
    });

    const screen = getQueriesForElement(window.document.body);

    await screen.findByText(/Paragraph 1 Heading/);
  });
  await test("5", async (browser) => {
    const window = await browser({
      url: "https://test.app",
    });

    const screen = getQueriesForElement(window.document.body);

    await screen.findByText(/Paragraph 1 Heading/);
  });
}

(() => {
  run();
})();
