import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ClassIcon from '@material-ui/icons/Class';
import BallotIcon from '@material-ui/icons/Ballot';
import SearchIcon from '@material-ui/icons/Search';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';

import {
    makeStyles,
    createStyles,
    CssBaseline,
    Theme,
} from '@material-ui/core';
import SearchAppBar from '../../components/nav';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import CommentIcon from '@material-ui/icons/Comment';
import { useRouter } from 'next/router';
import Footer from '../../components/footer';
import { postVisit } from '../../services/visit.service';
import { IncomingMessage } from 'http';
import HomePicture from '../../components/homePicture';
import CardIcon from '../../components/cardIcon';
import CardGrid from '../../components/cardGrid';
import { ICard } from '../../lib/interfaces/card.interface';

const cards: ICard[] = [
    {
        title: 'Fiches PSE à jour',
        content:
            'Consultez la version des fiches du référentiel revu en Septembre 2019',
        icon: <CardIcon icon={<BallotIcon/>}/>,
        status: 'Opérationnel',
    },
    {
        title: 'Classement par catégories',
        content:
            'Retrouvez facilement la fiche en utilisant l\'affichage par catégorie',
        icon: <CardIcon icon={<ClassIcon/>}/>,
        status: 'Opérationnel',
    },
    {
        title: 'Historique',
        content: 'Consultez les anciennes versions des fiches facilement',
        icon: <CardIcon icon={<ScheduleIcon/>}/>,
        status: 'Opérationnel',
    },
    {
        title: 'Affichage des différences',
        content:
            'Affichez les nouveautés de contenu des fiches entre les différentes mises à jour',
        icon: <CardIcon icon={<CompareArrowsIcon/>}/>,
        status: 'Opérationnel',
    },

    {
        title: 'Mode \'App\'',
        content:
            'Lancez l\'application directement depuis le menu de votre téléphone',
        icon: <CardIcon icon={<PhoneIphoneIcon/>}/>,
        status: 'Opérationnel',
    },
    {
        title: 'Mode hors ligne',
        content: 'Profitez de l\'application même sans connexion à l\'Internet',
        icon: <CardIcon icon={<CloudOffIcon/>}/>,
        status: 'Prévu T2 2020',
    },
    {
        title: 'Recherche par mot clé',
        content:
            'Retrouvez toutes les fiches en lien avec un ou plusieurs mots clés',
        icon: <CardIcon icon={<SearchIcon/>}/>,
        status: 'Prévu T4 2020',
    },
    {
        title: 'Echangez',
        content:
            'Une interrogation, un flou ? Surligner la partie intéressée, poser votre question, la communauté vous répondra !',
        icon: <CardIcon icon={<CommentIcon/>}/>,
        status: 'Prévu T4 2020',
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: 'rgba(62, 72, 110, 0.05)',
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        icon: {
            marginRight: theme.spacing(2),
        },
    })
);

const Home: NextPage<{}> = () => {
    const classes = useStyles();
    const router = useRouter();

    const handleClickSheets = () => router.push('/sheets');
    
    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Accueil</title>
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
            <SearchAppBar />

            <main>
                <div className={classes.drawerHeader} />
                <HomePicture onClick={handleClickSheets}/>
                <CardGrid cards={cards}/>
            </main>

            <Footer />
        </div>
    );
};

const getServerSideProps = async ( req : IncomingMessage ) => {
    console.log(' InitialProps index');
    if (req) postVisit(req);

    return { props: {} };
};

export { getServerSideProps };
export default Home;
