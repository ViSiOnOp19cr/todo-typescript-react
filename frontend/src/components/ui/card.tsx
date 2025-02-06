
import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

interface TodoCardProps {
    id:string;
    title:string;
    content:string;
    tags:{
        _id: string;
        name: string;
    }[];
    onEdit:(id:string)=>void;
    onDelete:(id:string)=>void;
}


export const TodoCard:React.FC<TodoCardProps> = ({id, title, content, tags, onEdit, onDelete}) =>{
    const handleDelete = async (id:string, onDelete:(id:string)=>void) =>{
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error("Token not found");
          }
          await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
              Authorization: token
            }
          });
          alert("Content deleted");
          onDelete(id);
        } catch (e) {
          alert("Something went wrong");
        }
      };
      const handleEdit = async (id: string, onEdit: (id: string) => void) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }
            onEdit(id); // Correctly trigger the edit function
        } catch (e) {
            alert("Something went wrong");
        }
    };
    return (
        <div className='bg-gray-200 shadow-md rounded-lg p-4 mb-4'>
            <h2 className='text-xl font-bold mb-2'>{title}</h2>
            <p>{content}</p>
            <div className="mb-4">
    <h3 className="text-lg font-semibold">Tags:</h3>
    {tags.map((tag: { _id: string; name: string }) => (
        <span key={tag._id} className="bg-gray-300 px-2 py-1 rounded-lg mr-2">
            {tag.name}
        </span>
    ))}
</div>
            <div className="flex justify-end mt-4">
            <button onClick={() => handleEdit(id, onEdit)} className="bg-yellow-500 text-white p-2 mr-2 rounded">
    Edit
</button>
                <button onClick={()=>{
                    handleDelete(id,onDelete);
                }} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
        </div>
    )
}