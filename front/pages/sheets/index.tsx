import React from "react";
import { NextPage } from "next";
import axios from "axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchAppBar from "../../components/nav";
import SideDrawer from "../../components/drawer";
import SheetContent from "../../components/sheetContent";
import { Sheet, SheetLight } from "../../lib/interfaces/sheet.interface";
import { Category } from "../../lib/interfaces/category.interface";
import CategoriesList from "../../components/categoriesList";

interface IProps {
  sheet?: Sheet;
  sheetsLight: SheetLight[];
  categories: Category[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex"
    }
  })
);

const SheetPage: NextPage<IProps> = ({ sheet, sheetsLight, categories }) => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  console.log(router.query.reference);

  return (
    <div className={classes.root}>
      <Head>
        <title>PSEasy</title>
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
      <SearchAppBar
        open={open}
        setOpen={setOpen}
        title={sheet ? sheet.title : undefined}
      />
      <SideDrawer open={open} setOpen={setOpen} sheetsLight={sheetsLight} />
      {sheet ? <SheetContent open={open} sheet={sheet} /> : null}
      {!sheet ? (
        <CategoriesList
          open={open}
          categories={categories}
          sheetsLight={sheetsLight}
        />
      ) : null}
      {/* <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <ReactMarkdown
          source={
            sheet && sheet.content
              ? sheet.content
              : "No content for this moment"
          }
        /> */}
      {/* <Typography paragraph>
          {sheet && sheet.content
            ? sheet.content
            : "No content for this moment"}
        </Typography> */}
      {/* </main> */}
    </div>
  );
};

SheetPage.getInitialProps = async ({ query }) => {
  console.log("getInitialProps");
  console.log(query);

  const sheetsLight = (
    await axios.request({
      url: "http://localhost:3000/api/sheets"
    })
  ).data as SheetLight[];

  const res2 = await axios.request({
    url: `http://localhost:3000/api/sheets/sheet?reference=${query.reference}`
  });

  const categories = (
    await axios.request({
      url: `http://localhost:3000/api/categories`
    })
  ).data as Category[];

  console.log(`Show data fetched. Count: ${sheetsLight.length}`);

  return {
    sheet: res2.data[0],
    sheetsLight,
    categories
  };
};

export default SheetPage;
