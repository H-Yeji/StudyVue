<template>
    <h1>🎁 Store test component3 🎁 </h1>      
    <p> ➕ COUNT: {{ getCount }}</p>
    <div>💬 MESSAGE : {{ getMessage }}</div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return{
            
        }
    }, 
    computed: { // 참조하고 있는 값이 변했을 때 실행되는 함수 : computed
        ...mapGetters(['getCount', 'getMessage']) // getCount 바라보고 있으께 변하면 받아오께
    }
}
</script>