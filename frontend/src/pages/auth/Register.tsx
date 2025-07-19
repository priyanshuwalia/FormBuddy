
import { registerUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import thoughtfulGirl from "../../assets/open-doodles-reading-side.gif" 
import googleIcon from "../../assets/google-color-icon.svg"
const Register = ()=>{
    const [email,setEmail]= useState("");
    const [password, setPassword]= useState("")
    const {login}= useAuth();
    const navigate = useNavigate();
    const [error, setError]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
  const passwordsMatch =  password == confirmPassword;
    const handleSubmit = async (e:FormEvent)=>{
      e.preventDefault();
      
  if (!passwordsMatch) {
    setError("Passwords do not match");
    
  }
      try{
        
        const res=await registerUser(email, password);
        login(res.data.token, res.data.user);
        navigate("/dashboard")
        
  
  return;
}
      catch (err: any) {
        setError(err.response?.data?.error || "Registration failed")
      }

    }
    return (
        
        <div className="flex flex-col md:flex-row  items-center gap-12 font-inter h-screen" >
        
      <div className="flex  w-screen  h-screen ">
        <div className="flex flex-col bg-white  items-center justify-center w-1/2 overflow-hidden">
        <div className="px-2.5 pt-8 font-medium text-6xl h-1/2">That one <span className="bg-gradient-to-r from-[#F5CE9B] to-[#E84C4A] bg-clip-text text-transparent">Stylish</span>  yet <span className="bg-gradient-to-r from-[#D06BD1] to-[#272640] bg-clip-text text-transparent"> Simple </span> Form-builder SaaS you were looking for all this time.</div>
          <img src={thoughtfulGirl} alt="" className="h-2/3" />
        </div>
        <div className="w-1/2 h-full   bg-white p-6 shadow-2xl text-zinc-700 font-bold font-inter backdrop-blur-lg  ">
        <h1 className="text-5xl font-extrabold">Craft intelligent forms</h1>
        
        <h3 className="text-lg text-zinc-500 mt-3 mb-6">Say goodbye to boring forms. Meet FormBuddy, which helps you create forms in the most intuitive manner.</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)} />
          <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
            label="Confirm Password"
            type= "password"
            value= {confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)} />
            {confirmPassword && !passwordsMatch && (
  <p className="text-red-500 text-sm">Passwords do not match</p>
)}
            {error && <p className="text-red-500 text-sm">{error}</p>}
           <button
  disabled={!passwordsMatch || password === "" || confirmPassword === ""}
  className={`w-full text-white p-2 rounded-md transition mt-3 backdrop-blur-lg
    ${(!passwordsMatch || password === "" || confirmPassword === "") 
      ? "bg-gray-400/70 cursor-not-allowed" 
      : "bg-[#0075DE]/80 hover:bg-[#0168C4]"}
  `}
>
  Sign Up
</button>
<div className="flex items-center justify-center">
  <hr className="flex-grow border-t border-gray-300" />
  <span className="mx-4 text-gray-500 text-sm">or</span>
  <hr className="flex-grow border-t border-gray-300" />
  
</div>
<button
  type="button"
  className="w-full border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
>
  <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
  Continue with Google
</button>
            <div className="mt-0.5">
              <div className="text-sm text-gray-500">
                Already have an account?
                <Link to="/login" className="underline text-gray-700 hover:text-blue-800"> Log in</Link>
              </div>
             
            </div>
        </form>
        </div>
        
      </div>
        </div>
       
    )

}
export default Register