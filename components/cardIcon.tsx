import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardMedia: {
            '& svg' : {
                fontSize: '82px !important',
                height: '115px !important',
                paddingTop: '0.25%',
                color: theme.palette.primary.main,
                margin: 'auto',
            }
        },
    })
);

interface IProps {
    icon : JSX.Element
}

const cardIcon = (props: IProps) => {
    const classes = useStyles();

    return (
        <div className={classes.cardMedia}>
            {props.icon}
        </div>
    );
};

export default cardIcon;