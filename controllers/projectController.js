//import model
const projects= require('../Model/projectSchema')

exports.addproject=async(req,res)=>{
    console.log('inside project add controller');
    const userId= req.payload
    console.log(userId);
    
    const projectImage= req.file.filename
    console.log(projectImage);

    const {title,language,github,website,overview}= req.body
    console.log(`${title},${language},${github},${website},${overview},${projectImage},${userId}`);
    
    try{
        const ExistingProject= await projects.findOne({github})
        if(ExistingProject){
            res.status(406).json('Project already Exist...please upload a new project')
        }
        else{
            const newProject= new projects({
                title,language,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }
    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
    
}
//home project

exports.gethomeProject=async(req,res)=>{
    try{
        const homeProject= await projects.find().limit(3)
    res.status(200).json(homeProject)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//all project
exports.getallProject= async(req,res)=>{
    const search= req.query.search
    console.log(search);
    const query={
        language:{
                    //regular expression, options:'i' - it removes the case sensitivity

            $regex:search,$options:'i'
        }
   
    }
    try{
        const allProject= await projects.find(query)
        res.status(200).json(allProject)
    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }
}

//user project
exports.getUserProjects= async(req,res)=>{
    const userId= req.payload.userId
    try{
        const userProject= await projects.find({userId})
        res.status(200).json(userProject)
    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//edit project
exports.editUserProject= async(req,res)=>{
    const {id}= req.params
    const userId= req.payload
    const {title, language, github, website, overview, projectImage}= req.body
    const uploadedProjectImage= req.file?req.file.filename:projectImage
    
    try{
        const updateProject = await projects.findByIdAndUpdate
        ({_id:id},{title,language,github,website,overview,projectImage:uploadedProjectImage,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)

    }
    catch(err){
        res.status(401).json(err)
    }
}

//delete project
exports.deleteProject= async(req,res)=>{
const {id}= req.params
try{
const removeProject= await projects.findByIdAndDelete
({_id:id})
res.status(200).json(removeProject)
}catch(err){
res.status(401).json(err)
}
}
