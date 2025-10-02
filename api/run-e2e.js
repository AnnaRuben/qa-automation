// api/run-e2e.js
const { chromium } = require("playwright-core");

module.exports = async (req, res) => {
  let browser;
  let log = "";

  try {
    // connect to Browserless (use your token as an env var)
    const wsEndpoint = `wss://production-ams.browserless.io/chromium/playwright?token=${process.env.BROWSERLESS_KEY}`;
    browser = await chromium.connect({ wsEndpoint });
    log += "✅ Connected to remote browser\n";

const context = await browser.newContext();
    const page = await context.newPage();

    // open your site with ?automation=1 to avoid recursion
    const baseUrl = process.env.SELF_URL || `https://${req.headers.host}`;
    const url = `${baseUrl}/?automation=1`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    log += `✅ Opened ${url}\n`;

    await page.fill("#demoName", "QA Automation");
    await page.fill("#demoEmail", "qa@example.com");
    log += "✅ Filled form fields\n";

    await page.click("#runE2E");
    log += "✅ Clicked Run E2E\n";

    await page.waitForTimeout(500);
    const uiStatus = await page.textContent("#e2eResults");

    res.status(200).json({
      status: "PASS",
      log: `${log}\n📝 UI said:\n${uiStatus}`
    });
  } catch (err) {
    res.status(200).json({
      status: "FAIL",
      log: `${log}\n❌ ${err.message}`
    });
  } finally {
    if (browser) await browser.close();
  }
};
