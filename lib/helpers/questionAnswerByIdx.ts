import { QuizzQuestion } from '../interfaces/quizz-question.interface';

export function questionAnswerByIdx(question: QuizzQuestion, idx : number) 
{
    switch (idx)
    {
    case 1 : return question.answer1;
    case 2 : return question.answer2;
    case 3 : return question.answer3;
    default : return '';
    }
}
