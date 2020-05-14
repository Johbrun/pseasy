import * as express from 'express';
import getSummary from '../../../lib/query/getSummary';
import * as parser from '../../../lib/parser';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';
import { queryToVisitUser } from '../../../lib/helpers/queryToUserVisit';
import { ErrorCodes } from '../../../lib/interfaces/errorCodes';

module.exports = async (req: express.Request, res: express.Response) => 
{
    try 
    {
        saveNewVisitor(queryToVisitUser(req));
    }
    catch (e) 
    {
        console.error(e);
    }
    if (req.method === 'GET') 
    {
        const sheets = await getSummary();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sheets);
    }
    else if (req.method === 'POST') 
    {
        const headerYear = 'x-sheets-year';
        const headerKey = 'x-api-key';

        if (!req.headers[headerKey] || req.headers[headerKey] !== 'f4s6d5f4ds8f4fe4f84gf54d8hjk4hjk6') 
        {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ error: 'missing API key' });
        }

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
        res.status(405).json({ error: ErrorCodes.Internal_Server_Error });
    }
};
