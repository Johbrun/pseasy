import * as express from 'express';
import getSummary from '../../../lib/query/getSummary';
import * as parser from '../../../lib/parser';

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
        const headerYear = 'x-sheets-year';
        if (req.headers[headerYear])
        {
            const response = await parser.parseSheets(req.body, req.headers[headerYear] as string);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ msg: response });
           
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Missing ${headerYear} header` });
       
    }
    else 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(405).json({ error: 'Method not allowed' });
    }
};
