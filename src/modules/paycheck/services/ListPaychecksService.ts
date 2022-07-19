import { getCustomRepository } from "typeorm";
import { Paycheck } from "../typeorm/entities/Paycheck";
import { PaycheckRepository } from "../typeorm/repository/PaycheckRepository";

export class ListPaychecksService {
    public async execute(): Promise<Paycheck[]> {
        const paycheckRepository = getCustomRepository(PaycheckRepository);
        console.log("oi");

        const paychecks = await paycheckRepository.find();
        return paychecks;
    }
}