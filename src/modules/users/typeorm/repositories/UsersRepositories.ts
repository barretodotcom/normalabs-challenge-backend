import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            },
        });
        return user;
    }
    public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                id,
            },
        });
        return user;
    }
    public async findByCpf(cpf: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                cpf,
            },
        });

        return user;
    }
}