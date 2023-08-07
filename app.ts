import express, { Application,Request,Response } from "express"
import cors from "cors"
import auth from "./Routers/UserRouter"

const appConfig = (app:Application)=>{
    app
    .use(cors())
    .use(express.json())
    .use("/api",auth)


    .get("/",(req:Request,res:Response)=>{
        try {
            res.status(200).json({

                message:"Connected successfully!"
            })
        } catch (error) {
            console.log(error)
        }
    })
}
export default appConfig