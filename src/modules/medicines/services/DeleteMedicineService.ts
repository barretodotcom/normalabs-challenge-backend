import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import { MedicinesRepository } from '../typeorm/repositories/MedicinesRepository';

export default class DeleteMedicineService {
    public async execute(id: string): Promise<[] | void> {
        const medicineRepository = getCustomRepository(MedicinesRepository);
        const medicine = await medicineRepository.findById(id);

        if (!medicine) {
            throw new AppError('Esse remédio não existe.');
        }

        await medicineRepository.remove(medicine);
        return [];
    }
}
