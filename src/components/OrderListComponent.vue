<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5 custom-title">Order List✔️</v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="tableHeaders"
                            :items="orderList"
                            class="elevation-1"
                        > 
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn color="success" v-if="item.orderStatus==='ORDERED'" @click.stop="cancelOrder(item.id)">
                                CANCEL
                            </v-btn>
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/order/list`);
            this.orderList = response.data.result;
        } catch(e) {
            console.log(e);
        } 
    },
    methods: {
        cancelOrder(id) {
            console.log(id);
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