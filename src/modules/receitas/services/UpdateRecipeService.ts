import Medicine from '@modules/medicines/typeorm/entities/Medicine';
import { MedicinesRepository } from '@modules/medicines/typeorm/repositories/MedicinesRepository';
import UsersRepository from '@modules/users/typeorm/repository/UsersRepository';
import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Receitas from '../typeorm/entities/Receitas';
import ReceitasRepository from '../typeorm/repository/ReceitasRepository';

interface IReceita {
    id: string;
    pacientName: string;
    medicineName: string;
    sintomas: string;
    durationDays: number;
    hoursInterval: number;
}

interface IMedicine {
    medicine: Medicine;
}

export default class UpdateRecipeService {
    public async execute({
        id,
        pacientName,
        medicineName,
        sintomas,
        durationDays,
        hoursInterval,
    }: IReceita): Promise<Receitas> {
        const receitasRepository = getCustomRepository(ReceitasRepository);
        const pacientRepository = getCustomRepository(UsersRepository);
        const medicinesRepository = getCustomRepository(MedicinesRepository);

        const receita = await receitasRepository.findById(id);
        const pacient = await pacientRepository.findByName(pacientName);
        const medicine = await medicinesRepository.findByName(medicineName);

        if (!receita) {
            throw new AppError('Receita não existente.');
        }
        if (!medicine) {
            throw new AppError('Remédio não existente.');
        }
        if (!pacient) {
            throw new AppError('Paciente não existente.');
        }

        receita.idMedicine = medicine.id;
        receita.idPaciente = pacient.id;
        receita.sintomas = sintomas;

        await receitasRepository.save(receita);

        return receita;
    }
}
