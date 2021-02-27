
const puppeteer = require('puppeteer');

( async () => {
    
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    


    const screenshot = true;
    async function print(name, id) {
        if (screenshot) {
            await page.screenshot({path: `./screenshot/${name}_${id}_.jpg`});
        }
    }



    await page.goto('http://127.0.0.1/phpmyadmin');
    await print('phpmyadmin',1);
    
    
    
    let selector = '#topmenu a';
    // await page.waitForTimeout(5*1000);
    await page.waitForSelector(selector);
    // await page.waitForNavigation();
    let linkSQL = await page.evaluateHandle(selector => document.querySelectorAll(selector)[1], selector);
    await linkSQL.click();
    // await page.waitForTimeout(5*1000);
    selector = '#queryfieldscontainer .CodeMirror-line';
    await page.waitForSelector(selector);
    // await page.waitForNavigation();
    await print('phpmyadmin',2);
    
    
    
    let SQL = 'SELECT * FROM mysql.help_topic;';
    await page.type(selector, SQL);
    await print('phpmyadmin',3);
    
    
    
    // await page.click('#button_submit_query'); // No working
    // await page.evaluate(() => document.querySelector('#sqlqueryform').submit()); // Working
    await page.evaluate(() => document.querySelector('#button_submit_query').click()); // Working
    // await page.waitForTimeout(5*1000);
    // await page.waitForSelector('.result_query');
    await page.waitForNavigation();
    
    
    
    async function getDataTable() {
        let result = await page.evaluate(() => {
            var tr = document.querySelectorAll('.table_results tr');
            var data = [];
            for(var i = 1; i < tr.length; i++){
                var td = tr[i].querySelectorAll('td');
                var name = td[5].innerText;
                var description = td[7].innerText;
                data.push({"name":name,"description":description})
            }
            return data;
        });
        return result;
    }

    // await page.evaluate(() => document.querySelectorAll('.navigation tr')[1].querySelectorAll('td')[2].querySelectorAll('form')[0].submit());
    async function nextPage() {
        let button = await page.evaluateHandle(() => {
            var inputs = document.querySelectorAll('.navigation tr')[1].querySelectorAll('input[type=submit]');
            var element;
            for(var i = 0; i < inputs.length; i++){
                if(inputs[i].title == 'Next'){
                    element = inputs[i];
                    break;
                }
            }
            return element;
        });
        await button.click();
    }

    let tmp;
    let data = [];
    const pages = 3;

    for(var i = 0; i < pages; i++) {
        
        tmp = await getDataTable();
        data = [...data,...tmp];
        await print('phpmyadmin', (4+i)+'__page_'+(i+1));
        await nextPage();
        await page.waitForNavigation();
    
    }



    console.log(data);
    console.log("Total count:", data.length);



    await browser.close();
    
})();
