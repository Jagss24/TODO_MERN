import app from 'express'
import User from '../model/user.js'
import bcryptjs from 'bcryptjs'
const router = app.Router()

//SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const {email, username, password } = req.body
        const hashpassword = bcryptjs.hashSync(password)
        const user = new User({ email, username, password: hashpassword })
        await user.save().then(() => {
            res.status(200).json({ message: "SignUp successfull" })
        })
    } catch (error) {
        res.status(200).json({ message: "User already exist" })
    }
})

//SINGIN
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).json({ message: "Please signup first" })
        }

        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is not correct" })
        }
        const { password, ...others } = user._doc
        return res.status(200).json({ others })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ error })
    }
})

export default router
