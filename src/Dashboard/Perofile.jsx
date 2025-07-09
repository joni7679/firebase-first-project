import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Profile() {
    const auth = getAuth();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("users");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    useEffect(() => {
        const userData = onAuthStateChanged(auth, (currentUser) => {
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

        return () => userData();
    }, []);

    const veryfi = async (e) => {
        if (auth.currentUser) {
            try {
                let res = await sendEmailVerification(auth.currentUser);
                console.log("res",res);

                toast.success("Verification email sent!. Please check your inbox.");
            } catch (error) {
                console.error("Verification email failed:", error);
                toast.error("Failed to send verification email.");
            }
        } else {
            toast.warn("No user is logged in.");
        }
    };

    return (
        <div className='bg-green-400 w-full max-w-md h-96 rounded-md p-4'>
            <h2 className="text-white text-xl font-bold mb-4">User Profile</h2>

            {user ? (
                <>
                    <p className="text-white mb-2"><span className='font-semibold'>Email:</span> {user.email}</p>
                    <p className="text-white mb-4"><span className='font-semibold'>Email Verified:</span> {user.emailVerified ? 'Yes' : 'No'}</p>

                    {!user.emailVerified && (
                        <button
                            onClick={veryfi}
                            className='bg-blue-700 px-[25px] py-[15px] rounded-md text-white cursor-pointer'>
                            Verify Now Your Email
                        </button>
                    )}
                </>
            ) : (
                <p className="text-white">Loading or not logged in...</p>
            )}
        </div>
    );
}

export default Profile;
