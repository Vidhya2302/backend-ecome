import express from "express";
import { saveUserDetails, getUserProfile,updateUserProfile } from '../controlers/userss.js'
import  {isAuth} from "../middleware/isAuth.js";

const router = express.Router();

router.post("/saveuser", saveUserDetails); 
router.get("/profile/details", isAuth, getUserProfile); 
router.put("/profile", isAuth, updateUserProfile); 

export default router;