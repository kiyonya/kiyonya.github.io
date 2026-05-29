import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router/index.ts'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import AppData from './data.ts'
import type { AppTypes } from './type.ts'
import createI18nInstance from './i18n/i18n.ts'

async function Setup() {
    const app = createApp(App)
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)

    app.use(router)
    app.use(pinia)

    const userLanguage = window.navigator.language.toLowerCase()
    let appLanguage: AppTypes.Language.AvailableLanguage = AppData.Language.AvailableLanguage.includes(userLanguage as any) ? userLanguage as AppTypes.Language.AvailableLanguage : 'zh_cn'
    const i18nInstance = createI18nInstance(appLanguage)
    app.use(i18nInstance)
    app.mount("#app")
}

Setup()