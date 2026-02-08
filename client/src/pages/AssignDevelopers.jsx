import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AssignDevelopers(){

 const [projects,setProjects]=useState([]);
 const [users,setUsers]=useState([]);
 const [projectId,setProjectId]=useState("");
 const [developers,setDevelopers]=useState([]);

 useEffect(()=>{
   fetchData();
 },[]);

 const fetchData = async()=>{
   try{
     const token = localStorage.getItem("token");

     // fetch projects
     const projectRes = await axios.get(
       "http://localhost:5000/api/projects",
       { headers:{ Authorization:`Bearer ${token}` } }
     );

     // fetch users
     const userRes = await axios.get(
       "http://localhost:5000/api/auth/users",
       { headers:{ Authorization:`Bearer ${token}` } }
     );

     setProjects(projectRes.data);
     setUsers(userRes.data.filter(u=>u.role==="developer"));

   }catch(err){
     console.log(err);
     toast.error("Failed to load projects");
   }
 };

 const assign = async()=>{
   try{
     await axios.put(
       `http://localhost:5000/api/projects/${projectId}/assign`,
       { developers },
       { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` } }
     );

     toast.success("Developers Assigned");
   }catch(err){
     toast.error("Assignment failed");
   }
 };

 return(
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">

     <motion.div
       initial={{opacity:0,y:40}}
       animate={{opacity:1,y:0}}
       className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/20 w-[420px]"
     >

       <h2 className="text-2xl font-bold text-center mb-6">
         Assign Developers
       </h2>

       {/* Project dropdown */}
       <select
         className="w-full p-3 mb-4 rounded-lg bg-white/20 outline-none"
         onChange={(e)=>setProjectId(e.target.value)}
       >
         <option>Select Project</option>

         {projects.map(p=>(
           <option key={p._id} value={p._id} className="text-black">
             {p.name}
           </option>
         ))}
       </select>

       {/* Developer multi-select */}
       <select
         multiple
         className="w-full p-3 mb-6 rounded-lg bg-white/20 outline-none h-32"
         onChange={(e)=>
           setDevelopers(
             Array.from(e.target.selectedOptions, option => option.value)
           )
         }
       >
         {users.map(u=>(
           <option key={u._id} value={u._id} className="text-black">
             {u.name} ({u.email})
           </option>
         ))}
       </select>

       <motion.button
         whileHover={{scale:1.05}}
         whileTap={{scale:0.95}}
         onClick={assign}
         className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg shadow"
       >
         Assign Developers
       </motion.button>

     </motion.div>

   </div>
 );
}
