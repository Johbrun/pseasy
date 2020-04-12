import { QuizzQuestionFull } from '../interfaces/quizz-question.interface';
import { QuizzAnswerCreation } from '../interfaces/quizz-answer.interface';


export default function computeScore(questions : QuizzQuestionFull[], answers : QuizzAnswerCreation[]) 
{
    console.log(questions);
    console.log(answers);
    let score = 0;
    questions.forEach(question => 
    {
        const answer = answers.find(a => a.idQuestion === question.id);
        if (answer?.answer1Choice === Boolean(question.answer1IsOk)
            && answer?.answer2Choice === Boolean(question.answer2IsOk) 
            && answer?.answer3Choice === Boolean(question.answer3IsOk) )
        {
            score++;
        }
    });
    score = Math.floor((score / questions.length) * 100);
    return score;
}
