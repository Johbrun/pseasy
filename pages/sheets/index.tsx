/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import SideDrawer from '../../components/drawer';
import SheetContent from '../../components/sheetContent';
import { SheetLight, SheetExtended } from '../../lib/interfaces/sheet.interface';
import { Category } from '../../lib/interfaces/category.interface';
import CategoriesSheetsList from '../../components/categoriesSheetsList';
import Footer from '../../components/footer';
import { fetchSheetByReference, fetchSheetsLight } from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import { postVisit } from '../../services/visit.service';

interface IProps {
    sheet?: SheetExtended;
    sheetsLight: SheetLight[];
    categories: Category[];
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontSize: '0.875rem',
            fontFamily: '\'Avenir\', \'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
            fontWeight: 400,
            lineHeight: '1.73',
            letterSpacing: '0.01071em',
            background: 'rgba(62, 72, 110, 0.05)',
        },
        content: {
            display: 'flex'
        },
        // drawerHeader: {
        //     display: 'flex',
        //     alignItems: 'center',
        //     padding: theme.spacing(0, 1),
        //     ...theme.mixins.toolbar,
        //     justifyContent: 'flex-end'
        // },
    })
);

const SheetPage: NextPage<IProps> = ({ sheet, sheetsLight, categories }) => 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentSheet, setCurrentSheet] = React.useState<SheetExtended | undefined>(sheet);
    const [currentSheetCompare, setCurrentSheetCompare] = React.useState(sheet);

    // console.log('__        sheet version', sheet ?  sheet.version : 'no sheet');
    // console.log('__ currentSheet version', currentSheet ?  currentSheet.version :  'no currentSheet');
    // console.log('__ compareSheet version', currentSheetCompare ?  currentSheetCompare.version : 'no sheet');

    if (!sheet && currentSheet) 
    {
        setCurrentSheet(undefined);
    }

    if (sheet && !currentSheet) 
    {
        setCurrentSheet(sheet);
    }

    const onSelectVersion = async (version: string) => 
    {
        console.log('onSelectVersion', version);
        setCurrentSheet(await fetchSheetByReference(currentSheet ? currentSheet.reference : '', version));
        // sheet = await fetchSheetByReference(sheet? sheet.reference : '', version);
    };

    const onSelectCompare = async (version: string) => 
    {
        console.log('onSelectCompare', version);
        setCurrentSheetCompare(await fetchSheetByReference(currentSheetCompare ? currentSheetCompare.reference : '', version));
    };
    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Fiches PSE {sheet ? ' - ' + sheet.title : ''}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <CssBaseline />
            <div className={classes.content}>
                <SearchAppBar open={open} setOpen={setOpen} /*title={sheet ? sheet.title : undefined} *//>

                <SideDrawer open={open} setOpen={setOpen} categories={categories} sheetsLight={sheetsLight} />
               
                {/* <div className={classes.drawerHeader} /> */}

                {currentSheet ? <SheetContent 
                    open={open} 
                    sheet={currentSheet} 
                    sheetCompare={currentSheetCompare} 
                    onSelectVersion={onSelectVersion} 
                    onSelectCompare={onSelectCompare} /> : null}

                {!sheet ? <CategoriesSheetsList
                    open={open}
                    categories={categories}
                    sheetsLight={sheetsLight} /> : null}
            </div>
            <Footer />
        </div>
    );
};

SheetPage.getInitialProps = async ({ req, query }) => 
{
    console.log('GetInitialProps sheet');
    if (req) postVisit(req);

    const start = +new Date();

    const apiCalls: Promise<any>[] = [fetchSheetsLight(), fetchCategories()];
    if (query.reference) 
    {
        apiCalls.push(fetchSheetByReference(query.reference));
    }

    const [sheetsLight, categories, sheetExtended] = await Promise.all(apiCalls);

    const end = +new Date();
    console.log(`Data fetched ; Count: ${sheetsLight.length} in ${(end - start) / 1000} seconds`);

    return {
        sheet: sheetExtended,
        sheetsLight: sheetsLight,
        categories
    };
};

export default SheetPage;
