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
Object.defineProperty(exports, "__esModule", { value: true });
function extractItems() {
    // const extractedElements : any = document.querySelectorAll('#boxes > div.box');
    var extractedElements = document.querySelectorAll('div.KL4Bh > img');
    var items = [];
    for (var _i = 0, extractedElements_1 = extractedElements; _i < extractedElements_1.length; _i++) {
        var element = extractedElements_1[_i];
        var temp = element.srcset.split(",");
        var inputImgSrc = temp[temp.length - 1].split(" ");
        items.push(inputImgSrc[0]);
    }
    return items;
}
exports.extractItems = extractItems;
// #react-root > section > main > article > div:nth-child(3) > div > div:nth-child(13) > div:nth-child(3) > a > div.eLAPa > div.KL4Bh > img
// #react-root > section > main > article > div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1) > a > div > div.KL4Bh > img
// #react-root > section > main > article > div:nth-child(3) > div > div:nth-child(12) > div:nth-child(3) > a > div > div.KL4Bh > img
/**
 * Scrolls and extracts content from a page.
 * @param {object} page - A loaded Puppeteer Page instance.
 * @param {function} extractItems - Item extraction function that is injected into the page.
 * @param {number} itemTargetConut - The target number of items to extract before stopping.
 * @param {number} scrollDelay - The time (in milliseconds) to wait between scrolls.
 */
function scrapeInfiniteScrollItems(page, extractItems, itemTargetCount, scrollDelay) {
    if (scrollDelay === void 0) { scrollDelay = 1000; }
    return __awaiter(this, void 0, void 0, function () {
        var items, totalItems, previousHeight, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    totalItems = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    previousHeight = void 0;
                    _a.label = 2;
                case 2:
                    if (!(totalItems.length < itemTargetCount)) return [3 /*break*/, 8];
                    return [4 /*yield*/, page.evaluate(extractItems)];
                case 3:
                    items = _a.sent();
                    appendArray(items, totalItems);
                    return [4 /*yield*/, page.evaluate('document.body.scrollHeight')];
                case 4:
                    previousHeight = _a.sent();
                    return [4 /*yield*/, page.evaluate('window.scrollTo(0, document.body.scrollHeight)')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.waitForFunction("document.body.scrollHeight > " + previousHeight)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(scrollDelay)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_1 = _a.sent();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/, totalItems];
            }
        });
    });
}
exports.scrapeInfiniteScrollItems = scrapeInfiniteScrollItems;
function appendArray(items, totalItems) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, items_1, i, isInItem, _a, totalItems_1, j;
        return __generator(this, function (_b) {
            if (items.length < 54) {
                totalItems = items;
            }
            else {
                for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                    i = items_1[_i];
                    isInItem = false;
                    for (_a = 0, totalItems_1 = totalItems; _a < totalItems_1.length; _a++) {
                        j = totalItems_1[_a];
                        if (i === j) {
                            isInItem = true;
                            break;
                        }
                    }
                    if (!isInItem) {
                        totalItems.push(i);
                    }
                }
            }
            console.log(totalItems.length);
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=scroll.js.map