import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Medicine from '../typeorm/entities/Medicine';
import { MedicinesRepository } from '../typeorm/repositories/MedicinesRepository';

interface IMedicine {
    name: string;
    category: string;
}

export default class CreateMedicineService {
    public async execute({
        name,
        category,
    }: IMedicine): Promise<Medicine | void> {
        const medicineRepository = getCustomRepository(MedicinesRepository);

        const medicineExists = await medicineRepository.findByName(name);

        if (medicineExists) {
            throw new AppError('Remédio já existente.');
        }

        const medicine = medicineRepository.create({
            name,
            category,
        });
        await medicineRepository.save(medicine);
        return medicine;
    }
}
