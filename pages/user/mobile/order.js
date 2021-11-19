import Root from '@/core/Root';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import Orders from './components/Orders';
import { useRouter } from 'next/router';

const order = () => {

    const R = useRouter()

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Root>
                <Container>                    
                    <div className="flex">
                        <button onClick={()=>R.back()} className="small-button"><BsArrowLeft/></button>                  
                        <div><h5 className="title">Миний захиалгууд</h5></div>
                    </div>
                    <Orders/>
                </Container>
            </Root>
        </motion.div>

    );
};

export default order;

const Container = styled.div`
    display:block;        
    width:100%;
    font-family: PT Sans;
    font-style: normal;
    padding:0px 15px;

    .flex{
        display:flex;

        .title {
            margin-left: 20px;
            font-weight: bold;
            font-size: 16px;
            line-height: 21px;
            letter-spacing: 0.04em;
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
