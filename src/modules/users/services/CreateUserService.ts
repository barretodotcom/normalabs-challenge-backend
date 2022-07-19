import authConfig from "@config/authConfig";
import { cpfValidator } from "@config/cpfValidator";
import { filetypes } from "@config/validateFileFormat";
import AppError from "@shared/errors/AppErrors";
import { genSaltSync, hash, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import validator from "validator";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepositories";

interface ICreateUser {
    name: string;
    email: string;
    position: string;
    accountNumber: string;
    cpf: string;
    password: string;
    avatarFilename: string | undefined;
}

interface IResponse {
    user: User;
    token: string;
}

export class CreateUserService {

    public async execute({ name, email, password, position, accountNumber, cpf, avatarFilename }: ICreateUser): Promise<IResponse> {

        const usersRepository = getCustomRepository(UsersRepository);

        if (!avatarFilename) {
            throw new AppError("O avatar é necessário para o cadastro.");
        }

        if (!filetypes.test(avatarFilename)) {
            throw new AppError("São aceitos somente imagens no formato jpeg, jpg e png.");
        }

        if (!validator.isEmail(email)) {
            throw new AppError("Insira um e-mail válido.");
        }

        if (!cpfValidator(cpf)) {
            throw new AppError("Insira um cpf válido.");
        }

        const userExists = await usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError("Email já cadastrado.");
        }

        const cpfExists = await usersRepository.findByCpf(cpf);

        if (cpfExists) {
            throw new AppError("CPF já cadastrado.");
        }

        const salt = genSaltSync();
        const hashedPassword = hashSync(password, salt);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            position,
            accountNumber: parseInt(accountNumber),
            cpf,
            avatar: avatarFilename,
            serviceDesk: [],
            paycheck: []
        })
        await usersRepository.save(user);

        const token = sign({}, authConfig.jwt.userSecret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return { user, token };

    }
}