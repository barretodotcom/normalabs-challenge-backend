import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { PaycheckRepository } from "../typeorm/repository/PaycheckRepository";

export class DeletePaycheckService {
    public async execute(paycheckId: string): Promise<void> {
        const paycheckRepository = getCustomRepository(PaycheckRepository);

        const paycheck = await paycheckRepository.findById(paycheckId);

        if (!paycheck) {
            throw new AppError("Contra-cheque não encontrado.");
        }

        await paycheckRepository.delete(paycheck);
    }
}