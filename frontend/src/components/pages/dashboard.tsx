import { Sidebar } from "../sidebar"
import {Button} from '../ui/button'
import { TodoCard } from "../ui/card";
import {CreateContent} from '../createcontent'
import {useContent} from '../hooks/useContent'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
interface Todo{
    title:string;
    content:string;
    tags:{
        _id: string;
        name: string;
    }[];
    _id: string;
}
export const Dashboard = () =>{
    
    const [modelOpen, setModelOpen] = useState(false);
    const {content,fetchContent} = useContent();
    const [todos, setTodos] = useState<Todo[]>(content);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    const Navigate = useNavigate();

    useEffect(() => {
            setTodos(content); 
    }, [content]);

    const handleCloseModal = () => {
        setModelOpen(false);

        fetchContent(); // Fetch content again to reload the page
      };
    
    const handleAddContent = () => {

        setModelOpen(true);
    };
    const handleDelete = (id:string)=>{
        setTodos(todos.filter((todo)=>todo._id !== id));

        fetchContent();
    };
    const handleEdit = (id: string) => {
        const todoToEdit = todos.find(todo => todo._id === id);
        
        if (todoToEdit) {
            // Extract tag names as an array of strings
            const tagsAsStrings = todoToEdit.tags.map(tag => tag.name);
            //@ts-ignore
            setSelectedTodo({ ...todoToEdit, tags: tagsAsStrings }); // Pass only tag names as an array of strings
            setModelOpen(true);
        }
    };
    const handleSignUp = () => {
        Navigate("/signup");
      };
    const isLoggedIn = localStorage.getItem("token");
    return(
        <div className="flex">
            <Sidebar />
            <div className="h-screen p-4 flex-1"> {/* Ensure it takes the full available width */}
                <div className="flex justify-between items-center">
                    <div className="ml-4 text-2xl mb-4">My Tasks</div>
                    <CreateContent open={modelOpen} onClose={handleCloseModal} existingTodo={selectedTodo}/>
                    <div className='flex'>
                       {isLoggedIn && <Button varient="secondary" size="lg" text="Create Task" onClick={handleAddContent} />}
                        {!isLoggedIn && (
              <Button varient="secondary" size="lg" text="Sign Up" onClick={handleSignUp} />
            )}
                    </div>
                </div>
                <div>
                    {
                        todos.map(({title,content,tags,_id})=>
                            
                                <TodoCard
                                key={_id}
                                id={_id}
                                title={title}
                                content={content}
                                tags={tags}
                                onEdit={()=>{
                                    handleEdit(_id);
                                }}
                                onDelete={()=>{
                                    handleDelete(_id);
                                }}
                                
                                />
                        
                        )
                    }
                </div>
                
            </div>
        </div>
    )
}