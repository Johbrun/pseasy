import query from '../db';
import escape from 'sql-template-strings';
import { QuizzAnswerCreation } from '../interfaces/quizz-answer.interface';

const insertQuizzAnswers = async (quizzAnswer: QuizzAnswerCreation) => {
    return await query(escape`
      INSERT INTO quizzAnswer (idQuestion, idUser, answer1Choice, answer2Choice, answer3Choice)
      VALUES (${quizzAnswer.idQuestion},${quizzAnswer.idUser}, 
      ${quizzAnswer.answer1Choice}, ${quizzAnswer.answer2Choice}, ${quizzAnswer.answer3Choice})`).catch(
        (e) => console.error(e)
    );
};

export default insertQuizzAnswers;
