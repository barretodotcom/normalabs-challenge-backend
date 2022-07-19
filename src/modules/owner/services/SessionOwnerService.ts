import authConfig from "@config/authConfig";
import AppError from "@shared/errors/AppErrors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { Owner } from "../typeorm/entities/Owner";
import { OwnerRepository } from "../typeorm/repositories/OwnerRepository";
import { IOwner } from "./CreateOwnerService";
import validator from 'validator';

interface IResponse {
    owner: Owner;
    token: string;
}

export class SessionOwnerService {
    public async execute({ email, password }: IOwner): Promise<IResponse> {
        const ownerRepository = getCustomRepository(OwnerRepository);

        if (!validator.isEmail(email)) {
            throw new AppError("Insira um e-mail válido.");
        }

        const owner = await ownerRepository.findByEmail(email);

        if (!owner) {
            throw new AppError("Este e-mail não está cadastrado.");
        }


        if (!compare(password, owner.password)) {
            throw new AppError("Senha inválida.");
        }

        const token = sign({}, authConfig.jwt.ownerSecret, {
            subject: owner.id,
            expiresIn: authConfig.jwt.expiresIn
        })

        return { owner, token };
    }
}