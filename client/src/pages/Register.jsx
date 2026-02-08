import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Register(){

 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [role,setRole]=useState("developer");

 const navigate = useNavigate();

 const register = async()=>{
   try{
     await axios.post("http://localhost:5000/api/auth/register",{
       name,email,password,role
     });

     toast.success("User Registered Successfully");
     navigate("/");
   }catch(err){
     toast.error("Registration failed");
   }
 };

 return(
   <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

     <motion.div
       initial={{opacity:0,y:40}}
       animate={{opacity:1,y:0}}
       className="backdrop-blur-lg bg-white/20 p-10 rounded-2xl shadow-xl w-96 border border-white/30"
     >

       <h2 className="text-3xl font-bold text-white text-center mb-6">
         Register User
       </h2>

       <input
         placeholder="Name"
         className="w-full p-3 mb-3 rounded-lg bg-white/30 text-white outline-none"
         onChange={(e)=>setName(e.target.value)}
       />

       <input
         placeholder="Email"
         className="w-full p-3 mb-3 rounded-lg bg-white/30 text-white outline-none"
         onChange={(e)=>setEmail(e.target.value)}
       />

       <input
         type="password"
         placeholder="Password"
         className="w-full p-3 mb-3 rounded-lg bg-white/30 text-white outline-none"
         onChange={(e)=>setPassword(e.target.value)}
       />

       <select
         className="w-full p-3 mb-6 rounded-lg bg-white/30 text-black"
         onChange={(e)=>setRole(e.target.value)}
       >
         <option value="developer">Developer</option>
         <option value="lead">Lead</option>
         <option value="admin">Admin</option>
       </select>

       <motion.button
         whileHover={{scale:1.05}}
         whileTap={{scale:0.95}}
         onClick={register}
         className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg shadow"
       >
         Register
       </motion.button>

     </motion.div>

   </div>
 );
}
