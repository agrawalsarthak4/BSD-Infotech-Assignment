// Following will be the input fields
// Name
// Date of birth (Only valid date)
// Age (Will be calculated based on entered date of birth)
// Mobile Number (Valid 10-digit mobile number)
// Email: Valid Email
// (Mobile number and Email id should be unique. All fields are compulsory. 

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema( {                         // we are building a user schema in MongoDB 
    Name: {type:String, required:"Name is required",trim:true},
    Dateofbirth: {type:Number, trim:true, validate:{
        validator:function(v){
            return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(v);               // validation of Dateofbirth
        },
        message:"Please enter a valid date"
    } ,
        Age: {type:Number, required:"Age is required",trim:true},
        MobileNo: {type:Number, required:"MobileNo. is required",trim:true,unique:true, validate:{
            validator:function(v){
                return /^\d{10}$/.test(v);                                                             // validation of MobileNo
            },
            message:"Please enter a valid MobileNo"                       
    },     
     email: {type:String, required:"Email is required",trim:true,lowercase:true, validate:{
        validator:function(v){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);                            // validation of email
        },
        message:"Please enter a valid email"                       
    },                                            
    
    isDeleted: {type:Boolean, default: false},              // is Deleted key is taken as to check if the user is deleted or not
     }
}},  timestamps: true });

module.exports = mongoose.model('User', userSchema) 
