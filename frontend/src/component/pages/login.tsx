import { useRef } from "react"
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from "../../config"
import {Input} from '../ui/input'
import {Button} from '../ui/button'


export const Login = () =>{
    const usernameref = useRef<HTMLInputElement>();
    const passwordref = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const handleLogin = async () =>{
        const username = usernameref.current?.value;
        const password = passwordref.current?.value;
        await axios.post(`${BACKEND_URL}/login`,{
            email:username,
            password
        })
        navigate('/dashboard');
    }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white h-80 w-80 rounded border min-w-48">
            <div className="flex justify-center mt-4"><h1>Login</h1></div>
            <div className="flex justify-center pt-6 p-8"><Input placeholder="username" reference={usernameref}/></div>
            <div className="flex justify-center"><Input placeholder = 'password' reference={passwordref}/></div>
            <div className="flex justify-center pt-8">
                    <Button onClick={handleLogin} varient="secondary" text="Login" size="md"></Button>
                </div>
        </div>
        </div>
    )
}