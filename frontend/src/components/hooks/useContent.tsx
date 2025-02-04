
import {useState, useEffect} from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

export const useContent = () =>{
    const [content, setContent] = useState([]);

    const fetchContent = async () =>{
        try{
            const token = localStorage.getItem('token');
            console
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.get(`${API_URL}/gettodos`,{
                headers:{
                    authorization:token
                }
            });
            
            const todosArray = Array.isArray((response.data as any).todos) ? (response.data as any).todos : [];
            setContent(todosArray);
        }
        catch(err){
            console.log(err);
        };

    };
    useEffect(()=>{
        fetchContent();
    },[]);
    return {content,fetchContent};
}