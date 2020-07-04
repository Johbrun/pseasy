/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import {
    SheetLight,
    SheetExtended,
} from '../../lib/interfaces/sheet.interface';
import { Category } from '../../lib/interfaces/category.interface';
import Footer from '../../components/footer';
import {
    fetchSheetsLight,
    fetchSheetByReference,
} from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import { Typography, Grid, Button, Card, CardContent } from '@material-ui/core';
import theme from '../../theme';
import {
    fetchQuizzQuestions,
    insertQuizzAnswer,
} from '../../services/quizz.service';
import { QuizzQuestionFull } from '../../lib/interfaces/quizz-question.interface';
import { QuizzAnswerCreation } from '../../lib/interfaces/quizz-answer.interface';
import { postVisit } from '../../services/visit.service';
import ResultModal from '../../components/resultModal';
import computeScore from '../../lib/helpers/computeScore';
import SheetModal from '../../components/sheetModal';
import QuizzQuestion from '../../components/quizzQuestion';

interface IProps {
    sheetsLight: SheetLight[];
    categories: Category[];
    quizzQuestions: QuizzQuestionFull[];
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontSize: '0.875rem',
            fontFamily: "'Avenir', 'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontWeight: 400,
            lineHeight: '1.73',
            letterSpacing: '0.01071em',
            background: 'rgba(62, 72, 110, 0.05)',
            flex: 1,
            '& h1': {
                textAlign: 'center',
            },
        },
        content: {
            display: 'flex',
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        divCompleted: {
            backgroundColor: 'aliceblue',
            marginBottom: '25px',
        },
        validate: {
            margin: '30px',
        },
        quizzGrid: {
            padding: '25px',
        },
    })
);

const QuizzPage: NextPage<IProps> = ({ quizzQuestions }) => {
    const isClientSide = typeof window !== 'undefined';

    const classes = useStyles();

    const localAnswers = isClientSide ? localStorage.getItem('answers') : 0;
    const quizzAnswers = localAnswers ? JSON.parse(localAnswers) : [];
    const [answers, setAnswers] = React.useState<QuizzAnswerCreation[]>(
        quizzAnswers
    );
    const [completed, setCompleted] = React.useState<boolean>(
        quizzAnswers.length > 0
    );
    const [displayModale, setDisplayModale] = React.useState<boolean>(false);
    const [sheet, setSheet] = React.useState<SheetExtended | undefined>(
        undefined
    );

    if (answers.length === 0) {
        const tmp = quizzQuestions.map((qq) => {
            return {
                idQuestion: qq.id,
                answer1Choice: false,
                answer2Choice: false,
                answer3Choice: false,
            } as QuizzAnswerCreation;
        });
        setAnswers(tmp);
    }

    const handleChange = (idQuestion: number, idx: number) => {
        let question = answers.find((a) => a.idQuestion === idQuestion);
        if (question) {
            switch (idx) {
                case 1:
                    question.answer1Choice = !question.answer1Choice;
                    break;
                case 2:
                    question.answer2Choice = !question.answer2Choice;
                    break;
                case 3:
                    question.answer3Choice = !question.answer3Choice;
                    break;
            }
            setAnswers([...answers]);
        }
    };

    const handleClickValidate = async () => {
        await insertQuizzAnswer(answers);
        setCompleted(true);
        setDisplayModale(true);
        if (isClientSide)
            localStorage.setItem('answers', JSON.stringify(answers));
    };

    const handleOpenSheet = async (reference: string) => {
        const sheet = await fetchSheetByReference(reference);
        setSheet(sheet);
    };

    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Fiches PSE</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <CssBaseline />
            <div className={classes.content}>
                <SearchAppBar />

                <main className={classes.root}>
                    <div className={classes.drawerHeader} />
                    <h1>Quizz</h1>

                    {completed && (
                        <Card className={classes.divCompleted}>
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    Vous avez obtenu{' '}
                                    {computeScore(quizzQuestions, answers)}% de
                                    bonnes réponses au quizz ! Ci-dessous les
                                    réponses en vert, ainsi que les explications
                                    associées. Pour plus de détail, cliquer sur
                                    "Consulter la fiche" pour ouvrir la fiche
                                    associée
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                    {answers && (
                        <div>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.quizzGrid}
                            >
                                {quizzQuestions.map((qq: QuizzQuestionFull) => (
                                    <QuizzQuestion
                                        key={qq.id}
                                        question={qq}
                                        answers={answers.find(
                                            (a) => a.idQuestion === qq.id
                                        )}
                                        completed={completed}
                                        handleChange={handleChange}
                                        handleOpenSheet={handleOpenSheet}
                                    />
                                ))}
                                {!completed && (
                                    <Button
                                        className={classes.validate}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleClickValidate}
                                    >
                                        Valider les réponses
                                    </Button>
                                )}
                            </Grid>
                        </div>
                    )}

                    {displayModale && (
                        <ResultModal
                            value={computeScore(quizzQuestions, answers)}
                        />
                    )}
                    {sheet && (
                        <SheetModal
                            sheet={sheet}
                            onClose={() => setSheet(undefined)}
                        />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

QuizzPage.getInitialProps = async ({ req }) => {
    if (req) postVisit(req);
    /* const responseVisit = (await postVisit(req));
    const idUser = responseVisit ? responseVisit.idUser : '';*/

    const start = +new Date();

    const apiCalls: Promise<any>[] = [
        fetchSheetsLight(),
        fetchCategories(),
        fetchQuizzQuestions(),
    ];
    const [sheetsLight, categories, quizzQuestions] = await Promise.all(
        apiCalls
    );

    const end = +new Date();
    console.log(
        `Data fetched Count: ${quizzQuestions.length} in ${
            (end - start) / 1000
        } seconds`
    );

    return {
        sheetsLight: sheetsLight,
        categories,
        quizzQuestions: quizzQuestions as QuizzQuestionFull[],
    };
};

export default QuizzPage;
