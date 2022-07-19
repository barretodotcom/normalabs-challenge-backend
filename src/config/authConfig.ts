import 'dotenv/config';

export default {
    jwt: {
        userSecret: process.env.USER_SECRET as string,
        ownerSecret: process.env.OWNER_SECRET as string,
        expiresIn: '7d',
    },
};
