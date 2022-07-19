import AppError from "@shared/errors/AppErrors";
import { genSaltSync, hashSync } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { OwnerRepository } from "../typeorm/repositories/OwnerRepository";
import validator from 'validator';
import { sign } from "jsonwebtoken";
import authConfig from "@config/authConfig";
import { Owner } from "../typeorm/entities/Owner";

export interface IOwner {
    email: string;
    password: string;
}

interface IResponse {
    owner: Owner;
    token: string;
}

export class CreateOwnerService {
    public async execute({ email, password }: IOwner): Promise<IResponse> {

        const ownerRepository = getCustomRepository(OwnerRepository);

        if (!validator.isEmail(email)) {
            console.log(email)
            throw new AppError("Insira um e-mail validinho.");
        }

        const ownerExists = await ownerRepository.findByEmail(email);

        if (ownerExists) {
            throw new AppError("Este e-mail já está cadastrado.");
        }

        const salt = genSaltSync();
        const hashedPassword = hashSync(password, salt);

        const owner = ownerRepository.create(
            {
                email,
                password: hashedPassword
            }
        )

        const token = sign({}, authConfig.jwt.ownerSecret, {
            subject: owner.id,
            expiresIn: authConfig.jwt.expiresIn
        })

        await ownerRepository.save(owner)

        return { token, owner };
    }
}