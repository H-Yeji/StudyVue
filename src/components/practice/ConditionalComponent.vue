<template>
    <h1>🐈🐈🐈🐈🐈🐈🐈🐈</h1>
    <br>
    <v-btn @click="login" color="#FFE0B2">로그인</v-btn>&nbsp;
    <v-btn @click="logout" color="#BDBDBD">로그아웃</v-btn>
    <div v-if="isLogined">WELCOME😀</div>
    <div v-else>로그인해주세요😀 </div>

    <br>
    <h3>상품 목록 조회</h3>
    <ul>
        <!-- v-for에서는 반드시 key값 지정. key값을 지정함으로서 각 요소마다의 고유식별 -->
        <li v-for="product in products" :key="product.id">&nbsp;&nbsp;&nbsp;&nbsp;{{ product.name }}</li>
    </ul>
  </template>
  
  <script>
  export default {
    data() {
        return{
            isLogined:false,
            products:[
                {id:1, name:"yeji"},
                {id:2, name:"arorong"},
                {id:3, name:"suguri"}
            ]
        }
    },
    methods: {
        login() {
            this.isLogined=true
        },
        logout() {
            this.isLogined=false
        }
    }
  };
  </script>