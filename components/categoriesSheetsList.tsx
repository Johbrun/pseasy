/* eslint-disable react/react-in-jsx-scope */
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Category } from '../lib/interfaces/category.interface';
import { SheetLight } from '../lib/interfaces/sheet.interface';
import SearchInput from './searchInput';
import { useState } from 'react';
import CategoriesSheetsRow from './categoriesSheetsRow';
import LevelSelect from './levelSelect';
import DateSelect from './dateSelect';

const drawerWidth = 400;

interface IProps {
  categories: Category[];
  sheetsLight: SheetLight[];
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            fontFamily: 'Roboto'
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
        filtersHeader: {
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
                display: 'inherit'
            },
            border: '1px solid #dadce0',
            borderRadius : '8px',
            background: 'white',
            padding: '10px'
        }
    })
);

export default function CategoriesSheetsList(props: IProps) 
{
    const classes = useStyles();
    const [filterSheet, setFilterSheet] = useState<string>('');
    const [filterLevel, setFilterLevel] = useState<number>(0);
    const [filterDate, setFilterDate] = useState<number>(0);

    const availableUpdateDate = [...new Set(
        props.sheetsLight.map(s => s.updatedDate)
    )];
    return (
        <>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: props.open
                })}
            >
                <div className={classes.drawerHeader} />

                <div className={classes.filtersHeader}>
                    <SearchInput searchField={filterSheet} setSearchField={setFilterSheet} />

                    <LevelSelect levelSelected={filterLevel} setLevelSelected={setFilterLevel} />
                    <DateSelect dates={availableUpdateDate
                        .map(d => new Date(d).getTime())} dateSelected={filterDate} setDateSelected={setFilterDate} />
                </div>

                {props.categories.map(category => (
                    <CategoriesSheetsRow
                        key={'csr-' + category.id}
                        category={category}
                        sheetsLight={props.sheetsLight
                            .filter(s => s.idCategory === category.id)
                            .filter(s => s.level === filterLevel || filterLevel === 0)
                            .filter(s => new Date(s.updatedDate).getTime() === filterDate || filterDate === 0)
                            .filter(s => (filterSheet ? s.title.toLowerCase().includes(filterSheet.toLowerCase()) : true))
                            // .sort((s1, s2 ) => s1.title < s2.title ? -1 : 1)
                        }
                    />
                ))}
            </main>
        </>
    );
}
