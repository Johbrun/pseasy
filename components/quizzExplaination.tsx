/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { makeStyles, Theme, createStyles, Grid, TextField, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    correct : {
        color : 'green',
        fontWeight: 800
    },
    incorrect : {
        color : 'red',
        fontWeight: 800
    }
});
interface IProps {
    text: string;
    reference : string;
    correct : boolean;
    handler : (ref: string) => void;
    icon? : string;
}

export default function QuizzExplaination(props: IProps) 
{
    const classes = useStyles();
    const title = props.correct ? 'Bonne réponse !' : 'Réponse incorrecte' ;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography  className={clsx(classes.title, {
                    [classes.correct]: props.correct,
                    [classes.incorrect] : !props.correct
                })} color="textSecondary" gutterBottom>
                    { title}
                </Typography> 
                <Typography variant="body2" component="p">
                    {props.text}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.handler(props.reference)}>En savoir plus</Button>
            </CardActions>
            
        </Card>
    );
}