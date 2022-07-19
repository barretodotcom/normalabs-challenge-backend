import { getCustomRepository } from "typeorm";
import { ServiceDesk } from "../typeorm/entities/ServiceDesk";
import { ServiceDeskRepository } from "../typeorm/repository/ServiceDeskRepository";

export class ListServiceDesk {
    public async execute(): Promise<ServiceDesk[]> {
        const serviceDeskRepository = getCustomRepository(ServiceDeskRepository);

        const serviceDesks = await serviceDeskRepository.find();

        return serviceDesks;
    }
}