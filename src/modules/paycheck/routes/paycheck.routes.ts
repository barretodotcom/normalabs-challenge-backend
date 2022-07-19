import { isOwnerAuthenticated } from '@shared/http/middlewares/isOwnerAuthenticated';
import { isUserAuthenticated } from '@shared/http/middlewares/isUserAuthenticated';
import Router from 'express-promise-router';
import { PaycheckController } from '../controller/PaycheckController';

const paycheckController = new PaycheckController();

const paycheckRoutes = Router();

paycheckRoutes.get("/list", paycheckController.list);
paycheckRoutes.post("/create/:userId", isOwnerAuthenticated, paycheckController.create);

export default paycheckRoutes;