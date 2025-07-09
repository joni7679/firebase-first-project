import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Dashboard() {
    return (
        <main className="w-full">
            <Header />
            <div className="flex gap-3">
                <Sidebar className="w-[20%]" />
                <div className="w-[80%] bg-gray-900 p-4">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
