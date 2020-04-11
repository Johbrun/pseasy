import * as express from 'express';
import { ErrorCodes } from '../errorCodes';
import getQuizzQuestions from '../../../lib/query/getQuizzQuestions';

module.exports = async (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        const categories = await getQuizzQuestions();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(categories);
    }
    else {
        res.status(405).json({ error: ErrorCodes.Method_Not_Allowed });
    }
};
