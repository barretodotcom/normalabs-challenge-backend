import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import Medicine from '../typeorm/entities/Medicine';
import { MedicinesRepository } from '../typeorm/repositories/MedicinesRepository';

export default class ShowMedicineService {
    public async execute(id: string): Promise<Medicine | void> {
        const medicinesRepository = getCustomRepository(MedicinesRepository);
        const medicines = medicinesRepository.findById(id);

        if (!medicines) {
            throw new AppError('Esse remédio não existe.');
        }

        return medicines;
    }
}
