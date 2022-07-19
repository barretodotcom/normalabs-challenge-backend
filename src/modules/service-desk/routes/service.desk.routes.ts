import Router from 'express-promise-router';
import { ServiceDeskController } from '../controllers/ServiceDeskController';
import { isUserAuthenticated } from '../../../shared/http/middlewares/isUserAuthenticated'
import { isOwnerAuthenticated } from '@shared/http/middlewares/isOwnerAuthenticated';
const serviceDeskRoutes = Router();

const serviceDeskController = new ServiceDeskController();

serviceDeskRoutes.get("/list", serviceDeskController.list);
serviceDeskRoutes.post("/create", isUserAuthenticated, serviceDeskController.create);
serviceDeskRoutes.get("/list", isOwnerAuthenticated, serviceDeskController.list);

export default serviceDeskRoutes;