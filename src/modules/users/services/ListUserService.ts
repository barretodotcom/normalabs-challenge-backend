import UsersRepository from '../typeorm/repository/UsersRepository';
import { User } from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import RedisCache from '@shared/cache/RedisCache';

export default class ListUserService {
    public async execute(): Promise<User[] | unknown> {
        const usersRepository = getCustomRepository(UsersRepository);

        const regisCache = new RedisCache();
        let users = await regisCache.recover('usuarios');
        if (!users) {
            users = await usersRepository.find();
            await regisCache.save('usuarios', users);
        }

        return users;
    }
}
