import Steps from '@/components/Steps';
import Root from '@/core/Root';
import Axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import nookies from 'nookies'
import Profile from './components/Profile';
import Address from './components/Address';
import Panel from './Panel'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import notify from '@/components/miscs/notify';

const index = ({ error }) => {
    const R = useRouter()
    useEffect(() => {
        error && notify({ title: 'Захиалагчийн мэдээллийг бүрэн оруулна уу!', message: '', type: 'danger', duration: 1.5, onScreen: true });
    }, [])
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Root>
                <Container className="container">
                    <Steps stage={1} />
                    <div className="row">
                        <div className="col-md-8">
                            <div className="main_wrapper">
                                <Profile />
                                <Address />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Panel action={() => R.push("/checkout/payment")} />
                        </div>
                    </div>
                </Container>
            </Root>
        </motion.div>
    );
};

export default index;

const Container = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    .main_wrapper{
        .section_wrap{
            padding-bottom:30px;
            margin-bottom:30px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            &:last-child{
                border-bottom:none;
                margin-bottom:none;
            }
            .top{
                h5{
                    font-weight: bold;
                    color: ${({ theme }) => theme.mainColor};
                    margin-bottom:32px;
                }

            }
            .row{
                .box{
                    margin-bottom:30px;
                    height:100%;
                    &:last-child{
                        margin-bottom:0px;
                    }
                    label{
                        font-weight:bold;
                        opacity:0.8;
                        margin-bottom:8px;
                    }
                    input,textarea{
                        border:1px solid rgba(0,0,0,0.1);
                        padding:8px 12px;
                        border-radius:4px;
                        width:100%;
                        outline:none;
                        &::-webkit-outer-spin-button,
                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }
                        &:last-child{
                            margin-right:0px !important;
                        }
                    }
                    textarea{
                        resize:none;
                        width:100%;
                        height:calc(100% - 22px);
                    }
                    button{
                        height:36px;
                        border-radius:4px;
                        width:100%;
                        border:none;
                        background:${({ theme }) => theme.mainColor};
                        color:white;
                    }
                }
            }
        }
    }
`

export async function getServerSideProps(ctx) {

    const { jwt } = nookies.get(ctx);

    if (jwt) {
        try {
            const { data } = await Axios(process.env.serverUrl + '/users/me', { headers: { 'Authorization': 'Bearer ' + jwt } });
            if (!data || !data.firstname || !data.lastname || !data.email || !data.phone) {
                return {
                    props: { error: true }
                }
            }
            try {
                //TO ALLOW ONLY REQUEST FROM CART PAGE, WE NEED TO SLICE REFERER'S /CART VALUE FIRST
                const ref = ctx.req.headers.referer
                console.log(ref, 'ref')
                const start = ref.lastIndexOf('/')
                const sliced = ref.slice(start, ref.length)
                console.log(sliced, 'sliced')
                if (sliced === '/cart' || sliced === "/payment" || sliced === "/address") {
                    return { props: {} }
                }
            } catch (e) {
                return { redirect: { destination: '/cart', permanent: false } };
            }
        }
        catch (e) { return { redirect: { destination: '/cart', permanent: false } }; }
    }
    return { redirect: { destination: '/auth', permanent: false } };
}