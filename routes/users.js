import express from "express"
import User from "../User.js"
const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const fiters = req.query
        const users = await User.find(fiters)
        console.log("Users found:", users)
        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})


export default router