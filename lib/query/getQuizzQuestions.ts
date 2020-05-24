import query from '../db';
import escape from 'sql-template-strings';
import { QuizzQuestion } from '../interfaces/quizz-question.interface';

const getQuizzQuestions = async () : Promise<QuizzQuestion[]> => 
{
    const questions = await query(
        escape`SELECT id, sheetReference, difficulty, question, explaination, 
        answer1, answer2, answer3, answer1IsOk, answer2IsOk, answer3IsOk
      FROM quizzQuestion
      ORDER BY id`
    ).catch(e => console.error(e));

    return questions as QuizzQuestion[];
};

export default getQuizzQuestions;
