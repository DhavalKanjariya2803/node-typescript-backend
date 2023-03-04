import { Router } from "express";
import { getUsers, getUserData, filterUser } from "../controllers/userControllers";

const router = Router();

//  list user data rout 
router.get("/list", getUsers);

// get single user Data API 
router.get("/user/:id", getUserData)

//  filter users data rout 
router.post("/filtered", filterUser)

export default router;
