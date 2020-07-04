/* eslint-disable react/react-in-jsx-scope */

import {
    makeStyles,
    createStyles,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import { QuizzQuestion } from '../lib/interfaces/quizz-question.interface';
import clsx from 'clsx';

interface IProps {
    question: QuizzQuestion;
    checked: boolean;
    disabled: boolean;
    answer: string;
    right: boolean;
    onChange: any;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '&:hover': {
                color: 'gray',
            },
        },
        rightAnswer: {
            color: 'green',
        },
        falseAnswer: {
            color: 'red',
        },
        disabled: {
            cursor: 'inherit',
        },
    })
);

export default function QuizzCheckboxAnswer(props: IProps) {
    const classes = useStyles();
    const className = clsx({
        [classes.rightAnswer]: props.right,
        [classes.disabled]: props.disabled,
    });
    return (
        <div className={classes.root}>
            <FormControlLabel
                control={
                    <Checkbox
                        className={className}
                        disabled={props.disabled && !props.right}
                        checked={props.checked}
                        onChange={!props.disabled ? props.onChange : () => {}}
                    />
                }
                label={props.answer}
            />
        </div>
    );
}
