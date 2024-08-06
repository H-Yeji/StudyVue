<template>
    <!-- productlistComponent 가져다 쓰겠다 -->
    <!-- 문자열로 넘길 경우에는 변수명=, 그 외에는 :변수명= -->
    <ProductListComponent 
        :isAdmin="false"
        pageTitle="상품목록"
    /> 
</template>

<script>
import ProductListComponent from '@/components/ProductListComponent.vue';
export default {
    // 외부에서 component 가져올 때 => components: {}
    components: {
        ProductListComponent
    }
    
}
</script>