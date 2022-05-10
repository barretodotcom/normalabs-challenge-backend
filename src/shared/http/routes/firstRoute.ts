import { Request, Response } from 'express';

const firstRouteget = (req: Request, res: Response) => {
    res.send('First route');
};
export default firstRouteget;
