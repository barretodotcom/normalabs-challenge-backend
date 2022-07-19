import { EntityRepository, Repository } from "typeorm";
import { Paycheck } from "../entities/Paycheck";

@EntityRepository(Paycheck)
export class PaycheckRepository extends Repository<Paycheck> {

    public async findById(id: string): Promise<Paycheck | undefined> {

        const paycheck = await this.findOne({
            where: {
                id
            }
        })

        return paycheck;
    }

}