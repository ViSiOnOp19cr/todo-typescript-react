import { Sidebar } from "../sidebar"
import {Button} from '../ui/button'
import { TodoCard } from "../ui/card";
import {CreateContent} from '../createcontent'
import {useContent} from '../hooks/useContent'
import {useState, useEffect} from 'react'
interface Todo{
    _id:string;
    title:string;
    content:string;
    tags:string[];
}
export const Dashboard = () =>{
    
    const [modelOpen, setModelOpen] = useState(false);
    const {content,fetchContent} = useContent();
    const [todos, setTodos] = useState<Todo[]>(content);

    useEffect(() => {
            setTodos(content); 
    }, [content]);
    
    const handleAddContent = () => {
        setModelOpen(true);
    };
    const handleDelete = (id:string)=>{
        setTodos(todos.filter((todo)=>todo._id !== id));
        fetchContent();
      };

    return(
        <div className="flex">
            <Sidebar />
            <div className="h-screen p-4 flex-1"> {/* Ensure it takes the full available width */}
                <div className="flex justify-between items-center">
                    <div className="ml-4 text-2xl mb-4">My Tasks</div>
                    <div>
                        <Button varient="secondary" size="lg" text="Create Task" onClick={handleAddContent} />
                    </div>
                </div>
                <div>
                    {
                        todos.map((todo)=>
                            
                                <TodoCard
                                key={todo._id}
                                title={todo.title}
                                content={todo.content}
                                tags={todo.tags}
                                onEdit={()=>{
                    
                                }}
                                onDelete={()=>{
                                    handleDelete(todo._id);
                                }}
                                />
                        
                        )
                    }
                </div>
                
            </div>
        </div>
    )
}