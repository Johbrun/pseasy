import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: '45%',
        height: 'auto%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.down('sm')]: {
            width: '85%',
        },
    },
}));

export default function DiffModal() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open] = React.useState(true);

    const handleClose = () => {};

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Travail en cours</h2>
                    <p>
                        Calcul des différences en cours, le processus ne devrait
                        prendre que quelques secondes...
                    </p>
                </div>
            </Modal>
        </div>
    );
}
