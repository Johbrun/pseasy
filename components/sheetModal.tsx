/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { makeStyles, Button, Modal } from '@material-ui/core';
import Link from 'next/link';
import SheetContent from './sheetContent';
import { SheetExtended } from '../lib/interfaces/sheet.interface';

function getModalStyle() {
    const top = 4;
    const left = 4;
    return {
        top: `${top}%`,
        left: `${left}%`,
        // transform: `translate(-${3}%, -${left}%)`,
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
        width: '90%',
        height: '90%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    container: {
        marginTop: '20px',
        marginLeft: '-35px',
        marginRight: '-35px',
        overflow: 'auto',
        height: 'inherit',
    },
}));

interface IProps {
    sheet: SheetExtended;
    onClose: () => void;
}

export default function SheetModal(props: IProps) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.onClose}
                    >
                        Fermer
                    </Button>
                    <div className={classes.container}>
                        <SheetContent sheet={props.sheet} open={true} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
