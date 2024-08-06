import ProductList from "@/views/ProductList.vue";
import ProductListManage from "@/views/ProductListManage.vue";

export const productRouter = [
    {
        path: '/', // 호출
        name: 'Home',
        component: ProductList
    },
    {
        path: '/product/list', // 호출
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/product/manage', // 호출
        name: 'ProductListManage',
        component: ProductListManage
    }
]