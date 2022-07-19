import AppError from '@shared/errors/AppErrors';
import { JwtPayload, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/authConfig';

interface IUserId {
    sub: string;
}

export async function isOwnerAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT Token indefinido.');
    }
    const [, token] = authHeader.split(' ');
    try {
        const decodedToken = verify(token, authConfig.jwt.ownerSecret);
        const { sub } = decodedToken as IUserId;
        request.owner = {
            id: sub,
        };
        return next();
    } catch {
        throw new AppError('Token inválido.');
    }
}
