const TelegramApi = require("node-telegram-bot-api");
const { Axios } = require("axios");

const TOKEN = "5508005678:AAE4jnDkKVf5bzTnK1j1DI9njS1PHkEUCgA";
const IAM_TOKEN =
  "t1.9euelZrMkYvJyMrIjsqNlJCRzp2Ylu3rnpWayJmQms_MzJecm4qci8iQlZXl8_c0GDNq-e8IJ04z_N3z93RGMGr57wgnTjP8.cVx0sfvNxJZOa7tzrHq82Jek8P_sGBOryDaF4BxzRsmvQeemS-cApttpMntzDeQBDJJphYzwmQBFqGKmY_GjBg";
const USER_ACCOUNT_ID = "aje7foe033hcduct7ojj";
const IDENTIFIER_KEY = "ajeqr991h8n4ehm5i0s8";
const SECRET_KEY = "AQVN2tpSGKLkdGxZA4gMjhKyrdZWCeQkKAAQsLVv";

const TRANSLATE_LANGUAGES = {
  en: "ru",
  ru: "en",
};

const bot = new TelegramApi(TOKEN, { polling: true });
const axios = new Axios({
  headers: { Authorization: `Api-Key ${SECRET_KEY}` },
});

const wordOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Текст кнопки", callback_data: "1" }]],
  }),
};

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/info", description: "Начальное приветствие" },
]);
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const translatedText = await translate(text);
  await bot.sendMessage(
    chatId,
    `Перевод: ${translatedText.reduce((acc, cur) => acc + cur.text + "\n", "")}`
  );
});

const defineLanguage = async (text) => {
  try {
    const { data } = await axios.post(
      "https://translate.api.cloud.yandex.net/translate/v2/detect",
      JSON.stringify({ text })
    );
    const result = JSON.parse(data);
    return result.languageCode;
  } catch (err) {
    console.log("error", err);
  }
};
const translate = async (text = "hello") => {
  const language = await defineLanguage(text);
  const targetLanguageCode = TRANSLATE_LANGUAGES[language] ?? "ru";
  try {
    const { data } = await axios.post(
      "https://translate.api.cloud.yandex.net/translate/v2/translate",
      JSON.stringify({ targetLanguageCode, texts: [text] })
    );
    const result = JSON.parse(data);
    return result.translations;
  } catch (err) {
    console.log("error", err);
  }
};
