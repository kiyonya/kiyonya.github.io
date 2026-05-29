<template>
    <div class="about-me">
        <div class="profile-card">

            <div class="corner">
                <div class="corner-item lt"></div>
                <div class="corner-item rb"></div>
            </div>

            <div class="profile-area">
                <div class="title">
                    <div class="title-head">{{ $t('pages.home.title_head_tip') }}</div>
                    <div class="main-title">{{ $t('pages.home.title_main') }}</div>
                </div>
                <div class="about">
                    <div class="subtitle">
                        <class class="icon">#</class>
                        <span>{{ $t('pages.home.title_about_me') }}</span>
                    </div>
                    <p class="content">
                        {{ $t('pages.home.about_me_content') }}
                    </p>
                </div>
                <div class="contact">
                    <div class="subtitle">
                        <class class="icon">#</class>
                        <span>{{ $t('pages.home.title_contact') }}</span>
                    </div>
                    <div class="contact-links">
                        <a :href="link.url" :title="name" target="__blank" class="link"
                            v-for="(link, name) in contactLinks">
                            <Icon :icon="link.icon"></Icon>
                        </a>
                    </div>
                </div>
            </div>
            <div class="avatar-area">
                <img src="https://avatars.githubusercontent.com/u/189569458?v=4" alt="" class="avatar-image">
                <span class="tip">{{ $t("pages.home.avatar_tip") }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';

const contactLinks: Record<string, { icon: string, url: string }> = {
    github: {
        icon: "mdi:github",
        url: "https://github.com/kiyonya"
    },
    twitter: {
        icon: "codicon:twitter",
        url: "https://x.com/Kiyuu_Nya"
    },
    bilibili: {
        icon: "mingcute:bilibili-line",
        url: "https://space.bilibili.com/317059967"
    },
    vrchat: {
        icon: "simple-icons:vrchat",
        url: "https://vrchat.com/home/user/usr_fabf075a-ab53-4395-918c-517b76a42ab5"
    },
}

</script>
<style scoped>
.about-me {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.profile-card {
    width: 60%;
    display: grid;
    grid-template-columns: 1fr 0.8fr;
    font-family: misans;
    box-sizing: border-box;
    padding: 3rem;
    position: relative;

    .subtitle {
        font-size: 1.6rem;
        display: flex;
        flex-direction: row;
        color: white;
        align-items: center;
        font-weight: 500;
        gap: 0.5rem;

        .icon {
            color: rgb(28, 183, 255);
            font-size: 2rem;
        }
    }
}

.profile-area {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .title {
        display: flex;
        flex-direction: column;
        color: white;


        .title-head {
            font-size: 2rem;
            font-weight: 500;
        }

        .main-title {
            font-size: 4rem;
            font-weight: 600;
            margin-block-start: -0.6rem;
        }
    }

    .about {
        .content {
            color: white;
        }
    }

    .contact {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        .contact-links {
            display: flex;
            flex-direction: row;
            gap: 1rem;

            .link {
                text-decoration: none;
                color: white;
                font-size: 2rem;
                background: rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: 0.3rem;
                border-radius: 5px;
                backdrop-filter: blur(5px);
            }
        }
    }
}

.avatar-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    .avatar-image {
        width: 70%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        outline: white 2px solid;
        outline-offset: 5px;
    }

    .tip {
        font-size: 0.85rem;
        color: white;
    }
}

.corner {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    --corner-width: 3%;
    --corner-bold: 7%;
    --pad: 0rem;
    --opacity: 0.4;


    .corner-item {
        position: absolute;
        transition: .5s;
        width: var(--corner-width);
        aspect-ratio: 1/1;
        background-color: rgb(255, 255, 255);
        clip-path: polygon(100% 0, 100% var(--corner-bold), var(--corner-bold) var(--corner-bold), var(--corner-bold) 100%, 0 100%, 0 0);
        opacity: var(--opacity);
    }

    .lt {
        left: var(--pad);
        top: var(--pad);
    }

    .rb {
        right: var(--pad);
        bottom: var(--pad);
        transform: rotate(180deg);
    }

}

.profile-card:hover {
    .corner {
        --pad: 1rem;
        --opacity: 0.85;
        --corner-width: 7%;
    }
}
</style>