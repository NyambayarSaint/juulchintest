import React from 'react';
import { FaKey, FaRegWindowClose, FaPen, FaExternalLinkSquareAlt } from 'react-icons/fa';
import { BsShieldLockFill } from "react-icons/bs";
import { Ecommerce } from '../miscs/ContextEcommerceProvider';
import Axios from 'axios';
import notify from '../miscs/notify';
import styled from 'styled-components';
import nProgress from 'nprogress';

const Box = () => {

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
            <form className="">                
                    <div className="top">
                        <h4 className="title"><BsShieldLockFill /> Нууц үг</h4>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {success ?
                            
                            <div>Таны и-мэйл хаягруу явсан.</div>
                            :
                            <div className="pt-34">
                                <button onClick={handle} className="primaryButton">Нууц үг солих линк авах</button>
                            </div>
                            }
                            
                        </div>
                    </div>
            </form>
        </Container>
    );
};

export default Box;

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

    .primaryButton{
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #fff;
        background: #334195;
        border-radius: 4px;            
    }
    
`;