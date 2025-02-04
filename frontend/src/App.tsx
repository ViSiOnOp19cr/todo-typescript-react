import {Signup} from './components/pages/signup'
import {Login} from './components/pages/login'
import {Dashboard} from './components/pages/dashboard'
import { Leaderboard } from './components/pages/leaderboard'
import { Groups } from './components/pages/groups'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import './App.css'

function App() {


  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/leaderboard' element={<Leaderboard/>}/>
            <Route path='/groups' element={<Groups/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
