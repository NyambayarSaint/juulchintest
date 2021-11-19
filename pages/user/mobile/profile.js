import Root from '@/core/Root';
import React from 'react';
import Avatar from './Avatar';
import Info from './components/Info'
import Password from './components/Password'
import Confirm from './components/MobileConfirm'
import ConfirmCode from './components/ConfirmCode'
import styled from 'styled-components';
import { motion } from 'framer-motion';

const profile = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Root>
                <Container>
                    <Avatar />
                    <Info />
                    <Password />
                    <Confirm />
                    <ConfirmCode />
                </Container>
            </Root>
        </motion.div>

    );
};

export default profile;

const Container = styled.div`    
    display:block;        
    width:100%;
    font-family: PT Sans;
    font-style: normal;
    padding:0px 15px;

    .links_wrapper{
        margin-top:30px;
        .link{
            width:100%;
            text-align:center;
            font-weight:bold;
            color:${({ theme }) => theme.mainColor};
            padding:8px;
            border:1px solid ${({ theme }) => theme.mainColor};
            border-radius:5px;
            margin-bottom:10px;
        }
    }

    .user-info{
        margin-top:30px;
        display: flex;        
        flex-direction: row;                
        background: #FFFFFF;            
        align-items: center;
        align-content: flex-start;         
        box-shadow: none !important;    
        padding-bottom: 0 !important;        

        img{
            width:30%;
        }
        .user-pic {            
            border-radius:50%         
        }  
        
        .user-name {
            font-family: PT Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 20px;  
            padding-top:15px;   
            margin-bottom:0;   
            padding-bottom:0;
        }
        .desc{
            padding-left:25px;
            align-self:baseline;
        }

        .user-email{
            font-size: 15px;
            line-height: 19px;
            letter-spacing: 0.08em;
            color: #5A5A5A;
        }
    
    }
       

    .small-button{     
        display:block;
        text-align:center;
        width:auto !important;        
        font-size: 20px;
        font-weight:bold;
        padding:2px 10px;
        color: #fff;
        background: #334195;
        border-radius: 4px;   
        border: 1px solid #334195;
        text-transform:uppercase;
        margin-bottom:10px;
    }
    
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

    .fix-size{
        display:block;        
        margin-top:40px;        
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
        padding-left: 90px;
    }

    .pt-34{
        padding-top: 34px;
    }

    .primaryButton{                
        text-align:right;
        font-size: 14px;
        font-weight: bold;
        padding:11px 30px;
        color: #fff;
        background: #334195;
        border-radius: 4px;                
    }
    
    .flex-end {
        justify-content: end;
    }   
`;
