import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Header() {
    const navigate = useNavigate();
    const [user, setuser] = useState(() => {
        const storedUser = localStorage.getItem("users");
        return storedUser ? JSON.parse(storedUser) : null
    })
    useEffect(() => {
        const auth = getAuth();


    })



    const logOut = () => {
        const auth = getAuth();
        let confirm = window.confirm("Are you sure you want to log out?")
        if (confirm) {
            auth.signOut()
                .then(() => {
                    localStorage.removeItem("users");
                    localStorage.removeItem("token");

                    toast.success("Logged out successfully");
                    setTimeout(() => {
                        navigate(`/`);
                    }, 100);
                })
                .catch((error) => {
                    console.error("Logout Error:", error);
                    toast.error("Logout failed");
                });
        }
    };

    return (
        <>
            <ToastContainer />
            <header className="bg-white w-full shadow-md p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Welcome, {user?.email || "User"}</span>

                    <button onClick={logOut} className="px-[25px] py-[15px] bg-blue-800 text-white rounded-md cursor-pointer">Log Out</button>
                </div>
            </header>

           
        </>
    );
}

export default Header;
