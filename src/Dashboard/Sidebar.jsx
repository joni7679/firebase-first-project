import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-6">
            <Link to={`/dashboard`} className="text-2xl font-bold mb-8">My Dashboard</Link>
            <ul className="space-y-4 mt-5">
                <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer"> <Link to={`/dashboard`}>Home</Link></li>
                <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer"><Link to={`profile`}> Profile</Link>  </li>
                <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">  Settings</li>
            </ul>
        </div>
    );
}

export default Sidebar;
