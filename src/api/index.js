import { Router } from "express";
import posts from "./posts";
import auth from './auth';

var router=Router();

router.use("/", posts);
router.use("/auth", auth);

export default router;