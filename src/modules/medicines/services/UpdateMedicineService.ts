import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Medicine from '../typeorm/entities/Medicine';
import { MedicinesRepository } from '../typeorm/repositories/MedicinesRepository';

interface IMedicine {
    id: string;
    name: string;
    category: string;
}

export default class UpdateMedicineService {
    public async execute({
        id,
        name,
        category,
    }: IMedicine): Promise<Medicine | undefined> {
        const medicineRepository = getCustomRepository(MedicinesRepository);
        const medicine = await medicineRepository.findById(id);

        if (!medicine) {
            throw new AppError('Esse remédio não existe.');
        }

        medicine.name = name;
        medicine.category = category;

        await medicineRepository.save(medicine);

        return medicine;
    }
}
