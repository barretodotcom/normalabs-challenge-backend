import AppError from "@shared/errors/AppErrors";
import { ServiceDeskRepository } from "../typeorm/repository/ServiceDeskRepository";

export class DeleteServiceDesk {
    public async execute(serviceDeskId: string): Promise<void> {
        const serviceDeskRepository = new ServiceDeskRepository();

        const serviceDesk = await serviceDeskRepository.findById(serviceDeskId);

        if (!serviceDesk) {
            throw new AppError("Tarefa não encontrada.");
        }

        await serviceDeskRepository.delete(serviceDesk);
    }
}