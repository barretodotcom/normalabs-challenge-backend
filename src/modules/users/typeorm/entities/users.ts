import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('timestamp')
    birthdate: Date;

    @Column()
    gen: string;

    @Column('timestamp with local time zone')
    created_at: Date;

    @Column('timestamp with local time zone')
    updated_at: Date;
}

export default User;
