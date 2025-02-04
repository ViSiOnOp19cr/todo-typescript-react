
import React from 'react';

interface TodoCardProps {
    title:string;
    content:string;
    tags:string[];
    onEdit:()=>void;
    onDelete:()=>void;

}
export const TodoCard:React.FC<TodoCardProps> = (props:TodoCardProps) =>{
    return (
        <div className='bg-gray-200 shadow-md rounded-lg p-4 mb-4'>
            <h2 className='text-xl font-bold mb-2'>{props.title}</h2>
            <p>{props.content}</p>
            <div className="mb-4">
                <h3 className='text-lg font-semibold'>Tags:</h3>
                {props.tags.map((tag)=><span className='bg-gray-300 px-2 py-1 rounded-lg mr-2'>{tag}</span>)}
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={props.onEdit} className="bg-yellow-500 text-white p-2 mr-2 rounded">Edit</button>
                <button onClick={props.onDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
        </div>
    )
}