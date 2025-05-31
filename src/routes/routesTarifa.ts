import { Router } from "express";
import { getAllTarifas, createTarifa } from "../controllers/controllerTarifa";
import { validate } from "../middlewares/validate.middlewares";
import { tarifaSchema } from "../validations/tarifa.validation";

const router = Router();

router.get("/", getAllTarifas);
router.post("/", validate(tarifaSchema), createTarifa);

export default router;
