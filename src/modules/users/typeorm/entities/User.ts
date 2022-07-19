import { Paycheck } from "../../../paycheck/typeorm/entities/Paycheck";
import { ServiceDesk } from "../../../service-desk/typeorm/entities/ServiceDesk";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("users")
export class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    position: string;

    @Column()
    accountNumber: number;

    @Column()
    cpf: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(type => Paycheck, paycheck => paycheck.user, { eager: true })
    paycheck: Paycheck[];

    @OneToMany(type => ServiceDesk, serviceDesk => serviceDesk.user, { eager: true })
    serviceDesk: ServiceDesk[];

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        this.id = uuid();
    }
}