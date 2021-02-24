
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time * 1000)
    });
 }

( async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://amazon.com');
    await page.screenshot({path: 'amazon.jpg'});

    await browser.close();
})();
