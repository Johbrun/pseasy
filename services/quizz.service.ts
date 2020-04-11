import axios from 'axios';
import { QuizzQuestion, QuizzQuestionFull } from '../lib/interfaces/quizz-question.interface';
import { QuizzAnswer, QuizzAnswerCreation } from '../lib/interfaces/quizz-answer.interface';

let quizzQuestions: QuizzQuestion[] = [];

const fetchQuizzQuestions = async (noCache: boolean = false) => 
{
    console.log('Fetch quizz questions...');
    quizzQuestions = (await axios.request({
        url: `${process.env.API_URL}/api/quizz-questions`
    })).data as QuizzQuestion[];
    console.log('Fetch quizz questions [OK]');

    return quizzQuestions;
};

const insertQuizzAnswer = async(quizzAnswers : QuizzAnswerCreation[]) => 
{
    console.log('Send quizz answers...');
    const quizzQuestionsFull = (await axios.request({
        url: `${process.env.API_URL}/api/quizz-answers`,
        method : 'POST',
        data : quizzAnswers
    })).data as QuizzQuestionFull[];
    console.log('Send quizz answers [OK]');

    return quizzQuestionsFull;
}
export {
    fetchQuizzQuestions,
    insertQuizzAnswer
};