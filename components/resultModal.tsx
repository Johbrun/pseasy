import React from 'react';
import { makeStyles, Button, Modal } from '@material-ui/core';
import Link from 'next/link';

function getModalStyle() 
{
    const top = 50  ;
    const left = 50  ;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    score : {
        fontSize: '28px',
        margin: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    }
}));

interface IProps {
    value : number;
}

export default function ResultModal(props:IProps) 
{
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);

    const handleClose = () => 
    {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Résultats</h2>
                    <p className={classes.score}>{props.value}%</p>
                    <p>
                        Ceci est votre taux de bonnes réponses ! A savoir que toutes les cases valides doivent être cochées pour que la réponse soit acceptée.
                    </p>
                    <p>
                        N'hésitez pas à revenir plus tard pour de nouveaux quizz, et merci d'avoir expérimenté PSEasy - Quizz !
                    </p>
                    <p>
                        L'équipe PSEasy 
                    </p>
                    <p>
                        Love
                    </p>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                         Valider
                    </Button>
                </div>
            </Modal>
        </div>
    );
}