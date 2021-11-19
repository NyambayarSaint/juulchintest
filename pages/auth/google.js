import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import styled from "styled-components";
import Axios from "axios";
import nookies from 'nookies';

const Index = () => {

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                <Container>
                    <img src="/img/spinner.gif" />
                </Container>
            </Root>
        </motion.div>
    );

};
export default Index;

const Container = styled.div`
    height:calc(100vh - 300px);
    display:flex;
    justify-content:center;
    align-items:center;
    img{
        width:100px;
    }
`

export async function getServerSideProps(ctx) {
    try {
        let res = await Axios(process.env.serverUrl + `/auth/google/callback?access_token=${ctx.query.access_token}`);
        nookies.set(ctx, 'jwt', res.data.jwt, {maxAge: 30*24*60*60,path:'/'});
        return { redirect: { destination: '/user/profile', permanent: false } };
    }
    catch (e) {
        return { redirect: { destination: '/auth?err=Email is already taken', permanent: false } };
    }
}