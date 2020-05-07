import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ClassIcon from '@material-ui/icons/Class';
import BallotIcon from '@material-ui/icons/Ballot';
import SearchIcon from '@material-ui/icons/Search';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import clsx from 'clsx';

import {
    makeStyles,
    createStyles,
    CssBaseline,
    Typography,
    Theme,
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core';
import SearchAppBar from '../../components/nav';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import CommentIcon from '@material-ui/icons/Comment';
import { useRouter } from 'next/router';
import Footer from '../../components/footer';
import { postVisit } from '../../services/visit.service';
import WarningModal from '../../components/warningModal';

const getIconElementFromName = (icon: IconsCard, classes: any) => 
{

    switch (icon) 
    {
    case IconsCard.App: return <PhoneIphoneIcon className={classes.cardMedia} />;
    case IconsCard.Classement: return <ClassIcon className={classes.cardMedia} />;
    case IconsCard.Differences: return <CompareArrowsIcon className={classes.cardMedia} />;
    case IconsCard.Fiches: return <BallotIcon className={classes.cardMedia} />;
    case IconsCard.Historique: return <ScheduleIcon className={classes.cardMedia} />;
    case IconsCard.HorsLigne: return <CloudOffIcon className={classes.cardMedia} />;
    case IconsCard.Recherche: return <SearchIcon className={classes.cardMedia} />;
    case IconsCard.Comment: return <CommentIcon className={classes.cardMedia} />;
    case IconsCard.Quizz: return <HelpOutlineIcon className={classes.cardMedia} />;
    }
};

enum IconsCard {
    Fiches, Classement, Recherche, HorsLigne, App, Historique, Differences, Comment, Quizz
}

const cards: { title: string; content: string; icon: IconsCard, status: string }[] = [
    {
        title: 'Fiches PSE à jour',
        content:
            'Consultez la version des fiches du référentiel revu en Septembre 2019',
        icon: IconsCard.Fiches,
        status: 'Opérationnel'
    },
    {
        title: 'Classement par catégories',
        content:
            'Rerouvez facilement la fiche en utilisant l\'affichage par catégorie',
        icon: IconsCard.Classement,
        status: 'Opérationnel'
    },
    {
        title: 'Historique',
        content: 'Consultez les anciennes versions des fiches facilement',
        icon: IconsCard.Historique,
        status: 'Opérationnel'
    },
    {
        title: 'Affichage des différences',
        content:
            'Affichez les nouveautés de contenu des fiches entre les différentes mises à jour',
        icon: IconsCard.Differences,
        status: 'Opérationnel'
    },
    {
        title: 'Quizz',
        content:
            'Testez vos connaissances du référentiel',
        icon: IconsCard.Quizz,
        status: 'Opérationnel'
    },
    {
        title: 'Mode hors ligne',
        content: 'Profitez de l\'application même sans connexion à l\'Internet',
        icon: IconsCard.HorsLigne,
        status: 'Prévu T2 2020'
    },
    {
        title: 'Mode \'App\'',
        content:
            'Lancez l\'application directement depuis le menu de votre téléphone',
        icon: IconsCard.App,
        status: 'Prévu T2 2020'
    },
    {
        title: 'Recherche par mot clé',
        content:
            'Retrouvez toutes les fiches en lien avec un ou plusieurs mots clés',
        icon: IconsCard.Recherche,
        status: 'Prévu T3 2020'
    },
    {
        title: 'Echangez',
        content:
            'Une interrogation, un flou ? Surligner la partie intéressée, poser votre question, la communauté vous répondra !',
        icon: IconsCard.Comment,
        status: 'Prévu T3 2020'
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background : 'rgba(62, 72, 110, 0.05)'
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end'
        },
        icon: {
            marginRight: theme.spacing(2)
        },
        heroContent: {
            padding: theme.spacing(8, 0, 6),
            color: 'white'
        },
        heroButtons: {
            marginTop: theme.spacing(4)
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8)
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            textAlign: 'center',
            '&:hover': {
                color:' rgb(62, 72, 110)',
                boxShadow: 'rgba(121, 148, 212, 0.4) 0px 1rem 2rem',
                transform: 'translateY(-2px)'
            }
        },
        cardTitle: {
            fontSize: '15px',
            fontWeight: 800,
            textTransform: 'uppercase'
        },
        cardMedia: {
            paddingTop: '0.25%',
            height: '115px !important',
            fontSize: '82px !important',
            color: theme.palette.primary.main,
            margin: 'auto'
        },
        cardContent: {
            flexGrow: 1
        },

        divTitle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: '500px'
        },
        imgTitle: {
            position: 'absolute',
            zIndex: -1,
            height: '100%',
            width: ' 100%',
            objectFit: 'cover',
        },
        title1: {
            fontSize: '5rem',
            fontWeight: 400,
            textShadow: '1px 1px 2px black'
        },
        title2: {
            fontWeight: 400,
            color: 'white',
            textShadow: '1px 1px 2px black'
        },
        statusChip: {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
        },
        statusChipNok: {
            backgroundColor: 'red'
        },
    })
);

const Home: NextPage<{}> = () => 
{
    const classes = useStyles();
    const router = useRouter();

    const handleClickSheets = () => 
    {
        router.push('/sheets');
    };

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
            <React.Fragment>
                <CssBaseline />
                <SearchAppBar />

                <WarningModal />
                <main>
                    <div className={classes.drawerHeader} />
                    {/* Hero unit */}
                    <div className={classes.divTitle}>
                        <img
                            className={classes.imgTitle}
                            src="cover.jpg"
                        />
                        <div className={classes.heroContent}>
                            <Container maxWidth="sm">
                                <Typography
                                    component="h1"
                                    variant="h2"
                                    align="center"
                                    gutterBottom
                                    className={classes.title1}
                                >
                                    PSEasy
                                </Typography>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="textSecondary"
                                    className={classes.title2}
                                    paragraph
                                >
                                    PSEasy est une application permettant la consultation des
                                    recommandations et référentiels relatifs au secourisme en
                                    France.
                                </Typography>
                                <div className={classes.heroButtons}>
                                    <Grid container spacing={2} justify="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary" onClick={handleClickSheets}>
                                                Consulter les fiches
                                            </Button>
                                        </Grid>
                                       
                                    </Grid>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {cards.map(card => (
                                <Grid item key={card.title} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        {/* {...card.icon} */}
                                        {getIconElementFromName(card.icon, classes)}
                                        {/* <CameraIcon className={classes.cardMedia} />{" "} */}
                                        {/* <Icon className={classes.cardMedia}>{card.icon}</Icon> */}
                                        {/* <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    /> */}
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom className={classes.cardTitle}>
                                                {card.title}
                                            </Typography>
                                            <Typography>{card.content}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Chip label={card.status} className={
                                                clsx(classes.statusChip, {
                                                    [classes.statusChipNok]: card.status !== 'Opérationnel'
                                                })} />

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
  
                <Footer />
            </React.Fragment>
           
        </div>
    );
};

Home.getInitialProps = async ({ req }) => 
{
    console.log('GetInitialProps index');
    if (req) postVisit(req);

    return { userAgent: req ? req.headers['userAgent'] : null };
};

export default Home;
