const Document = require("../models/Document");

exports.uploadDocument = async(req,res)=>{
    try{

        const doc = await Document.create({
            projectId:req.body.projectId,
            fileName:req.file.filename,
            originalName:req.file.originalname,
            fileUrl:req.file.path,
            uploadedBy:req.user.id
        });

        res.json(doc);

    }catch(err){
        res.status(500).json(err);
    }
};


exports.getProjectDocuments = async(req,res)=>{
    try{

        const docs = await Document.find({
            projectId:req.params.projectId
        });

        res.json(docs);

    }catch(err){
        res.status(500).json({msg:"Error fetching documents"});
    }
};
