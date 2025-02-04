import {Input} from '../ui/input'
import {Button} from '../ui/button'
import {useRef} from 'react'
import axios from 'axios';
import { API_URL } from '../../config';
export function Login(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const handlelogin = async () =>{
        const username = usernameRef.current?.value;
        const password = usernameRef.current?.value;
        const response = await axios.post(`${API_URL}/login`,{
            email:username,
            password
        })
        console.log(response);
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='p-8 border rounded-lg'>
                <h1 className='text-2xl font-bold text-center'>Login</h1>
                <div><Input placeholder='Username' reference={usernameRef}></Input></div>
                <div><Input placeholder='Password' reference={passwordRef}></Input></div>
                <div className=' m-4 flex justify-center'><Button varient='secondary' size='lg' text='Login' onClick={handlelogin}></Button></div>
            </div>
        </div>
    )
}