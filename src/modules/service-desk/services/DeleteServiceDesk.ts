import { sendTaskRemovingMessage } from "@config/smtp";
import { FindUserByIdService } from "@modules/users/services/FindUserById";
import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { ServiceDeskRepository } from "../typeorm/repository/ServiceDeskRepository";

export class DeleteServiceDesk {
    public async execute(userId: string, serviceDeskId: string, reason: string): Promise<void> {

        const serviceDeskRepository = getCustomRepository(ServiceDeskRepository);
        const findUserByIdService = new FindUserByIdService();

        const serviceDesk = await serviceDeskRepository.findById(serviceDeskId);

        if (!serviceDesk) {
            throw new AppError("Tarefa não encontrada.");
        }

        const user = await findUserByIdService.execute(userId);

        await sendTaskRemovingMessage(reason, user.email);

        await serviceDeskRepository.remove(serviceDesk);
    }
}