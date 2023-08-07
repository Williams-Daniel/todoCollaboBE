import express, { Application } from "express"
import env from "dotenv"
import dbConfig from "./Config/DB"
import appConfig from "./app"
env.config()

const port:number = parseInt(process.env.PORT!)

const app:Application = express()

appConfig(app)
const server = 
app.listen(process.env.PORT || port,()=>{
    console.log("Server is coonnected on port: ",port)
    dbConfig()
})

process.on("uncaughtException",(error)=>{
    console.log("server is shutting down because of uncaughtException")
    console.log("uncaughtException error:",error)
    process.exit(1)
})

process.on("unhandledRejection",(reason)=>{
    console.log("This server is shutting down because of unhandledRejection")
    console.log("unhandledRejection reason: ",reason)

    server.close(()=>{
        process.exit(1)
    })
})