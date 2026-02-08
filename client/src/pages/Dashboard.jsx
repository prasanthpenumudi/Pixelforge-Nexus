import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard(){

 const [stats,setStats] = useState({
   total:0,
   active:0,
   completed:0
 });

 const role = localStorage.getItem("role");   // RBAC role

 useEffect(()=>{
   axios.get("http://localhost:5000/api/projects/stats",{
     headers:{
       Authorization:`Bearer ${localStorage.getItem("token")}`
     }
   }).then(res=>setStats(res.data));
 },[]);

 return(
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-10">

     <motion.h1
       initial={{opacity:0,y:-20}}
       animate={{opacity:1,y:0}}
       className="text-3xl font-bold mb-8 text-center"
     >
       Dashboard
     </motion.h1>

     <div className="grid grid-cols-3 gap-8 mb-10">

      {[
        {title:"Total Projects", value:stats.total},
        {title:"Active Projects", value:stats.active},
        {title:"Completed", value:stats.completed}
      ].map((item,i)=>(
        <motion.div
          key={i}
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{delay:i*0.1}}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20"
        >
          <h2 className="text-lg text-gray-300">{item.title}</h2>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </motion.div>
      ))}

     </div>

     {/* Navigation Buttons */}
     <div className="flex justify-center gap-6">

        <Link
          to="/home"
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg shadow"
        >
          Home
        </Link>

        {role === "admin" && (
          <Link
            to="/create-project"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg shadow"
          >
            Create Project
          </Link>
        )}

        {(role === "admin" || role === "lead") && (
          <Link
            to="/upload"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg shadow"
          >
            Upload Document
          </Link>
        )}

     </div>

   </div>
 );
}
