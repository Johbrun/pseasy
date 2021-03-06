/* eslint-disable react/react-in-jsx-scope */
import {
    makeStyles,
    Theme,
    createStyles,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { SheetExtended } from '../lib/interfaces/sheet.interface';
import { refSheetToType } from '../lib/helpers/refSheetToType';
import { toDateFormated } from '../lib/helpers/toDateFormated';
import React, { useState, useEffect } from 'react';
import * as jsdiff from 'diff';
import DiffModal from './diffModal';

const drawerWidth = 400;

interface IProps {
    sheet: SheetExtended;
    open: boolean;
    sheetCompare?: SheetExtended;
    onSelectVersion?: (id: string) => void;
    onSelectCompare?: (id: string) => void;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        strong: {
            color: 'green',
        },
        // modify content when drawer is opened
        content: {
            flexGrow: 1,
            padding: theme.spacing(3) + 'px 20%',
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(3) + 'px 10px'
            },
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
            fontSize: '16px',
            fontFamilly: 'Helvetica',
            textAlign: 'justify',
            '& h2': {
                borderBottom : '1px solid ' + theme.palette.grey[400],
                fontSize: '28px'
            },
            '& h5' : {
                fontSize: '20px'
            }
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        chip: {
            color: 'white',
            backgroundColor: theme.palette.grey[800],
            height: '25px',
            [theme.breakpoints.down('sm')]: {
                width: '25px',
                color: 'transparent',
            },
        },
        chipConnaissance: {
            backgroundColor: 'blueviolet',
        },
        chipProcedure: {
            backgroundColor: 'royalblue',
        },
        chipTechnique: {
            backgroundColor: 'orange',
        },
        title: {
            marginBottom: '0px',
        },
        metadata: {
            fontStyle: 'italic',
            marginBottom: '10px',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 140,
        },
        diffDates: {
            margin: theme.spacing(1),
        },
    })
);

export default function SheetContent(props: IProps) {
    const classes = useStyles();
    const type = refSheetToType(props.sheet.reference);
    const [showModale, setShowModale] = useState<boolean>(false);

    // compute txt with diffs
    let diff;
    if (
        props.sheetCompare &&
        props.sheet.updatedDate < props.sheetCompare?.updatedDate
    ) {
        diff = jsdiff.diffWords(
            props.sheet.content,
            props.sheetCompare
                ? props.sheetCompare.content
                : props.sheet.content
        );
    } else {
        diff = jsdiff.diffWords(
            props.sheetCompare
                ? props.sheetCompare.content
                : props.sheet.content,
            props.sheet.content
        );
    }
    const txt = diff
        .map((d) =>
            d.added
                ? `__${d.value}__`
                : d.removed
                    ? ''
                    : d.value
        )
        .join('');

    useEffect(() => {
        setShowModale(false);
    }, [props.sheetCompare]);

    const onSelectCurrentVersion = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        if (props.sheet.history && props.onSelectVersion) {
            const hSelected = props.sheet.history.find(
                (s) => s.id === (event.target.value as string)
            );
            if (hSelected) props.onSelectVersion(hSelected.version);
            else console.error('no history ? ');
        }
    };

    const onSelectCompareVersion = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        if (props.sheet.history && props.onSelectCompare) {
            setShowModale(true);

            props.onSelectCompare(
                props.sheet.history.find(
                    (s) => s.id === (event.target.value as string)
                )!.version
            );
        }
    };

    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: props.open,
                })}
            >
                {/* Yeah, very ugly but it is to not display space in the modale */}
                {props.onSelectCompare && (
                    <div className={classes.drawerHeader} />
                )}

                {showModale && <DiffModal />}

                <h1 className={classes.title}>{props.sheet.title}</h1>
                <div className={classes.metadata}>
                    <span>Fiche {props.sheet.reference} ; </span>
                    <span>Version : {props.sheet.version} ; </span>
                    <span>
                        Mise ?? jour en{' '}
                        {toDateFormated(new Date(props.sheet.updatedDate))} ;{' '}
                    </span>
                    <span>
                        Mises ?? jour disponibles : {props.sheet.history.length}
                    </span>
                </div>
                <Chip
                    label={type}
                    className={clsx(classes.chip, {
                        [classes.chipConnaissance]: type === 'Connaissances',
                        [classes.chipProcedure]: type === 'Proc??dures',
                        [classes.chipTechnique]: type === 'Techniques',
                    })}
                />
                {props.onSelectCompare && (
                    <div className={classes.diffDates}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">
                                Vers. S??lectionn??e
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.sheet.id}
                                onChange={onSelectCurrentVersion}
                            >
                                {props.sheet.history.map((h) => (
                                    <MenuItem key={h.version} value={h.id}>
                                        {toDateFormated(
                                            new Date(h.updatedDate)
                                        )}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">
                                Vers. Compar??e
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={
                                    props.sheetCompare
                                        ? props.sheetCompare.id
                                        : undefined
                                }
                                onChange={onSelectCompareVersion}
                            >
                                {props.sheet.history.map((h) => (
                                    <MenuItem key={h.version} value={h.id}>
                                        {toDateFormated(
                                            new Date(h.updatedDate)
                                        )}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}

                <ReactMarkdown source={txt} escapeHtml={false} />
            </main>
        </>
    );
}
