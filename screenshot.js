const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	let website = "https://cosynd.com";

	if (process.argv.length > 2) {
		website = process.argv[2];
	}

	await page.goto(website, { waitUntil: "networkidle0" });

	await page.setViewport({ width: 1920, height: 1080 });

	await page.screenshot({ path: "screenshot.png", fullPage: true });

	await page.pdf({
		path: "screenshot.pdf",
		scale: 0.75,
		displayHeaderFooter: true,
		footerTemplate: `
      <div style="color: lightgray; font-size: 10px; padding-top: 5px; text-align: center; width: 100%;">
        <span class="date"></span> - <span class="url"></span>
      </div>`,
		margin: {
			bottom: 30,
			left: 10,
			right: 10,
			top: 10,
		},
		printBackground: true,
		landscape: true,
	});

	await browser.close();
})();
