<template>
    <div class="gallery">
        <div class="gallery-area page-w75-layout">
            <div class="page-layout-title">
                <span class="main">{{ $t('pages.gallery.title') }}</span>
                <span class="tip">{{ $t('pages.gallery.title_tip') }}</span>
            </div>
            <div class="waterfall-images-container">
                <div class="waterfall-columns" ref="columnsContainer">
                    <div v-for="(column, colIndex) in columns" :key="colIndex" class="waterfall-column">
                        <div v-for="(image) in column" :key="image.id" class="image-item"
                            :class="{ 'loaded': image.loaded }">
                            <img :src="image.url" :alt="`Gallery ${image.id}`" @load="onImageLoad(image.id)" :style="{
                                opacity: image.loaded ? 1 : 0,
                                transition: '0.3s ease'
                            }"/>
                            <div v-if="!image.loaded" class="image-skeleton"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick, useTemplateRef } from 'vue';

interface GalleryImage {
    id: number;
    url: string;
    loaded: boolean;
    naturalWidth?: number;
    naturalHeight?: number;
    aspectRatio?: number;
}

const STORED_IMG_COUNT: number = 15;
const COLUMN_COUNT = 3;
const images = ref<GalleryImage[]>([]);
const columns = ref<GalleryImage[][]>([]);
const columnsContainer = useTemplateRef('columnsContainer');

onMounted(async () => {
    await loadImages();
    await nextTick();
    layoutWaterfall();
});

async function loadImages() {
    const imagePromises = [];
    for (let id = 1; id <= STORED_IMG_COUNT; id++) {
        const url = new URL(`../../assets/gallery/${id}.jpg`, import.meta.url).href;
        const image: GalleryImage = {
            id: id,
            url: url,
            loaded: false
        };
        images.value.push(image);
        const promise = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                image.naturalWidth = img.width;
                image.naturalHeight = img.height;
                image.aspectRatio = img.height / img.width;
                image.loaded = true;
                resolve(true);
            };
            img.onerror = () => resolve(false);
            img.src = url;
        });

        imagePromises.push(promise);
    }
    await Promise.all(imagePromises);
};

function onImageLoad(imageId: number) {
    const image = images.value.find(img => img.id === imageId);
    if (image && image.loaded) {
        layoutWaterfall();
    }
};
function layoutWaterfall() {
    if (!images.value.length) return;
    const newColumns: GalleryImage[][] = Array(COLUMN_COUNT).fill(null).map(() => []);
    const columnHeights: number[] = Array(COLUMN_COUNT).fill(0);
    images.value.forEach(image => {
        if (!image.loaded) return;
        let minHeightColumn = 0;
        for (let i = 1; i < COLUMN_COUNT; i++) {
            if (columnHeights[i] < columnHeights[minHeightColumn]) {
                minHeightColumn = i;
            }
        }
        newColumns[minHeightColumn].push(image);
        const columnElement = columnsContainer.value?.children[minHeightColumn] as HTMLElement;
        const columnWidth = columnElement?.clientWidth || 250;
        const displayHeight = columnWidth * (image.aspectRatio || 1);
        columnHeights[minHeightColumn] += displayHeight;
    });

    columns.value = newColumns;
};
</script>
<style scoped>
.gallery {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.waterfall-images-container {
    width: 100%;
    overflow-y: auto;
    --gap: 0.9rem;
}

.waterfall-images-container::-webkit-scrollbar {
    display: none;
}

.waterfall-columns {
    display: flex;
    gap: var(--gap);
    justify-content: center;

    .waterfall-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--gap);

        .image-item {
            position: relative;
            width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;
            border: 5px solid white;
            box-sizing: border-box;
            cursor: pointer;

            img {
                width: 100%;
                height: auto;
                display: block;
                object-fit: cover;
                transition: .3s;
            }

            .image-skeleton {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: gray;
            }
        }

        .image-item:hover {
            img {
                transform: scale(1.1);
            }
        }
    }
}
</style>