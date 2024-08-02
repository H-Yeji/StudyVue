<template>
    <!-- html 요소의 동적 값 표시 -->
    <!-- html 요소 안에 중괄호 2번을 사용해서 script에 정의된 변수값 화면에 표시 -->
     <h1>hello world {{language}}</h1>

    <!-- :value문법 사용하면 단방향 데이터 바인딩 -->
     <input type="text" :value="value1">
    <!-- v-model문법 사용하면 양방향 데이터 바인딩 이거 많이 쓰임 (회원가입같은거 할 때)-->
     <input type="text" v-model="value2"> 
     <button @click="showValue">변수 변경사항 확인</button>
     <br>
     <h1>{{count}}</h1>
     <v-btn @click="increment" color="#FFE0B2">increment</v-btn>

    <br><br>
    <!-- count값의 두배가 되고 싶음 (count값에 의존적인 연산) -->
    <h1>{{doubleCount}}</h1> 

     <br><br>
     <h1><input type="number" v-model="count2"></h1>
     <br>
     <v-btn @click="increment2" color="#FFE0B2">increment2</v-btn>
</template>
  
  <script>
  export default {
    data() {
        return {
            language:"java",
            value1:"java java",
            value2:"java java java",
            count: 0,
            count2: 0
        }
    },
    // computed는 종속된 반응형 데이터가 변경될 때에 함수를 다시 실헹히야 깂을 계산하는 함수
    computed: {
        doubleCount() {
            return this.count * 2;
        }
    },
    methods: {
        showValue() { // 위 버튼 누르면 실행되는 함수 
            alert(this.value2)
        },
        increment() {
            this.count += 1
        },
        increment2() {
            this.count2 += 1
        }

    }
  };
  </script>