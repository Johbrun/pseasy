/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import SideDrawer from '../../components/drawer';
import SheetContent from '../../components/sheetContent';
import { SheetLight, SheetExtended } from '../../lib/interfaces/sheet.interface';
import { Category } from '../../lib/interfaces/category.interface';
import CategoriesSheetsList from '../../components/categoriesSheetsList';
import Footer from '../../components/footer';
import { fetchSheetByReference, fetchSheetsLight } from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import { Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Grid } from '@material-ui/core';
import theme from '../../theme';
import AssignmentIcon from '@material-ui/icons/Assignment';

interface IProps {
    sheetsLight: SheetLight[];
    categories: Category[];
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
            marginTop : 40,
            padding : 20
        },
        formControl: {
            margin: theme.spacing(3),
        },
        explainations : {
        }
    })
);

const QuizzPage: NextPage<IProps> = ({  sheetsLight, categories  }) => 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });
    const { gilad, jason, antoine } = state;

    const handleChange = (event:any) => 
    {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    
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

                    Vous pensez tout savoir du référenciel PSE ? Personne n'en sait aucun que vous ? Alors testez vos connaissance ci dessous. Notez que vous n'avez évidemment pas le droit de consulter le référenciel durant le quizz !  <br/>
                        <AssignmentIcon/> Changez de page et vos réponses seront effacées.

                    </Typography>
                    <Grid container spacing={3}>
                        {[1,2,3,4].map(e => 
                            <Grid key={e} item xs={12} sm={6} md={4}>
                                <FormControl  component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Question 1 : Quelle est la couleur du cheval blanc d'Henri IV ?</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                                            label="Gilad Gray"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                                            label="Jason Killian"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                                            label="Antoine Llorca"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Niveau 1</FormHelperText>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>
                </main>
            </div>
            <Footer />
        </div>
    );
};

QuizzPage.getInitialProps = async ({ query }) => 
{
    const start = +new Date();

    const apiCalls: Promise<any>[] = [fetchSheetsLight(), fetchCategories()];

    const [sheetsLight, categories] = await Promise.all(apiCalls);

    const end = +new Date();
    console.log(`Data fetchedc Count: ${sheetsLight.length} in ${(end - start) / 1000} seconds`);

    return {
        sheetsLight : sheetsLight,
        categories
    };
};

export default QuizzPage;
