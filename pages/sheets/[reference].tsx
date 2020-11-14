/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import SideDrawer from '../../components/drawer';
import SheetContent from '../../components/sheetContent';
import {
    SheetLight,
    SheetExtended,
} from '../../lib/interfaces/sheet.interface';
import { Category } from '../../lib/interfaces/category.interface';
import Footer from '../../components/footer';
import {
    fetchSheetByReference,
    fetchSheets,
} from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import firebaseWrapper from '../../lib/firebase';

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
            display: 'flex',
        },
    })
);

const SheetPage: NextPage<IProps> = ({ sheet, sheetsLight, categories }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [sheetCompare, setSheetCompare] = React.useState<
        SheetExtended | undefined
    >(undefined);
    const [currentSheet, setSheet] = React.useState(sheet);

    const onSelectVersion = async (version: string) => {
        setSheet(await fetchSheetByReference(currentSheet.reference, version))
    };

    const onSelectCompare = async (version: string) => {
        if (typeof window !== undefined) {
            firebaseWrapper.analytics().logEvent('using_diff');
        } setSheetCompare(await fetchSheetByReference(currentSheet.reference, version));
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            firebaseWrapper.analytics().logEvent('open_sheet', { reference: currentSheet.reference });
        }
    }, [currentSheet]);

    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Fiches PSE {currentSheet.title}</title>
            </Head>

            <CssBaseline />

            <div className={classes.content}>
                <SearchAppBar open={open} setOpen={setOpen} />

                <SideDrawer
                    open={open}
                    setOpen={setOpen}
                    categories={categories}
                    sheetsLight={sheetsLight}
                />

                <SheetContent
                    open={open}
                    sheet={currentSheet}
                    sheetCompare={sheetCompare}
                    onSelectVersion={onSelectVersion}
                    onSelectCompare={onSelectCompare}
                />
            </div>
            <Footer />
        </div>
    );
};

const getStaticProps = async ({ params }: any) => {
    const start = +new Date();

    console.log("=> context.param.reference", params);
    const apiCalls: Promise<any>[] = [
        fetchSheets(true),
        fetchCategories(),
        fetchSheetByReference(params.reference, undefined /*req.query.version*/),
    ];
    const [sheetsLight, categories, sheetExtended] = await Promise.all(
        apiCalls);

    const end = +new Date();
    console.log(
        `Data fetched ; Count: ${sheetsLight.length} in ${(end - start) / 1000
        } seconds`
    );

    return {
        props: {
            sheet: sheetExtended,
            sheetsLight: sheetsLight,
            categories,
        },
        // notFound  : false
    };
};

const getStaticPaths = async () => {
    // Call firebase endpoint to get sheets
    const sheets = await fetchSheets(true);

    // Get the paths we want to pre-render based on sheets
    const paths = sheets.map(sheet => ({
        params: { reference: sheet.reference }
    }))
    return {
        paths,
        fallback: false// or false // See the "fallback" section below
    };
}

export { getStaticProps, getStaticPaths };
export default SheetPage;
