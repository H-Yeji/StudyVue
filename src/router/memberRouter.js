import MemberCreate from "@/views/MemberCreate.vue";
import LoginPage from "@/views/LoginPage.vue";
import MemberList from "@/views/MemberList.vue";
import MyPage from "@/views/MyPage.vue";

export const memberRouter = [
    {
        path: '/member/create', // 호출
        name: 'MemberCreate',
        component: MemberCreate
    },
    {
        path: '/login', // 호출
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/member/list', // 호출
        name: 'MemberList',
        component: MemberList
    },
    {
        path: '/mypage', // 호출
        name: 'MyPage',
        component: MyPage
    }
]