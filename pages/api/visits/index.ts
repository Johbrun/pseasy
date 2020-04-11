import * as express from 'express';
import insertVisit from '../../../lib/query/insertVisit';
import { VisitCreation, VisitUserCreation } from '../../../lib/interfaces/visit.interface';
import insertUser from '../../../lib/query/insertUser';
import { UserCreation } from '../../../lib/interfaces/user.interface';
import { ErrorCodes } from '../errorCodes';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';

module.exports = async (req: express.Request, res: express.Response) => 
{
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') 
    {
        const visitUser = req.body as VisitUserCreation;
        try 
        {
            const response = await saveNewVisitor(visitUser);
            return res.status(200).json({ msg: response });
        }
        catch (e) 
        {
            return res.status(500).json({ error: ErrorCodes.Internal_Server_Error });
        }
    }
    else 
    {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
