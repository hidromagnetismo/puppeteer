
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time * 1000)
    });
 }

( async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://127.0.0.1/phpmyadmin/');
    await delay(5);
    await page.screenshot({path: 'phpmyadmin.jpg'});

    await page.goto('http://rutas4wd.com', {
        waitUntil: 'load',
        timeout: 0
    });
    await delay(10);
    await page.screenshot({path: 'rutas4wd.jpg'});

    await browser.close();
})();
