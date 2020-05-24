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
import Footer from '../../components/footer';
import { fetchSheetByReference, fetchSheetsLight } from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import { postVisit } from '../../services/visit.service';
import { useRouter } from 'next/router';

interface IProps {
    sheet: SheetExtended;
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
    })
);

const SheetPage: NextPage<IProps> = ({ sheet, sheetsLight, categories }) => 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [sheetCompare, setSheetCompare] = React.useState<SheetExtended |undefined>(undefined);
    const router = useRouter();
  

    const onSelectVersion = async (version: string) => 
    {
        router.push(`/sheets/[reference]?version=${version}`, `/sheets/${sheet?.reference}?version=${version}`);
    };

    const onSelectCompare = async (version: string) => 
    {
        setSheetCompare(await fetchSheetByReference(sheet.reference, version));
    };
    
    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Fiches PSE {sheet.title}</title>
            </Head>

            <CssBaseline />

            <div className={classes.content}>
                <SearchAppBar open={open} setOpen={setOpen} />

                <SideDrawer open={open} setOpen={setOpen} categories={categories} sheetsLight={sheetsLight} />
               
                <SheetContent 
                    open={open} 
                    sheet={sheet} 
                    sheetCompare={sheetCompare} 
                    onSelectVersion={onSelectVersion} 
                    onSelectCompare={onSelectCompare} />
               
            </div>
            <Footer />
        </div>
    );
};

SheetPage.getInitialProps = async ({ req, query }) => 
{
    if (req) postVisit(req);
    const start = +new Date();

    const apiCalls: Promise<any>[] = [fetchSheetsLight(), fetchCategories(), fetchSheetByReference(query.reference, query.version)];
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
