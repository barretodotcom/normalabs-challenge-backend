import { User } from "../../../users/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("paychecks")
export class Paycheck {

    @PrimaryColumn()
    id: string;

    @Column()
    companyName: string;

    @Column()
    socialReason: string;

    @Column()
    cnpj: string;

    @Column()
    money: number;

    @Column()
    extraTime: number;

    @ManyToOne(type => (User), user => user.paycheck, { cascade: true })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    constructor() {
        this.id = uuid();
    }
}