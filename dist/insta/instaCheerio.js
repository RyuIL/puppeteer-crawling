"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var request_1 = __importDefault(require("request"));
var cheerioOption = function (url) {
    return {
        method: "GET",
        uri: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36"
        }
    };
};
var checkEmptyContent = function (html) {
    var title = html("title").text();
    var isEmptyPage = title.indexOf("Page Not Found");
    if (isEmptyPage != -1) {
        return true;
    }
};
var instaCheerio = function (url) {
    return new Promise(function (resolve, reject) {
        request_1.default(cheerioOption(url), function (err, res, body) {
            if (err) {
                reject(err);
                return console.error(err);
            }
            var $ = cheerio_1.default.load(body);
            if (checkEmptyContent($)) {
                resolve("page not found");
                return;
            }
            // let auth = $('article .QBXjJ M9sTE  L_LMM  JyscU  ePUX4');
            // let test = $('_0mzm- sqdOP  L3NKy       ').text();
            var img = $("meta[property='og:image']").attr("content");
            var tags = [];
            var hashtags = $("meta[property='instapp:hashtags']").each(function (index, item) {
                var data = $(item).attr("content");
                tags.push(data);
            });
            var authMetaData = $("meta[name='description']").attr("content");
            var contentMetaData = $("meta[property='og:title']").attr("content");
            var authArr = [];
            var authName = authMetaData
                ? authMetaData.replace(/@[^@\s,;]+/gm, function (auth) {
                    authArr.push(auth.slice(1, -1));
                    return "";
                })
                : "";
            var authMetaSplit = authMetaData.split(" ");
            var likes = authMetaSplit[authMetaSplit.findIndex(function (el) { return el === "Likes,"; }) - 1];
            var commentCnt = authMetaSplit[authMetaSplit.findIndex(function (el) { return el === "Comments"; }) - 1];
            var result = {
                auth: authArr[0],
                content: contentMetaData,
                commentCnt: commentCnt,
                img: img,
                likes: likes,
                tags: tags
            };
            resolve(result);
        });
    });
};
exports.default = instaCheerio;
//# sourceMappingURL=instaCheerio.js.map