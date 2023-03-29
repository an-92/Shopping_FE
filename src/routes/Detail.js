//Detail.js
//localStorage로 만드는 최근 본 상품 기능 2

import React, { useContext, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { cleanup } from "@testing-library/react";

import { addCart } from "../store.js";
import { useDispatch } from "react-redux";

function Detail(props) {

    let dispatch = useDispatch()

    let [show, setShow] = useState(true);
    let [num, setNum] = useState('');
    let [count, setCount] = useState(0)
    let {id} = useParams();
    
    let [탭, 탭변경] = useState(0); 


    useEffect(()=>{

        let output = localStorage.getItem('watched')    //꺼내서
        output = JSON.parse(output)     // object로 바꾼걸 똑같은 변수에 담기
        output.push(number.id)  //꺼낸 array에 자료 추가

        output = new Set(output)    // Set 자료형으로 바꿔서 중복 제거
        output = Array.from(output)

        localStorage.setItem('watched', JSON.stringify(output)) 

        //응용 1. UI 만들기
        // 응용 2. 새로고침 시 초기값으로 돌아감(어레이 비워짐)
        // App.js에 그렇게 코드 짰기 떄문 / App.js의 useEffect에 'watched' 항목이 이미 있으면 setItem() 하지 말아주세요 ~ 라는 코드 if문으로 짜서 버그 해결해보기
        //모든 state를 로컬스토리지에 자동저장 ? 외부 라이브러리 사용하면 가능
        //redux 쓰는 사람 :redux-persist 외부라이브러리 -> 리덕스 스토어 안에 있는 거의 모든 state들을 로컬스토리지에 자동으로 저장해줌
        // 참고 : 리덕스를 스테이트 관리 라이브러리라고 하는데 다른 것도 있음 / jotai, zustand :리덕스와 비슷하고 더 쉬움
    }, [])

    useEffect(()=>{
        let a = setTimeout(()=>{ setShow(false) }, 2000) 
            console.log(2)
            
        return () => {
            console.log(1)
            clearTimeout(a) 
        }
    })

    console.log(num)
    useEffect(()=>{
        !isNaN(Number(num)) || alert('숫자만 입력하세요');
    })
    
    // const number = props.movie.find(num => num.id == id);
    const number = props.movie.find(function(num){
        return num.id == id}); 
    
    //숙제 : Detail 페이지 로드 시 투명도 0 -> 1
    let [fade, setFade] = useState('')
        useEffect (()=> {
            setTimeout(()=>{setFade('end')}, 100)
            return ()=>{
                setFade('')
            }
        },[id])

    return (
        // <div className="container">
        <div className={'container start ' + fade }>
            {/* <input onChange={(e)=>{setNum(e.target.value)}} />
            <button onClick={()=>{ setCount(count+1) }}>버튼</button> */}

            {
                show ?
                <div className="alert alert-warnig">
                    2초 이내 구매 시 할인
                </div> 
                : null
            }


            <div className="row">
                <div className="col-md-6">
                    <img src={ '../' + number.image } width="100%" />
                    
                </div>

                <div className="col-md-6">
                    <h4 className="pt-5">{number.title}</h4>
                    <p>{number.content}</p>
                    <p>{number.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
                    {/* <p>{number.price.toLocaleString()} 원</p> */}
                    <button className="btn btn-danger" 
                    onClick={()=>{
                        dispatch(addCart({id : number.id , name : number.title , count : 1 })) 
                    }}>주문하기</button> 
                </div>
            </div>

            {/* 1. html css 디자인 */}
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0" >버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1" >버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2" >버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent 탭 = {탭} />
        </div> 
        )
}


function TabContent({탭}) {
    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{setFade('end')}, 100)  
        return () => { 
            setFade('') 
        }
    }, [탭])
    

    return (
        
        <div className={`start ${fade}`}> 
            { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
        </div>  
    )
}

export default Detail;