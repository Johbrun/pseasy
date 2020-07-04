import query from '../db';
import escape from 'sql-template-strings';
import { QuizzStatCreation } from '../interfaces/quizz-stat.interface';

const insertQuizzStat = async (quizzStat: QuizzStatCreation) => {
    return await query(escape`
      INSERT INTO quizzStat (idQuestion)
      VALUES (${quizzStat.idQuestion})`).catch((e) => console.error(e));
};

export default insertQuizzStat;
