"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var fs_1 = __importDefault(require("fs"));
var instagram = function (tag) { return __awaiter(_this, void 0, void 0, function () {
    var url, browser, page, startTime, data, i, result, endTime, path, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://www.instagram.com/explore/tags/" + tag + "/?hl=ko";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 23, , 24]);
                return [4 /*yield*/, puppeteer_1.default.launch({ headless: false })];
            case 2:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 3:
                page = _a.sent();
                page.setViewport({ width: 1280, height: 926 });
                return [4 /*yield*/, page.setRequestInterception(true)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.on('request', function (request) {
                        if (request.resourceType().toUpperCase() === 'IMAGE')
                            request.abort();
                        else
                            request.continue();
                    })];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.goto(url)];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector("span.g47SY ")];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.click('div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1)')];
            case 8:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector('body > div._2dDPU.vCf6V > div.zZYga > div > article ')];
            case 9:
                _a.sent();
                return [4 /*yield*/, new Date().getTime()];
            case 10:
                startTime = _a.sent();
                return [4 /*yield*/, []];
            case 11:
                data = _a.sent();
                i = 1;
                _a.label = 12;
            case 12:
                if (!(i <= 100)) return [3 /*break*/, 19];
                return [4 /*yield*/, page.evaluate(function () {
                        var auth = document.querySelector("div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a");
                        var content = document.querySelector('div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK');
                        var commentsAuth = Array.from(document.querySelectorAll('div.eo2As > div.EtaWk > ul > ul > li > div > div > div > h3'));
                        var commentsContent = Array.from(document.querySelectorAll('div.eo2As > div.EtaWk > ul > ul > li > div > div > div > span'));
                        var commentsTime = Array.from(document.querySelectorAll('div.eo2As > div.EtaWk > ul > ul > li > div > div > div > div > div > time'));
                        //body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > ul:nth-child(2) > li > div > div > div.C4VMK > div > div > time
                        var imgParents = document.querySelector("article > div._97aPb");
                        var img = imgParents.querySelector("img.FFVAD");
                        var writeTime = document.querySelector("div.C4VMK > div > div > time");
                        //body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK > div > div > time
                        //body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div > div > div.C4VMK > div > div > time
                        var commentArr = [];
                        var commentAuthArr = commentsAuth.map(function (comment) { return comment.textContent; });
                        var commentContentArr = commentsContent.map(function (comment) { return comment.innerHTML; });
                        var commentTimeArr = commentsTime.map(function (cmtTime) { return cmtTime.dateTime; });
                        for (var i_1 = 0; i_1 < commentAuthArr.length; i_1++) {
                            var commentInData = { "commentAuth": commentAuthArr[i_1], "commentContent": commentContentArr[i_1], "commentTime": commentTimeArr[i_1] };
                            commentArr.push(commentInData);
                        }
                        var likes = document.querySelector("div.eo2As > section.EDfFK.ygqzn > div > div > button > span");
                        var tags = [];
                        var contentText = content ? content.textContent.replace(/#[^#\s,;]+/gm, function (tag) {
                            tags.push(tag);
                            return "";
                        }) : [];
                        var total = {
                            "auth": auth ? auth.innerHTML : "",
                            "content": contentText ? contentText : "",
                            "tags": tags ? tags : [],
                            "likes": likes ? likes.textContent : 0,
                            "comments": commentArr ? commentArr : [],
                            "img": img ? img.src : "",
                            "writeTime": writeTime ? writeTime.dateTime : ""
                        };
                        return total;
                    })];
            case 13:
                result = _a.sent();
                return [4 /*yield*/, console.log(i)];
            case 14:
                _a.sent();
                console.log(page.url());
                return [4 /*yield*/, data.push(result)];
            case 15:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("ArrowRight")];
            case 16:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector("body > div._2dDPU.vCf6V > div.zZYga > div > article")];
            case 17:
                _a.sent();
                _a.label = 18;
            case 18:
                i++;
                return [3 /*break*/, 12];
            case 19: return [4 /*yield*/, new Date().getTime()];
            case 20:
                endTime = _a.sent();
                console.log(data);
                console.log((endTime - startTime) / 1000);
                path = "./src/insta/results/" + tag + ".json";
                fs_1.default.writeFileSync(path, JSON.stringify(data), "utf8");
                return [4 /*yield*/, page.close()];
            case 21:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 22:
                _a.sent();
                return [3 /*break*/, 24];
            case 23:
                e_1 = _a.sent();
                console.log(e_1);
                if (e_1 === "TimeoutError") {
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                }
                return [3 /*break*/, 24];
            case 24: return [2 /*return*/];
        }
    });
}); };
exports.default = instagram;
//# sourceMappingURL=insta.js.map