<template>
    <h1>🎁 Store test component2 🎁</h1>      
    <p> count: {{ getCount }}</p>
    <v-btn color="success" @click="incrementCount">increment count</v-btn>
    <input type="text" v-model="message">
    <v-btn color="primary" @click="updateMessage">update message</v-btn>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return{
            
        }
    }, 
    computed: { // 참조하고 있는 값이 변했을 때 실행되는 함수 : computed
        ...mapGetters(['getCount']), // getCount 바라보고 있으께 변하면 받아오께
        ...mapGetters(['getMessage'])
    },
    methods: {
        incrementCount() {
            this.$store.dispatch('incrementCount')
        },
        updateMessage() {
            this.$store.dispatch('updateMessage', this.message)
        }
        
    }
}
</script>