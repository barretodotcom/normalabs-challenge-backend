import { Entity, EntityRepository, Repository } from 'typeorm';
import Receitas from '../entities/Receitas';

@EntityRepository(Receitas)
export default class ReceitasRepository extends Repository<Receitas> {
    public async findById(id: string): Promise<Receitas | undefined> {
        const receita = await this.findOne({
            where: {
                id,
            },
        });
        return receita;
    }
    public async findByPacientId(idPaciente: string): Promise<Receitas[]> {
        const receitas = await this.find({
            where: {
                idPaciente,
            },
        });
        console.log(idPaciente);
        return receitas;
    }
    public async findByMedicineId(idMedicine: string): Promise<Receitas[]> {
        const receitas = await this.find({
            where: {
                idMedicine,
            },
        });
        return receitas;
    }
}
