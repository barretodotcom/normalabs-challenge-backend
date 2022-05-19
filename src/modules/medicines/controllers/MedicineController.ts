import AppError from '@shared/errors/AppErrors';
import { Request, Response } from 'express';
import CreateMedicineService from '../services/CreateMedicineService';
import DeleteMedicineService from '../services/DeleteMedicineService';
import ListMedicineService from '../services/ListMedicineService';
import ShowMedicineService from '../services/ShowMedicineService';
import UpdateMedicineService from '../services/UpdateMedicineService';

export default class MedicineController {
    public async list(request: Request, response: Response): Promise<Response> {
        const listMedicine = new ListMedicineService();

        const medicines = await listMedicine.execute();
        return response.json(medicines);
    }
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showMedicine = new ShowMedicineService();

        const medicine = await showMedicine.execute(id);

        return response.json(medicine);
    }
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, category } = request.body;
        const createMedicine = new CreateMedicineService();

        const medicine = await createMedicine.execute({
            name,
            category,
        });

        return response.json(medicine);
    }
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, category, durationDays, hoursInterval } = request.body;
        const updateMedicine = new UpdateMedicineService();
        const medicine = await updateMedicine.execute({
            id,
            name,
            category,
        });

        return response.json(medicine);
    }
    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const deleteMedicine = new DeleteMedicineService();

        await deleteMedicine.execute(id);

        return response.json([]);
    }
}
