import * as express from 'express';
import insertVisit from '../../../lib/query/insertVisit';
import { VisitCreation, VisitUserCreation } from '../../../lib/interfaces/visit.interface';
import crypto from 'crypto';
import insertUser from '../../../lib/query/insertUser';
import { UserCreation } from '../../../lib/interfaces/user.interface';
import { ErrorCodes } from '../errorCodes';

module.exports = async (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') {
        const visitUser = req.body as VisitUserCreation;
        const visit: VisitCreation = {
            url: visitUser.url,
            idUser: crypto.createHash('md5').update(visitUser.ip + visitUser.userAgent).digest('hex').toString(),
            date: new Date()
        }

        const user: UserCreation = { id: visit.idUser, ip: visitUser.ip, userAgent: visitUser.userAgent };
        try {

            await insertUser(user);
            const response = await insertVisit(visit);


            return res.status(200).json({ msg: response });
        }
        catch (e) {
            return res.status(500).json({ error: ErrorCodes.Internal_Server_Error });
        }
    }
    else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
