import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgSpinnerTwo } from "react-icons/cg";

const PhoneLogin = () => {

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    let LoginPhoneNumber = async () => {
        if (phone.length < 10) {
            toast.warn("Enter a valid phone number");
            return;
        }
        console.log(auth, phone);

        setLoading(true);
        const appVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {

            },
            'expired': () => {

            }
        }, auth)
        try {
            const result = await signInWithPhoneNumber(auth, phone, appVerifier)
            setUser(result)
            setIsOTPSent(true);
            setLoading(false);
            toast.success("otp send successfully")
        }
        catch (error) {
            console.error("OTP send error:", error);
            toast.error("Failed to send OTP");
        }
        finally {
            setLoading(false);
        }
    }

    let onOTPVerify = async () => {


    }


    return (
        <>
            <ToastContainer />
            <div className="p-4 max-w-sm w-full  shadow-lg rounded-2xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-center text-white"> Phone OTP Login</h2>


                <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={(phone) => setPhone("+" + phone)}
                    inputStyle={{
                        width: "100%",
                        background: "#1E2939",
                        border: "none"
                    }}
                    className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                />


                <button onClick={LoginPhoneNumber}

                    className="bg-emerald-600 cursor-pointer w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                    {loading && (
                        <CgSpinnerTwo size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Send code via SMS</span>
                </button>

                {/*  OTP Input */}
                {isOTPSent && (
                    <>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="border p-2 mt-3 w-full rounded"
                        />
                        <button onClick={onOTPVerify}

                            className="bg-emerald-600 cursor-pointer w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                        >
                            {loading && (
                                <CgSpinnerTwo size={20} className="mt-1 animate-spin" />
                            )}
                            <span>Verify OTP</span>
                        </button>
                    </>
                )}

                {/*  reCAPTCHA container */}
                <div id="recaptcha-container" className="mt-4"></div>
            </div>
        </>
    );
};

export default PhoneLogin;
