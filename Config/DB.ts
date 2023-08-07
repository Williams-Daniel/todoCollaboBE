import mongoose from "mongoose"
import env from "dotenv"
env.config()

const dbConfig = ()=>{
    try {
        mongoose.connect(process.env.DB_STRING!).then(()=>{
            console.log("DataBase Connected!")
        })
    } catch (error) {
        console.log(error)
    }
}

export default dbConfig