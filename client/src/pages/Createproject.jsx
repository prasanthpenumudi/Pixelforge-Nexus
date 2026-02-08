import {useState} from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CreateProject(){

 const [name,setName]=useState("");
 const [description,setDescription]=useState("");
 const [deadline,setDeadline]=useState("");

 const createProject = async()=>{
    await axios.post(
      "http://localhost:5000/api/projects",
      {name,description,deadline},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("Project Created");
 };

 return(
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">

     <motion.div
       initial={{opacity:0,scale:0.9}}
       animate={{opacity:1,scale:1}}
       className="bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-xl w-[400px] text-white"
     >
       <h2 className="text-2xl font-bold mb-6 text-center">
         Create Project
       </h2>

       <div className="space-y-4">
         <input
           placeholder="Project Name"
           onChange={(e)=>setName(e.target.value)}
           className="w-full p-3 rounded bg-white/20 outline-none"
         />

         <input
           placeholder="Description"
           onChange={(e)=>setDescription(e.target.value)}
           className="w-full p-3 rounded bg-white/20 outline-none"
         />

         <input
           type="date"
           onChange={(e)=>setDeadline(e.target.value)}
           className="w-full p-3 rounded bg-white/20 outline-none"
         />

         <button
           onClick={createProject}
           className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition"
         >
           Create Project
         </button>
       </div>
     </motion.div>

   </div>
 );
}
