/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import {
    SheetLight,
} from '../../lib/interfaces/sheet.interface';
import { Category } from '../../lib/interfaces/category.interface';
import Footer from '../../components/footer';
import {
    fetchSheets,
} from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import {
    Typography,
} from '@material-ui/core';
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
            letterSpacing: '0.01071em',
        },
        content: {
            display: 'flex',
            padding: 20,
        },
        formControl: {
            margin: theme.spacing(3),
        },
        explainations: {},
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    })
);

const AboutPage: NextPage<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy</title>
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
                <main>
                    <div className={classes.drawerHeader} />
                    <h1>A propos de PSEasy</h1>

                    <h2>Pourquoi cette application ?</h2>
                    <p>
                        <Typography className={classes.explainations}>
                            PSEasy est né pour diverses raisons. Avant tout,
                            elle est là pour permettre l&apos;accès à l&apos;information
                            facilement, avec ou sans réseau, par n&apos;importe quel
                            secouriste. La connaissance étant quelle chose qui
                            doit être travaillée, il faut alors pourvoir en tout
                            temps y avoir accès.
                        </Typography>
                    </p>

                    <h2>Public visé</h2>
                    <p>
                        <Typography
                            className={classes.explainations}
                        ></Typography>
                    </p>

                    <h2>Avertissements</h2>
                    <p>
                        <Typography className={classes.explainations}>
                            En écriture...
                        </Typography>
                    </p>

                    <h2>Fonctionnalités futures</h2>
                    <p>
                        <Typography className={classes.explainations}>
                            En écriture... Mais une chose est sûre : rendre ça
                            un peu plus design :)
                        </Typography>
                    </p>

                    <h2>Nous contacter</h2>
                    <Typography className={classes.explainations}>
                        Vous avez une idée pour améliorer le site ? Une proposition de partenariat
                        ? <br />
                        PSeasy est une application en plein développement !
                        N&apos;hésitez pas à nous contacter à l&apos;adresse suivante :
                        <AssignmentIcon /> pseasy[at]protonmail.com
                    </Typography>
                </main>
            </div>
            <Footer />
        </div>
    );
};

const getServerSideProps = async () => {
    const start = +new Date();

    const apiCalls: Promise<any>[] = [fetchSheets(true), fetchCategories()];

    const [sheetsLight, categories] = await Promise.all(apiCalls);

    const end = +new Date();
    console.log(
        `Data fetched Count: ${sheetsLight.length} in ${
            (end - start) / 1000
        } seconds`
    );

    return {
        sheetsLight: sheetsLight,
        categories,
    };
};

export { getServerSideProps };
export default AboutPage;
