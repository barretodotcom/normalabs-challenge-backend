import Router from 'express-promise-router';
import CreateRecipesController from '../controllers/CreateRecipesController copy';
import UpdatesRecipesController from '../controllers/UpdateRecipesController';

const recipesRouter = Router();
const updatesRecipesController = new UpdatesRecipesController();
const createRecipesController = new CreateRecipesController();

recipesRouter.get('/:idPaciente', createRecipesController.get);
recipesRouter.post('/create', createRecipesController.create);
recipesRouter.post('/update', updatesRecipesController.update);

export default recipesRouter;
