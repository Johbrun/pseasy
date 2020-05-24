import query from '../db';
import escape from 'sql-template-strings';
import { QuizzStat } from '../interfaces/quizz-stat.interface';

const updateQuizzStat = async (quizzStat : QuizzStat) => 
{
    return await query(escape`
    UPDATE quizzStat SET nbAnswers = ${quizzStat.nbAnswers}, nbFirstOk = ${quizzStat.nbFirstOk}
    where (idQuestion = ${quizzStat.idQuestion})`
    ).catch(e => console.error(e));
};

export default updateQuizzStat;
