<script setup lang="ts">
import Foot from './components/Foot.vue';
import Nav from './components/Nav.vue';
</script>

<template>
    <Nav></Nav>
    <RouterView class="page"></RouterView>
    <Foot></Foot>
</template>

<style scoped>
.particle {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;

    .particle-canvas {
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
}
</style>
