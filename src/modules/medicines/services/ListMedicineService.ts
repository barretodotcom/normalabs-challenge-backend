import { getCustomRepository } from 'typeorm';
import Medicine from '../typeorm/entities/Medicine';
import { MedicinesRepository } from '../typeorm/repositories/MedicinesRepository';

export default class ListMedicineService {
    public async execute(): Promise<Medicine[]> {
        const medicinesRepository = getCustomRepository(MedicinesRepository);
        const medicines = medicinesRepository.find();

        return medicines;
    }
}
