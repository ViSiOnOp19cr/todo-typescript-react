import './App.css'
import { Signup } from './component/signup'
import { Login } from './component/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {


  return (
    <>
      <div className="flex justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="dashboard" element = {<Signup/>}/>
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
