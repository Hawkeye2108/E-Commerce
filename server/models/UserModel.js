const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },
   email:{
    type: String,
    reuired: true,
    unique: true
   },
   password:{
    type: String,
    required: true
   },
   cart:{
    type:Array,
    default:[]
   }
})

// static signup method
// we use a regular function instead of a arrow function because in arrow function we cannot use "this" keyword

UserSchema.statics.signup = async function(name,email,password){

    //validation
    if(!name || !email || !password){
        throw Error("All fields must be filled");
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }

    // is email already exits
    const exists = await this.findOne({email});

    if(exists){
        throw Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({name, email, password: hash});
    
    return user;
}

// static login method
UserSchema.statics.login = async function(email,password){

    //validation
    if(!email || !password){
        throw Error("All fields must be fields")
    }
    // if(!validator.isEmail(email)){
    //     throw Error("Email is not valid")
    // }
    const user = await this.findOne({email});
    if(!user){
        throw Error("Email is not valid")
    }

    // checking password with stored password 
    const exist = await bcrypt.compare(password,user.password);
    if(!exist){
       throw Error("Password is incorrect")
    }

    return user;
}
module.exports = mongoose.model("User",UserSchema);