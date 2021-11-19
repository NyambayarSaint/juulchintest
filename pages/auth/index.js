import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import styled from 'styled-components';
import Signin from "./Signin";
import Signup from "./Signup";
import Steps from "@/components/Steps";
import Axios from "axios";
import nookies from 'nookies';
import notify from "@/components/miscs/notify";

const auth = ({ prev, err }) => {

    const signTitle = {
        signIn: 'нэвтрэх',
        signUp: 'бүртгүүлэх',
        email: 'И-мэйл',
        password: 'Нууц үг',
        password2: 'Нууц үг давтах',
        forgot: 'Нууц үгээ мартсан ?',
        remember: 'Намайг сана',
        emailError: 'И-мэйл хаяг оруулна уу.',
        passwordError: 'Нууц үг оруулна уу. (Хамгийн багадаа 8 оронтой байх)',
        password2Error: 'Давтан нууц үг буруу байна.'
    }
    const [sign, setSign] = React.useState(signTitle.signIn);
    const fromAction = prev === "cart" ? true : false

    React.useEffect(() => {
        fromAction && notify({title: 'Та үргэлжлүүлэхийн тулд нэвтэрнэ үү.', duration: 1.5, at:'center'});
        err && notify({title: 'Таны и-мэйл хаяг бүртгэлтэй байна.', message: 'Та нэвтрэх эсвэл нууц үгээ мартсан бол сэргээх боломжтой.', type:'danger', });
    }, []);

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                <Container fromAction={fromAction}>
                    <div className="container">
                        <div className="box_wrap">
                            {sign === signTitle.signIn && <Signin fromAction={fromAction} setSign={setSign} signTitle={signTitle} />}
                            {sign === signTitle.signUp && <Signup fromAction={fromAction} setSign={setSign} signTitle={signTitle} />}
                        </div>
                    </div>
                </Container>
            </Root>
        </motion.div>
    );

};

export default auth;

const Container = styled.div`
    background:rgba(0,0,0,0.05);
    padding-top:50px;
    padding-bottom:50px;
    .box_wrap{
        width:350px;
        margin:0px auto;
    }
    .g-login{
        border:1px solid rgba(0,0,0,0.1);
        padding:30px;
        background:white;
        border-radius:12px;
        .links{
            display:flex;
            border-bottom:1px solid rgba(0,0,0,0.1);
            margin-bottom:30px;
            p{
                padding:15px;
                margin:0px;
                margin-right:15px;
                position:relative;
                text-transform:capitalize;
                &.active{
                    border-bottom:2px solid black;
                }
                &:hover{
                    text-decoration:underline;
                    cursor:pointer;
                }
                small{
                    position:absolute;
                    margin-left:15px;
                    display:block;
                    left:100%;
                    top:0px;
                    width:200px;
                    background:#E5E5E5;
                    padding:10px 15px;
                    opacity:0;
                    transition:0.3s ease;
                    div {
                        width: 0; 
                        height: 0; 
                        border-top: 7px solid transparent;
                        border-bottom: 7px solid transparent; 
                        border-right:7px solid #E5E5E5;
                        position:absolute;
                        margin-left:-22px;
                        margin-top:-24.5px;
                    }
                }
            }
        }
        .social-con{
            margin-bottom:15px;
            button{
                border:none;
                text-align:center;
                color:white;
                width:100%;
                padding:13px;
                position:relative;
                height:50px;
                border-radius:12px;
                svg{
                    position:absolute;
                    left:15px;
                }
            }
            .fb-button{
                background: #334195;
            }
            .gl-button{
                background:#DD472C;
            }

        }
        form{
            .helpers{
                display:flex;
                justify-content:space-between;
                margin-bottom:30px;
                input{
                    margin-right:10px;
                }
                ins{
                    &:hover{
                        cursor:pointer;
                    }
                }
            }
            .helpers.policy{
                margin-top:20px;
                margin-bottom:0px;
                p{
                    display:inline;
                    font-size:${({ theme }) => theme.fontSizeSmall};
                    margin:0px;
                    a{
                        color:rgb(0, 102, 192);
                        font-weight:500;
                    }
                }
            }
            button{
                width:100%;
                color:white;
                border:none;
                padding:10px;
                text-transform:capitalize;
                background:#334195;
                border-radius:12px;
                height:50px;
            }
        }
    }
`

export async function getServerSideProps(ctx) {
    // IF ERROR - SHOW ERROR TO THE USER
    if (ctx.query.err) return { props: { err: ctx.query.err } };

    let prev = ''

    // GET PREVIOUS URL NAME FROM REQUEST HEADER
    if (ctx.req.headers.referer) {
        const ref = ctx.req.headers.referer
        const index = ref.lastIndexOf('/');
        prev = ref.slice(index + 1, ref.length);
    }

    const { jwt } = nookies.get(ctx);

    if (jwt) {
        try {
            await Axios(process.env.serverUrl + '/users/me', { headers: { 'Authorization': 'Bearer ' + jwt } });
            return { redirect: { destination: '/user', permanent: false } };
        }
        catch (e) {
            return { props: { prev } }
        }
    }
    else {
        return { props: { prev } }
    }
}