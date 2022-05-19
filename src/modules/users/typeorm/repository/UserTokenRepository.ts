import { EntityRepository, Repository } from 'typeorm';
import Token from '../entities/Token';

@EntityRepository(Token)
export class UserTokenRepository extends Repository<Token> {
    public async findByToken(token: string): Promise<Token | undefined> {
        const userToken = await this.findOne({
            where: {
                token,
            },
        });
        return userToken;
    }
    public async generateToken(userId: string): Promise<Token | undefined> {
        const userToken = this.create({
            userId,
        });
        await this.save(userToken);
        return userToken;
    }
}
