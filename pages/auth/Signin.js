import React from 'react';
import { useForm } from 'react-hook-form';
import { FaInfoCircle, FaFacebookF, FaGoogle } from 'react-icons/fa'
import { motion } from 'framer-motion';
import Axios from 'axios';
import nookies from 'nookies'
import { useRouter } from 'next/router';
import { Ecommerce } from '@/miscs/ContextEcommerceProvider';
import notify from '@/miscs/notify';

const Signin = ({ setSign, signTitle, fromAction }) => {

    const { register, handleSubmit, errors } = useForm();
    const textBox = React.useRef();
    const { set } = React.useContext(Ecommerce);
    const R = useRouter();

    const handle = async ({ email, password }) => {
        try {
            let res = await Axios.post(process.env.serverUrl + '/auth/local', { identifier: email, password });
            set({ user: res.data.user, jwt: res.data.jwt });
            nookies.set(null, 'jwt', res.data.jwt, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            return fromAction ? R.push('/checkout/address') : R.push('/user');
        } catch (e) {
            notify({message: 'Таны и-мэйл эсвэл нууц үг буруу байна.', type:'danger', onScreen: true});
        }
    }

    React.useEffect(() => {
        setTimeout(() => {
            if (textBox.current) {
                textBox.current.style.opacity = "0.8";
                textBox.current.style.top = "-10px";
            }
        }, 1500);
    }, [])

    return (
        <div className="g-login">
            <div className="links">
                <p className="active">{signTitle.signIn}</p>
                <p onClick={() => setSign(signTitle.signUp)}>{signTitle.signUp} <small ref={textBox}>Хэрэв та бүртгэлгүй бол энд дарж бүртгүүлээрэй.<div></div></small></p>
            </div>
            <div className="social-con">
                <button className="fb-button" onClick={() => R.push(process.env.serverUrl+'/connect/facebook')}><FaFacebookF /> Facebook -ээр {signTitle.signIn}</button>
            </div>
            {/* <div className="social-con">
                <button className="gl-button" onClick={() => R.push(process.env.serverUrl+'/connect/google')}><FaGoogle /> Gmail -ээр {signTitle.signIn}</button>
            </div> */}
            <hr />
            <p style={{ textAlign: 'center' }}>эсвэл</p>
            <hr />
            <form onSubmit={handleSubmit(handle)}>
                <div className="form-group">
                    <label>{signTitle.email}</label>
                    <input ref={register({ required: true })} type="email" name="email" />
                    {errors.email && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle />{signTitle.emailError}</motion.div>}
                </div>
                <div className="form-group">
                    <label>{signTitle.password}</label>
                    <input ref={register({ required: true, minLength: 8 })} type="password" name="password" />
                    {errors.password && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle /> {signTitle.passwordError}</motion.div>}
                </div>
                <div className="helpers">
                    <div>
                        <input ref={register} type="checkbox" name="remember" />
                        <span>{signTitle.remember}</span>
                    </div>
                    <ins>{signTitle.forgot}</ins>
                </div>
                <button type="submit">{signTitle.signIn}</button>
            </form>
        </div>
    );
};

export default Signin;