import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repository/UsersRepository';

export default class FindNameById {
    public async execute(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(id);
        return user;
    }
}
