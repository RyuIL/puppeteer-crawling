import puppeteer from 'puppeteer';
import {extractItems, scrapeInfiniteScrollItems} from './scroll';
import fs from 'fs';

const instagram = async (tag:string) => {
    const url : string = "https://www.instagram.com/explore/tags/"+tag+"/?hl=ko";
    try{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setViewport({ width: 1280, height: 926 });

        await page.setRequestInterception(true);
        await page.on('request', request => {
        if (request.resourceType().toUpperCase() === 'IMAGE')
            request.abort();
        else
            request.continue();
        });

        await page.goto(url);
        await page.waitForSelector("span.g47SY ");

        await page.click('div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1)');
        await page.waitForSelector('body > div._2dDPU.vCf6V > div.zZYga > div > article ');

        const startTime : number = await new Date().getTime();

        let data : Array<Object> = await [];
        for (let i = 1; i <= 100; i++) {
            let result : object = await page.evaluate(() => {
                const auth : any = document.querySelector("div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a");
                const content : any = document.querySelector('div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK');
                const commentsAuth : any = Array.from(document.querySelectorAll('div.eo2As > div.EtaWk > ul > ul > li > div > div > div > h3'));
                const commentsContent : any = Array.from(document.querySelectorAll('div.eo2As > div.EtaWk > ul > ul > li > div > div > div > span'));
                const commentsTime : any = Array.from(document.querySelectorAll('div.eo2As > div.EtaWk > ul > ul > li > div > div > div > div > div > time'));

                //body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > ul:nth-child(2) > li > div > div > div.C4VMK > div > div > time
                const imgParents : any = document.querySelector("article > div._97aPb");
                const img = imgParents.querySelector("img.FFVAD");
                const writeTime : any = document.querySelector("div.C4VMK > div > div > time");


                //body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK > div > div > time
                //body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK > div > div > time

                let commentArr : Array<object> = [];
                const commentAuthArr : Array<string> = commentsAuth.map((comment : any) => comment.textContent);
                const commentContentArr : Array<string> = commentsContent.map((comment : any) => comment.innerHTML);
                const commentTimeArr : Array<string> = commentsTime.map((cmtTime : any) => cmtTime.dateTime);

                for (let i=0; i < commentAuthArr.length; i++){
                    const commentInData : object = {"commentAuth" : commentAuthArr[i], "commentContent" : commentContentArr[i], "commentTime" : commentTimeArr[i] }
                    commentArr.push(commentInData);
                }

                const likes : any = document.querySelector("div.eo2As > section.EDfFK.ygqzn > div > div > button > span");
                const tags : Array<string> = [];

                let contentText : string = content ? content.textContent.replace(/#[^#\s,;]+/gm, function(tag : string) {
                    tags.push(tag);
                    return "";
                }) : [];

                const total : object = {
                    "auth" : auth ? auth.innerHTML : "",
                    "content" : contentText ? contentText : "",
                    "tags" : tags ? tags : [],
                    "likes" : likes ? likes.textContent : 0,
                    "comments" : commentArr ? commentArr : [],
                    "img" : img ? img.src :  "",
                    "writeTime" : writeTime ? writeTime.dateTime : ""
                };
                
                return total;
            })    
            await console.log(i);
            console.log(page.url());
            await data.push(result);

            await page.keyboard.press("ArrowRight");
            await page.waitForSelector("body > div._2dDPU.vCf6V > div.zZYga > div > article");
        }
        
        // await page.waitForSelector("div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a");
        // await page.keyboard.press("ArrowRight");

        const endTime : number = await new Date().getTime();
        
        console.log(data);
        console.log((endTime-startTime)/1000);

        // let result = [{ tag: tag, img: items }];

        let path = "./src/insta/results/"+tag+".json";

        fs.writeFileSync(path, JSON.stringify(data), "utf8");

        await page.close();
        await browser.close();

    }catch(e){
        console.log(e);
        if(e==="TimeoutError"){
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        }
    }
}

export default instagram;