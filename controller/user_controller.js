import user_model from "../models/user_model.js";
import bcryptjs from "bcryptjs"

export const getAllUser = async (req, res, next) => {
    const alluser = await user_model.find()
    res.status(200).json({ alluser })
}

export const userSignup = async (req, res, next) => {
    const { name, email, password } = req.body

    let exituser;
    try {
        exituser = await user_model.findOne({ email })
    } catch (error) {
        console.log(`--------------->${error}`);
    }
    if (exituser) {
        return res.status(400).json({ message: "Already haven Account, Go to Login Page" })
    } else {

    }

    const hashPass = bcryptjs.hashSync(password)
    const user = new user_model({ name, email, password: hashPass })

    try {
        user.save();
    } catch (error) {
        console.log(`--------------->${error}`);
    }

    return res.status(200).json({ message: "Register Success" })
}

export const userLogin = async (req, res, next) => {

    const { email, password } = req.body

    let exituser;
    try {
        exituser = await user_model.findOne({ email })
    } catch (error) {
        console.log(`--------------->${error}`);
    }
    if (!exituser) {
        return res.status(400).json({ message: "Please Register and Continue...." })
    } else {

    }
    const ishashPass = bcryptjs.compareSync(password, exituser.password)
    if (ishashPass) {
        return res.status(200).json({ exituser })
    } else {
        return res.status(500).json({ message: "Please check Email or password" })
    }
}

export const getUserById = async (req, res, next) => {
    const UserId = req.params.id
    let user;
    try {
        user = await user_model.findById(UserId)
    } catch (err) {
        return res.status(500).json({ message: `-------------->${err}` })
    }
    res.status(200).json({user})
}