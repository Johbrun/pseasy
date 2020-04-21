import * as express from 'express';
import getSheetByReference from '../../../lib/query/getLastSheetByReference';
import getVersionsByReference from '../../../lib/query/getVersionsByReference';
import { ErrorCodes } from '../../../lib/interfaces/errorCodes';

module.exports = async (req: express.Request, res: express.Response) => 
{
    if (req.method === 'GET') 
    {
        const {reference, version} = req.query;
        const sheets = await getSheetByReference(reference, version) ;
        if (sheets.length === 0)
        {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Not found' });
        }
        const history = await getVersionsByReference(req.query.reference);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({...sheets[0], history});
    }
    else 
    {
        res.setHeader('Content-Type', 'application/json');
        return res.status(405).json({ error: ErrorCodes.Internal_Server_Error });
    }
};
