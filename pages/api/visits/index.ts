import * as express from 'express';
import insertVisit from '../../../lib/query/insertVisit';
import { VisitCreation } from '../../../lib/interfaces/visit.interface';

module.exports = async (req: express.Request, res: express.Response) => 
{
    if (req.method === 'POST') 
    {
        const visit = req.body as VisitCreation;
        visit.date = new Date();
        const response = await insertVisit(visit);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ msg: response });
    }
    else 
    {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
