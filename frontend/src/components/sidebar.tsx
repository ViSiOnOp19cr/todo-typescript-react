import { SidebarItems } from "./sidebaritems"
import {TodoIcon} from './icons/todo'
export const Sidebar = () =>{
    return (
        <div className="h-screen w-72 bg-gray-200">
            <div className='flex m-4'>
               <div className='text-2xl'>Todo-For-Coders</div>
               <div className='p-1 pl-2'><TodoIcon/></div>
            </div>
            <SidebarItems/>
        </div>
    )
} 