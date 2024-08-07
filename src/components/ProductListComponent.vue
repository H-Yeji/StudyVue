<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <!-- 검색  -->
                <v-form @submit.prevent="searchProducts"> 
                    <v-row>
                        <v-col cols="auto">
                            <v-select
                             v-model="searchType"
                             :items="searchOptions"
                             item-title="text"
                             item-value="value"
                            >                            
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                             v-model="searchValue"
                             label="Search"                           
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn type="submit">검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto" v-if="!isAdmin">
                 <v-btn color="secondary" class="mr-2">장바구니</v-btn>
                 <v-btn @click="createOrder" color="secondary">주문하기</v-btn>
            </v-col>

            <v-col cols="auto" v-if="isAdmin">
                <v-btn href='/product/create' color="success">상품등록</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h6 text-center">{{ pageTitle }} </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품 사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고 수량</th>
                                    <th v-if="!isAdmin">주문 수량</th>
                                    <th v-if="!isAdmin" class="text-center">주문 선택</th>
                                    <th v-if="isAdmin">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList" :key="p.id">
                                    <td>
                                        <v-img :src="p.imagePath" style="height:100px; width:auto"></v-img>
                                    </td>
                                    <td>{{ p.name }}</td>
                                    <td>{{p.price}}</td>
                                    <td>{{p.stockQuantity}}</td>
                                    <td v-if="!isAdmin">
                                        <v-text-field
                                            v-model.number="p.quantity"
                                            type="number"
                                            style="width:70px"
                                        >
                                        </v-text-field>
                                    </td>
                                    <!-- 주문선택 select box로 받음 -->
                                    <td v-if="!isAdmin" class="text-center">
                                        <input 
                                            type="checkbox"
                                            v-model="selected[p.id]"
                                        >
                                    </td>
                                    <td v-if="isAdmin">
                                        <v-btn color="secondary" @click="deleteProduct(p.id)">삭제</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    props: ['isAdmin', 'pageTitle'],
    data() {
        return {
            searchType: 'optional',
            searchOptions: [
                {text:"선택", value:'optional'},
                {text:"상품명", value:'name'},
                {text:"카테고리", value:'category'}
            ],
            searchValue: "",
            productList: [],
            pageSize: 5, // page 사이즈 5개
            currentPage: 0, // 0페이지 시작 
            isLastPage: false,
            isLoading: false, // 로딩 되고 있는 동안은 스크롤 동작하지 않도록
            // selected 예시 (객체)
            // true/false : 선택 여부 
            // 객체 형태 : {1:true, 2:false, 3:false, 4:true} 이런식으로 담기게 됨 
            selected: {}
        }
    },
    created() { // 화면 열림과 동시에 목록이 불러와야 하니까 create
        this.loadProduct();
        // scroll이 움직였을 때 해당 메서드가 실행되게 하겠다
        window.addEventListener('scroll', this.scrollPagination);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollPagination); // 제거해줘야 스크롤이 쌓이지 않음 (제거 안하면 느려지는 이슈 발생할 수 있음)
    },
    methods: {
        searchProducts() {
            console.log(this.searchType);
            console.log(this.searchValue);
            // 리스트 초기화 및 page 초기화 
            this.productList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.isLoading = false;
            // 초기화 시키고 목록 조회 
            this.loadProduct();
        },
        deleteProduct(productId) {
            console.log(productId)
        },
        async loadProduct() {
            try {
                // pageable 객체에 맞기 파라미터 형식으로 데이터를 전송해줘야 함
                // 방법1 ) {params:{page:10, size:2}}와 같은 형식을 전송시 -> parameter 형식으로 변환돼서 서버로 전송
                // => 포스트맨에서 쿼리 파라미터로 ?size=3&page=0
                // 방법2 ) FormData 객체 생성해 서버로 데이터 전송 
                // => 포스트맨에서 body > form-data에 추가 
                if (this.isLoading || this.isLastPage) return;
                this.isLoading = true; // 이거때문에 다섯개 나옴(시작할 때 다섯개) -> 아래서 화면 끝나면 false로 

                let params = { // 쿼리 파라미터 (방법1) params 사용 
                    size: this.pageSize,
                    page: this.currentPage
                }

                // 검색 추가 
                // params = {size:5, page:0, name:"apple"} 또는 {size:5, page:0, category:"fruits"}
                if (this.searchType === 'name') {
                    params.searchName = this.searchValue; // dto랑 같아야함 (searchName)
                } else if(this.searchType === 'category') {
                    params.category = this.searchValue;
                }
                console.log(params)

                // localhost:8080/prduct/list?category=fruites&size=5&page=0 이런식으로 나감 
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params})
                // 아래 map을 활용 => entity에 quantity=0을 새로 추가한거랑 같은 것
                // 주문 수량에 처음에 0으로 깔림 -> 화면에서 주문 수량을 늘리면 productList에 있는 p가 바뀜 
                const additionalData = response.data.result.content.map(p => ({...p, quantity:0})); 
                this.productList = [...this.productList, ...additionalData]; // 두 데이터를 합치는 코드 

                // (1) 
                if (additionalData.length==0) {
                    this.isLastPage=true;
                    return;
                }

                //(2) 
                // this.isLastPage = response.data.result.last;

                // 위 코드를 쓰지 않으면 스크롤했을 때 이전 화면 데이터가 사라짐 
                this.currentPage++;
                this.isLoading = false; // 여기서 false로 바꾸면 로딩 끝 -> 추가됨 
                
                console.log(response.data);
            } catch(e) {
                console.log(e);
            }
        },
        scrollPagination() {
            // alert("scroll동작");
            // "현재 화면 + 스크롤로 이동한 화면 > 전체화면-n"의 조건이 성립되면 추가 데이터 로드
            // n : 어디까지 스크롤을 내렸을 때 화면을 로드할건지 
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if (isBottom && !this.isLastPage && !this.isLoading) {
                this.loadProduct();
            }
        },
        async createOrder() { // 주문하기 버튼 클릭 후 호출
            // 객체에서 key값 뽑아내고 그 중 true인 key만 뽑아냄 
            console.log(this.selected)
            const orderProducts = Object.keys(this.selected) 
                                        .filter(key=>this.selected[key])
                                        .map(key=>{
                                            const product = this.productList.find(p=>p.id==key)
                                            return {productId:product.id, productCnt:product.quantity};
                                        });
            console.log(orderProducts);
            if (orderProducts.length < 1) {
                alert("주문대상 물건이 없습니다.");
                return;
            }
            // 몇개 주문할거임 ?
            const yesOrNo = confirm(`${orderProducts.length}개 주문할거?`);
            if (!yesOrNo) {
                console.log("주문 취소됨");
                return;
            }

            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderProducts);
                alert('성 공 두 둥')
                window.location.reload();
            } catch(e) {
                console.log(e);
                alert('주문 실패임')
            } 
        }   
    }
}
</script>

<style>
</style>