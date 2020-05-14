import { QuizzQuestionFull } from '../interfaces/quizz-question.interface';
import { QuizzAnswerCreation } from '../interfaces/quizz-answer.interface';


export default function computeScore(questions : QuizzQuestionFull[], answers : Array<QuizzAnswerCreation|undefined>) 
{
    let score = 0;
    questions.forEach(question => 
    {
        const answer = answers.find(a => a && a.idQuestion === question.id);
        if (answer)
        {

            console.log(question, answer, Boolean(answer?.answer1Choice), Boolean(question.answer1IsOk));
            if (Boolean(answer?.answer1Choice) === Boolean(question.answer1IsOk)
            && Boolean(answer?.answer2Choice) === Boolean(question.answer2IsOk) 
            && Boolean(answer?.answer3Choice) === Boolean(question.answer3IsOk) )
            {
                score++;
            }
        }
    });
    score = Math.floor((score / questions.length) * 100);
    return score;
}
