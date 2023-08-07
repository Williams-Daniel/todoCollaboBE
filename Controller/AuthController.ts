import express, {Request,Response} from "express"
import bcrypt from "bcrypt"
import cloudinary from "../Config/cloudinary"
import authModel from "../Models/todoAuth"


export const registerUser = async (req:any,res:Response)=>{
    try {
        
        const{username,email,password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password,salt)
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path)

        const newUser = await authModel.create({
            username,
            email,
            password:hashed,
            avatar:secure_url,
            avatarID:public_id
        })

        res.status(201).json({
            message:"User registered successfully",
            data:newUser
        })
    } catch (error) {
        res.status(400).json({
            message:"Cannot register user",
            data:error.message
        })
    }
}

export const signIn = async (req:Request,res:Response)=>{
    try {
        
        const {email,password} = req.body

        const user = await authModel.findOne({email})
        if(user){
            const checked = await bcrypt.compare(password,user.password)
            if(checked){
                res.status(200).json({
                    message:`welcome back ${user.username}`,
                    data:user._id
                })
            }else{
                res.status(400).json({
                    message:"Incorrect password",
                })
            }
        }else{
            res.status(404).json({
                message:"Cannot find user"
            })
        }
    } catch (error) {
        res.status(400).json({
            message:"cannot sign user in",
            data:error.message
        })
    }
}

export const findUser = async(req:Request,res:Response)=>{
    try {
        const {userID} = req.params
        const oneUser = await authModel.findById(userID)
        res.status(200).json({
            message:"Gotten user",
            data:oneUser?._id
        })
    } catch (error) {
        res.status(400).json({
            message:"cannot get user",
            data:error.message
        })
    }
}
export const findUsers = async(req:Request,res:Response)=>{
    try {
        const allUsers = await authModel.find().sort({updatedAt:-1})
        res.status(200).json({
            message:"Gotten all user",
            data:allUsers
        })
    } catch (error) {
        res.status(400).json({
            message:"cannot get all users",
            data:error.message
        })
    }
}
export const updateUser = async(req:Request,res:Response)=>{
    try {
        const {userID} = req.params
        const {username} = req.body
        const patchUser = await authModel.findByIdAndUpdate(
            userID,
            {username}
            )
        res.status(200).json({
            message:"User updated",
            data:patchUser
        })
    } catch (error) {
        res.status(400).json({
            message:"cannot update user",
            data:error.message
        })
    }
}
export const deleteUser = async(req:Request,res:Response)=>{
    try {
        const {userID} = req.params
        const removeUser = await authModel.findByIdAndDelete(userID)
        res.status(200).json({
            message:"User deleted",
            data:removeUser
        })
    } catch (error) {
        res.status(400).json({
            message:"cannot delete user",
            data:error.message
        })
    }
}