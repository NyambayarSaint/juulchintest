import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import { useContext } from "react";
import Dashboard from "./Dashboard";
import DashboardMobile from "@/components/DashboardMobile/index";
import { MenuContext } from '@/miscs/ContextMenuProvider'
import nookies from 'nookies'
import Axios from "axios";

import { useRouter } from "next/router";

const Index = () => {
    const { config } = useContext(MenuContext);
    const R = useRouter()
    const redirect = () => {
        console.log('trigerred')
        R.push('/user/mobile')
    }
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                <>
                    {config.width > 768 &&  <Dashboard />}
                    {config.width <= 768 && redirect()}
                </>
            </Root>
        </motion.div>
    );

};
export default Index;

export async function getServerSideProps(ctx) {
    const { jwt } = nookies.get(ctx);
    if (jwt) {
        try {
            await Axios(process.env.serverUrl + '/users/me', { headers: { 'Authorization': 'Bearer ' + jwt } });
            return { props: {} };
        }
        catch (e) { return { redirect: { destination: '/auth', permanent: false } }; }
    }
    return { redirect: { destination: '/auth', permanent: false } };
}