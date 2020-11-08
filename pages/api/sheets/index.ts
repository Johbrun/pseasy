import * as express from 'express';
import getSummary from '../../../lib/query/getSummary';
import { ErrorCodes } from '../../../lib/interfaces/errorCodes';

module.exports = async (req: express.Request, res: express.Response) => {
    if (req.method === 'GET') {
        const sheets = await getSummary();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sheets);
    }  else {
        res.setHeader('Content-Type', 'application/json');
        res.status(405).json({ error: ErrorCodes.Internal_Server_Error });
    }
};
