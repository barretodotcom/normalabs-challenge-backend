declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
        owner: {
            id: string;
        }
    }
}
