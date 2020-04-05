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
    AppBar,
    Toolbar,
    Container,
    Grid,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Icon
} from '@material-ui/core';
import SearchAppBar from '../../components/nav';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import CommentIcon from '@material-ui/icons/Comment';
import { useRouter } from 'next/router';
import Footer from '../../components/footer';
import { postVisit } from '../../services/visit.service';

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
        title: 'Recherche par mot clé',
        content:
      'Retrouvez toutes les fiches en lien avec un ou plusieurs mots clés',
        icon: IconsCard.Recherche,
        status: 'Prévu T1 2020'
    },
    {
        title: 'Mode hors ligne',
        content: 'Profitez de l\'application même sans connexion à l\'Internet',
        icon: IconsCard.HorsLigne,
        status: 'Prévu T1 2020'
    },
    {
        title: 'Mode \'App\'',
        content:
      'Lancez l\'application directement depuis le menu de votre téléphone',
        icon: IconsCard.App,
        status: 'Prévu T1 2020'
    },
    {
        title: 'Historique',
        content: 'Consultez les anciennes versions des fiches facilement',
        icon: IconsCard.Historique,
        status: 'Prévu T1 2020'
    },
    {
        title: 'Affichage des différences',
        content:
      'Affichez les nouveautés de contenu des fiches entre les différentes mises à jour',
        icon: IconsCard.Differences,
        status: 'Prévu T2 2020'
    },
    {
        title: 'Quizz',
        content:
      'Testez vos connaissances du référentiel',
        icon: IconsCard.Quizz,
        status: 'Prévu T2 2020'
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
        root: {},
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
            flexDirection: 'column'
        },
        cardMedia: {
            // paddingTop: "56.25%" // 16:9
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
        }
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
                <SearchAppBar title={'PSEasy - Fiches PSE'} />

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
                                            <Typography gutterBottom variant="h5" component="h2">
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
                {/* <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            PSEasy
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            PSEasy est une application autonome, qui n'est pas liée à {' '}
            <Link href="https://interieur.gouv.fr">interieur.gouv.fr</Link>, ni à quelconque instution officelle.
           <br />
            <Link href="https://www.interieur.gouv.fr/Le-ministere/Securite-civile/Documentation-technique/Secourisme-et-associations/Les-recommandations-et-les-referentiels/">Consultez les documents officiels</Link>{" "}

          </Typography>
          <br />
          <Copyright />
        </footer> */}
                <Footer />
                {/* End footer */}
            </React.Fragment>
            {/* <CssBaseline />
      <SearchAppBar title={"PSEasy"} />
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        <Typography>
          PSEasy est une plateforme de consultation des recommandations et
          référentiel relatifs au secourisme en France. Destiné avant tout aux
          secouristes formés, cette application a pour but de faciliter la
          consultation, la recherche et les nouveautés des fiches officielles.
        </Typography>
        <br />
        <Typography>
          PSEasy est une application autonome qui n'est pas liée à
          interieur.gouv.fr, ni à quelconque instution officelle.
          https://www.interieur.gouv.fr/Le-ministere/Securite-civile/Documentation-technique/Secourisme-et-associations/Les-recommandations-et-les-referentiels
        </Typography>
        <br />
        <Typography>Roadmap * sdfs *s dfsdsf</Typography>
        <br />
        <Typography>
          Pour tout contact de quelque nature, que ce soit pour des questions,
          des propositions de fonctionnalités ou encore pour signalier un bug,
          n'hésitez pas à envoyer un mail à contact[at]pseasy.fr.
        </Typography>
      </main> */}
        </div>
    );
};

Home.getInitialProps = async ({ req }) => 
{
    console.log('GetInitialProps index');
    postVisit(req);

    return {userAgent : req ? req.headers['userAgent'] : null};
};

export default Home;
