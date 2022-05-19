import Medicine from '@modules/medicines/typeorm/entities/Medicine';
import { MedicinesRepository } from '@modules/medicines/typeorm/repositories/MedicinesRepository';
import UsersRepository from '@modules/users/typeorm/repository/UsersRepository';
import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Receitas from '../typeorm/entities/Receitas';
import ReceitasRepository from '../typeorm/repository/ReceitasRepository';

interface IReceita {
    pacientEmail: string;
    medicineName: string;
    sintomas: string;
    durationDays: number;
    hoursInterval: number;
}

export default class CreateRecipeService {
    public async execute({
        pacientEmail,
        medicineName,
        sintomas,
        durationDays,
        hoursInterval,
    }: IReceita): Promise<Receitas> {
        const receitasRepository = getCustomRepository(ReceitasRepository);
        const medicineRepository = getCustomRepository(MedicinesRepository);
        const pacientRepository = getCustomRepository(UsersRepository);

        const medicine = await medicineRepository.findByName(medicineName);
        const paciente = await pacientRepository.findByEmail(pacientEmail);

        if (!medicine) {
            throw new AppError('Nome do remédio não encontrado.');
        }
        if (!paciente) {
            throw new AppError('Email do paciente não encontrado.');
        }

        const receita = receitasRepository.create({
            idMedicine: medicine.id,
            idPaciente: paciente.id,
            hoursInterval,
            durationDays,
            sintomas,
        });
        await receitasRepository.save(receita);
        return receita;
    }
}
