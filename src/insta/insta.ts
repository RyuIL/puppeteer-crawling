import puppeteer from 'puppeteer';
import {extractItems, scrapeInfiniteScrollItems} from './scroll';
import fs from 'fs';

const instagram = async (tag:string) => {
    const url : string = "https://www.instagram.com/explore/tags/"+tag+"/?hl=ko";
    try{
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        page.setViewport({ width: 1280, height: 926 });

        await page.goto(url);
        await page.waitForSelector("span.g47SY ");

        await page.click('div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1)');
        await page.waitForSelector('div._2dDPU.vCf6V > div.zZYga > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a');

        const startTime : number = await new Date().getTime();

        let data : Array<Object> = await [];
        for (let i = 0; i < 100; i++) {
            let result : Object = await page.evaluate(() => {
                const auth : any = document.querySelector("div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a");
                const content : any = document.querySelector('div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK');
                const total : Object = {
                    "auth" : auth ? auth.innerHTML : '',
                    "content" : content ? content.textContent : ''
                };
                
                return total;
            })    
            await console.log(i);

            await data.push(result);

            await page.keyboard.press("ArrowRight");
            await page.waitForSelector("div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a");
        }
        
        // await page.waitForSelector("div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a");
        // await page.keyboard.press("ArrowRight");

        const endTime : number = await new Date().getTime();
        
        console.log(data);
        console.log((endTime-startTime)/1000);

        // let result = [{ tag: tag, img: items }];

        // let path = "./src/insta/results/"+tag+".json";

        // fs.writeFileSync(path, JSON.stringify(result), "utf8");

        await page.close();
        await browser.close();

    }catch(e){
        console.log(e);
    }
}

export default instagram;