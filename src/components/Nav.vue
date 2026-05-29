<template>
    <div class="nav">
        <RouterLink class="logo" to="/">
            <span>KiyuuCN</span>
        </RouterLink>
        <div class="gap"></div>
        <div class="routes">
            <RouterLink v-for="link in routes" :to="link.to" :title="link.name" class="link" active-class="link-active">
                <Icon :icon="link.icon" v-if="link.icon"></Icon>
                <span>{{ link.name.toUpperCase() }}</span>
            </RouterLink>
        </div>
        <div class="lang">
            <Icon icon="mdi:earth" class="icon"/>
            <select v-model="$i18n.locale" tabindex="0" class="langs" >
                <option :value="lang" v-for="(name,lang) in langs">{{ name }}</option>
            </select>
        </div>
        <div class="github">
            <Icon icon="mdi:github" class="icon"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AppData from '../data';


const routes: { icon?: string, to: string, name: string }[] = [
    {
        name: "Home",
        to: "/",
    },
    {
        name: "Gallery",
        to: "/gallery",
    }
]
const langs = AppData.Language.LanguageAutonymMap
</script>
<style scoped>
.nav {
    width: 100%;
    height: 3.8rem;
    background:linear-gradient(to right,rgb(59, 206, 255) 50%,rgb(35, 168, 212));
    box-sizing: border-box;
    padding: 0 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    flex-shrink: 0;
    z-index: 10;

    .logo {
        text-decoration: none;
        color: black;
        font-weight: 600;
        
        font-size: 1.5rem;
        letter-spacing: -2px;
    }

    .gap {
        width: 2px;
        background-color: black;
        height: 40%;
        opacity: 0.5;
    }

    .routes{
        display: flex;
        flex-direction: row;
        gap: 1.5rem;

        .link{
            width: 5rem;
            text-align: center;
            font-weight: 500;
            text-decoration: none;
            color: rgb(18, 18, 18);
            font-size: 1.1rem;
            position: relative;
        }

        .link::after{
            content: "";
            width: 100%;
            height:2.5rem;
            position: absolute;
            left: 0;
            top: 100%;
            background-color: rgb(59, 206, 255) ;
            clip-path: polygon(50% 100%, 0 0, 100% 0);
            opacity: 0;
        }
    }
}
.link-active{
    color: white !important;
    font-weight: 600 !important;
}
.link-active::after{
    opacity: 1 !important;
}

.lang{

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
    margin-left: auto;
    margin-right: 0;

    .icon{
        font-size: 1.6rem;
    }

    .langs{
        padding: 0.2rem 0.5rem;
        border: none;
        background:none;
        outline: none;
        font-size: 1rem;
        font-weight: 500;
    }

    .langs:hover{
        outline:  1px solid black;
    }
}

.github{
    .icon{
        font-size: 1.6rem;
    }
}
</style>