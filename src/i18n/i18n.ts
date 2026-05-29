import { createI18n } from "vue-i18n";
import Lang_JA_JP from "./ja_jp";
import Lang_KO_KR from "./ko_kr";
import Lang_ZH_CL from "./zh_cl";
import Lang_ZH_CN from "./zh_cn";
import Lang_ZH_TW from "./zh_tw";
import type { AppTypes } from "../type";
import Lang_EN_US from "./en_us";
import Lang_EN_UK from "./en_uk";
import Lang_RU_RU from "./ru_ru";

export default function createI18nInstance(lang: AppTypes.Language.AvailableLanguage) {
    const i18n = createI18n({
        locale: lang,
        fallbackLocale: 'zh_cn',
        messages: {
            zh_cn: Lang_ZH_CN,
            zh_tw: Lang_ZH_TW,
            ja_jp: Lang_JA_JP,
            ko_kr: Lang_KO_KR,
            zh_cl: Lang_ZH_CL,
            en_us:Lang_EN_US,
            en_uk:Lang_EN_UK,
            ru_ru:Lang_RU_RU
        }

    })
    return i18n
}
