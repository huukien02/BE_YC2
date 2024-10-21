import { Router } from "express";
import { addOrUpdateReaction } from "../controllers/reactionController";

const reactionRouter = Router();

// Định nghĩa các route cho người dùng
reactionRouter.post("/add", addOrUpdateReaction);

export default reactionRouter;
