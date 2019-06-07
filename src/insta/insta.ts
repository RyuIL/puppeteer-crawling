import puppeteer from 'puppeteer';
import {extractItems, scrapeInfiniteScrollItems} from './scroll';
import fs from 'fs';

const instagram = async (tag:string) => {
    const url : string = "https://www.instagram.com/explore/tags/"+tag+"/?hl=ko";
    try{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setViewport({ width: 1280, height: 926 });

        await page.goto(url);
        await page.waitForSelector("span.g47SY ");

        //#react-root > section > main > article > div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1) > a > div > div._9AhH0
        
        await page.click('div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1)');
        await page.waitForSelector('div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a');

        //body > div._2dDPU.vCf6V > div.zZYga > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a
        const startTime : number = new Date().getTime();

        let data : Array<Object>;

        for (let i = 0; i < 20; i++) {
            const insertData = await page.evaluate(() => {
                const auth : any = document.querySelector("a.FPmhX notranslate nJAzx");
                const content : any = document.querySelector("div.C4VMK > span");

                console.log(auth.textContent);
                console.log(content.textContent);
                //body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK > span
            })
            await page.keyboard.press('ArrowRight');
            await page.waitForSelector('div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a');
        }

        const endTime : number = new Date().getTime();
        
        console.log(endTime-startTime);

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