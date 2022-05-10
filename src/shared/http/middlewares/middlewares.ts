/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '@shared/errors/AppErrors';
import { Request, Response, NextFunction } from 'express';

const errorMidleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'Internal server Error',
    });
};

export default errorMidleware;
