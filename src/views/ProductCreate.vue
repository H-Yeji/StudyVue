<template>
    <v-contain>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center text-h5">
                        Regist Product🎁 
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="productCreate">
                            <v-text-field
                                label="Product Name"
                                v-model="name"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Category"
                                v-model="category"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Price"
                                v-model="price"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Stock Quantity"
                                v-model="stockQuantity"
                                required
                            ></v-text-field>
                            <v-file-input
                                label="Product Image"
                                accept="image/*"
                                @change="fileUpdate"
                                required
                            ></v-file-input> 
                            <v-btn type="submit" color="primary" block>submit</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-contain>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name:"",
            category:"",
            price: null,
            stockQuantity:null,
            produdctImage:null
        }
    },
    methods: {
        async productCreate() {

            try {
                let registerData = new FormData();
                registerData.append("name", this.name);
                registerData.append("category", this.category);
                registerData.append("price", this.price);
                registerData.append("stockQuantity", this.stockQuantity);
                registerData.append("productImage", this.productImage);
                
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/product/create`, registerData);
                this.$router.push('/product/manage');
            } catch(e) {
                alert("상품 등록에 실패했음");
            }
        },
        fileUpdate(event) {
            this.productImage = event.target.files[0]; // event.target.files의 0번째 파일
            
        }
    }
}
</script>