import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("Please fill all fields");
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("user", user);
            localStorage.setItem("users", JSON.stringify(user));
            toast.success("Login successful!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 10)

        } catch (error) {
            console.error("Login error:", error);
            toast.error("Invalid email or password");
        }
    }

    return (
        <div className='flex justify-center items-center h-screen '>
            <ToastContainer />
            <form onSubmit={handleLogin} className='bg-gray-800 px-10 py-10 rounded-xl shadow-lg'>
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                <div>
                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>

                <button
                    type="submit"
                    className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mb-3'>
                    Login
                </button>
                <h2 className='text-white text-center'>
                    Don't have an account?{" "}
                    <Link className='text-yellow-500 font-bold' to={'/signup'}>
                        Signup Now
                    </Link>
                </h2>
            </form>
        </div>
    );
}

export default Login;
