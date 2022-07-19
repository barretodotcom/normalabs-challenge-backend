import { getSalary } from "@config/getSalary";
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepositories";
import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { Paycheck } from "../typeorm/entities/Paycheck";
import { PaycheckRepository } from "../typeorm/repository/PaycheckRepository";

interface ICreatePaycheck {
    companyName: string;
    socialReason: string;
    cnpj: string;
    extraTime: number;
    accountNumber: string;
    userId: string;
}

export class CreatePaycheckService {
    public async execute({ companyName, socialReason, cnpj, extraTime, userId }: ICreatePaycheck): Promise<Paycheck> {
        const paycheckRepository = getCustomRepository(PaycheckRepository);
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const money = getSalary(user.position);

        const paycheck = paycheckRepository.create({
            companyName,
            socialReason,
            cnpj,
            money,
            extraTime,
            user
        })

        await paycheckRepository.save(paycheck);

        return paycheck;
    }
}