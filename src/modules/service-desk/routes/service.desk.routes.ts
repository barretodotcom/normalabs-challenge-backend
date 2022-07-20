import Router from 'express-promise-router';
import { ServiceDeskController } from '../controllers/ServiceDeskController';
import { isUserAuthenticated } from '../../../shared/http/middlewares/isUserAuthenticated'
import { isOwnerAuthenticated } from '@shared/http/middlewares/isOwnerAuthenticated';
const serviceDeskRoutes = Router();

const serviceDeskController = new ServiceDeskController();

serviceDeskRoutes.get("/list", serviceDeskController.list);
serviceDeskRoutes.post("/create", isUserAuthenticated, serviceDeskController.create);
serviceDeskRoutes.delete('/delete/:serviceDeskId', isUserAuthenticated, serviceDeskController.delete);
serviceDeskRoutes.patch('/status/:serviceDeskId', isUserAuthenticated, serviceDeskController.patch);
export default serviceDeskRoutes;
