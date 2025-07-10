import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, sendEmailVerification, RecaptchaVerifier, getAuth, linkWithPhoneNumber } from 'firebase/auth';
import { auth } from '../Firebase';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function Profile() {
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [usernum, setUserNum] = useState(null);
    const [chking, setIsChecking] = useState(false);

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("users");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    //  Send Phone OTP
    const veriFyNumber = async () => {
        const auth = getAuth();
        if (!auth.currentUser) {
            toast.warn("No user is logged in.");
            return;
        }
        const rawPhone = phone.replace("+91", "").trim();
        const isValidPhone = /^\d{10}$/.test(rawPhone);

        if (!isValidPhone) {
            toast.warn("Please enter a valid 10-digit Indian phone number.");
            return;
        }
        if (auth.currentUser) {
            try {

                window.recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'normal',
                    'callback': (response) => {
                    },
                    'expired-callback': () => {
                    }
                });

                const confirmation = await linkWithPhoneNumber(auth.currentUser, phone, window.recaptcha);
                toast.success("OTP sent successfully!");
                setUserNum(confirmation);
            } catch (error) {
                console.error("Error during phone verification:", error);
                toast.error("Failed to send OTP. Try again.");
            } finally {
                setIsChecking(false);
            }
        }
    };

    // veryfyotp logic here 
    const verifyOtp = async () => {
        if (!otp || !usernum) {
            toast.warn("Please enter OTP.");
            return;
        }

        try {
            const result = await usernum.confirm(otp);
            setIsPhoneVerified(true);
            toast.success("Phone number verified!");
            setOtp("");
            console.log("User signed in:", result.user);
        } catch (error) {
            toast.error("Invalid OTP. Please try again.");
            console.error("OTP verification failed:", error);
        }
    };


    // verify email logic here
    const verifyEmail = async () => {
        if (auth.currentUser) {
            try {
                await sendEmailVerification(auth.currentUser);
                toast.success("Verification email sent! Check your inbox.");
            } catch (error) {
                toast.error("Failed to send verification email.");
                console.error(error);
            }
        } else {
            toast.warn("No user is logged in.");
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userData = {
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid,
                    emailVerified: currentUser.emailVerified,
                };
                setUser(userData);
                localStorage.setItem("users", JSON.stringify(userData));
            } else {
                setUser(null);
                localStorage.removeItem("users");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='bg-green-400 w-full max-w-md rounded-md p-4'>
            <h2 className="text-white text-xl font-bold mb-4">User Profile</h2>

            {user ? (
                <>
                    <p className="text-white mb-2"><span className='font-semibold'>Email:</span> {user.email}</p>
                    <p className="text-white mb-4"><span className='font-semibold'>Email Verified:</span> {user.emailVerified ? 'Yes' : 'No'}</p>

                    {!user.emailVerified && (
                        <button
                            onClick={verifyEmail}
                            className='bg-blue-700 px-[25px] py-[15px] rounded-md text-white cursor-pointer mb-4'>
                            Verify Now Your Email
                        </button>
                    )}

                    {isPhoneVerified ? (
                        <p className="text-white mt-5"><span className='font-semibold'>Number: </span> Verified ✅</p>
                    ) : (
                        <>
                            <PhoneInput
                                country={'in'}
                                className="mt-5"
                                value={phone}
                                onChange={(phone) => setPhone(phone.startsWith('+') ? phone : '+' + phone)}
                            />

                            <div id="recaptcha-container" className='mt-5'></div>

                            <button
                                onClick={veriFyNumber}
                                className='px-[25px] mt-5 py-[15px] bg-blue-800 text-white rounded-md cursor-pointer'
                            >
                                {chking ? (
                                    <div className="border-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                                ) : "Send OTP"}
                            </button>

                            {usernum && (
                                <>
                                    <div className='mt-5'>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className='bg-gray-800 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                            placeholder='Enter Your OTP...'
                                        />
                                    </div>
                                    <button
                                        onClick={verifyOtp}
                                        className='px-[25px] mt-2 py-[15px] bg-blue-800 text-white rounded-md cursor-pointer'
                                    >
                                        Verify OTP
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </>
            ) : (
                <p className="text-white">Loading or not logged in...</p>
            )}
        </div>
    );
}

export default Profile;
