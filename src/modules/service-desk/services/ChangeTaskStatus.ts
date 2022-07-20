import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { ServiceDeskRepository } from "../typeorm/repository/ServiceDeskRepository";

export interface IChangeTaskStatus {
    serviceDeskId: string;
    status: string;
}

export class ChangeTaskStatus {
    public async execute({ serviceDeskId, status }: IChangeTaskStatus) {
        const serviceDeskRepository = getCustomRepository(ServiceDeskRepository);

        const serviceDesk = await serviceDeskRepository.findById(serviceDeskId);

        if (!serviceDesk) {
            throw new AppError("Esta tarefa não existe.");
        }

        serviceDesk.status = status;

        await serviceDeskRepository.save(serviceDesk);

        return serviceDesk;
    }
}