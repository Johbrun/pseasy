/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import SideDrawer from '../../components/drawer';
import { Category } from '../../lib/interfaces/category.interface';
import CategoriesSheetsList from '../../components/categoriesSheetsList';
import Footer from '../../components/footer';
import { fetchSheets } from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.service';
import { SheetLight } from '../../lib/interfaces/sheet.interface';

interface IProps {
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

const SheetPage: NextPage<IProps> = ({ sheetsLight, categories }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <Head>
                <title>PSEasy - Fiches PSE</title>
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

                <CategoriesSheetsList
                    open={open}
                    categories={categories}
                    sheetsLight={sheetsLight}
                />
            </div>
            <Footer />
        </div>
    );
};

const getStaticProps = async () => {
    const start = +new Date();


    const apiCalls: Promise<any>[] = [fetchSheets(true), fetchCategories()];
    const [sheetsLight, categories] = await Promise.all(apiCalls);

    const end = +new Date();
    console.log(
        `Data fetched ; Count: ${sheetsLight.length} in ${
            (end - start) / 1000
        } seconds`
    );

    return {props : {
        sheetsLight: sheetsLight,
        categories ,
    }};
};

export { getStaticProps  };
export default SheetPage;
