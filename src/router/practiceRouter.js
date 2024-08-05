import VuetifyComponent from "@/components/practice/VuetifyComponent.vue";
import ModelingComponent from "@/components/practice/ModelingComponent.vue";
import ConditionalComponent from "@/components/practice/ConditionalComponent.vue";
import HookComponent from "@/components/practice/HookComponent.vue";
import AxiosTestComponent from "@/components/practice/AxiosTestComponent.vue";
import WatchUpdateComponent from "@/components/practice/WatchUpdateComponent.vue";
import RouterTestComponent from "@/components/practice/RouterTestComponent.vue";

export const practiceRouter = [
    {
        path: '/practice/vuetify', // 호출
        name: 'VuetifyComponent',
        component: VuetifyComponent
    },
    {
        path: '/practice/modeling', 
        name: 'ModelingComponent',
        component: ModelingComponent
    },
    {
        path: '/practice/conditional', 
        name: 'ConditionalComponent',
        component: ConditionalComponent
    },
    {
        path: '/practice/hooks', 
        name: 'HookComponent',
        component: HookComponent
    },
    {
        path: '/practice/axiosTest', 
        name: 'AxiosTestComponent',
        component: AxiosTestComponent
    },
    {
        path: '/practice/hooks2', 
        name: 'WatchUpdateComponent',
        component: WatchUpdateComponent
    },
    {
        path: '/practice/routertest', 
        name: 'RouterTestComponent',
        component: RouterTestComponent
    }
]