import React from 'react';
import { makeStyles, Button, Modal } from '@material-ui/core';
import Link from 'next/link';

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

export default function WarningModal() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);

    if (typeof window !== 'undefined') {
        const valueLS = localStorage.getItem('takeRisk');
        if (valueLS && open) {
            setOpen(false);
        }
    }
    const handleClose = () => {
        localStorage.setItem('takeRisk', 'true');
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
                    <h2>Note Importante</h2>
                    <p>
                        PSEasy est une application encore en cours de
                        développement. Elle est mise à jour régulièrement, mais,
                        comme disait un grand homme, il faut donner du temps au
                        temps.
                    </p>
                    <p>
                        La génération des fiches par l&apos;IA peut induire quelques
                        erreurs. Nous faisons notre maximun pour les éviter.
                    </p>
                    <p>
                        Si vous souhaitez contacter l&apos;équipe, pour aider,
                        proposer des idées ou un partenariat,{' '}
                        <Link href="/about">
                            <a>cliquez ici</a>
                        </Link>
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                    >
                        Ca marche, je prends le risque
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
