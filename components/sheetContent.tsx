/* eslint-disable react/react-in-jsx-scope */
import { makeStyles, Theme, createStyles, Chip, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { SheetExtended } from '../lib/interfaces/sheet.interface';
import { refSheetToType } from '../lib/helpers/refSheetToType';
import { toDateFormated } from '../lib/helpers/toDateFormated';
import React, { useEffect } from 'react';
import * as jsdiff from 'diff';

const drawerWidth = 400;

interface IProps {
    sheet: SheetExtended;
    sheetCompare?: SheetExtended;
    open: boolean;
    onSelectVersion: (id:string) => void;
    onSelectCompare: (id:string) => void;

}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        strong: {
            color : 'green'
        },
        // modify content when drawer is opened
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: -drawerWidth
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end'
        },
        chip: {
            color: 'white',
            backgroundColor: theme.palette.grey[800],
            height: '25px',
            [theme.breakpoints.down('sm')]: {
                width: '25px',
                color: 'transparent'
            }
        },
        chipConnaissance: {
            backgroundColor: 'blueviolet'
        },
        chipProcedure: {
            backgroundColor: 'royalblue'
        },
        chipTechnique: {
            backgroundColor: 'orange'
        },
        title: {
            marginBottom: '0px'
        },
        metadata: {
            fontStyle: 'italic',
            marginBottom: '10px'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        diffDates : {
            margin: theme.spacing(1),
        }
    })
);

export default function SheetContent(props: IProps) 
{
    // console.log(props.sheet)
    console.log("coucou")
    const classes = useStyles();
    const type = refSheetToType( props.sheet.reference );
    const [id, setId] = React.useState(props.sheet.id);
    const [idC, setIdC] = React.useState(props.sheet.id);

    // const [loading, setLoading] = React.useState(false);
    let diff;
    if (props.sheetCompare && props.sheet.updatedDate < props.sheetCompare?.updatedDate)
    {
        diff = jsdiff.diffWords(props.sheet.content, props.sheetCompare ? props.sheetCompare.content : props.sheet.content);
    }
    else
    {
        diff = jsdiff.diffWords(props.sheetCompare ? props.sheetCompare.content : props.sheet.content, props.sheet.content );
    }
    const txt = diff.map(d => d.added ? `__${d.value}__` : d.removed ? `<s>${d.value}</s>` : d.value).join('');
    // if (loading) setLoading(true); // how to loading ?


    const onSelectCurrentVersion = (event: React.ChangeEvent<{ value: unknown }>) => 
    {
        setId(event.target.value as string);
        if (props.sheet.history)
        {
            props.onSelectVersion( props.sheet.history.find(s => s.id === event.target.value as string)!.version);
        }
    };
    const onSelectCompareVersion = (event: React.ChangeEvent<{ value: unknown }>) => 
    {
        setIdC(event.target.value as string);
        if (props.sheet.history)
        {
            props.onSelectCompare( props.sheet.history.find(s => s.id === event.target.value as string)!.version);
        }
    };

    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: props.open
                })}
            >
                <div className={classes.drawerHeader} />
                {/* {loading && <span>Chargement en cours...</span> } */}
                <h1 className={classes.title}>{ props.sheet.title}</h1>
                <div className={classes.metadata}>
                    <span>Fiche { props.sheet.reference } ; </span>
                    <span>Version :{' '}{ props.sheet.version} ; </span>
                    <span>Mise à jour en {' '}{ toDateFormated(new Date(props.sheet.updatedDate)) } ; </span>
                    <span>Mises à jour disponibles : {' '}{ props.sheet.history.length}</span>
                </div>
                <Chip label={type} className={
                    clsx(classes.chip, {
                        [classes.chipConnaissance]: (type === 'Connaissances'),
                        [classes.chipProcedure]: (type === 'Procédures'),
                        [classes.chipTechnique]: (type === 'Techniques'),
                    })} />

                <div className={classes.diffDates}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Vers. Sélectionnée</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id}
                            onChange={onSelectCurrentVersion}
                        >
                            {props.sheet.history.map(h => <MenuItem key={h.version} value={h.id}>{toDateFormated(new Date(h.updatedDate))}</MenuItem> )}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Vers. Comparée</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idC}
                            onChange={onSelectCompareVersion}
                        >
                            {/* <MenuItem key={5} value={5}>Non disponible</MenuItem> */}
                            {props.sheet.history.map(h => <MenuItem key={h.version} value={h.id}>{toDateFormated(new Date(h.updatedDate))}</MenuItem> )}
                        </Select>
                    </FormControl>
                </div>
               
                
                <ReactMarkdown source={ txt} escapeHtml={false}/>
            </main>
        </>
    );
}
