import { Package, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Note: setDocumentTitle import and call removed to resolve path error

function SignupForm() {
    // Set document title directly since the hook is unavailable
    if (typeof document !== 'undefined') {
        document.title = "Sign Up | Delivery Hub";
    }

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(""); 
    const [successMsg, setSuccessMsg] = useState(""); 

    const [values, setValues] = useState({
        firstname: "",
        lastname: "", 
        email: "",
        password: ""
    })

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            
            if (res.ok) {
                setSuccessMsg("Registration successful! Redirecting to login..."); 
                setTimeout(() => {
                    navigate("/") 
                }, 2000);
            } else {
                setErrorMsg(data.message || "Registration failed. Please try again.");
            }

        } catch (err) {
            console.error(err);
            setErrorMsg("Failed to connect to server. Check your connection.");
        }
    }

    return (
        // Background: Light Gray for subtle contrast
        <div className="flex justify-center flex-col items-center grow min-h-screen bg-gray-100 p-4">
            
            {/* Main Card: White background with MAXIMUM elevation shadow (the "pop") */}
            <div className="flex items-center gap-8 p-6 bg-white rounded-xl 
                            shadow-3xl shadow-gray-400/70 border border-gray-200 
                            transform transition duration-500 hover:shadow-2xl">
                
                {/* Branding Section */}
                <div className="flex items-center flex-col p-10">
                    <Package className="w-16 h-16 text-blue-600 mb-2" />
                    <h1 className="text-3xl font-bold text-gray-800">Delivery Hub</h1>
                </div>
                
                {/* Visual Divider: Increased height for four fields */}
                <div className="w-px h-96 bg-gray-200"></div>
                
                <div className="px-5 py-8">
                    {/* Title */}
                    <h2 className="text-center text-3xl font-extrabold mb-8 text-gray-900">Sign Up</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col w-64 gap-6">
                        
                        {/* First Name Input - Uses User Icon */}
                        <div className="relative flex border-b-2 border-gray-300 focus-within:border-blue-500 transition duration-300">
                            <User className="w-6 h-6 mr-2 p-1 text-gray-500 border-r border-gray-300" />
                            <input required className='w-full border-0 focus:outline-0 active:bg-none p-1 placeholder:text-gray-400 text-base' placeholder="First Name" name="firstname" type="text" onChange={handleChanges}/>
                        </div>
                        
                        {/* Last Name Input - Uses User Icon */}
                        <div className="relative flex border-b-2 border-gray-300 focus-within:border-blue-500 transition duration-300">
                            <User className="w-6 h-6 mr-2 p-1 text-gray-500 border-r border-gray-300" />
                            <input required className='w-full border-0 focus:outline-0 active:bg-none p-1 placeholder:text-gray-400 text-base' placeholder="Last Name" name="lastname" type="text" onChange={handleChanges}/>
                        </div>

                        {/* Email Input */}
                        <div className="relative flex border-b-2 border-gray-300 focus-within:border-blue-500 transition duration-300">
                            <Mail className="w-6 h-6 mr-2 p-1 text-gray-500 border-r border-gray-300" />
                            <input required className='w-full border-0 focus:outline-0 active:bg-none p-1 placeholder:text-gray-400 text-base' placeholder="Email address" name="email" type="email" onChange={handleChanges}/>
                        </div>
                        
                        {/* Password Input */}
                        <div className="relative flex border-b-2 border-gray-300 focus-within:border-blue-500 transition duration-300">
                            <Lock className="w-6 h-6 mr-2 p-1 text-gray-500 border-r border-gray-300" />
                            <input id="password" required className='w-full border-0 focus:outline-0 active:bg-none p-1 placeholder:text-gray-400 text-base' placeholder="Password" name="password" type="password" onChange={handleChanges}/>
                        </div>

                        {/* Success/Error Messages */}
                        {errorMsg && <p className="text-red-500 text-sm mt-1 font-medium">{errorMsg}</p>}
                        {successMsg && <p className="text-green-500 text-sm mt-1 font-medium">{successMsg}</p>}
                        
                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full mt-4 bg-blue-600 text-white font-semibold py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-md"
                            disabled={successMsg} // Disable button on success
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link to='/' className="text-blue-600 font-semibold hover:text-blue-800 transition duration-200">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;