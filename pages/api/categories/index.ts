import * as express from 'express';
import getCategories from '../../../lib/query/getCategories';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';
import { queryToVisitUser } from '../../../lib/helpers/queryToUserVisit';

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
        const categories = await getCategories();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(categories);
    }
    else 
    {
        res.status(405).json({ error: ErrorCodes.Internal_Server_Error });
    }
};
