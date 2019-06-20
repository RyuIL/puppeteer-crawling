import fs from 'fs';
import puppeteer from 'puppeteer';


// 대기하는 방법
// await page.waitFor(() => !!document.querySelector('.foo'), {
//   hidden: true,
// });

const naverNewsCrawler = async (url : string) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(2000);

    const isEmpty = await page.evaluate(() => 
        document.querySelector("span.u_cbox_contents_none")
    );

    if(isEmpty){
        console.log("댓글이 없음");
        await page.close();
        await browser.close();
    }

    await page.click(".u_cbox_in_view_comment");
    await page.waitFor(1500);

    let titleEh : any = await page.$("#articleTitle");

    let title = await titleEh.$eval("a", (el:any) => {
      return el.textContent;
    });

    while (true) {
        const isDisplayClick : HTMLElement = await page.evaluate(
            () => {
                // return document.getElementsByClassName("div.u_cbox_paginate").style.display
                return document.querySelector("div.u_cbox_paginate");
            });
      if ((isDisplayClick as HTMLElement).style.display === "none") {
        break;
      } else {
        await page.click("span.u_cbox_page_more");
        await page.waitForSelector("div.u_cbox_paginate");
      }
    }

    const commentList = await page.evaluate(() => {
      const content = Array.from(
        document.querySelectorAll("span.u_cbox_contents")
      );
      const contentMap = content.map(content => content.textContent);
      const nick = Array.from(document.querySelectorAll("span.u_cbox_nick"));
      const nickMap = nick.map(nick => nick.textContent);
      const date = Array.from(document.querySelectorAll("span.u_cbox_date"));
      const dateMap = date.map(date => date.textContent);
      let cl = [];
      for (let i = 0; i < content.length; i++) {
        cl.push({ nick: nickMap[i], content: contentMap[i], date: dateMap[i] });
      }
      return cl;
    });

    let result = [{ title: title, comments: commentList }];

    await page.close();
    await browser.close();

    fs.writeFileSync(title + ".json", JSON.stringify(result), "utf8");
    console.log("쓰기 완료");
  } catch (e) {
    console.log(e);
  }
};


export default naverNewsCrawler;
