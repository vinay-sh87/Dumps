const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setExtraHTTPHeaders({
  'X-Forwarded-For': '192.168.1.10'
});

await page.goto('https://site.com');
await page.type('#username', 'admin');
await page.type('#password', '123');
await page.click('#login');
