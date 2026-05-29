import { defineStore } from "pinia";
import type { AppTypes } from "../type";
import { getCurrentInstance } from "vue";

export interface LangStoreState {
    lang: AppTypes.Language.AvailableLanguage
}

const useLangStore = defineStore('lang', {
    state: (): LangStoreState => ({
        lang: 'zh_cn'
    }),
    actions: {
        changeLanguage(lang: AppTypes.Language.AvailableLanguage) {
            this.lang = lang
            const i18n = getCurrentInstance()?.appContext.config.globalProperties.$i18n
            console.log(i18n)
        }
    },
    persist: {
        pick: ['lang'],
    }
})

export default useLangStore