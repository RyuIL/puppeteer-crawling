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

        const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

        let result = [{ tag: tag, img: items }];

        let path = "./src/insta/results/"+tag+".json";

        fs.writeFileSync(path, JSON.stringify(result), "utf8");

        await page.close();
        await browser.close();

    }catch(e){
        console.log(e);
    }
}

export default instagram;