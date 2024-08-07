<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center text-h5 custom-title">
                        Membe Info🧑‍🤝‍🧑
                    </v-card-title>
                    <v-card-text></v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!-- orderlist component 가져오기 (script에 추가) -->
    <OrderListComponent 
        :isAdmin="false"
    />
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';

export default {
    components: {
        OrderListComponent
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.custom-title {
  font-family: "Playfair Display", serif;
}
.text-center{
    text-align: center;
}
</style>