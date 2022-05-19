import { EntityRepository, Repository } from 'typeorm';
import Medicine from '../entities/Medicine';

@EntityRepository(Medicine)
export class MedicinesRepository extends Repository<Medicine> {
    public async findByName(name: string): Promise<Medicine | undefined> {
        const medicine = this.findOne({
            where: {
                name,
            },
        });

        return medicine;
    }

    public async findById(id: string): Promise<Medicine | undefined> {
        const medicine = this.findOne({
            where: {
                id,
            },
        });

        return medicine;
    }
}
