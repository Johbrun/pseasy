import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link, List, ListItemIcon, Collapse, Chip } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { SheetLight } from '../lib/interfaces/sheet.interface';
import { Category } from '../lib/interfaces/category.interface';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PanToolIcon from '@material-ui/icons/PanTool';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useRouter } from 'next/router';
import { refSheetToType } from '../lib/helpers/refSheetToType';
import clsx from 'clsx';
import AssignmentIcon from '@material-ui/icons/Assignment';

interface IProps {
    categories: Category[];
    sheetsLight: SheetLight[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        title: {
            flexGrow: 1
        },
        category: {
            textTransform: 'uppercase',
            fontSize: '0.95rem'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'space-between'
        },
        nested: {
            paddingLeft: theme.spacing(4),
            fontSize: '0.9rem'
        },
        chip: {
            color: 'white',
            backgroundColor: theme.palette.grey[800],
            height: '20px',
            width: '20px',
            marginRight: '4px',
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
    })
);
export default function SideDrawer(props: IProps) 
{
    const router = useRouter();
    const classes = useStyles();
    const [openedId, setOpenedId] = React.useState(-1);

    const handleDrawerClose = () => 
    {
        props.setOpen(false);
    };

    const prefixFromReference = (reference: string) => 
    {
        const type = refSheetToType(reference);
        return (<Chip
            key={reference}
            className={clsx(classes.chip, {
                [classes.chipConnaissance]: type === 'Connaissances',
                [classes.chipProcedure]: type === 'Procédures',
                [classes.chipTechnique]: type === 'Techniques'
            })}
        />);
    };

    const handleClickCategory = (id: number) => 
    {
        if (id === openedId) 
        {
            // when click on selected
            id = -1;
        }
        setOpenedId(id);
    };

    console.log('waaa', props.open);
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <List>
                    <ListItem
                        button
                        onClick={() => router.push('/sheets')}
                    >
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary={'INDEX DES FICHES'}
                            className={classes.category}
                        />
                    </ListItem>

                    {props.categories.map(category => (
                        <div key={'li-' + category.id} >
                            <ListItem
                                button
                                key={'li-' + category.id}
                                onClick={() => handleClickCategory(category.id)}
                            >
                                <ListItemIcon>
                                    {category.number.includes('1.') ? (
                                        <MenuBookIcon />
                                    ) : (
                                        <PanToolIcon />
                                    )}
                                </ListItemIcon>

                                <ListItemText
                                    primary={category.number + ' ' + category.name}
                                    className={classes.category}
                                />
                                {openedId === category.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse
                                key={'co-' + category.id}
                                in={openedId === category.id}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    {props.sheetsLight
                                        .filter(s => s.idCategory === category.id)
                                        .map(s => (
                                            <ListItemText
                                                className={classes.nested}
                                                key={s.id}
                                                primary={
                                                    <>
                                                        {prefixFromReference(s.reference)}
                                                        <Link href={`/sheets?reference=${s.reference}`}>
                                                            <a>{s.title ? s.title : 'Aucun titre renseigné'}</a>
                                                        </Link>
                                                    </>
                                                }
                                            />
                                        ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>
            </Drawer>
        </div >
    );
}
