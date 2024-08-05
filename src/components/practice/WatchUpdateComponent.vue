<template>
    <h1>✔️ Watch 예제</h1>
    <div>count: {{ count }}</div>
    <v-btn @click="incrementCount">increment count</v-btn>
    <br>
    <br>
    <h1>✔️ Update 예제</h1>
    <!-- 클릭하면 update message -->
    <div>message: {{ message }}</div>
    <v-btn @click="updateMessage">update message</v-btn>
</template>
  
  <script>
  export default {
    data() {
        return {
            count: 0,
            message: "바뀌기 전을 보여줄게? 💡 "
        }
    },
    // 특정 변수값의 변경사항을 인지하는 hook함수
    watch: {
        // 인지하고자 하는 변수값과 일치되는 함수명
        count() {
            alert("count값 변경")
        }
    },
    // dom 객체(=화면)의 변경사항을 인지하는 hook 함수 
    updated() {
        alert("뭐든 변경하면 이거 띄어볼게?")
    },
    methods: {
        incrementCount() {
            this.count ++;
        },
        updateMessage() {
            this.message="이걸로 바꿔볼겜 ??✌🏻✌🏻 ";
        }
    }
  };
  </script>