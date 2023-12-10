import app from 'express'
import User from '../model/user.js'
import List from '../model/list.js'
const router = app.Router()

router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id)
        if (existingUser) {
            const list = new List({ title, body, user: existingUser })
            await list.save().then(() => res.status(200).json(list))
            existingUser.list.push(list)
            existingUser.save()
        }
        else {
            res.status(404).json({ message: "User not exist" })
        }
    } catch (error) {
        console.log("Error: ", error)
    }
})

router.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id)
        if (existingUser) {
            const list = await List.findByIdAndUpdate(req.params.id, { title, body })
            list.save().then(() => res.status(200).json({ message: "Task updated Successfully" }))
            // existingUser.list.push(list)
            // existingUser.save()
        }
        else {
            res.status(200).json({ message: "Please signup first" })
        }
    } catch (error) {
        console.log("Error: ", error)
    }
})

router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } })
        if (existingUser) {
            const list = await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "Task Deleted" }))
        }
        else {
            res.status(200).json({ message: "User not exist" })
        }
    } catch (error) {
        console.log("Error: ", error)
    }
})

//getTask

router.get('/getTasks/:id', async (req, res) => {
    const list = await List.find({ user: req.params.id }).sort({ _id: 1 })
    if (list.length !== 0) {
        res.status(200).json({ list })
    } else {
        res.status(200).json({ message: "no task" })
    }

})

export default router