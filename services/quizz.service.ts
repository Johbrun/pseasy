import axios from 'axios';
import { QuizzQuestion, QuizzQuestionFull } from '../lib/interfaces/quizz-question.interface';
import { QuizzAnswer, QuizzAnswerCreation } from '../lib/interfaces/quizz-answer.interface';

let quizzQuestions: QuizzQuestion[] = [];
let quizzAnswers: QuizzAnswer[] = [];

const fetchQuizzQuestions = async () => 
{
    console.log('Fetch quizz questions...');
    quizzQuestions = (await axios.request({
        url: `${process.env.API_URL}/api/quizz-questions`
    })).data as QuizzQuestionFull[];
    console.log('Fetch quizz questions [OK]');

    return quizzQuestions;
};

const fetchQuizzAnswers = async (idUser : string) => 
{
    console.log('Fetch quizz answers...');
    quizzAnswers = (await axios.request({
        url: `${process.env.API_URL}/api/quizz-answers/${idUser}`
    })).data as QuizzAnswer[];
    console.log('Fetch quizz answers [OK]');
    console.log(quizzAnswers);
    return quizzAnswers;
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
};
export {
    fetchQuizzAnswers,
    fetchQuizzQuestions,
    insertQuizzAnswer
};