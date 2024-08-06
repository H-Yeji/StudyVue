<template>
    <!-- productlistComponent 가져다 쓰겠다 -->
     <!-- props를 컴포넌트에 전달함으로써 컴포넌트 화면 내에서 분기처리 하게따 -->
    <ProductListComponent 
        :isAdmin="true"
        pageTitle="상품관리"
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