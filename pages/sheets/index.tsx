import React from "react";
import { NextPage } from "next";
import axios from "axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import SearchAppBar from "../../components/nav";
import SideDrawer from "../../components/drawer";
import SheetContent from "../../components/sheetContent";
import { Sheet, SheetLight } from "../../lib/interfaces/sheet.interface";
import { Category } from "../../lib/interfaces/category.interface";
import CategoriesList from "../../components/categoriesList";
import Footer from "../../components/footer";
import { fetchSheet, fetchSheetsLight } from "../../services/sheet.service";
import { fetchCategories } from "../../services/category.service";

interface IProps {
  sheet?: Sheet;
  sheetsLight: SheetLight[];
  categories: Category[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {

    },
    content: {
      display: "flex"
    },
  })
);

const SheetPage: NextPage<IProps> = ({ sheet, sheetsLight, categories }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Head>
        <title>PSEasy - Fiches PSE</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <CssBaseline />
      <div className={classes.content}>
        <SearchAppBar
          open={open}
          setOpen={setOpen}
          title={sheet ? sheet.title : undefined}
        />
        <SideDrawer
          open={open}
          setOpen={setOpen}
          categories={categories}
          sheetsLight={sheetsLight}
        />
        {sheet ? <SheetContent open={open} sheet={sheet} /> : null}
        {!sheet ? (
          <CategoriesList
            open={open}
            categories={categories}
            sheetsLight={sheetsLight}
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

SheetPage.getInitialProps = async ({ query }) => {
  console.log("Loading sheet page...");
  const start = +new Date();

  const sheet = query.reference ? await fetchSheet(query.reference) : undefined;
  const sheetsLight = await fetchSheetsLight();
  const categories = await fetchCategories();

  const end = +new Date();
  console.log(`Show data fetched. Count: ${sheetsLight.length} in ${(end - start) / 1000} seconds`);

  return {
    sheet,
    sheetsLight,
    categories
  };
};

export default SheetPage;
