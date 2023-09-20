const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchageIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");

// Populate select options for both languages
selectTag.forEach((tag, id) => {
  for (let country_code in countries) {
    const selected =
      (id === 0 && country_code === "en-GB") ||
      (id === 1 && country_code === "de-DE")
        ? "selected"
        : "";
    const option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

// Swap text and language on exchange icon click
exchageIcon.addEventListener("click", () => {
  [fromText.value, toText.value] = [toText.value, fromText.value];
  [selectTag[0].value, selectTag[1].value] = [
    selectTag[1].value,
    selectTag[0].value,
  ];
});

// Handle translation on button click
translateBtn.addEventListener("click", () => {
  const text = fromText.value.trim();
  const translateFrom = selectTag[0].value;
  const translateTo = selectTag[1].value;

  if (!text) return;

  toText.setAttribute("placeholder", "Translating...");

  // Split the input text into words
  const words = text.split(/\s+/);
  const translatedWords = [];

  // Translate each word separately
  const translateWord = async (word) => {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      word
    )}&langpair=${translateFrom}|${translateTo}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.responseData) {
        translatedWords.push(data.responseData.translatedText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Use Promise.all to translate all words concurrently
  Promise.all(words.map(translateWord)).then(() => {
    toText.value = translatedWords.join(" "); // Join the translated words back into a sentence
    toText.setAttribute("placeholder", "Translation");
  });
});

// Handle copy and speech icons
icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) return;

    if (target.classList.contains("fa-copy")) {
      const textToCopy = target.id === "from" ? fromText.value : toText.value;
      navigator.clipboard.writeText(textToCopy);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        target.id === "from" ? fromText.value : toText.value
      );
      utterance.lang =
        target.id === "from" ? selectTag[0].value : selectTag[1].value;
      speechSynthesis.speak(utterance);
    }
  });
});
