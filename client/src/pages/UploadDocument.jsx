import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function UploadDocument(){

 const [file,setFile]=useState(null);
 const [projects,setProjects]=useState([]);
 const [projectId,setProjectId]=useState("");

 useEffect(()=>{
   const fetchProjects = async()=>{
     const res = await axios.get(
       "http://localhost:5000/api/projects",
       {
         headers:{
           Authorization:`Bearer ${localStorage.getItem("token")}`
         }
       }
     );
     setProjects(res.data);
   };

   fetchProjects();
 },[]);

 const upload = async()=>{
   try{
     const formData = new FormData();
     formData.append("file",file);
     formData.append("projectId",projectId);

     await axios.post(
       "http://localhost:5000/api/documents/upload",
       formData,
       {
         headers:{
           Authorization:`Bearer ${localStorage.getItem("token")}`
         }
       }
     );

     toast.success("Document uploaded successfully");
   }catch(err){
     toast.error("Upload failed");
   }
 };

 return(
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">

     <motion.div
       initial={{opacity:0, y:40}}
       animate={{opacity:1, y:0}}
       className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/20 w-[420px]"
     >

       <h2 className="text-2xl font-bold text-center mb-6">
         Upload Project Document
       </h2>

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

       <input
         type="file"
         className="w-full mb-6"
         onChange={(e)=>setFile(e.target.files[0])}
       />

       <motion.button
         whileHover={{scale:1.05}}
         whileTap={{scale:0.95}}
         onClick={upload}
         className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg shadow"
       >
         Upload Document
       </motion.button>

     </motion.div>

   </div>
 );
}
