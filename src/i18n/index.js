import zhCN from "./zh-CN";
import en from "./en";

let languageMap = {
    zhCN: zhCN,
    en: en
};

function getLanguage(code) {
    let language = languageMap[code];

    if (!language) {
        language = zhCN;
    }

    return language;
}

export default getLanguage;
