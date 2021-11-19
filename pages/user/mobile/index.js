import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import Root from '@/core/Root';
import Avatar from './Avatar'
import { motion } from 'framer-motion';

const UserMobile = (props) => {
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Root>
                <Container>
                    <Avatar />
                    <div className="links_wrapper">
                        <Link href='/user/mobile/profile'><div className="link">Хувийн мэдээлэл</div></Link>
                        <Link href='/user/mobile/order'><div className="link">Миний захиалгууд</div></Link>
                        <Link href='/user/mobile'><div className="link">Хүслийн жагсаалт</div></Link>
                        <Link href='/user/mobile'><div className="link">Гарах</div></Link>
                    </div>
                </Container>
            </Root>
        </motion.div>

    );
};

export default UserMobile;

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
    


`;
