//App.js

import { createContext, useEffect, useState } from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';

import data from './data';
import navList from './navList';

import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import Detail from './routes/Detail';
import Cart from './routes/Cart';

export let Context1 = createContext()

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  },[])  

  let navigate = useNavigate(navList);

  let [movie, setMovie] = useState(data.slice(0,3));
  let [cnt, setCnt] = useState(3);
  let [loading, setLoading] = useState(false);
  let [재고] =useState([10, 11, 12]) 

  let result = useQuery(['작명'], ()=> 
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=> {
      console.log('요청됨')
      return a.data }),
      {staleTime : 2000 } //refetch되는 간격 설정 가능, 2초 안에는 다시 접속해도 재요청하지 않음, 타이머 기능도 이렇게 만들 수 있음, 자동 refetch 끌수도 있음
  
      )

  return (
    <div className="App">


      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>HomeSweetMyHome</Navbar.Brand>
          <Nav className="me-auto">
            {/* 정적 nav : 데이터 생성할 때마다 새로 그려줘야 하는 단점 */}
            <Nav.Link onClick={ () => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={ () => {navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={ () => {navigate('/cart')}}>Cart</Nav.Link>

            {/* nav 동적으로 만들기
            
              {
            navList.map((nav, i)=>{
              return(
                <Nav.Link key={i} onClick={ () => {navigate(nav.to)}}>{nav.title}</Nav.Link>
              )
              })
            } */}
            
          </Nav>

          {/* 서버에서 유저이름 가져와 보여주기 */}
          <Nav className="ms-auto">
              { result.isLoading && '로딩중' } 
              { result.error && '에러남' } 
              { result.data && result.data.name + ' 님, 환영합니다.'}
            {/* 쌩리액트는 state부터 만들었어야 됐겠으나 이거 쓰면 안만들어도 됨 */}
          </Nav>

        </Container>
      </Navbar>

      <Routes>
        <Route path="*" element={<div>404 Error</div>}></Route>
        
        <Route path="/" element={ 
          <>
          <div className="main-bg"></div> 
            <div className="container">
            <Button className="button" variant="outline-secondary" size="sm"
              onClick={() => {
                let copy = [...movie];
                copy.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase ? -1 : 1);
                setMovie(copy)
              }}> 가나다순 
            </Button>

              <div className="row">
                {movie.map((a, i)=> {
                  return(
                    <Product movie = {movie[i]} i={i} key={i} /> 
                  )})
                }
              </div>
            </div>

            {/* { cnt < 3 
            ? <button onClick={()=>{
                setLoading(true);

                axios.get(`https://codingapple1.github.io/shop/data${cnt+1}.json`)
                .then((결과)=>{
                  // console.log(결과.data)
                  // console.log(movie)
                  let copy = [...movie, ...결과.data];  
                  setMovie(copy);
                  setCnt(cnt+1);
                  setTimeout(() => {setLoading(false)}, 500);

                })
                .catch(()=>{
                  setTimeout(() => {setLoading(false)}, 500);
                })
                
              }}>more</button>
            : null
          } */}

          {
            cnt < 6 ?
            <button onClick={()=>{
              setLoading(true);
              
              let copy = [...data.slice(0,6)]
              setMovie(copy)

              setTimeout(() => {setLoading(false)}, 500);

              setCnt(cnt+3)
            }}>more</button> :
            cnt < 9 ?
            <button onClick={()=>{
              setLoading(true);
              
              let copy = [...data.slice(0,9)]
              setMovie(copy)

              setTimeout(() => {setLoading(false)}, 500);

              setCnt(cnt+3)
            }}>more</button>
            : null
          }

          {
            cnt < 9 
            ? <button onClick={()=>{
              setCnt((a) => {
                a = a + 3
                setLoading(true);
                let copy = [...data.slice(0, a)]
                setMovie(copy)

                setTimeout(()=>{setLoading(false)}, 500)
                return a
              })
            }}>more</button>
            : null
          }

          {
            loading == true ? <img src={ process.env.PUBLIC_URL + 'loading-loading-forever.gif' } width="30px"/> : null
          }
          </> 
        } /> 
          
        
        <Route path="/detail/:id" element={ <Detail movie = { movie } /> } />

        {/* cart페이지 / 코드 길어질 예정이므로 컴포넌트 js 따로 생성하여 element에 넣기 */}
        <Route path="/cart" element={<Cart />} />


        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <div>멤버</div> }></Route>
          <Route path="location" element={ <div>위치</div> }></Route>
        </Route>

        <Route path="/event" element={ <Event />}>
          <Route path="one" element={ <div>첫 주문시 사과즙 서비스</div> }></Route>
          <Route path="two" element={ <div>생일 쿠폰 받기</div> }></Route>
        </Route>
      </Routes>

        
    </div>
);
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보 페이지</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Product(props) {
  let navigate = useNavigate()

  return (
    <div className="col-md-4" onClick={()=>{ 
      navigate('/detail/' + props.i ) 
      }}>
        
      {/* <img src={'https://codingapple1.github.io/shop/movie' + (props.i+1) + '.jpg'} width="80%"/> */}
      <img src={props.movie.image} width="60%"/>
      <h4>{ props.movie.title }</h4>
      <p>{ props.movie.content }</p>
      <p>{ props.movie.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } 원 </p>
    </div>
  )

}

export default App;


