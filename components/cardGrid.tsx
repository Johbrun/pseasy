import React from 'react';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';

import {
    makeStyles,
    createStyles,
    Typography,
    Theme,
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core';
import { ICard } from '../lib/interfaces/card.interface';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            textAlign: 'center',
            '&:hover': {
                color: ' rgb(62, 72, 110)',
                boxShadow: 'rgba(121, 148, 212, 0.4) 0px 1rem 2rem',
                transform: 'translateY(-2px)',
            },
        },
        cardTitle: {
            fontSize: '15px',
            fontWeight: 800,
            textTransform: 'uppercase',
        },
      
        cardContent: {
            flexGrow: 1,
        },
        statusChip: {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
        },
        statusChipNok: {
            backgroundColor: 'red',
        },
    })
);

interface IProps {
    cards : ICard[]
}

const CardGrid = (props:IProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {props.cards.map((card) => (
                    <Grid
                        item
                        key={card.title}
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card className={classes.card}>
                            {card.icon}
                            <CardContent
                                className={classes.cardContent}
                            >
                                <Typography
                                    gutterBottom
                                    className={classes.cardTitle}
                                >
                                    {card.title}
                                </Typography>
                                <Typography>
                                    {card.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Chip
                                    label={card.status}
                                    className={clsx(
                                        classes.statusChip,
                                        {
                                            [classes.statusChipNok]:
                                                            card.status !==
                                                            'Opérationnel',
                                        }
                                    )}
                                />
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
          
    );
};

export default CardGrid;