/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import Link from 'next/link';


function Copyright() 
{
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
         Build {process.env.ENV} {process.env.BUILD_DATE}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '} PSEasy {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            backgroundColor: theme.palette.grey[300],
            padding: theme.spacing(6)
        },
    }));


export default function Footer() 
{
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                PSEasy
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
            >
                PSEasy n'est pas liée à {' '}
                <Link href="https://interieur.gouv.fr"><a>interieur.gouv.fr</a></Link>, ni à quelconque institution officielle.
                <br />
                <Link href="https://www.interieur.gouv.fr/Le-ministere/Securite-civile/Documentation-technique/Secourisme-et-associations/Les-recommandations-et-les-referentiels/">
                    <a>Consultez ici les documents officiels</a></Link>
            </Typography>
            <br />
            <Copyright />
        </footer>

    );
}
