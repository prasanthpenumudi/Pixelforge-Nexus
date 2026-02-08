import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home(){

 const [projects,setProjects]=useState([]);
 const role = localStorage.getItem("role");

 useEffect(()=>{
   axios.get("http://localhost:5000/api/projects",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
   }).then(res=>setProjects(res.data));
 },[]);

 const mainTitle =
   projects.length > 0 ? projects[0].name : "Projects Overview";

 return(
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">

     {/* Header */}
     <div className="p-10 text-center">
       <motion.h1
         initial={{opacity:0,y:-30}}
         animate={{opacity:1,y:0}}
         className="text-4xl font-bold"
       >
         {mainTitle}
       </motion.h1>

       <p className="text-gray-300 mt-2">
         Project Management Dashboard
       </p>

       {/* Navigation Buttons */}
       <div className="flex justify-center gap-4 mt-6 flex-wrap">

         <Link
           to="/dashboard"
           className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg shadow"
         >
           Dashboard
         </Link>

         <Link
           to="/projects"
           className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg shadow"
         >
           View Projects
         </Link>

         {role==="admin" && (
           <Link
             to="/create-project"
             className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow"
           >
             Create Project
           </Link>
         )}

         {(role==="admin" || role==="lead") && (
           <Link
             to="/assign"
             className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-lg shadow"
           >
             Assign Developers
           </Link>
         )}

         {(role==="admin" || role==="lead") && (
           <Link
             to="/upload"
             className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg shadow"
           >
             Upload Document
           </Link>
         )}

       </div>
     </div>

     {/* Project Cards */}
     <div className="grid grid-cols-3 gap-8 px-10 pb-10">
       {projects.map((p,i)=>(
         <motion.div
           key={p._id}
           initial={{opacity:0,y:30}}
           animate={{opacity:1,y:0}}
           transition={{delay:i*0.1}}
           whileHover={{scale:1.05}}
           className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
         >
           <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
           <p className="text-gray-300">{p.description}</p>

           <p className="text-sm mt-3 text-indigo-300">
             Deadline: {p.deadline?.slice(0,10)}
           </p>
         </motion.div>
       ))}
     </div>

   </div>
 );
}
