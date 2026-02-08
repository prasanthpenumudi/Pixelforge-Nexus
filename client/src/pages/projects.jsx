import { useEffect,useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function Projects(){

 const [projects,setProjects]=useState([]);

 useEffect(()=>{
   axios.get("http://localhost:5000/api/projects",{
     headers:{
       Authorization:`Bearer ${localStorage.getItem("token")}`
     }
   }).then(res=>setProjects(res.data));
 },[]);

 return(
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-10">

     <motion.h1
       initial={{opacity:0,y:-20}}
       animate={{opacity:1,y:0}}
       className="text-3xl font-bold mb-8 text-center"
     >
       View Projects
     </motion.h1>

     <motion.div
       initial={{opacity:0,y:30}}
       animate={{opacity:1,y:0}}
       className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
     >
       <table className="w-full text-left">
         <thead className="bg-indigo-700 text-white">
           <tr>
             <th className="p-4">Name</th>
             <th className="p-4">Description</th>
             <th className="p-4">Deadline</th>
           </tr>
         </thead>

         <tbody>
           {projects.map((p,i)=>(
             <motion.tr
               key={p._id}
               whileHover={{scale:1.01}}
               className="border-b border-white/20 hover:bg-white/10 transition"
             >
               <td className="p-4">{p.name}</td>
               <td className="p-4">{p.description}</td>
               <td className="p-4">{p.deadline?.slice(0,10)}</td>
               <td className="p-4">
                 <Link
                   to={`/projects/${p._id}`}
                   className="text-indigo-600 font-semibold"
                 > View
                 </Link>
               </td>

             </motion.tr>
           ))}
         </tbody>
       </table>
     </motion.div>

   </div>
 );
}
