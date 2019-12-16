import React from "react";
import Head from "next/head";
import Nav from "../../components/nav/nav";
import { NextPage } from "next";
import Link from "next/link";
import styles from "./index.module.scss";

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <div>
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
    <Nav />

    <div className={styles.hero}>
      <h1 className={styles.title}>Hello sur PSEasy ! </h1>
      <p className={styles.description}>
        Consulter les dernières fiches PSE directement en ligne, avec des
        options de recherche facilitées
      </p>

      <div className={styles.row}>
        <Link href="/sheets">
          <div className={styles.card}>
            <h3>Fiches PSE &rarr;</h3>

            <p>Accéder aux fiches PSE en ligne</p>
          </div>
        </Link>

        <a href="https://www.interieur.gouv.fr/content/download/119825/961073/file/03-PSE%202019.pdf">
          <div className={styles.card}>
            <>
              <h3>Référentiel PSE &rarr;</h3>
              <p>
                Consulter le PDF officiel du Référentiel PSE - Maj Septembre
                2019
              </p>
            </>
          </div>
        </a>

        <a href="https://github.com/zeit/next.js/tree/master/examples">
          <div className={styles.card}>
            <>
              <h3>Roadmap &rarr;</h3>
              <p>Accéder à la roadmap du site</p>
            </>
          </div>
        </a>
      </div>
    </div>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};
export default Home;
