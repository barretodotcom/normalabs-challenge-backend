import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicines')
export default class Medicine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;
}
