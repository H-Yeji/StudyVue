<template>
  <!-- 네비게이션바 -->
  <v-app-bar app dark>
    <v-container>
      <!-- 행의 자식 요소들을 모두 중앙정렬  -->
      <v-row align="center">
          <!-- 콜 전체를 왼쪽정 렬되게 해줌 -->
          <v-col class="d-flex justify-start"> 
            <!-- userRole이 udmin이면 보이도록 -->
            <div v-if="userRole === 'ADMIN'">
              <v-btn :to="{path:'/member/list'}">회원관리</v-btn>
              <v-btn :to="{path:'/product/manage'}">상품관리</v-btn>
              <v-btn :to="{path:'/order/list'}">실시간주문</v-btn>
            </div>
          </v-col>
          <v-col class="text-center">
            <v-btn :to="{path:'/'}">java home</v-btn>
          </v-col>
          <!-- 콜 전체를 오른쪽 정렬되게 해줌 -->
           <!-- 각각 로그인 여부로 화면에 보이게 권한설정 -->
          <v-col class="d-flex justify-end">
            <v-btn v-if="isLogin" :to="{path:'/order/cart'}">장바구니({{ getTotalQuantity }})</v-btn>
            <v-btn :to="{path:'/product/list'}">상품목록</v-btn>
            <v-btn v-if="isLogin" :to="{path:'/mypage'}">MyPage</v-btn>
            <v-btn v-if="!isLogin" :to="{path:'/member/create'}">회원가입</v-btn>
            <v-btn v-if="!isLogin" :to="{path:'/login'}">로그인</v-btn>
            <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
          </v-col>
      </v-row>
    </v-container>
  </v-app-bar>    
</template>
  
<script>
import { mapGetters } from 'vuex';
// 서버와 실시간 알림서비스를 위한 의존성 추가 필요 
import {EventSourcePolyfill} from 'event-source-polyfill'

export default {
    data() {
      return {
        userRole: null,
        isLogin: false
      }
    },
    // toke을 꺼내옴 
    created() {
      const token = localStorage.getItem("token");
      if (token) {
        // 토큰이 있으면 정상 
        this.isLogin = true;
        this.userRole = localStorage.getItem("role"); // role 꺼내담기 
      }
      // sse 코드💡💡 
      if (this.userRole === 'ADMIN') {
        let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/subscribe`, 
          {headers: {Authorization: `Bearer ${token}`}}
        );
        sse.addEventListener('connect', (event) => {
          console.log(event)
        }) // connect란 이벤트가 들어오면 실행 (data(object)부분 메세지가 console에 출력)
      }
    },
    computed: {
      ...mapGetters(['getTotalQuantity']) // 위에서 전역변수 getTotalQuantity를 사용하기 위해 가져옴
    },  
    methods: {
      doLogout() {
        // 토큰 지우기 
        localStorage.clear();
        // reload
        window.location.reload();
      }
    }
};
</script>

<style>
.text-center{
  font-family: "Playfair Display", serif;
}
</style>