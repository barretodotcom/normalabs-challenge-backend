import AppError from '@shared/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repository/UsersRepository';
import { User } from '../typeorm/entities/User';
import { genSaltSync, hashSync } from 'bcryptjs';
import validator from 'validator';
import RedisCache from '@shared/cache/RedisCache';

interface IUser {
    name: string;
    email: string;
    password: string;
    age: number;
    avatar?: string;
}

export default class CreateUserService {
    public async execute({
        name,
        email,
        password,
        age,
        avatar,
    }: IUser): Promise<IUser> {
        const usersRepository = getCustomRepository(UsersRepository);
        const redisCache = new RedisCache();

        if (!validator.isEmail(email)) {
            throw new AppError('Insira um email válido.');
        }
        const userExists = await usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Este e-mail já está em uso.');
        }

        const salt = genSaltSync();
        const hashedPassword = hashSync(password, salt);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            age,
            avatar,
        });

        await redisCache.invalidate('usuarios');

        await usersRepository.save(user);

        return user;
    }
}
