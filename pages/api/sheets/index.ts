import * as express from 'express';
import getSummary from '../../../lib/query/getSummary';
import { parseSheets } from '../../../lib/parser';

module.exports = async (req: express.Request, res: express.Response) => 
{
    if (req.method === 'GET') 
    {
        const sheets = await getSummary();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sheets);
    }
    else if (req.method === 'POST') 
    {
        const nbSheetsParsed = await parseSheets(req.body);
        res.status(200).json({ msg: `Parsed ${nbSheetsParsed} sheets` });
    }
    else 
    {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
