import Router from "express-promise-router";
import { OwnerController } from "../controller/OwnerController";

const ownerRoutes = Router();
const ownerController = new OwnerController();

ownerRoutes.post('/create', ownerController.create);
ownerRoutes.post('/session', ownerController.login);

export default ownerRoutes;