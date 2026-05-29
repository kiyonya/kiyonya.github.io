import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "Home",
            path: "/",
            component: () => import('../views/me/Home.vue')
        },
        {
            name:"Gallery",
            path:"/gallery",
            component:()=>import('../views/gallery/Gallery.vue')
        }
    ]
})

export default router