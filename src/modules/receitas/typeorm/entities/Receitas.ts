import Medicine from '@modules/medicines/typeorm/entities/Medicine';
import { User } from '@modules/users/typeorm/entities/User';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Receitas {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    sintomas: string;

    @Column('uuid')
    idPaciente: string;

    @Column('uuid')
    idMedicine: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    durationDays: number;

    @Column()
    hoursInterval: number;
}
