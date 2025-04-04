import express from "express"
import mongoose from "mongoose"
import blogRoute from "./routes/blog_route.js"
import userRoute from "./routes/user_routes.js"

const app = express()
const port = 3000 || process.env.PORT
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/blog", blogRoute)
app.use("/user", userRoute)

mongoose.connect("mongodb+srv://abhijeetme:admin@cluster0.dzal4.mongodb.net/blogDB").then(() => app.listen(port)).then(() => console.log("Connected"))

