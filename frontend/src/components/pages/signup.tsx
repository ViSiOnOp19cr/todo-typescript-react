import {Input} from '../ui/input'
import {Button} from '../ui/button'
import {useRef} from 'react'
import {API_URL} from '../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const handleSignup = async () =>{
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${API_URL}/signup`,{
            email:username,
            password
        });
        if(response.status === 200){
            navigate('/login');
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='p-8 border rounded-lg'>
                <h1 className='text-2xl font-bold text-center'>Signup</h1>
                <div><Input placeholder='Username' reference={usernameRef}></Input></div>
                <div><Input placeholder='password' reference={passwordRef}></Input></div>
                <div className=' m-4 flex justify-center'><Button varient='secondary' size='lg' text='Signup' onClick={handleSignup}></Button></div>
                <div>Already Signedup? <a className='text-blue-500' href="/login">clickhere</a></div>
            </div>
        </div>
    )
}