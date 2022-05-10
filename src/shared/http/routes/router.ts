import express from 'express';
import firstRouteget from './firstRoute';
const routes = express.Router();

routes.use('/', firstRouteget);

export default routes;
