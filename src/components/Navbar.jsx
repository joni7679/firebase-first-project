import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    let storeuser = JSON.parse(localStorage.getItem("users"))
    return (
        <>
            <nav className='w-full p-6 bg-blue-700 text-white flex items-center justify-between gap-5'>
                <div className="logo">
                    my Logo
                </div>
                <div className='flex items-center gap-3'>

                    {storeuser ? (
                        <Link to={`/dashboard`}>Go To Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}

                 
                </div>
            </nav>

        </>
    )
}

export default Navbar