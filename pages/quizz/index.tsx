/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import { SheetLight } from '../../lib/interfaces/sheet.interface';
import { Category } from '../../lib/interfaces/category.interface';
import Footer from '../../components/footer';
import { fetchSheetsLight } from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import { Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Grid, Button } from '@material-ui/core';
import theme from '../../theme';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { fetchQuizzQuestions, insertQuizzAnswer } from '../../services/quizz.service';
import { QuizzQuestion } from '../../lib/interfaces/quizz-question.interface';
import { QuizzAnswer, QuizzAnswerCreation } from '../../lib/interfaces/quizz-answer.interface';

interface IProps {
    sheetsLight: SheetLight[];
    categories: Category[];
    quizzQuestions: QuizzQuestion[];
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontSize: '0.875rem',
            fontFamily: '\'Avenir\', \'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
            fontWeight: 400,
            lineHeight: '1.73',
            letterSpacing: '0.01071em'
        },
        content: {
            display: 'flex',
            padding: 20
        },
        formControl: {
            margin: theme.spacing(3),
        },
        explainations: {
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end'
        },
    })
);

const QuizzPage: NextPage<IProps> = ({ quizzQuestions }) => 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // const [state, setState] = React.useState({
    //     gilad: true,
    //     jason: false,
    //     antoine: false,
    // });
    // const { gilad, jason, antoine } = state;
    let a = quizzQuestions.map(qq => 
    {
        return { idQuestion: qq.id, answer1Choice: false, answer2Choice: false, answer3Choice: false } as QuizzAnswerCreation;
    });

    const [answers, setAnswers] = React.useState<QuizzAnswerCreation[]>(a);

    const handleChange = (idQuestion: number, idx: number) => 
    {
        let question = answers.find(a => a.idQuestion === idQuestion);
        if (question)
        {
            switch (idx) 
            {
            case 1: question.answer1Choice = !question.answer1Choice; break;
            case 2: question.answer2Choice = !question.answer2Choice; break;
            case 3: question.answer3Choice = !question.answer3Choice; break;
            }
            setAnswers([...answers]);
        }
       
    };

    const getAnswerByQuestion = (idQuestion: number, idx: number) => 
    {
        let answer;
        switch (idx) 
        {
        case 1: answer = answers.find(a => a.idQuestion === idQuestion)?.answer1Choice; break;
        case 2: answer = answers.find(a => a.idQuestion === idQuestion)?.answer2Choice; break;
        case 3: answer = answers.find(a => a.idQuestion === idQuestion)?.answer3Choice; break;
        default: answer = false;
        }
        return answer ? answer : false;
    };

    const handleClickValidate = async () => 
    {
        const solutions = await insertQuizzAnswer(answers);
        console.log(solutions);
    }

    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Fiches PSE</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <CssBaseline />
            <div className={classes.content}>
                <SearchAppBar open={open} setOpen={setOpen} title={'Référentiel PSE - Quizz'} />

                {/* <SideDrawer open={open} setOpen={setOpen} categories={categories} sheetsLight={sheetsLight} /> */}

                <main>
                    <div className={classes.drawerHeader} />
                    <h1>Quizz</h1>

                    <Typography className={classes.explainations}>

                        Vous pensez tout savoir du référenciel PSE ? Personne n'en sait autant que vous ? Alors testez vos connaissance ci dessous. Notez que vous n'avez évidemment pas le droit de consulter le référenciel durant le quizz !  <br />
                        <AssignmentIcon /> Veuillez ne pas quitter la page durant la complétion du quizz.

                    </Typography>
                    <Grid container spacing={3}>
                        {quizzQuestions.map((qq: QuizzQuestion, i: number) =>
                            <Grid key={qq.id} item xs={12} sm={6} md={4}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">{i + 1}. {qq.question}</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={getAnswerByQuestion(qq.id, 1)} onChange={() => handleChange(qq.id, 1)} />}
                                            label={qq.answer1}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={getAnswerByQuestion(qq.id, 2)} onChange={() => handleChange(qq.id, 2)} />}
                                            label={qq.answer2}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={getAnswerByQuestion(qq.id, 3)} onChange={() => handleChange(qq.id, 3)} />}
                                            label={qq.answer3}
                                        />
                                    </FormGroup>
                                    <FormHelperText>PSE{qq.level} - Difficulté {qq.difficulty} </FormHelperText>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>

                    <Button variant="contained" color="primary" onClick={handleClickValidate}>
                                                Valider les réponses
                                            </Button>
                </main>
            </div>
            <Footer />
        </div>
    );
};

QuizzPage.getInitialProps = async () => 
{
    const start = +new Date();

    const apiCalls: Promise<any>[] = [fetchSheetsLight(), fetchCategories(), fetchQuizzQuestions()];
    const [sheetsLight, categories, quizzQuestions] = await Promise.all(apiCalls);

    const end = +new Date();
    console.log(`Data fetched Count: ${quizzQuestions.length} in ${(end - start) / 1000} seconds`);

    return {
        sheetsLight: sheetsLight,
        categories,
        quizzQuestions: quizzQuestions as QuizzQuestion[]
    };
};

export default QuizzPage;
