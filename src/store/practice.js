function initState() {
    return {
        count:0, // 전역변수 
        message: ""
    }
}

// 상태관리 => 어딘가의 공간에 전역변수를 관리할 것 
const practice = {
    // state : 상태를 의미하는 객체로, initState를 통해 상태 초기화 
    state: initState,
    // mutations는 상태를 변경하기 위한 함수들의 집합
    // mutations는 컴포넌트에서 직접 호출되는게 아니라 -> actions를 통해 호출됨 
    // 이유 ) 여러 mutation을 연속적으로 호출하는 등의 경우가 있을 수 있기 때문
    mutations: {
        increment(state) {
            state.count++; 
        },
        updateMessage(state, newMessage) {
            state.message = newMessage;
        }
    },
    actions: {
        // actions함수를 통해 mutation의 increment 함수 호출
        // 화면 컴포넌트 보면 action의 함수를 호출 
        incrementCount(context) {
            context.commit('increment'); 
        },
        updateMessage(context, newMessage) {
            context.commit('updateMessage', newMessage);
        }

    },
    // 상태(변수)를 get하기 위한 함수들의 집합
    getters: {
        // get 
        getCount: state => state.count,
        getMessage: state => state.message
    }
}

export default practice;