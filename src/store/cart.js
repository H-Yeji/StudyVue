function initState() {
    return { // localStorage에 있으면 값세팅, 없으면 0혹은 빈배열 세팅 (초기화 이슈해결)
        // localstorage에 넣을 때 직렬화해서 넣기 
        productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
        totalQuantity: localStorage.getItem('totalQuantity') || 0
    }
}

const practice = {
    state: initState,
    mutations: {
        addCart(state, product) {
            const existProduct = state.productsInCart.find(p => p.id == product.id);
            if (existProduct) { // 장바구니에 이미 담겨있는 제품이면 추가 주문개수 더해주기
                console.log("이미 존재하는 아이템 -> 개수 추가")
                existProduct.quantity += product.quantity; 
            } else { // 없는 제품이면 그냥 추가하기 
                console.log("존재하지 않은 상품임 추가 ㄱㄱ")
                state.productsInCart.push(product); 
            }
            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity; 
            // localStorage에서 꺼낼때 역직렬화해서 꺼내기 
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart)); //갈아끼워
            localStorage.setItem('totalQuantity', state.totalQuantity); 
        
        },
        clearCart(state) {
            state.productsInCart = []; // 초기화시켜서 빈배열로
            state.totalQuantity = 0;
            localStorage.removeItem('productsInCart');
            localStorage.removeItem('totalQuantity');

        }
    },
    actions: {
        addCart(context, product) {
            context.commit('addCart', product);
        },
        clearCart(context) {
            context.commit('clearCart');
        }

    },
    getters: {
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    }
    
}
export default practice;
