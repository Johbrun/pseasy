/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
import { useRouter } from 'next/router';

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

    const router = useRouter();
  

    const onSelectVersion = async (version: string) => 
    {
        router.push(`/sheets/[reference]?version=${version}`, `/sheets/${sheet?.reference}?version=${version}`);
    };


    const onSelectCompare = async (version: string) => 
    {
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
                <SearchAppBar open={open} setOpen={setOpen} />

                <SideDrawer open={open} setOpen={setOpen} categories={categories} sheetsLight={sheetsLight} />
               
                {sheet ? <SheetContent 
                    open={open} 
                    sheet={sheet} 
                    sheetCompare={undefined} 
                    onSelectVersion={onSelectVersion} 
                    onSelectCompare={onSelectCompare} /> : null}
               
            </div>
            <Footer />
        </div>
    );
};

SheetPage.getInitialProps = async ({ req, query }) => 
{
    console.log('GetInitialProps sheet ONLY');
    if (req) postVisit(req);

    const start = +new Date();

    const apiCalls: Promise<any>[] = [fetchSheetsLight(), fetchCategories()];
    if (query.reference) 
    {
        apiCalls.push(fetchSheetByReference(query.reference, query.version));
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
