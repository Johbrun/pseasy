
import React from 'react';
import {
    makeStyles,
    createStyles,
    Typography,
    Theme,
    Container,
    Grid,
    Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: '500px',
        },
        background: {
            position: 'absolute',
            zIndex: -1,
            height: '100%',
            width: ' 100%',
            objectFit: 'cover',
        },
        foreground: {
            padding: theme.spacing(8, 0, 6),
            color: 'white',
        },
        primaryTitle: {
            fontSize: '5rem',
            fontWeight: 400,
            textShadow: '1px 1px 2px black',
        },
        secondaryTitle: {
            fontWeight: 400,
            color: 'white',
            textShadow: '1px 1px 2px black',
        },
        mainButton: {
            marginTop: theme.spacing(4),
        },
    }));

interface IProps {
    onClick: () => void
}

const HomePicture = (props: IProps) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <img className={classes.background} src="cover.jpg" />
            <div className={classes.foreground}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        gutterBottom
                        className={classes.primaryTitle}
                    >PSEasy
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        className={classes.secondaryTitle}
                        paragraph
                    >
                                    PSEasy est une application permettant la
                                    consultation des recommandations et
                                    référentiels relatifs au secourisme en
                                    France.
                    </Typography>
                    <div className={classes.mainButton}>
                        <Grid
                            container
                            spacing={2}
                            justify="center"
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={props.onClick}
                                >
                                                Consulter les fiches
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HomePicture;