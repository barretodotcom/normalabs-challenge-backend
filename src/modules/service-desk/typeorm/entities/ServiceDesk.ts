import { User } from "../../../users/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("service_desk")
export class ServiceDesk {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    details: string;

    @Column()
    initialDate: Date;

    @Column()
    finalDate: Date;

    @Column()
    status: string;

    @ManyToOne(type => (User), user => user.serviceDesk, { cascade: true })
    user: User;

    @CreateDateColumn()
    createdAt: Date;


}