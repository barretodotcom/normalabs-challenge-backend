import { EntityRepository, Repository } from "typeorm";
import { ServiceDesk } from "../entities/ServiceDesk";

@EntityRepository(ServiceDesk)
export class ServiceDeskRepository extends Repository<ServiceDesk> {
    public async findById(id: string): Promise<ServiceDesk | undefined> {
        const serviceDesk = await this.findOne({
            where: {
                id
            }
        })

        return serviceDesk;
    }
}