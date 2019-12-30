import { makeStyles, Theme, createStyles, Link, Typography } from "@material-ui/core";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "} PSEasy {' '}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            backgroundColor: theme.palette.grey[100],
            padding: theme.spacing(6)
        },
    }));


export default function Footer() {
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
                PSEasy est une application autonome et n'est pas liée à {' '}
                <Link href="https://interieur.gouv.fr">interieur.gouv.fr</Link>, ni à quelconque institution officelle.
           <br />
                <Link href="https://www.interieur.gouv.fr/Le-ministere/Securite-civile/Documentation-technique/Secourisme-et-associations/Les-recommandations-et-les-referentiels/">
                    Consultez ici les documents officiels</Link>

            </Typography>
            <br />
            <Copyright />
        </footer>

    );
}
