import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./User.js"
import router from "./routes/users.js"

const app = express()
dotenv.config()

app.use(express.json())

const PORT = process.env.PORT || 7000
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(async () => {
    console.log("connectat")
    app.listen(PORT, () => {
        console.log(`connected to port ${PORT}`)
    })
    const user = await User.insertMany([{ name: "Daniel", age: 24 }, { name: "George", age: 20 }])
    console.log("Users inserați:", user);
}).catch((e) => {
    console.log(e)
})

app.use("/users", router)

