import { Router } from "express";
import { createTest, getTests } from "../controllers/testController";

const router = Router();

router.post("/", createTest);
router.get("/", getTests);

export default router;
