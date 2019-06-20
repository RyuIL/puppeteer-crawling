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
var fs_1 = __importDefault(require("fs"));
var puppeteer_1 = __importDefault(require("puppeteer"));
// 대기하는 방법
// await page.waitFor(() => !!document.querySelector('.foo'), {
//   hidden: true,
// });
var naverNewsCrawler = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, isEmpty, titleEh, title, isDisplayClick, commentList, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 23, , 24]);
                return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url)];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.waitFor(2000)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        return document.querySelector("span.u_cbox_contents_none");
                    })];
            case 5:
                isEmpty = _a.sent();
                if (!isEmpty) return [3 /*break*/, 8];
                console.log("댓글이 없음");
                return [4 /*yield*/, page.close()];
            case 6:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, page.click(".u_cbox_in_view_comment")];
            case 9:
                _a.sent();
                return [4 /*yield*/, page.waitFor(1500)];
            case 10:
                _a.sent();
                return [4 /*yield*/, page.$("#articleTitle")];
            case 11:
                titleEh = _a.sent();
                return [4 /*yield*/, titleEh.$eval("a", function (el) {
                        return el.textContent;
                    })];
            case 12:
                title = _a.sent();
                _a.label = 13;
            case 13:
                if (!true) return [3 /*break*/, 19];
                return [4 /*yield*/, page.evaluate(function () {
                        // return document.getElementsByClassName("div.u_cbox_paginate").style.display
                        return document.querySelector("div.u_cbox_paginate");
                    })];
            case 14:
                isDisplayClick = _a.sent();
                if (!(isDisplayClick.style.display === "none")) return [3 /*break*/, 15];
                return [3 /*break*/, 19];
            case 15: return [4 /*yield*/, page.click("span.u_cbox_page_more")];
            case 16:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector("div.u_cbox_paginate")];
            case 17:
                _a.sent();
                _a.label = 18;
            case 18: return [3 /*break*/, 13];
            case 19: return [4 /*yield*/, page.evaluate(function () {
                    var content = Array.from(document.querySelectorAll("span.u_cbox_contents"));
                    var contentMap = content.map(function (content) { return content.textContent; });
                    var nick = Array.from(document.querySelectorAll("span.u_cbox_nick"));
                    var nickMap = nick.map(function (nick) { return nick.textContent; });
                    var date = Array.from(document.querySelectorAll("span.u_cbox_date"));
                    var dateMap = date.map(function (date) { return date.textContent; });
                    var cl = [];
                    for (var i = 0; i < content.length; i++) {
                        cl.push({ nick: nickMap[i], content: contentMap[i], date: dateMap[i] });
                    }
                    return cl;
                })];
            case 20:
                commentList = _a.sent();
                result = [{ title: title, comments: commentList }];
                return [4 /*yield*/, page.close()];
            case 21:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 22:
                _a.sent();
                fs_1.default.writeFileSync(title + ".json", JSON.stringify(result), "utf8");
                console.log("쓰기 완료");
                return [3 /*break*/, 24];
            case 23:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 24];
            case 24: return [2 /*return*/];
        }
    });
}); };
exports.default = naverNewsCrawler;
//# sourceMappingURL=naver.js.map