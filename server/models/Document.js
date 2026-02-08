const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    fileName:String,        // stored filename
    originalName:String,    // original uploaded name
    fileUrl:String,
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

module.exports = mongoose.model("Document",documentSchema);
