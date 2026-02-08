const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authroutes");
const projectRoutes = require("./routes/projectroutes");
const documentRoutes = require("./routes/documentRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/documents", documentRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

app.get("/",(req,res)=>{
   res.send("API Running");
});

app.listen(5000,()=>{
   console.log("Server running");
});
