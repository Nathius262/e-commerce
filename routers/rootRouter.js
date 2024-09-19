import { indexPage } from "../controllers/root.js";
import { Router } from "express";

const router = Router()

router.get('/', indexPage);


export default router