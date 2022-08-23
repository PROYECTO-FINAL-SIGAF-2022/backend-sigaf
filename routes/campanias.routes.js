import { Router } from "express";
import {
  deleteCampania, getCampanias, getCampaniaUnico, postCampania, updateCampania,
} from "../controllers/campanias.controllers.js";

const router = Router();

router.get("/api/get-campanias", getCampanias);

router.get("/api/get-campania/:id", getCampaniaUnico);

router.post("/api/post-campania", postCampania);

router.put("/api/edit-campania/:id", updateCampania);

router.delete("/api/delete-campania/:id", deleteCampania);

export default router;
