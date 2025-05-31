import { Router } from "express";
import {
  getAllTarifasAdicionales,
  createTarifaAdicional,
} from "../controllers/controllerTarifaAdicional";
import { validate } from "../middlewares/validate.middlewares";
import { tarifaAdicionalSchema } from "../validations/tarifaAdicional.validation";
const router = Router();

router.get("/", getAllTarifasAdicionales);
router.post("/", validate(tarifaAdicionalSchema), createTarifaAdicional);

export default router;
