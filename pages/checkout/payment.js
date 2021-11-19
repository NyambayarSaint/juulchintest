import Steps from '@/components/Steps';
import Root from '@/core/Root';
import Axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import nookies from 'nookies'
import Panel from './Panel'
import { AiOutlineCheck, AiOutlineConsoleSql } from 'react-icons/ai'
import notify from '@/components/miscs/notify';
import nProgress from 'nprogress';
import { useRouter } from 'next/router';

const payment_options = [
    { name: 'QR кодоор шилжүүлэх', desc: 'QR код ашиглан төлбөр төлөх', img: '/img/qrcode.svg', value: 'qrcode' },
    { name: 'HiPay-р шилжүүлэх', desc: 'HiPay ашиглан төлбөр төлөх', img: '/img/hipay.svg', value: 'hipay' },
    { name: 'StorePay-р шилжүүлэх', desc: 'StorePay ашиглан төлбөр төлөх', img: '/img/storepay.png', value: 'storepay' },
    { name: 'KhanBank-р шилжүүлэх', desc: 'KhanBank ашиглан төлбөр төлөх', img: '/img/khanbank.svg', value: 'khanbank' },
    { name: 'SocialPay-р шилжүүлэх', desc: 'SocialPay ашиглан төлбөр төлөх', img: '/img/social_pay.png', value: 'socialpay' },
]

const index = () => {
    const { jwt } = nookies.get(null)
    const [selectedOption, setSelectedOption] = React.useState(null)
    const R = useRouter()
    const createOrder = async () => {
        if (!selectedOption) return notify({ title: 'Анхааруулга', message: 'Төлбөрийн хэлбэрээ сонгоно уу.', type: 'warning' })
        const headers = { headers: { 'Authorization': 'Bearer ' + jwt } };
        nProgress.start()
        try {
            await Axios.post(process.env.serverUrl + '/orders', { payment_type: selectedOption }, headers)
            setTimeout(() => {
                nProgress.done()
                R.push(`/user?tab=orders`);
            }, 3000);
        } catch (e) {
            nProgress.done()
            console.log(e, 'error in posting order')
        }

    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Root>
                <Container className="container">
                    <Steps stage={2} />
                    <div className="row">
                        <div className="col-md-8">
                            <h5>Төлбөр хийх төрлөө сонгоно уу</h5>
                            <div className="main_wrapper row">
                                {payment_options.map(inst => (
                                    <div className="col-md-6" key={Math.random()}>
                                        <div onClick={() => setSelectedOption(inst.value)} className={`box ${selectedOption === inst.value ? 'active' : ''}`}>
                                            <img src={inst.img} />
                                            <div className="info">
                                                <div className="caption">{inst.name}</div>
                                                <div className="desc">{inst.desc}</div>
                                            </div>
                                            <div className="check_wrap">
                                                <AiOutlineCheck />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Panel action={createOrder} />
                        </div>
                    </div>
                </Container>
            </Root>
        </motion.div>
    );
};

export default index;

const Container = styled.div`
    padding-top:50px;
    padding-bottom:50px;
    h5{
        font-weight: bold;
        color: ${({ theme }) => theme.mainColor};
        margin-bottom:32px;
    }
    .main_wrapper{
        .box{
            display:flex;
            align-items:center;
            border:1px solid rgba(0,0,0,0.1);
            padding:15px;
            border-radius:4px;
            position:relative;
            margin-bottom:30px;
            cursor:pointer;
            img{
                max-width:50px;
                min-width:50px;
                height:50px;
                margin-right:15px;
            }
            .info{
                .caption{
                    font-weight:bold;
                    margin-bottom:10px;
                }
            }
            .check_wrap{
                position:absolute;
                top:15px;
                right:15px;
                width:15px;
                height:15px;
                border:1px solid rgba(0,0,0,0.1);
                color:white;
            }
            &.active{
                .check_wrap{
                    background:#FC8233;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
            }
        }
    }
`

export async function getServerSideProps(ctx) {

    const { jwt } = nookies.get(ctx);

    if (jwt) {
        try {
            const {data} = await Axios(process.env.serverUrl + '/users/me', { headers: { 'Authorization': 'Bearer ' + jwt } });
            console.log(data)
            if (!data || !data.firstname || !data.lastname || !data.email || !data.phone) {
                return { redirect: { destination: '/checkout/address', permanent: false } };
            }
            try {
                //TO ALLOW ONLY REQUEST FROM CART PAGE, WE NEED TO SLICE REFERER'S /CART VALUE FIRST
                const ref = ctx.req.headers.referer
                const start = ref.lastIndexOf('/')
                const sliced = ref.slice(start, ref.length)
                if (sliced === '/cart') {
                    return {
                        props: {}
                    };
                }
            } catch (e) {
                return { redirect: { destination: '/cart', permanent: false } };
            }
            return { props: {} }
        }
        catch (e) { return { redirect: { destination: '/cart', permanent: false } }; }
    }
    return { redirect: { destination: '/auth', permanent: false } };
}