import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import styled from "styled-components";
import { Ecommerce } from "@/components/miscs/ContextEcommerceProvider";
import Steps from "@/components/Steps";
import { useRouter } from "next/router";
import notify from "@/components/miscs/notify";
import CartInstance from "./CartInstance";
import { getTotalPrice } from "@/components/miscs/cart";
import formatNumber from "@/components/miscs/formatNumber";
import { BsArrowLeftShort } from 'react-icons/bs'
import nookies from 'nookies'
import Axios from "axios";
import nProgress from "nprogress";

const Index = ({ err }) => {

    const { cart, user } = React.useContext(Ecommerce);
    const R = useRouter();
    const { jwt } = nookies.get(null)

    React.useEffect(() => {
        console.log(cart, 'cart')
        err === 'outofstock' && notify({ message: 'Та барааны үлдэгдлээ дахин шалгана уу.' });
        if (!jwt) {
            R.push('auth')
        }
    }, [cart]);

    const proceedToCheckout = async () => {
        const headers = { headers: { 'Authorization': 'Bearer ' + jwt } };
        nProgress.start()
        try {
            await Axios.put(process.env.serverUrl + '/users/' + user.id, { cart }, headers)
            R.push('checkout/address')
            nProgress.done()
        } catch (e) {
            notify({ title: 'Алдаа гарлаа.', type: 'danger' })
            nProgress.done()
            console.log(e, '/cart - failed to sync user cart')
        }
    }

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                <Container className="container">
                    <Steps stage={0} />
                    <div className="main_wrapper">
                        <h5>Миний сагс</h5>
                        <div className="product_wrap">
                            {
                                cart.length ? cart.map(instance => <CartInstance instance={instance} key={Math.random()} />)
                                    :
                                    <div className="empty_wrapper">
                                        <img src="/img/empty.svg" />
                                        <h6>Таны сагс хоосон байна</h6>
                                        <p onClick={() => R.back()}><BsArrowLeftShort /> Буцах</p>
                                    </div>
                            }
                        </div>
                        {cart.length ? <div className="total_wrap">Нийт үнэ: <span>{formatNumber(getTotalPrice())}₮</span></div> : ''}
                        {cart.length ? <button onClick={proceedToCheckout} className="continue_button">ХУДАЛДАЖ АВАХ</button> : ''}
                    </div>
                </Container>
            </Root>
        </motion.div>
    );

};
export default Index;

const Container = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    .main_wrapper{
        margin-bottom: 30px;
        h5{
            font-weight: bold;
            color:${({ theme }) => theme.mainColor};
            margin-bottom: 30px;
        }
        .total_wrap{
            font-weight: bold;
            text-align:right;
            margin-top: 30px;
            font-size: ${({ theme }) => theme.fontSize2};
            span{
                color:${({ theme }) => theme.mainColor};
            }
        }
        .continue_button{
            text-align:center;
            padding:16px 64px;
            background: ${({ theme }) => theme.mainColor};
            color:white;
            border-radius:8px;
            border:none;
            margin:auto;
            margin-top: 30px;
            display: block;
        }
        .empty_wrapper{
            padding:30px;
            border:1px solid rgba(0,0,0,0.1);
            border-radius:12px;
            text-align:center;
            h6{
                margin-top:10px;
                font-weight: bold;
                opacity: 0.8;
            }
            p{
                text-decoration:underline;
                cursor: pointer;
            }
        }
    }
`

export async function getServerSideProps(ctx) {
    // IF ERROR - SHOW ERROR TO THE USER
    if (ctx.query.err) return { props: { err: ctx.query.err } };
    return { props: {} };
}