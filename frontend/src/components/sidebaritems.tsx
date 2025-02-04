import { Dashboard } from "./pages/dashboard"
import { Leaderboard } from "./pages/leaderboard"
import { Groups } from "./pages/groups"
import { Link } from "react-router-dom"


export const SidebarItems = () =>{
    return (
        <div>
            <ul>
                <li><Link to='/'><div className='m-8 text-xl'>dashboard</div></Link></li>
                <li><Link to='/leaderboard'><div className='m-8 text-xl'>Leaderboard</div></Link></li>
                <li><Link to='/groups'><div className='m-8 text-xl'>Groups</div></Link></li>
            </ul>
        </div>
    )
}
