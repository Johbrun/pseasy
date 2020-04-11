import * as express from 'express';
import { ErrorCodes } from '../errorCodes';
import { UsernameUpdate } from '../../../lib/interfaces/user.interface';
import updateUserName from '../../../lib/query/updateUserName';

module.exports = async (req: express.Request, res: express.Response) => 
{
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'PATCH') 
    {
        const usernameUpdate = req.body as UsernameUpdate;
        try 
        {
            const response = await updateUserName(req.query.idUser, usernameUpdate);
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
