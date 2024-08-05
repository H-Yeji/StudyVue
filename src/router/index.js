import { createRouter, createWebHistory } from "vue-router"
// @는 src(루트 폴더)를 의미 => 루트(root) > components > vue파일  
// 파일 내부에 export default 있는 경우에는 {}가 필요없고, 그렇지 않으면 {} 필요 
// 요소가 여러개 있을 때에도 {}를 붙임 
import HomeComponent from "@/components/HomeComponent.vue";
// import TestComponent from "@/components/TestComponent.vue";

import { practiceRouter } from "./practiceRouter";
import { memberRouter } from "./memberRouter";

const routes = [
    {
        // path로도 라우팅이 가능하고, name으로도 라우팅 가능 
        // name으로 라우팅하는 경우는 js 코드 내에서 라우팅하는 경우 
        path: '/',
        name: 'HomeComponent',
        component: HomeComponent
    },
    // { 
    //     path: '/test',
    //     name: 'TEST',
    //     component: TestComponent
    // }
    ...practiceRouter, // 이렇게하면 practiceRouter에 있는거 쓸 수 있음 
    ...memberRouter
]

const router = createRouter({
    // vue라우터는 내부적으로 두 가지 방식의 history 관리 제공 
    // (1) createWebHistpory : /home의 패턴 => 대부분 web 씀 
    // (2) createHashHistory : /#/home 패턴 
    history: createWebHistory(),
    routes
});

export default router;