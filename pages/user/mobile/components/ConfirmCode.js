import React from 'react';
import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';
import Axios from 'axios';
import notify from '@/components/miscs/notify';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const ConfirmCode = () => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const { register, handleSubmit, errors } = useForm();
    const { user } = React.useContext(Ecommerce);

    const handle = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Axios.post(process.env.serverUrl + '/auth/forgot-password', { email: user.email });
            setSuccess(true);
            return setLoading(false);
        } catch (e) {
            notify({ title: 'Алдаа гарлаа!', message: '', type: 'danger', duration: 10, onScreen: true });
            return setLoading(false);
        }
    }

    return (
        <Container>            
            <form className="mb-40">                
                <div className="">                
                    <label className="smallTitle">Баталгаажуулах код</label>
                    <input className="formNumber" name="lastname" maxLength="4" ref={register({ required: true })} type="text" />                        
                </div>
                <div>                    
                    <button onClick={handle} className="mt-30 button">Баталгаажуулах</button>
                </div>
            </form>            
        </Container>
    );
};

export default ConfirmCode;

const Container = styled.div`    
    display:block;    
    width:100%;

    @media only screen and (max-width: 768px){
        margin:0 5px;
        padding:0 10px;       
    }            

    .top{
        margin-top:30px;
    }

    .smallTitle{
        display:block;
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.04em;
        padding: 15px 0 5px 0;
    }

    .pull-right{
        float:right;
    }

    .title{
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0.04em;
        color: #5A5A5A;
    }

    .formNumber{
        margin-right:4px;
        color: #5A5A5A;        
        width: 100%;        
        border: 1px solid rgba(27, 27, 27, 0.4);
        box-sizing: border-box;
        border-radius: 4px;
        line-height: 1.5;
        padding: 0.375rem 0.75rem;
    }

    .inline {
        display: block;
        width:100%
    }
    
    .mb-40{
        margin-bottom: 40px;
    }

    .primaryButton{
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #fff;
        background: #334195;
        border-radius: 4px;    
        width: 100%;        
    }

    .mt-40{        
        margin-top:40px;
    }
    
    .mt-30{        
        margin-top:30px;
    }
    
`;