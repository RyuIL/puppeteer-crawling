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
var instagramUrl = function (tag, pageCnt) { return __awaiter(_this, void 0, void 0, function () {
    var url, browser, page, startTime, urls, i, endTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://www.instagram.com/explore/tags/" + tag + "/?hl=ko";
                return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setViewport({ width: 1280, height: 926 })];
            case 3:
                _a.sent();
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
                return [4 /*yield*/, page.waitForSelector("span.g47SY")];
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
                urls = _a.sent();
                i = 1;
                _a.label = 12;
            case 12:
                if (!(i <= pageCnt)) return [3 /*break*/, 16];
                urls.push(page.url());
                return [4 /*yield*/, page.keyboard.press("ArrowRight")];
            case 13:
                _a.sent();
                return [4 /*yield*/, page.waitFor(100)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15:
                i++;
                return [3 /*break*/, 12];
            case 16: return [4 /*yield*/, new Date().getTime()];
            case 17:
                endTime = _a.sent();
                console.log("url 가져오는 총 시간 : " + (endTime - startTime) / 1000);
                // let path = "./src/insta/results/"+tag+"Url.json";
                // fs.writeFileSync(path, JSON.stringify(data), "utf8");
                return [4 /*yield*/, page.close()];
            case 18:
                // let path = "./src/insta/results/"+tag+"Url.json";
                // fs.writeFileSync(path, JSON.stringify(data), "utf8");
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 19:
                _a.sent();
                return [2 /*return*/, urls];
        }
    });
}); };
exports.default = instagramUrl;
//# sourceMappingURL=instaUrl.js.map