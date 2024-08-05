<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center custom-title">
                        Login 😀 
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <v-text-field
                                label="이메일"
                                v-model="email"
                                type="email"
                                prepend-icon="mdi-email"
                                required
                                ></v-text-field>
                            <v-text-field
                                label="비밀번호"
                                v-model="password"
                                type="password"
                                prepend-icon="mdi-lock"
                                required
                            ></v-text-field>
                           <v-row>
                            <v-col cols="6">
                                <v-btn color="secondary" block>비밀번호 변경</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn type="submit" color="primary" block>로그인</v-btn>
                            </v-col>
                           </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import {jwtDecode} from 'jwt-decode';
  export default {
    data() {
        return{
            email: "",
            password: "",
            errorMessage: ""
        }
    },
    methods: {
        async doLogin() {
            // login 성공시 token을 console.log로 출력 
            try {
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, loginData);
                // 토큰값 console에 찍기 
                //console.log(response.data.result.token)
                // localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰값 저장
                const token = response.data.result.token;
                const refreshToken = response.data.result.refreshToken;
                const role = jwtDecode(token).role;
                console.log(jwtDecode(token).role);
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('role', role);

                // this.$router.push("/");
                window.location.href="/"; 
            } catch(e) {
                const errorMessage = e.response.data.error_message;
                console.log(e.response.data.error_message)
                alert(errorMessage)

            }
        }

    }
}
  </script>

<style scoped>
.custom-title {
  font-family: "Playfair Display", serif;
}
</style>
