import query from '../db';
import escape from 'sql-template-strings';
import { QuizzStat } from '../interfaces/quizz-stat.interface';

const getQuizzStats = async () : Promise<QuizzStat[]> => 
{
    const qStats = await query(
        escape`SELECT id, idQuestion, nbAnswers, nbFirstOk FROM quizzStat ORDER BY id`
    ).catch(e => console.error(e));

    return qStats as QuizzStat[];
};

export default getQuizzStats;
