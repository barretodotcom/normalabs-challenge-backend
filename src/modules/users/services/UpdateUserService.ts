import AppError from '@shared/errors/AppErrors';
import UsersRepository from '../typeorm/repository/UsersRepository';
import { User } from '../typeorm/entities/User';
import { RequestParamHandler } from 'express';
import { getCustomRepository } from 'typeorm';

interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    avatar: string;
}

export default class UpdateUserService {
    public async execute({
        id,
        name,
        email,
        password,
        age,
        avatar,
    }: IUser): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('Este usuário não existe.');
        }

        user.name = name;
        user.email = email;
        user.password = password;
        user.age = age;
        user.avatar = avatar;

        await usersRepository.save(user);

        return user;
    }
}
