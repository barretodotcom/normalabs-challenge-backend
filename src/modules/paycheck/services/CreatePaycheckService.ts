import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepositories";
import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { Paycheck } from "../typeorm/entities/Paycheck";
import { PaycheckRepository } from "../typeorm/repository/PaycheckRepository";

interface ICreatePaycheck {
    companyName: string;
    socialReason: string;
    cnpj: string;
    money: number;
    extraTime: number;
    accountNumber: string;
    userCpf: string;
}

export class CreatePaycheckService {
    public async execute({ companyName, socialReason, cnpj, money, extraTime, accountNumber, userCpf }: ICreatePaycheck): Promise<Paycheck> {
        const paycheckRepository = getCustomRepository(PaycheckRepository);
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByCpf(userCpf);

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

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