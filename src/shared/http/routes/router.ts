import Router from 'express-promise-router';
import routerMedicineController from '@modules/medicines/routes/medicines.router';
import usersRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/email.password.routes';
import redefinePasswordRouter from '@modules/users/routes/redefine.password.routes';
import recipesRouter from '@modules/receitas/routes/recipes.routes';

const routes = Router();

routes.use('/medicines', routerMedicineController);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/password', redefinePasswordRouter);
routes.use('/recipes', recipesRouter);

export default routes;
