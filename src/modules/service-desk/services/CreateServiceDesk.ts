import { FindUserByIdService } from "@modules/users/services/FindUserById";
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepositories";
import AppError from "@shared/errors/AppErrors";
import { isAfter, parseISO } from "date-fns";
import { string } from "joi";
import { getCustomRepository } from "typeorm";
import { ServiceDesk } from "../typeorm/entities/ServiceDesk";
import { ServiceDeskRepository } from "../typeorm/repository/ServiceDeskRepository";

interface ICreateServiceDesk {
    title: string;
    details: string;
    initialDate: string;
    finalDate: string;
    userId: string
}

export class CreateServiceDesk {

    public async execute({ title, details, initialDate, finalDate, userId }: ICreateServiceDesk): Promise<ServiceDesk> {
        const serviceDeskRepository = getCustomRepository(ServiceDeskRepository);
        const findUserService = new FindUserByIdService();

        const user = await findUserService.execute(userId);

        if (!isAfter(parseISO(initialDate), (new Date()))) {
            throw new AppError("A data inserida precisa ser posterior à data atual.");
        }

        if (!isAfter(parseISO(finalDate), parseISO(initialDate))) {
            throw new AppError("A data de início precisa ser anterior à data final.");
        }

        const serviceDesk = serviceDeskRepository.create({
            title,
            details,
            initialDate,
            finalDate,
            status: "À fazer",
            user
        })
        await serviceDeskRepository.save(serviceDesk);

        return serviceDesk;

    }
}