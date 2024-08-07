<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center text-h5 custom-title">Order List✔️</v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="tableHeaders"
                            :items="orderList"
                            class="elevation-1"
                            show-expand
                        > 
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn color="success" v-if="isAdmin && item.orderStatus==='ORDERED'" @click.stop="cancelOrder(item.id)">
                                CANCEL
                            </v-btn>
                        </template> 
                        <template v-slot:expanded-row="{item}">
                            <v-row>
                                <v-col>
                                    <v-card class="card">
                                        <v-list-item v-for="orderItem in item.orderDetailDtos" :key="orderItem.id">
                                            <v-list-item-content>
                                                <v-list-item-tile>
                                                    ➕주문한 상품: {{ orderItem.productName }} <br>💡개수: {{ orderItem.count }}개
                                                </v-list-item-tile>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'; 

export default{
    props: ['isAdmin'],
    data() {
        return {
            orderList: [],
            tableHeaders: [
                {title:'ID', key:'id', align:'start'},
                {title:'Member email', key:'memberEmail', align:'start'},
                {title:'Status', key:'orderStatus', align:'start'},
                {title:'Action', key:'actions', align:'start'},
            ],
        }
    },
    async created() {
        try {
            if (this.isAdmin) { // admin이면 orderList 
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/list`)
                this.orderList = response.data.result;
                console.log("Admin Response: ", response);
            } else { // user면 자기주문
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/myorders`);
                this.orderList = response.data.result;
                console.log("User Response: ", response);
            }
        } catch(e) {
            console.log(e);
        } 
    },
    methods: {
        async cancelOrder(id) {
            try {
                console.log(id);

                // const body = {
                //     orderStatus: this.orderStatus
                // }
                const response = await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/order/${id}/cancel`);
                window.location.reload();
                console.log(response);
            } catch(e) {
                console.log(e);
            }
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
.card {
    margin-top:10px;
    margin-left:10px;
}
</style>