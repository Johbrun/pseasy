import * as express from 'express';
import { ErrorCodes } from '../../../lib/interfaces/errorCodes';
import { queryToVisitUser } from '../../../lib/helpers/queryToUserVisit';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';
import insertQuizzAnswers from '../../../lib/query/insertQuizzAnswers';
import { QuizzAnswerCreation } from '../../../lib/interfaces/quizz-answer.interface';
import getQuizzQuestionsFull from '../../../lib/query/getQuizzQuestionsFull';
import getQuizzStats from '../../../lib/query/getQuizzStats';
import insertQuizzStat from '../../../lib/query/insertQuizzStat';
import { QuizzStat } from '../../../lib/interfaces/quizz-stat.interface';
import computeScore from '../../../lib/helpers/computeScore';
import updateQuizzStat from '../../../lib/query/updateQuizzStat';

module.exports = async (req: express.Request, res: express.Response) => {
    let userId = '';
    try {
        userId = await saveNewVisitor(queryToVisitUser(req));
    } catch (e) {
        console.error(e);
    }
    console.log('userId', userId);

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') {
        // uncomment when accounts
        // const answers = await getQuizzAnswersByUserId(userId);
        // if (answers.length !== 0)
        // {
        //res.status(400).json({ error: ErrorCodes.Quizz_Already_Completed });
        //return;
        // }

        // update quizzStat (for the moment, we suppose that an user can be answawait getQuizzQuestions();er one only time)
        const questions = await getQuizzQuestionsFull();
        const stats = await getQuizzStats();

        const body = req.body as QuizzAnswerCreation[];
        for (const quizzAnswer of body) {
            quizzAnswer.idUser = userId;
            await insertQuizzAnswers(quizzAnswer);

            // add stat first response
            const question = questions.find(
                (q) => q.id === quizzAnswer.idQuestion
            );
            if (question) {
                let stat = stats.find((s) => s.idQuestion === question.id);
                if (!stat) {
                    stat = {
                        idQuestion: question.id,
                        nbAnswers: 0,
                        nbFirstOk: 0,
                    } as QuizzStat;
                    await insertQuizzStat(stat);
                }
                stat.nbAnswers++;
                const score = computeScore([question], [quizzAnswer]);
                if (score === 100) {
                    stat.nbFirstOk++;
                }
                // no need to wait
                updateQuizzStat(stat);
            }
        }

        const response = await getQuizzQuestionsFull();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } else {
        res.status(405).json({ error: ErrorCodes.Method_Not_Allowed });
    }
};
