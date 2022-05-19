import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppErrors';

export default async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const redisClient = new Redis({
            port: Number(process.env.REDIS_PORT),
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASS || undefined,
        });

        const redisLimiter = new RateLimiterRedis({
            storeClient: redisClient,
            points: 1000,
            duration: 1,
            keyPrefix: 'rateLimit',
        });
        await redisLimiter.consume(req.ip);
        return next();
    } catch {
        throw new AppError('Too many requests.', 429);
    }
}
