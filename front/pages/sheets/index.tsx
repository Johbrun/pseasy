import React from "react";
import { NextPage } from "next";
import axios from "axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import { SheetGetDTO } from "../../../dtos/src/";
import { useRouter } from "next/router";
import SearchAppBar from "../../components/nav";
import SideDrawer from "../../components/drawer";
import SheetContent from "../../components/sheetContent";

interface ISummaryRow {
  title: string;
  reference: string;
}

interface IProps {
  sheet?: SheetGetDTO;
  summaryRows: ISummaryRow[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex"
    }
  })
);

const SheetPage: NextPage<IProps> = ({ sheet, summaryRows }) => {
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
      <SearchAppBar open={open} setOpen={setOpen} />
      <SideDrawer open={open} setOpen={setOpen} summaryRows={summaryRows} />
      <SheetContent open={open} />
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

  const res = await axios.request({
    url: "http://localhost:3000/api/sheets"
  });

  const res2 = await axios.request({
    url: `http://localhost:3000/api/sheets/sheet?reference=${query.reference}`
  });

  let summaryRows = res.data as ISummaryRow[];
  console.log(`Show data fetched. Count: ${summaryRows.length}`);

  console.log(res2);
  return {
    sheet: res2.data[0],
    summaryRows
  };
};

export default SheetPage;
