import Router from 'express-promise-router';
import usersRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import serviceDeskRoutes from '@modules/service-desk/routes/service.desk.routes';
import paycheckRoutes from '@modules/paycheck/routes/paycheck.routes';
import { isUserAuthenticated } from '../middlewares/isUserAuthenticated';
import { isOwnerAuthenticated } from '../middlewares/isOwnerAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use("/servicesdesks", isUserAuthenticated, serviceDeskRoutes);
routes.use("/paycheck", isOwnerAuthenticated, paycheckRoutes);

export default routes;
