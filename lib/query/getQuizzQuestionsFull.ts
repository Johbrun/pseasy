import query from '../db';
import escape from 'sql-template-strings';
import { QuizzQuestionFull } from '../interfaces/quizz-question.interface';

const getQuizzQuestionsFull = async () => {
    return (await query(
        escape`SELECT id, sheetReference, difficulty, question, explaination,
      answer1IsOk, answer2IsOk, answer3IsOk
    FROM quizzQuestion
    ORDER BY id`
    ).catch((e) => console.error(e))) as QuizzQuestionFull[];
};

export default getQuizzQuestionsFull;
