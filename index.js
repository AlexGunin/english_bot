var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
var TelegramApi = require("node-telegram-bot-api");
var Axios = require("axios").Axios;
var TOKEN = "5508005678:AAE4jnDkKVf5bzTnK1j1DI9njS1PHkEUCgA";
var IAM_TOKEN = "t1.9euelZrMkYvJyMrIjsqNlJCRzp2Ylu3rnpWayJmQms_MzJecm4qci8iQlZXl8_c0GDNq-e8IJ04z_N3z93RGMGr57wgnTjP8.cVx0sfvNxJZOa7tzrHq82Jek8P_sGBOryDaF4BxzRsmvQeemS-cApttpMntzDeQBDJJphYzwmQBFqGKmY_GjBg";
var USER_ACCOUNT_ID = "aje7foe033hcduct7ojj";
var IDENTIFIER_KEY = "ajeqr991h8n4ehm5i0s8";
var SECRET_KEY = "AQVN2tpSGKLkdGxZA4gMjhKyrdZWCeQkKAAQsLVv";
var TRANSLATE_LANGUAGES = {
    en: "ru",
    ru: "en",
};
var bot = new TelegramApi(TOKEN, { polling: true });
var axios = new Axios({
    headers: { Authorization: "Api-Key ".concat(SECRET_KEY) },
});
var wordOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: "Текст кнопки", callback_data: "1" }]],
    }),
};
bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Начальное приветствие" },
]);
bot.on("message", function (msg) { return __awaiter(_this, void 0, void 0, function () {
    var text, chatId, translatedText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = msg.text;
                chatId = msg.chat.id;
                return [4 /*yield*/, translate(text)];
            case 1:
                translatedText = _a.sent();
                return [4 /*yield*/, bot.sendMessage(chatId, "\u041F\u0435\u0440\u0435\u0432\u043E\u0434: ".concat(translatedText.reduce(function (acc, cur) { return acc + cur.text + "\n"; }, "")))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var defineLanguage = function (text) { return __awaiter(_this, void 0, void 0, function () {
    var data, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.post("https://translate.api.cloud.yandex.net/translate/v2/detect", JSON.stringify({ text: text }))];
            case 1:
                data = (_a.sent()).data;
                result = JSON.parse(data);
                return [2 /*return*/, result.languageCode];
            case 2:
                err_1 = _a.sent();
                console.log("error", err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var translate = function (text) {
    if (text === void 0) { text = "hello"; }
    return __awaiter(_this, void 0, void 0, function () {
        var language, targetLanguageCode, data, result, err_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, defineLanguage(text)];
                case 1:
                    language = _b.sent();
                    targetLanguageCode = (_a = TRANSLATE_LANGUAGES[language]) !== null && _a !== void 0 ? _a : "ru";
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios.post("https://translate.api.cloud.yandex.net/translate/v2/translate", JSON.stringify({ targetLanguageCode: targetLanguageCode, texts: [text] }))];
                case 3:
                    data = (_b.sent()).data;
                    result = JSON.parse(data);
                    return [2 /*return*/, result.translations];
                case 4:
                    err_2 = _b.sent();
                    console.log("error", err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
