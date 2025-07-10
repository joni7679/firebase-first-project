import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhoneLogin = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [user, setUser] = useState(null);

    //  Setup reCAPTCHA once
    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "normal",
                callback: () => {
                    console.log("reCAPTCHA verified");
                },
            });
        }
    }, []);

    const sendOtp = async () => {
        if (phone.length < 10) {
            toast.warn("📱 Enter a valid phone number");
            return;
        }

        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = `+${phone}`;

        try {
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setUser(confirmation);
            setIsOTPSent(true);
            toast.success(" OTP sent successfully");
        } catch (error) {
            console.error(" OTP send failed", error);
            toast.error(" OTP sending failed. Please try again later.");
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 6) {
            toast.warn("🔢Enter a valid 6-digit OTP");
            return;
        }

        try {
            const result = await user.confirm(otp);
            console.log("User:", result.user);
            toast.success("🎉 OTP verified successfully!");
        } catch (error) {
            console.error(" OTP verification failed", error);
            toast.error(" Incorrect OTP. Please try again.");
        }
    };

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


                <button
                    onClick={sendOtp}
                    className="bg-blue-600 text-white py-2 w-full mt-3 rounded hover:bg-blue-700"
                >
                    Send OTP
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
                        <button
                            onClick={verifyOtp}
                            className="bg-green-600 text-white py-2 w-full mt-2 rounded hover:bg-green-700"
                        >
                            Verify OTP
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
