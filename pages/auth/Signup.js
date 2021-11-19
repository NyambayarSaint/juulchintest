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

    const { register, handleSubmit, errors, setError } = useForm();
    const R = useRouter();
    const { set } = React.useContext(Ecommerce);

    const handle = async (data) => {

        if (data.password !== data.password2) return setError('password2', { shouldFocus: true });

        try {
            let res = await Axios.post(process.env.serverUrl + '/auth/local/register', { ...data, username: data.email });
            set({ user: res.data.user, jwt: res.data.jwt });
            nookies.set(null, 'jwt', res.data.jwt, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            return fromAction ? R.push('/checkout/address') : R.push('/user');
        }
        catch (e) {
            return notify({ message: 'Бүртгэлтэй и-мэйл байна. Та Нууц үгээ сэргээнэ үү!', type: 'danger', onScreen: true });
        }
    }

    return (
        <div className="g-login">
            <div className="links">
                <p onClick={() => setSign(signTitle.signIn)}>{signTitle.signIn}</p>
                <p className="active" onClick={() => setSign(signTitle.signUp)}>{signTitle.signUp}</p>
            </div>
            <div className="social-con">
                <button className="fb-button" onClick={() => R.push(process.env.serverUrl+'/connect/facebook')}><FaFacebookF /> Facebook -ээр {signTitle.signUp}</button>
            </div>
            {/* <div className="social-con">
                <button className="gl-button" onClick={() => R.push(process.env.serverUrl+'/connect/google')}><FaGoogle /> Gmail -ээр {signTitle.signUp}</button>
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
                <div className="form-group">
                    <label>{signTitle.password2}</label>
                    <input ref={register({ required: true })} type="password" name="password2" />
                    {errors.password2 && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle /> {signTitle.password2Error}</motion.div>}
                </div>
                <button type="submit">{signTitle.signUp}</button>
                <div className="helpers policy">
                    <div>
                        <p>Үргэлжлүүлэх товчийг дарж, Facebook эрхээрээ нэвтрэх болон бүртгэл үүсгэснээр Та Juulchin.mn-н <a target="__blank" href="/p/uilchilgeenii-nuhtsul">Үйлчилгээний нөхцөл</a> болон <a target="__blank" href="/p/nuutslaliin-bodlogo">Нууцлалын бодлогыг</a> хүлээн зөвшөөрч буй болно.</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signin;