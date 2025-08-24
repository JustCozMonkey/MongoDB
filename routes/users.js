import express from "express"
import User from "../User.js"
const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const filters = req.query
        const users = await User.find(filters)
        console.log("Users found:", users)
        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})

router.get("/:id", async (req, res) => {
    try {

        const id = req.params.id
        const user = await User.findById(id)
        console.log("User found:", user)
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})

router.post("/", async (req, res) => {
    try {


        const user = await User.insertOne(req.body)
        console.log("User inserted:", user)
        res.status(201).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})






export default router