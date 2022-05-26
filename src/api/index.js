import { Router } from "express";
import posts from "./posts";


var router=Router();
router.use("/", posts);

export default router;