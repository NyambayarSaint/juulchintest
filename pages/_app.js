import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import checkLanguage from "@/miscs/checkLanguage";
import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
import TagManager from "react-gtm-module";
import { EcommerceProvider } from "@/components/miscs/ContextEcommerceProvider";
import 'react-notifications-component/dist/theme.css'
import { parseCookies } from "nookies";
import Axios from "axios";
import NProgress from 'nprogress';
import '../public/css/nprogress.css'
import Router from 'next/router';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());  


class MyApp extends App {
  state = {
    menu: {},
    config: {},
    general: {},
    completelyLoaded: false,
    name: 'ЖУУЛЧИН ХХК',
    description: 'Таны сонгох аяллын бренд ЖУУЛЧИН ХХК'
  };
  async componentDidMount() {
    const res = await checkLanguage('/config', null, true);
    const config = { width: window.innerWidth, height: window.innerHeight };
    this.setState({ completelyLoaded: true, config, general: res.data });

    // GOOGLE TAG MANAGER
    // TagManager.initialize({ gtmId: "GTM-WG8JRZ7" });

  }



  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MenuProvider value={this.state}>
          <EcommerceProvider initialAuth={this.props.initialAuth}>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </EcommerceProvider>
        </MenuProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {

  const { jwt } = parseCookies(ctx)

  if (jwt) {
    try {
      let res = await Axios(process.env.serverUrl + '/users/me', { headers: { 'Authorization': 'Bearer ' + jwt } });
      return { initialAuth: res.data };
    }
    catch (e) { return {} }
  }
  return {};
}