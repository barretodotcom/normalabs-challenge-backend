import { getCustomRepository } from 'typeorm';
import Receitas from '../typeorm/entities/Receitas';
import ReceitasRepository from '../typeorm/repository/ReceitasRepository';

export default class ListRecipesService {
    public async execute(idPaciente: string): Promise<Receitas[] | undefined> {
        const recipesRepository = getCustomRepository(ReceitasRepository);
        const recipes = await recipesRepository.findByPacientId(idPaciente);
        return recipes;
    }
}
