import * as express from 'express';
import { ErrorCodes } from '../errorCodes';
import { queryToVisitUser } from '../../../lib/helpers/queryToUserVisit';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';
import insertQuizzAnswers from '../../../lib/query/insertQuizzAnswers';
import { QuizzAnswerCreation } from '../../../lib/interfaces/quizz-answer.interface';
import getQuizzQuestionsFull from '../../../lib/query/getQuizzQuestionsFull';
import getQuizzAnswersByUserId from '../../../lib/query/getQuizzAnswersByUserId';

module.exports = async (req: express.Request, res: express.Response) => 
{
    let userId = '';
    try 
    {
        userId = await saveNewVisitor( queryToVisitUser(req));
    }
    catch (e) 
    {
        console.error(e);
    }

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') 
    {
        const answers = await getQuizzAnswersByUserId(userId);
        if (answers)
        {
            res.status(400).json({ error: ErrorCodes.Quizz_Already_Completed });
            return;
        }
        const body = req.body as QuizzAnswerCreation[];
        for (const quizzAnswer of body)
        {
            quizzAnswer.idUser = userId;
            await insertQuizzAnswers(quizzAnswer);
        }
        const response = await getQuizzQuestionsFull();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    }
    else 
    {
        res.status(405).json({ error: ErrorCodes.Method_Not_Allowed });
    }
};
