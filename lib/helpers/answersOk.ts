import { QuizzQuestionFull } from '../interfaces/quizz-question.interface';

export function answersOk(question: QuizzQuestionFull) 
{
    const oks = [];
    if (question.answer1IsOk) oks.push(1);
    if (question.answer2IsOk) oks.push(2);
    if (question.answer3IsOk) oks.push(3);
    return oks;
}
