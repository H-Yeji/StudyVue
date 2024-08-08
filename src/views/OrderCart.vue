<template>
    <v-container>
        <v-row justify="center">
            <v-col class="text-center">
                <h3>Product Cart🛒</h3> 
            </v-col>
        </v-row>
        <v-row justify="end">
            <v-col cols="auto">
                <v-btn color="grey" @click="clearCart">장바구니 비우기</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="success" @click="orderCreate">주문하기</v-btn>
            </v-col>
        </v-row>
        <br>
        <v-card>
            <v-row>
                <v-col>
                    <v-table>
                        <thead>
                            <tr>
                                <th>제품 ID</th>
                                <th>제품 Name</th>
                                <th>수량</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in getProductsInCart" :key="product.id">
                                <td>{{product.id}}</td>
                                <td>{{product.name}}</td>
                                <td>{{product.quantity}}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    computed: {
        ...mapGetters(['getProductsInCart'])
    },
    methods: {
        clearCart() {
            this.$store.dispatch("clearCart"); // storage에서 장바구니 비우기 전역실행
        },
        async orderCreate() { // 장바구니에서 주문하기 
            const orderProducts = this.getProductsInCart.map(p => 
                {return {productId:p.id, productCnt:p.quantity}}
            );
            console.log(orderProducts);
            if (orderProducts.length < 1) {
                alert("주문대상 물건이 없습니다.");
                return;
            }
            // 몇개 주문할거임 ?
            const yesOrNo = confirm(`${orderProducts.length}개 주문할거?`);
            if (!yesOrNo) {
                console.log("주문 취소됨");
                return;
            }

            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderProducts);
                alert('성 공 두 둥')
                this.clearCart();
            } catch(e) {
                console.log(e);
                alert('주문 실패임')
            }
        }
    }
}
</script>