import { Request, Response } from 'express';
import CreateRecipeService from '../services/CreateRecipeService';
import ListRecipesService from '../services/ListRecipesService';
import UpdateRecipeService from '../services/UpdateRecipeService';
import Receitas from '../typeorm/entities/Receitas';

export default class CreateRecipesController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            pacientEmail,
            medicineName,
            sintomas,
            durationDays,
            hoursInterval,
        } = request.body;
        const createRecipeService = new CreateRecipeService();
        const recipe = await createRecipeService.execute({
            pacientEmail: pacientEmail,
            medicineName,
            sintomas,
            durationDays,
            hoursInterval,
        });

        return response.json(recipe);
    }
    public async get(request: Request, response: Response): Promise<Response> {
        const listRecipesService = new ListRecipesService();
        const { idPaciente } = request.params;
        const recipes = await listRecipesService.execute(idPaciente);
        return response.json(recipes);
    }
}
