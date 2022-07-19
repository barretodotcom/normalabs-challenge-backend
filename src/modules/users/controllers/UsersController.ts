import { uploadFile } from '@config/upload';
import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { FindUserByIdService } from '../services/FindUserById';
import { ListUserService } from '../services/ListUserService';
import { UpdateUserService } from '../services/UpdateUserService';

interface IUser {
    name: string;
    email: string;
    password: string;
    age: number;
    avatar: string;
}

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {

        const createUserService = new CreateUserService();

        const { name, email, password, position, accountNumber, cpf } = request.body;

        const avatarFilename = request.file?.filename;

        const user = await createUserService.execute({ name, email, password, position, accountNumber, cpf, avatarFilename });

        return response.json(user);
    }

    public async update(request: Request, response: Response,): Promise<Response> {

        const updateUserService = new UpdateUserService();

        const { name, email, password } = request.body;

        const user = await updateUserService.execute({ name, email, password });

        return response.json(user);
    }
    public async list(request: Request, response: Response): Promise<Response> {

        const listUserService = new ListUserService();

        const users = await listUserService.execute();

        return response.json(users);
    }
    public async findUser(request: Request, response: Response,): Promise<Response> {

        const { userId } = request.params;

        const findUserByIdService = new FindUserByIdService();

        const user = findUserByIdService.execute(userId);

        return response.json(user);
    }
}
