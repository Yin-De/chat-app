import React from 'react'
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './component/SetAvatar';
import Chatcontainer from './component/Chatcontainer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/avatar' element={<SetAvatar/>}/>
          <Route path='/' element={<Chat/>}/>
          <Route path='/chat' element={<Chatcontainer/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
