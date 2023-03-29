//store.js
//Redux 5 : 장바구니 기능 만들기 숙제 & 응용문제

import { configureStore, createSlice } from '@reduxjs/toolkit'

import user from './store/userSlice.js'

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})


let cart = createSlice({
    name : 'cart',
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ] ,
    reducers : {
        addCount( state, action ) {
            let 번호 = state.findIndex((a)=> a.id === action.payload )
            state[번호].count ++
        },
        addCart( state, action ) {
            //응용2. 중복상품은 추가 X, count만 1 증가
            let 번호3 = state.findIndex((c)=> c.id === action.payload.id )
            console.log(번호3)
            if( 번호3 > -1 ) {
                state[번호3].count ++
            } else {
                state.push(action.payload)
            }
        },
        //응용1. 장바구니 항목 삭제 기능
        subCart( state, action ) {
            let 번호2 = state.findIndex((b)=> b.id === action.payload )
            console.log(번호2)
            state.splice(번호2, 1)  //splice(index, 삭제할 갯수)
        }
    }
})

export let { addCount, addCart, subCart } = cart.actions

export default configureStore({
    reducer: { 
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
}) 

//결론
//지금 쓰는건 Redux Toolkit임 Redux최신버전

