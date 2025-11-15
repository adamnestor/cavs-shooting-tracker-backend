import { Router } from "express";
import {
  createPlayer,
  getPlayers,
  updatePlayer,
} from "../controllers/playerController";

const router = Router();

router.get("/"), getPlayers;
router.post("/"), createPlayer;
router.put("/:id", updatePlayer);

export default router;
