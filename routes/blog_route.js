import express from "express"
import { addblog, blog, deleteBlog, getBlogById, updateBlog } from "../controller/blog_controller.js"

const blogRoute = express.Router()

blogRoute.get("/", blog)
blogRoute.post("/addblog", addblog)
blogRoute.get("/:id", getBlogById)
blogRoute.put("/update/:id", updateBlog)
blogRoute.delete("/delete/:id", deleteBlog)


export default blogRoute