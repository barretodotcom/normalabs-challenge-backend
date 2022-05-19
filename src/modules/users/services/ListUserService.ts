import UsersRepository from '../typeorm/repository/UsersRepository';
import { User } from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';

export default class ListUserService {
    public async execute(): Promise<User[] | unknown> {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();

        return users;
    }
}
