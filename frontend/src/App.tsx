import './App.css'
import { Signup } from './component/pages/signup'
import { Login } from './component/pages/login'
import {Main} from './component/pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Topbar } from './component/pages/topbar'
import {Footer} from './component/pages/footer'
import { Leaderboard } from './component/pages/leaderboard'
import { Groups } from './component/pages/groups'
function App() {


  return (
    <>
      <div className="">
        <BrowserRouter>
          <Topbar/>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/" element = {<Main/>}/>
            <Route path="/leaderboard" element = {<Leaderboard/>}/>
            <Route path="/groups" element = {<Groups/>}/> 
          </Routes>
          <Footer/>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
