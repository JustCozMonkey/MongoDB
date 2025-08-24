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

router.get("/:id", getById, (req, res) => {
    try {
        console.log("User found by id:", req.user)
        res.json(req.user)
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

router.patch("/:id", getById, async (req, res) => {
    try {
        Object.assign(req.user, req.body)
        const updatedUser = await req.user.save();
        res.json(updatedUser);
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})

router.delete("/:id", getById, async (req, res) => {
    try {
        await req.user.deleteOne()
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})

async function getById(req, res, next) {

    try {
        const user = await User.findById(req.params.id)
        if (user == null) {
            res.status(404).send({ message: "User not found" })
        }
        req.user = user
        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }

}




export default router