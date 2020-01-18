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
            letterSpacing: '0.01071em'
        },
        content: {
            display: 'flex'
        }
    })
);

const SheetPage: NextPage<IProps> = ({ sheet, sheetsLight, categories }) => 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentSheet, setCurrentSheet] = React.useState(sheet);

    const onSelectVersion = async (version :string) =>
    {
        setCurrentSheet(await fetchSheetByReference(currentSheet? currentSheet.reference : '', version));
    };
    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Fiches PSE</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <CssBaseline />
            <div className={classes.content}>
                <SearchAppBar open={open} setOpen={setOpen} title={sheet ? sheet.title : undefined} />
                <SideDrawer open={open} setOpen={setOpen} categories={categories} sheetsLight={sheetsLight} />
                {currentSheet ? <SheetContent open={open} sheet={currentSheet} onSelectVersion={onSelectVersion} /> : null}
                {!sheet ? <CategoriesSheetsList open={open} categories={categories} sheetsLight={sheetsLight} /> : null}
            </div>
            <Footer />
        </div>
    );
};

SheetPage.getInitialProps = async ({ query }) => 
{
    console.log('Loading sheet page...');
    const start = +new Date();

    const apiCalls: Promise<any>[] = [fetchSheetsLight(), fetchCategories()];
    if (query.reference) 
    {
        apiCalls.push(fetchSheetByReference(query.reference));
    }

    const [sheetsLight, categories, sheetExtended] = await Promise.all(apiCalls);

    const end = +new Date();
    console.log(`Show data fetched. Count: ${sheetsLight.length} in ${(end - start) / 1000} seconds`);

    return {
        sheet: sheetExtended,
        sheetsLight : sheetsLight,
        categories
    };
};

export default SheetPage;
