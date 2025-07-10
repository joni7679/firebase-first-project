import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import PhoneLogin from './PhoneLogin';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [loginType, setLoginType] = useState("email");
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.error("Please fill all fields");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem("users", JSON.stringify(user));
            toast.success("Login successful!");
            setTimeout(() => navigate("/dashboard"), 500);
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Invalid email or password");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='flex justify-center items-center h-screen bg-gray-900'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl shadow-lg w-full max-w-md'>

                   
                    <div className='text-center mb-6'>
                        <h1 className='text-white text-2xl font-bold mb-2'>Login</h1>
                        <div className='flex justify-center gap-4 text-sm'>
                            <button
                                onClick={() => setLoginType("email")}
                                className={`px-3 py-1 cursor-pointer rounded ${loginType === 'email' ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'}`}>
                                Email Login
                            </button>
                            <button
                                onClick={() => setLoginType("phone")}
                                className={`px-3 py-1 cursor-pointer rounded ${loginType === 'phone' ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'}`}>
                                Phone Login
                            </button>
                        </div>
                    </div>

                    {/* Animate Form Switch */}
                    <AnimatePresence mode="wait">
                        {loginType === 'email' && (
                            <motion.form
                                key="email"
                                onSubmit={handleLogin}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                                    placeholder='Email'
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                                    placeholder='Password'
                                />
                                <button
                                    type="submit"
                                    className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mb-3'>
                                    Login
                                </button>
                            </motion.form>
                        )}

                        {loginType === 'phone' && (
                            <motion.div
                                key="phone"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <PhoneLogin />
                            </motion.div>
                        )}
                    </AnimatePresence>

               
                    <h2 className='text-white text-center mt-4 text-sm'>
                        Don't have an account?{" "}
                        <Link className='text-yellow-500 font-bold' to={'/signup'}>
                            Signup Now
                        </Link>
                    </h2>
                </div>
            </div>
        </>
    );
}

export default Login;
