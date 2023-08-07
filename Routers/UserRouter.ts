import express from "express"
import { deleteUser, findUser, findUsers, registerUser, signIn, updateUser } from "../Controller/AuthController"
import upload from "../Config/multer"


const router = express.Router()

router.route("/register").post(upload,registerUser)
router.route("/signin").post(signIn)
router.route("/:userID/find-one-user").get(findUser)
router.route("/findusers").get(findUsers)
router.route("/:userID/update-user").patch(updateUser)
router.route("/:userID/delete-user").delete(deleteUser)

export default router