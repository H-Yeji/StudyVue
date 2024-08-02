<template>
    <h1>🐈🐈🐈🐈🐈🐈 </h1>
    <v-container>
        <v-row>
            <v-col>
                <v-simple-table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in memberList" :key="member.id">
                            <td>{{ member.id }}</td>
                            <td>{{ member.name }}</td>
                            <td>{{ member.email }}</td>
                        </tr>
                    </tbody>    
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            memberList: [] // 빈배열로 초기화 
        }
    },
    async created() {
        const response = await axios.get('http://localhost:8080/rest/member/list') // basic프로젝트
        this.memberList = response.data.result;
    },
    methods: {

    }
}
</script>