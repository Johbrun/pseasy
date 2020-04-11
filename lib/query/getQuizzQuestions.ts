import query from '../db';
import escape from 'sql-template-strings';

const getQuizzQuestions = async () => 
{
    return await query(
        escape`SELECT id, sheetReference, difficulty, question, explaination, 
        answer1, answer2, answer3, answer1IsOk, answer2IsOk, answer3IsOk
      FROM quizzQuestion
      ORDER BY id`
    ).catch(e => console.error(e));
};

export default getQuizzQuestions;
