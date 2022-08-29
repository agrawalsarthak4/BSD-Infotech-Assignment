// CRUD is an acronym for Create, Read, Update, and Delete records. You can use these 
// four basic methods for viewing, searching, and changing resources in your database

const userModel= require("../models/usermodel")


const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

const isValid=function(value){                                        //All fields are compulsory , that's why we are validating string
    if(typeof value==="undefined" || value===null)return false 
    if(typeof value==="string" && value.trim().length===0)return false 
    return true
}

const isValidNo=function(value){                                     //All fields are compulsory , that's why we are validating Number
    if(typeof value==="undefined" || value===null)return false 
    if(typeof value==="number" && value.trim().length===0)return false 
    return true
}

const isValidRequestBody=function(body){                            // checking the validation of body
    return Object.keys(body).length>0 
}

// Create API 

const createuser= async function (req, res) {
    try {
        let body = req.body
         Age  = currentDate - Dateofbirth            // for writing the current age

        if(!isValidRequestBody(body)){
            return res.status(400).send({status:false,message:"Invalid request parameters please provide user details"})
        }
        const {Name,Dateofbirth,Age,MobileNo,email}=req.body
        if(!isValid(Name)){
            return res.status(400).send({status:false,message:"Name is required"})

        }
        if(!isValid(Dateofbirth)){
            return res.status(400).send({status:false,message:"Dateofbirth is required"})

        }
        if(!isValidNo(Age)){
            return res.status(400).send({status:false,message:"Age is required"})

        }
        if(!isValidNo(MobileNo)){
            return res.status(400).send({status:false,message:"Please provide MobileNo"})

        }
        if(!isValid(email)){
            return res.status(400).send({status:false,message:"Email is required"})

        }
        const user=await userModel.create(body)
        res.status(201).send({status:true,message:"created successfully",data:user})
}
catch (err) {res.status(500).send({ status:false, data: err.message })
}}


// Read API 

const getusers=async function(req,res){
    try{
        const query={isDeleted:false}                    // we will return that user only which are not deleted
        const getQuery=req.query                         // we are gaining access of data from query
        if(isValidRequestBody(getQuery)){
            
            const {Name,Dateofbirth,Age,MobileNo,email}=getQuery 
            if(isValid(Name)){
                query.Name=Name
            }
            if(isValid(Dateofbirth)){
                query.Dateofbirth=Dateofbirth
            }
            if(isValidNo(Age)){
                query.Age=Age
            }
            if(isValidNo(MobileNo)){
                query.MobileNo=MobileNo
            }
            if(isValid(email)){
                query.email=email
            }
        }
            
        const getusers=await userModel.find(query)
        if(getusers.length===0){
            return res.status(404).send({status:false,message:"No users found"})
        }
        return res.status(200).send({status:true,data:getusers})}
    catch(err){
        res.status(500).send({msg:err.message})
    }}


   //Update API

    const updateuser=async function(req,res){
        try{
            const reqbody=req.body 
            let id=req.params.userId                   // we are gaining access of userId from params as to know which user to edit
            if(!isValidObjectId(id)){
                return res.status(400).send({status:false,message:"user id is not valid"})
            }
            let user=await userModel.findOne({_id:id,isDeleted:false})
    
            if(!user){                                          //if no data, found then send error message
                return res.status(404).send({status:false,data:"user not present"})
            }
            if(!isValidRequestBody(reqbody)){
                return res.status(200).send({status:true,message:"user unmodified",data:user})
            }
            const {Name,Dateofbirth,Age,MobileNo,email}=reqbody
            const updatedusers={}
            
            if(isValid(Name)){
                updateduser.Name=req.body.Name
            }
            if(isValid(Dateofbirth)){
                updateduser.Dateofbirth=req.body.Dateofbirth
            }
            if(isValidNo(Age)){
                updateduser.Age=req.body.Age
            }
            
            if(isValidNo(MobileNo)){
                updateduser.MobileNo=req.body.MobileNo
                        }
            if(isValid(email)){
                updateduser.email=req.body.email }

            
            const updateduser=await userModel.findOneAndUpdate({_id:id},updatedusers,{new:true})
            
            res.status(200).send({status:true,data:updateduser}) }
        catch(err){
            res.status(500).send({status:false,msg:err.message})
        }
    }

    //Delete API


    const deleteId=async function(req,res){                             // a user can provide the Id of the user and can delete it 
        try{
            let id=req.params.userId 
            if(!isValidObjectId(id)){
                return res.status(400).send({status:false,message:"user id is not valid"})
            }
           
            let user=await userModel.findOne({_id:id,isDeleted:false})    // we will that user whose isDeleted property will be false
    
            if(!user){ //if no data found then send error message
                return res.status(404).send({status:false,data:"user not present"})
            }
            
            await userModel.findOneAndUpdate({_id:id},{$set:{isDeleted:true}})             // we are onlychanging the status from the DB
            return res.status(200).send({status:true,message:"user deleted succesfully"})
         }
    catch(err){
        res.status(500).send({status:false,data:err.message})
    }}



module.exports.createuser= createuser
module.exports.getusers= getusers
module.exports.updateuser= updateuser
module.exports.deleteId= deleteId
