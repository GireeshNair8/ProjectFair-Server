//logic to resolve the request
//import model
const users= require('../Model/userSchema')

//import jwt
const jwt= require('jsonwebtoken')

//register request

exports.register= async(req, res)=>{
    console.log('inside the controller - register function');

    //extract data from request body- Already json format is converted into a javascript object by json() in index.js file so that we can directly destructure the key from the req body
    const {username,email,password}=req.body
   try{const existUser= await users.findOne({email})
   if(existUser){
    //if document is present
    res.status(406).json('Account Already Exist.....Please login')
   }
   else{
    //need to register
    //1)create an object for the model
    const newUser= new users({
      username,
      email,
      password,
      github:"",
      linkedin:"",
      profile:""
    })
    //add to mongodb- use save method in mongoose
    await newUser.save()

     //response
     res.status(200).json(newUser)}
   }//runtime errors are resolved using try-catch block 
    catch(err){
    res.status(401).json(`Registration failed due to ${err}`)
   }
}

//login request

exports.login= async(req,res)=>{
   const{email,password}= req.body
   try{const existingUser=await users.findOne({email,password})
   console.log(existingUser);
   if(existingUser){
    //jwt
    //sign method is used to create token- it expects two argumens
    //payload- information that is secretly transmitted
    //secretorprivate key- key based on which the token is generated
    const token= jwt.sign({userId:existingUser._id}, "supersecretkey12345")
    //sending as object because there are more than one data to send
    res.status(200).json({
      existingUser, token
    })
   }
   else{
    res.status(404).json('Invalid Email Id or password')
   }
    }  catch(err){
    res.status(401).json(`login request failed due to: ${err}`);
  }
  }
//edit profile
exports.editUser= async(req,res)=>{
  const userId= req.payload
  const{username,email,password,github,linkedin,profile}= req.body
  const profileImage= req.file?req.file.filename:profile
  try{
    const updateUser= await users.findByIdAndUpdate(
      {_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true}
    )
 await updateUser.save()
 res.status(200).json(updateUser)
  }catch(err){
    res.status(401).json(err)
  }

}