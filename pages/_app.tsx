import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import WarningModal from '../components/warningModal';

Router.events.on('routeChangeStart', url => 
{
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default class MyApp extends App 
{
    componentDidMount() 
    {
    // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) 
        {
      jssStyles.parentElement!.removeChild(jssStyles);
        }
    }

    render() 
    {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <Head>
                    {/* Import CSS for nprogress */}
                    <link rel="stylesheet" type="text/css" href="/nprogress.css" />
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <WarningModal />
                    <Component {...pageProps} />
                </ThemeProvider>
            </React.Fragment>
        );
    }
}
