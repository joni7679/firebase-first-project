import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase'
import { useState } from 'react';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    // singup logic here
    const handleSumit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            return toast.error("Please fill all fields")
        }
        try {
            let user = await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Signup Successful");

            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate(`/`)
            }, 1000)
        } catch (error) {
            console.log(error);
            toast.error("This email Already exits")

        }

    }


    return (
        <>
            <ToastContainer />
            <div className=' flex justify-center items-center h-screen'>
                <form onSubmit={handleSumit} className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input type="email"
                            name='email' value={email} onChange={(e) => setEmail(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <input
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                        />
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                            Signup
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white'>Already have an account ? <Link className=' text-red-500 cursor-pointer font-bold' to={'/login'}>Login Now</Link></h2>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup