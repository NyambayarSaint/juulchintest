import React from 'react';
import { BsShieldLockFill } from "react-icons/bs";
import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';
import Axios from 'axios';
import notify from '@/components/miscs/notify';
import styled from 'styled-components';
import nProgress from 'nprogress';
import Link from 'next/link'

const Password = () => {

    const [editable, setEditable] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const { user } = React.useContext(Ecommerce);

    const handle = async (e) => {
        e.preventDefault();
        nProgress.start()
        try {
            await Axios.post(process.env.serverUrl + '/auth/forgot-password', { email: user.email });
            setSuccess(true);
            nProgress.done()
        } catch (e) {
            notify({ title: 'Алдаа гарлаа!', message: '', type: 'danger', duration: 10, onScreen: true });
            nProgress.done()
        }
    }

    return (
        <Container>            
            <form className="row">  
                <div className="container mt-40">
                { success ? <div>Таны и-мэйл хаягруу явсан.</div> : 
                <button onClick={handle} className="button">Нууц үг солих линк авах</button> }
                </div>
            </form>
        </Container>
    );
};

export default Password;

const Container = styled.div`    
    border-top: 1px solid #ddd;
    display:block;   
    margin-top:50px !Important;
        
    .button{     
        display:block;
        text-align:center;
        width:100% !important;        
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #fff;
        background: #334195;
        border-radius: 4px;   
        border: 1px solid #334195;
        text-transform:uppercase;
    }

    @media only screen and (max-width: 768px){
        margin:0 5px;
        padding:0 10px;       
    }


    .smallTitle{
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

    .formInput{
        color: #5A5A5A;
        display:block;
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
    
    .pl-max{
        padding-left: 85px;
    }
    .ml-max{
        margin-left: 85px;
    }

    .pt-34{
        padding-top: 34px;
    }

    .mt-40{
        margin-top:40px;
    }

    .primaryButton{
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #fff;
        background: #334195;
        border-radius: 4px;            
    }
    
`;