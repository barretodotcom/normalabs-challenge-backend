import { celebrate, Segments } from 'celebrate';
import Router from 'express-promise-router';
import Joi from 'joi';
import MedicineController from '../controllers/MedicineController';
const routerMedicineController = Router();
const medicineController = new MedicineController();

routerMedicineController.get('/', medicineController.list);
routerMedicineController.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().uuid().required(),
        }),
    }),
    medicineController.show,
);
routerMedicineController.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object({
            name: Joi.string().required(),
            category: Joi.string().required(),
        }),
    }),
    medicineController.create,
);
routerMedicineController.put(
    '/:id',
    celebrate({
        [Segments.BODY]: Joi.object({
            name: Joi.string().required(),
            category: Joi.string().required(),
        }),
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().uuid().required(),
        }),
    }),
    medicineController.update,
);
routerMedicineController.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().uuid().required(),
        }),
    }),
    medicineController.delete,
);

export default routerMedicineController;
