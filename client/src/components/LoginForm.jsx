import { useState, useEffect } from "react";
import { Package, Mail, Lock } from "lucide-react";
import setDocumentTitle from "../hooks/set-document-title";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ setUser }) {
    setDocumentTitle("Log In | Delivery Hub");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: ""
    });


    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    // Existing handleLogin logic (unchanged)
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                navigate(data.role === "admin" ? "/admin/dashboard" : "/dashboard");
                console.log("Logged in:", data.user);
            } else {
                setErrorMsg(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMsg("Something went wrong. Please check your connection.");
        }
    };

    return ( 
        // 1. Background: Light Gray for subtle contrast against the white card
        <div className="flex justify-center flex-col items-center grow min-h-screen bg-gray-100 p-4">
            
            {/* Main Card: White background with MAXIMUM elevation shadow */}
            <div className="flex items-center gap-8 p-6 bg-white rounded-xl 
                            shadow-3xl shadow-gray-400/70 border border-gray-200 
                            transform transition duration-500 hover:shadow-2xl"> {/* Note: shadow-3xl is a custom/utility class for maximum depth, simulating a very large shadow */}
                
                {/* Branding Section (No change) */}
                <div className="flex items-center flex-col p-10">
                    <Package className="w-16 h-16 text-blue-600 mb-2" />
                    <h1 className="text-3xl font-bold text-gray-800">Delivery Hub</h1>
                </div>
                
                {/* Visual Divider (No change) */}
                <div className="w-px h-64 bg-gray-200"></div>
                
                <div className="px-5 py-8">
                    
                    <h2 className="text-center text-3xl font-extrabold mb-8 text-gray-900">Sign In</h2>
                    
                    <form onSubmit={handleLogin} className="flex flex-col w-64 gap-6">
                        
                        {/* Email Input Field */}
                        <div className="relative flex border-b-2 border-gray-300 focus-within:border-blue-500 transition duration-300">
                            <Mail className="w-6 h-6 mr-2 p-1 text-gray-500 border-r border-gray-300" />
                            <input 
                                required 
                                className='w-full border-0 focus:outline-0 active:bg-none p-1 placeholder:text-gray-400 text-base' 
                                placeholder="Email address" 
                                name="email" 
                                type="email" 
                                onChange={handleChanges}
                            />
                        </div>
                        
                        {/* Password Input Field */}
                        <div className="relative flex border-b-2 border-gray-300 focus-within:border-blue-500 transition duration-300">
                            <Lock className="w-6 h-6 mr-2 p-1 text-gray-500 border-r border-gray-300" />
                            <input 
                                id="password" 
                                required 
                                className='w-full border-0 focus:outline-0 active:bg-none p-1 placeholder:text-gray-400 text-base' 
                                placeholder="Password" 
                                name="password" 
                                type="password" 
                                onChange={handleChanges}
                            />
                        </div>

                        {/* Error Message */}
                        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
                        
                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full mt-4 bg-blue-600 text-white font-semibold py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-md"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link to='/signup' className="text-blue-600 font-semibold hover:text-blue-800 transition duration-200">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;