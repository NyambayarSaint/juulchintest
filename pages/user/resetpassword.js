import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import { FaInfoCircle } from 'react-icons/fa'
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Axios from "axios";
import nookies from 'nookies';
import { Ecommerce } from "@/components/miscs/ContextEcommerceProvider";
import notify from "@/components/miscs/notify";
import { useRouter } from "next/router";

const Index = ({ code }) => {

    const { set } = React.useContext(Ecommerce);
    const { register, handleSubmit, errors, setError } = useForm();
    const R = useRouter();
    const handle = async (data) => {
        if (data.password !== data.password2) return setError('password2', { shouldFocus: true });
        try {
            let res = await Axios.post(process.env.serverUrl + '/auth/reset-password', { code, password: data.password, passwordConfirmation: data.password2 });
            set({ user: res.data.user });
            nookies.set(null, 'jwt', res.data.jwt, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            notify({ title: 'Нууц үг амжилттай шинэчлэгдлээ.', type: 'success', at: 'center' });
            setTimeout(() => {
                return R.push('/user/');
            }, 1000);
        } catch (e) {
            return notify({ title: 'Алдаа гарлаа', message: 'Та и-мэйл хаягаараа дахин линк авна уу.', type: 'danger' });
        }
    }

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                <Container>
                    <div className="box">
                        <h4>Нууц үг шинэчлэх</h4>
                        <form onSubmit={handleSubmit(handle)}>
                            <div className="form-group">
                                <label>Шинэ нууц үг</label>
                                <input ref={register({ required: true, minLength: 8 })} type="password" name="password" />
                                {errors.password && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle /> Нууц үг оруулна уу. (Хамгийн багадаа 8 оронтой байх)</motion.div>}
                            </div>
                            <div className="form-group">
                                <label>Шинэ нууц үг давтах</label>
                                <input ref={register({ required: true, minLength: 8 })} type="password" name="password2" />
                                {errors.password2 && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle /> Давтан нууц үг буруу байна.</motion.div>}
                            </div>
                            <button>Reset password</button>
                        </form>
                    </div>
                </Container>
            </Root>
        </motion.div>
    );

};
export default Index;

export async function getServerSideProps(ctx) {
    const { code } = ctx.query
    if (!code) return { redirect: { destination: '/404', permanent: false } };

    return { props: { code } }
}

const Container = styled.div`
    height:calc(100vh - 300px);
    display:flex;
    justify-content:center;
    align-items:center;
    .box{
        min-width:300px;
        width:300px;

        h4{
            margin-bottom:30px;
            text-align:center;
        }

        form{
            button{
                width:100%;
                background:black;
                color:white;
                border:none;
                padding:10px;
            }
        }
    }
`