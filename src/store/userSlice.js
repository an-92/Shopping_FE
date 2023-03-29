//userSlice.js
//Redux 4 : state가 object/array일 경우 변경하는 법 - 파일 분할

import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({  
    name : 'user',  
    initialState : {name : 'kim', age : 20 },
    reducers : {
        changeName( state ) { 
            state.name = 'park'
        },
        changeAge( state, a ) {
            state.age += a.payload  
        }

    }
})

export let { changeName, changeAge } = user.actions

export default user