<template>
    <v-app-bar app color="#B0BEC5">
        네비게이션바임 ㅋ 
    </v-app-bar>

    <!-- v-container, v-row, v-col -->
     <v-container>
        <v-row>
            <v-col cols="8">
                helloworld1 
            </v-col>
            <v-col cols="4">
                helloworld2 
            </v-col>
        </v-row>
        <br><br>
        <v-row>
            <!-- v-card -->
             <v-card>
                <!-- card-title(제목), card-text(내용) -->
                 <v-card-title>
                    안내문구
                 </v-card-title>
                 <v-card-text>
                    안내안내안내안내안내안내안내안내안내안내안내안내안내안내안내안내안내안내안내안내
                 </v-card-text>
             </v-card>
        </v-row>
        <br><br>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>yeji</td>
                        <td>yeji@test.com</td>
                    </tr>
                    <tr>
                        <td>arorong</td>
                        <td>arorong@tset.com</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
     </v-container>
     <br>
     <v-card>
        <v-card-title>회원가입</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    label="email"
                    type="email"
                >
                </v-text-field>
                <v-text-field
                    label="name"
                    type="text"
                >
                </v-text-field>
                <v-text-field
                    label="password"
                    type="password"
                >
                </v-text-field>
                <v-btn color="secondary">제출하기</v-btn>
            </v-form>
        </v-card-text>           
     </v-card>
    <br>
     <v-btn @click.stop="cancel()" color="#FFE0B2">취소버튼</v-btn>
     <br><br>
     <!-- 모달창을 위한 v-dialog -->
     <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title>취소할거임?</v-card-title>
            <v-card-actions>
            <v-btn color="primary">확인</v-btn>
            <v-btn color="primary" @click="dialog=false">취소</v-btn>
        </v-card-actions>
        </v-card>
     </v-dialog>

     <v-btn href="/practice/modeling">일반 라우팅</v-btn>
     <v-btn :to="{path: 'practice/modeling'}">SPA라우팅(router 기능활용)</v-btn>
     <v-btn :to="{name: 'ModelingComponent'}">SPA라우팅(name 호출)</v-btn> 
  </template>
  
  <script>
  export default {
    // 변수 설정 : data()함수를 통해 변수 세팅
    data() {
        return {
            dialog:false // false하면 화면에서 안보임
        }
    },
    methods: {
        cancel() {
            this.dialog = true; // this.dialog는 data를 의미, cancel 누르면 true로 바뀜
        }
    }
  };
  </script>