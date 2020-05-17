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

                    <link rel='manifest' href='/manifest.json' />

                    <link href='/icons/icon-72x72.png' rel='icon' type='image/png' sizes='72x72' />
                    <link href='/icons/icon-96x96.png' rel='icon' type='image/png' sizes='96x96' />
                    <link href='/icons/icon-128x128.png' rel='icon' type='image/png' sizes='128x128' />
                    <link href='/icons/icon-144x144.png' rel='icon' type='image/png' sizes='144x144' />
                    <link href='/icons/icon-152x152.png' rel='icon' type='image/png' sizes='152x152' />
                    <link href='/icons/icon-192x192.png' rel='icon' type='image/png' sizes='192x192' />
                    <link href='/icons/icon-384x384.png' rel='icon' type='image/png' sizes='384x384' />
                    <link href='/icons/icon-512x512.png' rel='icon' type='image/png' sizes='512x512' />

                    <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                    
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
                    <meta name="description" content="Description"/>
                    <meta name="keywords" content="Keywords"/>
                    <title>PSEasy</title>

                    <meta name="theme-color" content="#00298a"/>
                    <meta name="mobile-web-app-capable" content="yes"/>

                    <meta name="apple-mobile-web-app-title" content="Application Title"/>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>

                    <meta name="screen-orientation" content="portrait"></meta>
                    

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
