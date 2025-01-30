import { Link } from 'react-router-dom';
export const Topbar = () =>{
    return (
        <div className="bg-blue-200">
            <div className="flex justify-between items-center pr-40">
                <div className="m-4"><h1>TODO-For-Coders</h1></div>
                <nav>
                    <ul className="flex space-x-20">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/groups">Groups</Link></li>
                    </ul>
                </nav>
                
            </div>
        </div>
    );
};