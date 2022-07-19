import { EntityRepository, Repository } from "typeorm";
import { Owner } from "../entities/Owner";

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner> {
    public async findByEmail(email: string): Promise<Owner | undefined> {
        const owner = this.findOne({
            where: {
                email
            }
        })
        return owner;
    }
}