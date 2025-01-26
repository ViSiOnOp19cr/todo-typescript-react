import { useRef } from "react"
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from "../config"
import {Input} from '../component/ui/input'
import {Button} from '../component/ui/button'


export const Signup = () =>{
    const usernameref = useRef<HTMLInputElement>();
    const passwordref = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function handleSignup(){
        const username = usernameref.current?.value;
        const password = passwordref.current?.value;
        await axios.post(`${BACKEND_URL}/signup`,{
            email:username,
            password
        })
        navigate('/login');
    }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white h-80 w-80 rounded border min-w-48">
            <div className="flex justify-center mt-4"><h1>Signup</h1></div>
            <div className="flex justify-center pt-6 p-8"><Input placeholder="username" reference={usernameref}/></div>
            <div className="flex justify-center"><Input placeholder = 'password' reference={passwordref}/></div>
            <div className="flex justify-center pt-8">
                    <Button onClick={handleSignup} varient="secondary" text="Signup" size="md"></Button>
                </div>
        </div>
        </div>
    )
}