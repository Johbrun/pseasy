import * as express from 'express';
import getCategories from '../../../lib/query/getCategories';
import { ErrorCodes } from '../../../lib/interfaces/errorCodes';

module.exports = async (req: express.Request, res: express.Response) => {

    if (req.method === 'GET') {
        const categories = await getCategories();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(categories);
    } else {
        res.status(405).json({ error: ErrorCodes.Internal_Server_Error });
    }
};
