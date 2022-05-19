import { CreateUsers1652270705138 } from '@shared/typeorm/migrations/1652270705138-CreateUsers';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import FindNameById from '../services/FindNameById';
import ListUserService from '../services/ListUserService';
import UpdateUserService from '../services/UpdateUserService';
interface IUser {
    name: string;
    email: string;
    password: string;
    age: number;
    avatar: string;
}

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, age, avatar } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name,
            email,
            password,
            age,
            avatar,
        });

        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUser = new UpdateUserService();
        const { id } = request.params;
        const { name, email, password, age, avatar } = request.body;
        const user = await updateUser.execute({
            id,
            name,
            email,
            password,
            age,
            avatar,
        });
        return response.json(user);
    }
    public async list(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();
        const users = await listUsers.execute();
        return response.json(users);
    }
    public async findUser(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const findNameById = new FindNameById();
        const user = await findNameById.execute(id);

        return response.json(user);
    }
}
