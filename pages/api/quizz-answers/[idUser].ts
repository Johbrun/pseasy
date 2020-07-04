import * as express from 'express';
import { ErrorCodes } from '../../../lib/interfaces/errorCodes';
import getQuizzAnswersByUserId from '../../../lib/query/getQuizzAnswersByUserId';

module.exports = async (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        console.log('quizz answer requested id : ' + req.query.idUser);
        const answers = await getQuizzAnswersByUserId(req.query.idUser);
        return res.status(200).json(answers);
    } else {
        res.status(405).json({ error: ErrorCodes.Internal_Server_Error });
    }
};
