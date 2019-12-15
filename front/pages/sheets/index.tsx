import React from "react";
import Head from "next/head";
import Nav from "../../components/nav/nav";
import { NextPage } from "next";
import styles from "./index.module.scss";
import axios from "axios";

interface IProps {
  sheet: string;
}

const SheetPage: NextPage<IProps> = (props: IProps) => (
  <div>
    <Head>
      <title>PSEasy</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />

    <div className={styles.hero}>{props.sheet}</div>
  </div>
);

SheetPage.getInitialProps = async ({ req }) => {
  const res = await axios.request({
    url: "http://localhost:3001/sheets?reference=AC-01-G-01"
  });

  let sheet = res.data;
  console.log(`Show data fetched. Count: ${res.data.length}`);
  sheet = JSON.stringify(sheet);

  return {
    sheet
  };
};

export default SheetPage;
