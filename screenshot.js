const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let website = 'https://cosynd.com';

  if (process.argv.length > 2) {
    website = process.argv[2];
  }

  await page.goto(website, { waitUntil: 'networkidle0' });

  await page.setViewport({ width: 1920, height: 1080 });

  await page.screenshot({ path: 'screenshot.png' });
  await page.pdf({ path: 'screenshot.pdf' });

  await browser.close();
})();

