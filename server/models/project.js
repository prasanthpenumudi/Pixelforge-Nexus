const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    deadline:{
        type:Date
    },

    status:{
        type:String,
        enum:["active","completed"],   // ensures only valid values
        default:"active"
    },

    lead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    developers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},{timestamps:true});

module.exports = mongoose.model("Project",projectSchema);
