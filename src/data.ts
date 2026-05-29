import type { AppTypes } from "./type";

const LanguageAutonymMap: Record<AppTypes.Language.AvailableLanguage, string> = {
    'zh_cn': "简体中文",
    'zh_tw': "繁體中文",
    "zh_cl": "文言文",
    "ja_jp": "日本語",
    "ko_kr": "한국어",
    'en_us': "English(US)",
    'en_uk': "English(UK)",
    'ru_ru': "Русский"
}
const AvailableLanguage: AppTypes.Language.AvailableLanguage[] = [
    'zh_cn',
    'zh_tw',
    "zh_cl",
    "ja_jp",
    "ko_kr",
    'en_us',
    'en_uk',
    'ru_ru'
]

const AppData = {
    Language: {
        LanguageAutonymMap,
        AvailableLanguage
    }
}

export default AppData