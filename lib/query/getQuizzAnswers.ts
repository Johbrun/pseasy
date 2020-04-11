import query from '../db';
import escape from 'sql-template-strings';
import { QuizzAnswer } from '../interfaces/quizz-answer.interface';

const getQuizzAnswers = async () => 
{
    return await query(
        escape`SELECT id, idQuestion, idUser, answer1Choice, answer2Choice, answer3Choice
      FROM quizzAnswer
      ORDER BY id`
    ).catch(e => console.error(e)) as QuizzAnswer[];
};

export default getQuizzAnswers;
