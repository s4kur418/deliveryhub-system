import express from "express";
import { getRiders } from "../controllers/riders/getRiders.js";
import { createRider } from "../controllers/riders/createRider.js";
import { updateRider } from "../controllers/riders/updateRider.js";
import { updateRiderStatus } from "../controllers/riders/updateRiderStatus.js";

const router = express.Router();

router.get("/riders", getRiders);
router.post("/riders", createRider);
router.put("/riders/:id", updateRider)
router.put("/riders/:id/updateStatus", updateRiderStatus)

export default router;