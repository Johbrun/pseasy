import * as express from 'express';
import { ErrorCodes } from '../errorCodes';
import getQuizzQuestions from '../../../lib/query/getQuizzQuestions';
import { queryToVisitUser } from '../../../lib/helpers/queryToUserVisit';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';
import insertQuizzAnswers from '../../../lib/query/insertQuizzAnswers';
import { TableBody } from 'material-ui';
import { QuizzAnswerCreation } from '../../../lib/interfaces/quizz-answer.interface';
import { User } from '../../../lib/interfaces/user.interface';
import getQuizzQuestionsFull from '../../../lib/query/getQuizzQuestionsFull';

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
        const body = req.body as QuizzAnswerCreation[];
        for (const quizzAnswer of body)
        {
            console.log(quizzAnswer);
            console.log(userId);
            quizzAnswer.idUser = userId;
            await insertQuizzAnswers(quizzAnswer);
        }
        const response = await getQuizzQuestionsFull();
        console.log(response);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    }
    else 
    {
        res.status(405).json({ error: ErrorCodes.Method_Not_Allowed });
    }
};
