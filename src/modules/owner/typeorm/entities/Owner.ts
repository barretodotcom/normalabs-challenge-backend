import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('owner')
export class Owner {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor() {
        this.id = uuid();
    }
}