const fs = require("fs");
const pupperteer = require("puppeteer");


// 대기하는 방법
// await page.waitFor(() => !!document.querySelector('.foo'), {
//   hidden: true,
// });

const naverNewsCrawler = async url => {
  try {
    const browser = await pupperteer.launch({ headless: true });
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

    let titleEh = await page.$("#articleTitle");

    let title = await titleEh.$eval("a", el => {
      return el.textContent;
    });

    while (true) {
        const isDisplayClick = await page.evaluate(
            () => document.querySelector("div.u_cbox_paginate").style.display
        );
      if (isDisplayClick === "none") {
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

module.exports = crawler;
