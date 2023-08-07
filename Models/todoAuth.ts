import mongoose from "mongoose"
import { iAuthData } from "../Config/interface"

const authModel = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        toLowerCase:true
    },
    password:{
        type:String
    },
    avatar:{
        type:String
    },
    avatarID:{
        type:String
    }
},{timestamps:true})

export default mongoose.model<iAuthData>("auths",authModel)