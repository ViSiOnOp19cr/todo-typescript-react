import {Button} from './ui/button'
import {Input} from './ui/input'
import {useRef} from 'react'
import axios from 'axios';
import { API_URL } from '../config';

import { useEffect } from 'react';
//@ts-ignore
export const CreateContent = ({open , onClose, existingTodo}) =>{

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (existingTodo) {
            if (titleRef.current) titleRef.current.value = existingTodo.title;
            if (contentRef.current) contentRef.current.value = existingTodo.content;
            if (tagsRef.current) tagsRef.current.value = existingTodo.tags.join(", ");
        }
    }, [existingTodo]);


    const handleCreateContent = async () => {
        const title = titleRef.current?.value;
        const content = contentRef.current?.value;
        const tags = tagsRef.current?.value;
        
        if (existingTodo) {
            await axios.put(`${API_URL}/update`, { todoId: existingTodo._id,title, content, tags }, {
                headers: { Authorization: localStorage.getItem("token") },
            });
        } else {

            await axios.post(`${API_URL}/addtodo`, { title, content, tags}, {
                headers: { Authorization: localStorage.getItem("token") },
            });
        }

        onClose();
    };
    return (
        <div>
            {open && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
                    <div className="bg-white p-2 rounded-lg shadow-md w-96">
                        <div className="flex justify-between">
                            <div className='flex justify-center'><h1 className="flex justify-center text-2xl font-bold">{existingTodo ? "Edit Task" : "Create Task"}</h1></div>
                            <button onClick={onClose}>X</button>
                        </div>
                        <div className='flex justify-center'><Input  reference={titleRef} placeholder="Title" /></div>
                        <div className='flex justify-center'><Input reference={contentRef} placeholder="Content" /></div>
                        <div className='flex justify-center'><Input reference={tagsRef} placeholder="Tags (comma-separated)" /></div>
                        <div className='flex justify-center mt-6'><Button text={existingTodo ? "Update Task" : "Create Task"} onClick={handleCreateContent} varient="primary" size="md" /></div>
                    </div>
                </div>
            )}
        </div>
    )
}