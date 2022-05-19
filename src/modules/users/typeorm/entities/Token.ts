import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_tokens')
export default class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;
}
