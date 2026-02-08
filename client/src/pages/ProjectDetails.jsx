import {useEffect,useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectDetails(){

 const {id}=useParams();
 const [project,setProject]=useState(null);
 const [documents,setDocuments]=useState([]);

 useEffect(()=>{
   loadData();
 },[id]);

 const loadData = async()=>{
   const proj = await axios.get(
     `http://localhost:5000/api/projects/${id}`,
     {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
   );
   setProject(proj.data);

   const docs = await axios.get(
     `http://localhost:5000/api/documents/${id}`,
     {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
   );
   setDocuments(docs.data);
 };

 const markCompleted = async()=>{
   await axios.put(
     `http://localhost:5000/api/projects/${id}/complete`,
     {},
     {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
   );
   loadData();
 };

 if(!project) return <p className="p-10">Loading...</p>;

 return(
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-10">

     <motion.div
       initial={{opacity:0,y:20}}
       animate={{opacity:1,y:0}}
       className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20"
     >

       <h1 className="text-3xl font-bold mb-4">{project.name}</h1>

       <p className="text-gray-300 mb-4">{project.description}</p>

       <p className="text-indigo-300 mb-4">
         Deadline: {project.deadline?.slice(0,10)}
       </p>

       <p className="mb-6">
         Status: <span className="font-semibold">{project.status}</span>
       </p>

       {project.status !== "completed" && (
         <button
           onClick={markCompleted}
           className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mb-6"
         >
           Mark Completed
         </button>
       )}

       {/* Developers */}
       <h2 className="text-xl font-semibold mb-3">Assigned Developers</h2>
       <ul className="mb-6 space-y-2">
         {project.developers?.map(dev=>(
           <li key={dev._id} className="bg-white/10 p-3 rounded-lg">
             {dev.name} ({dev.email})
           </li>
         ))}
       </ul>

       {/* Documents */}
       <h2 className="text-xl font-semibold mb-3">Project Documents</h2>
       <ul className="space-y-2">
         {documents.length === 0 && (
           <p className="text-gray-400">No documents uploaded</p>
         )}

         {documents.map(doc=>(
           <li key={doc._id}>
             <a
               href={`http://localhost:5000/${doc.fileUrl}`}
               target="_blank"
               rel="noreferrer"
               className="text-indigo-300 underline"
             >
               {doc.originalName || doc.fileName}
             </a>
           </li>
         ))}
       </ul>

     </motion.div>

   </div>
 );
}
