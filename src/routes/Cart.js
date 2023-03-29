//Cart.js
//Redux 5 : 장바구니 기능 만들기 숙제 & 응용문제

import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//경로 수정 (userSlice 추가)
import { changeName, changeAge } from '../store/userSlice.js'

import { addCount, subCart } from '../store.js'

function Cart() {
    
    let state = useSelector((state) => state )

    let dispatch = useDispatch()

    return (
        <div>

            {/* <h6>{state.user.name} {state.user.age}의 장바구니</h6> */}

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    <th>삭제하기</th>
                    </tr>
                </thead>
                
                <tbody>
                    {state.cart.map((a, i)=>    
                        <tr key={i}>
                            <td>{ state.cart[i].id }</td>
                            <td>{ state.cart[i].name }</td>
                            <td>{ state.cart[i].count } </td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(addCount(state.cart[i].id))   
                                }}>+</button>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(subCart(state.cart[i].id)) 
                                }}>-</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Cart
