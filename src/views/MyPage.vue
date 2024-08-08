<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center text-h5 custom-title">
                        Membe Info🧑‍🤝‍🧑
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <tbody>
                                <tr v-for="element in memberInfoList" :key="element.key">
                                    <td>{{element.key}}</td>
                                    <td>{{element.value}}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
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
import axios from 'axios';

export default {
    components: {
        OrderListComponent
    },
    data() {
        return {
            memberInfoList: []
        }
    },
    async created() {
        console.log("start")
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myinfo`);
        console.log(response);
        this.memberInfo = response.data;
        this.memberInfoList = [
            {key:"Name", value:this.memberInfo.name},
            {key:"Email", value:this.memberInfo.email},
            {key:"City", value:this.memberInfo.address.city},
            {key:"Street", value:this.memberInfo.address.street},
            {key:"Zipcode", value:this.memberInfo.address.zipcode}
        ];
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