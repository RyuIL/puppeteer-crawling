import puppeteer from 'puppeteer';
import {extractItems, scrapeInfiniteScrollItems} from './scroll';
import fs from 'fs';


const instagramUrl = async (tag:string, pageCnt : number) => {
        const url : string = "https://www.instagram.com/explore/tags/"+tag+"/?hl=ko";
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 926 });
        await page.setRequestInterception(true);
        await page.on('request', request => {
        if (request.resourceType().toUpperCase() === 'IMAGE')
            request.abort();
        else
            request.continue();
        });

        await page.goto(url);
        await page.waitForSelector("span.g47SY");

        await page.click('div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1)');
        await page.waitForSelector('body > div._2dDPU.vCf6V > div.zZYga > div > article ');

        const startTime : number = await new Date().getTime();

        let urls : Array<string> = await [];
        for (let i = 1; i <= pageCnt; i++) {
            urls.push(page.url());
            await page.keyboard.press("ArrowRight");
            await page.waitFor(100);
        }

        const endTime : number = await new Date().getTime();
        
        console.log("url 가져오는 총 시간 : " + (endTime-startTime)/1000);

        // let path = "./src/insta/results/"+tag+"Url.json";

        // fs.writeFileSync(path, JSON.stringify(data), "utf8");

        await page.close();
        await browser.close();

        return urls;
}

export default instagramUrl;