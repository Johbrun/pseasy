import * as express from 'express';
import { ErrorCodes } from '../errorCodes';
import getQuizzQuestions from '../../../lib/query/getQuizzQuestions';
import { queryToVisitUser } from '../../../lib/helpers/queryToUserVisit';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';
import insertQuizzAnswers from '../../../lib/query/insertQuizzAnswers';
import { TableBody } from 'material-ui';
import { QuizzAnswerCreation } from '../../../lib/interfaces/quizz-answer.interface';
import { User, UserScore } from '../../../lib/interfaces/user.interface';
import getTopQuizz from '../../../lib/query/getTopQuizz';
import getQuizzQuestionsFull from '../../../lib/query/getQuizzQuestionsFull';
import getQuizzAnswers from '../../../lib/query/getQuizzAnswers';
import getUsers from '../../../lib/query/getUsers';

module.exports = async (req: express.Request, res: express.Response) => 
{
    try 
    {
        await saveNewVisitor( queryToVisitUser(req));
    }
    catch (e) 
    {
        console.error(e);
    }

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') 
    {
        const questions =  await getQuizzQuestionsFull();
        const answers =  await getQuizzAnswers() ;
        const users =  await getUsers();
        console.log(users);

        const userIds = [...new Set( answers.map(a => a.idUser))];
        console.log(userIds);
        const results = Array<UserScore>();

        userIds.forEach(uId => 
        {
            let score = 0;
            questions.forEach(response => 
            {
                const answer = answers.find(a => a.idUser === uId && a.idQuestion === response.id);
                if (answer?.answer1Choice === response.answer1IsOk 
                    && answer?.answer2Choice === response.answer2IsOk 
                    && answer?.answer3Choice === response.answer3IsOk )
                {
                    score++;
                }
            });
            const user = users.find(u => u.id === uId);

            // insert only user with name in leaderbord
            if (user && user.name)
            {
                console.log(score, questions.length);
                score = Math.floor((score / questions.length) * 100);
                results.push({name : user.name, score});
            }
        });
        results.sort((u1, u2) => u2.score - u1.score);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
    }
    else 
    {
        res.status(405).json({ error: ErrorCodes.Method_Not_Allowed });
    }
};
