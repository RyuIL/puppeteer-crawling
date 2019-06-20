import cheerio from "cheerio";
import request from "request";
import fs from "fs";
import { resolve } from "bluebird";

const cheerioOption = (url: string) => {
  return {
    method: "GET",
    uri: url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36"
    }
  };
};

const checkEmptyContent = (html : Function) => {
  let title = html("title").text();

  let isEmptyPage = title.indexOf("Page Not Found");
  if (isEmptyPage != -1) {
    return true;
  }
}

const instaCheerio = function(url: string) {
  return new Promise((resolve, reject) => {
    request(
      cheerioOption(url),
      (err, res, body) => {
        if (err) {
          reject(err);
          return console.error(err);
        }

        let $ = cheerio.load(body);

        if(checkEmptyContent($)){
          resolve("page not found");
          return;
        }
        
        // let auth = $('article .QBXjJ M9sTE  L_LMM  JyscU  ePUX4');
        // let test = $('_0mzm- sqdOP  L3NKy       ').text();
        let img = $("meta[property='og:image']").attr("content");

        let tags: Array<string> = [];
        let hashtags = $("meta[property='instapp:hashtags']").each(function(
          index,
          item
        ) {
          let data = $(item).attr("content");
          tags.push(data);
        });

        let authMetaData = $("meta[name='description']").attr("content");

        let contentMetaData = $("meta[property='og:title']").attr("content");

        let authArr: string[] = [];
        let authName: string = authMetaData
          ? authMetaData.replace(/@[^@\s,;]+/gm, function(auth: string) {
              authArr.push(auth.slice(1, -1));
              return "";
            })
          : "";

        let authMetaSplit: Array<string> = authMetaData.split(" ");

        let likes =
          authMetaSplit[authMetaSplit.findIndex(el => el === "Likes,") - 1];

        let commentCnt =
          authMetaSplit[authMetaSplit.findIndex(el => el === "Comments") - 1];

        let result: object = {
          auth: authArr[0],
          content: contentMetaData,
          commentCnt: commentCnt,
          img: img,
          likes: likes,
          tags: tags
        };

        resolve(result);
      }
    );
  });
};

export default instaCheerio;
