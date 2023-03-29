//index.js
//장바구니 페이지 만들기 & Redux 1 : Redux Toolkit 설치

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';   //내가 만든 js 파일들은 ./부터
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"; //경로가 없는건 라이브러리라는 뜻

// Provider import
import { Provider } from 'react-redux'

//store.js import
import store from './store';

//react-query import
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  // <Provider> 로 App 감싸기 -> store 렌더링 -> <App /> 컴포넌트와 모든 자식 컴포넌트들은 store.js에 있던 state 전부 사용 가능
  // <QueryClientProvider/>로 <App/> 감싸기
  <QueryClientProvider client = {queryClient}> 
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
