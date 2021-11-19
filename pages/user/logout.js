import React from "react";
import { motion } from "framer-motion";
import nookies from 'nookies'
import Axios from "axios";

const Index = () => {

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        </motion.div>
    );

};
export default Index;

export async function getServerSideProps(ctx) {
    try {
        nookies.destroy(ctx, 'jwt', { path: '/' });
        return {
            redirect: { destination: '/auth', permanent: false }
        };
    }
    catch (e) {
        nookies.set(ctx, 'jwt', '', { maxAge: 0 * 0 * 0 * 0, path: '/' });
        return {
            redirect: { destination: '/auth', permanent: false }
        };
    }
}
