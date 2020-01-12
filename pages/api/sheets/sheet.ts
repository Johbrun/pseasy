import * as express from 'express';
import getSheetByReference from '../../../lib/query/getSheetByReference';

module.exports = async (req: express.Request, res: express.Response) => 
{
    if (req.method === 'GET') 
    {
        const sheet = await getSheetByReference(req.query.reference);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sheet);
    }
    else 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(405).json({ error: 'Method not allowed' });
    }
};
