import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login(){

 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const navigate = useNavigate();

 const login = async()=>{
   try{
     const res = await axios.post(
       "http://localhost:5000/api/auth/login",
       {email,password}
     );

     // Store token and role
     localStorage.setItem("token",res.data.token);
     localStorage.setItem("role",res.data.role);

     navigate("/home");
   }catch(err){
     alert("Invalid credentials");
   }
 };

 return(
   <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

     <motion.div
       initial={{opacity:0, y:40}}
       animate={{opacity:1, y:0}}
       transition={{duration:0.6}}
       className="backdrop-blur-lg bg-white/20 p-10 rounded-2xl shadow-xl w-96 border border-white/30"
     >

       <h2 className="text-3xl font-bold text-white text-center mb-6">
         PixelForge Nexus
       </h2>

       <input
         className="w-full p-3 mb-4 rounded-lg bg-white/30 text-white placeholder-white outline-none"
         placeholder="Email"
         onChange={(e)=>setEmail(e.target.value)}
       />

       <input
         type="password"
         className="w-full p-3 mb-6 rounded-lg bg-white/30 text-white placeholder-white outline-none"
         placeholder="Password"
         onChange={(e)=>setPassword(e.target.value)}
       />

       <motion.button
         whileHover={{scale:1.05}}
         whileTap={{scale:0.95}}
         onClick={login}
         className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg shadow"
       >
         Login
       </motion.button>

       <p className="text-center mt-4 text-white">
         New user? <a href="/register" className="underline">Register</a>
       </p>


     </motion.div>

   </div>
 );
}
