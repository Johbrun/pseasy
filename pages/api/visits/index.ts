import * as express from 'express';
import { VisitUserCreation, VisitCreation } from '../../../lib/interfaces/visit.interface';
import { UserCreation } from '../../../lib/interfaces/user.interface';
import insertUser from '../../../lib/query/insertUser';
import insertVisit from '../../../lib/query/insertVisit';
import crypto from 'crypto';
import { ErrorCodes } from '../../../lib/interfaces/errorCodes';

module.exports = async (req: express.Request, res: express.Response) => 
{
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') 
    {
        const visitUser = req.body as VisitUserCreation;
        const visit: VisitCreation = {
            url: visitUser.url,
            idUser: crypto.createHash('md5').update(visitUser.ip + visitUser.userAgent).digest('hex').toString(),
            date: new Date()
        };

        const user: UserCreation = { id: visit.idUser, ip: visitUser.ip, userAgent: visitUser.userAgent };
        try 
        {

            await insertUser(user);
            await insertVisit(visit);
            return res.status(200).json( {idUser : visit.idUser} );
        }
        catch (e) 
        {
            return res.status(500).json({ error: ErrorCodes.Internal_Server_Error });
        }
    }
    else 
    {
        res.status(405).json({ error: ErrorCodes.Method_Not_Allowed });
    }
};
