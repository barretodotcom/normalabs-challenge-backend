import Router from 'express-promise-router';
import { PaycheckController } from '../controller/PaycheckController';

const paycheckController = new PaycheckController();

const paycheckRoutes = Router();

paycheckRoutes.get("/list", paycheckController.list);
paycheckRoutes.post("/create", paycheckController.create);
paycheckRoutes.delete("/delete", paycheckController.delete);

export default paycheckRoutes;