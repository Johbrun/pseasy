/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */

import { makeStyles, FormControl, FormLabel, FormHelperText, FormGroup } from '@material-ui/core';
import QuizzCheckboxAnswer from './quizzCheckboxAnswer';
import { questionAnswerByIdx } from '../lib/helpers/questionAnswerByIdx';
import { answersOk } from '../lib/helpers/answersOk';
import QuizzExplaination from './quizzExplaination';
import computeScore from '../lib/helpers/computeScore';
import { QuizzQuestionFull } from '../lib/interfaces/quizz-question.interface';
import { QuizzAnswerCreation } from '../lib/interfaces/quizz-answer.interface';
import theme from '../theme';


const useStyles = makeStyles({
    root: {
        padding: theme.spacing(1),
        backgroundColor : 'white',
        border: '1px solid #dadce0',
        marginTop: '12px',
        borderRadius: '8px',
        width: '640px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    formControl: {
        margin: theme.spacing(3),
        '& > legend' : {
            color : '#202124',
            fontSize : '19px'
        },
        '& p': {
            fontSize : '13px'
        }
    },

});
interface IProps {
    question : QuizzQuestionFull;
    answers : QuizzAnswerCreation |undefined;
    completed : boolean;
    handleChange: (idQuestion: number, idx: number) => void;
    handleOpenSheet: (reference: string) => Promise<void>;
}

export default function QuizzQuestion(props: IProps) 
{
    const classes = useStyles();
    const choiceByQuestion = ( idx: number) => 
    {
        let answerChoices = props.answers;
        if (!answerChoices) return false;

        switch (idx) 
        {
        case 1:
            return Boolean(answerChoices.answer1Choice);
        case 2:
            return Boolean(answerChoices.answer2Choice);
        case 3:
            return Boolean(answerChoices.answer3Choice);
        default:
            return false;
        }
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                    {props.question.question}
                </FormLabel>
                <FormHelperText>
PSE{props.question.level} - Difficulté {props.question.difficulty}{' '}
                </FormHelperText>
                <FormGroup>
                    {[1, 2, 3].map((idx) => (
                        <QuizzCheckboxAnswer
                            key={idx}
                            question={props.question}
                            checked={choiceByQuestion( idx)}
                            disabled={props.completed}
                            answer={questionAnswerByIdx(props.question, idx)}
                            right={props.completed && answersOk(props.question).includes(idx)}
                            onChange={() => props.handleChange(props.question.id, idx)}
                        />
                    ))}
                </FormGroup>
                {props.completed  && props.question.explaination && (
                    <QuizzExplaination
                        correct={computeScore([props.question], [props.answers]) === 100}
                        text={props.question.explaination}
                        reference={props.question.sheetReference}
                        handler={(ref: string) => props.handleOpenSheet(ref)}
                    />
                )}
            </FormControl>
        </div>
    );
}