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
                            PSEasy est n?? pour diverses raisons. Avant tout,
                            elle est l?? pour permettre l&apos;acc??s ?? l&apos;information
                            facilement, avec ou sans r??seau, par n&apos;importe quel
                            secouriste. La connaissance ??tant quelle chose qui
                            doit ??tre travaill??e, il faut alors pourvoir en tout
                            temps y avoir acc??s.
                        </Typography>
                    </p>

                    <h2>Public vis??</h2>
                    <p>
                        <Typography
                            className={classes.explainations}
                        ></Typography>
                    </p>

                    <h2>Avertissements</h2>
                    <p>
                        <Typography className={classes.explainations}>
                            En ??criture...
                        </Typography>
                    </p>

                    <h2>Fonctionnalit??s futures</h2>
                    <p>
                        <Typography className={classes.explainations}>
                            En ??criture... Mais une chose est s??re : rendre ??a
                            un peu plus design :)
                        </Typography>
                    </p>

                    <h2>Nous contacter</h2>
                    <Typography className={classes.explainations}>
                        Vous avez une id??e pour am??liorer le site ? Une proposition de partenariat
                        ? <br />
                        PSeasy est une application en plein d??veloppement !
                        N&apos;h??sitez pas ?? nous contacter ?? l&apos;adresse suivante :
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
