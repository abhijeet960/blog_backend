import express from "express";
import { getAllUser, userLogin, userSignup } from "../controller/user_controller.js";

const userRoute = express.Router()

userRoute.post("/signup", userSignup)
userRoute.get("/login", userLogin)
userRoute.get("/", getAllUser)

export default userRoute;