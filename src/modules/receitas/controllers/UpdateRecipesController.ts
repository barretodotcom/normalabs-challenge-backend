import { Request, Response } from 'express';
import CreateRecipeService from '../services/CreateRecipeService';
import UpdateRecipeService from '../services/UpdateRecipeService';
import Receitas from '../typeorm/entities/Receitas';

export default class UpdatesRecipesController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateRecipeService = new UpdateRecipeService();
        const {
            id,
            pacientName,
            medicineName,
            sintomas,
            durationDays,
            hoursInterval,
        } = request.body;
        const recipe = await updateRecipeService.execute({
            id,
            pacientName,
            medicineName,
            sintomas,
            durationDays,
            hoursInterval,
        });

        return response.json(recipe);
    }
}
