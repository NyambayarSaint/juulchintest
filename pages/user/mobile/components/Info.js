import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { FaChevronUp, FaCheckCircle, FaPen } from 'react-icons/fa';
import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';

import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa'
import Axios from 'axios';
import nookies from 'nookies'
import notify from '@/components/miscs/notify';
import { BsArrowLeft } from 'react-icons/bs';
import nProgress from 'nprogress';
import Link from 'next/link'
import { useRouter } from 'next/router';

const Info = (props) => {
    const [editable, setEditable] = React.useState(props.editable ? true : false);
    const { register, handleSubmit, errors } = useForm();
    const { user, set } = React.useContext(Ecommerce);
    const { jwt } = nookies.get(null);
    const R = useRouter()

    const handleSave = async (data) => {        
        try {
            nProgress.start()
            const headers = { headers: { 'Authorization': 'Bearer ' + jwt } };
            await Axios.put(process.env.serverUrl + '/users/' + user.id, { ...data }, headers);
            set({ user: { ...user, ...data } });
            props.setRequired && props.setRequired(false);
            notify({ title: 'Мэдээлэл амжилттай хадгалагдлаа', type: 'success' });
            nProgress.done()
        } catch (e) { return notify({ title: 'Алдаа гарлаа!', type: 'danger' }) }
    }

    return (
        <Container>  
                <div className="top">
                     <button onClick={()=>R.back()} className="small-button"><BsArrowLeft/></button>                  
                  
                </div>
                <button className="button">Хувийн мэдээлэл </button>                                
                <form className="" onSubmit={handleSubmit(handleSave)}>                                    
                    <div className="container">
                        <label className="smallTitle">Нэр*</label>                        
                        <input 
                            className="formInput" 
                            style={{ display:"block", width: "100%"}}
                            defaultValue={user.firstname} 
                            name="firstname" 
                            ref={register({ required: true })} 
                            placeholder="Мэдээлэл оруулаагүй байна." 
                            type="text" />
                            {errors.firstname && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle /> Энэ талбарыг бөглөх шаардлагатай.</motion.div>}
                            {errors.firstname && props.setRequired && props.setRequired(true)}
                    </div>
                    <div className="container">
                        <label className="smallTitle">Овог*</label>
                        <input  
                            className="formInput" 
                            defaultValue={user.lastname} 
                            name="lastname" 
                            ref={register({ required: true })} 
                            placeholder="Мэдээлэл оруулаагүй байна." 
                            type="text" />
                        {errors.lastname && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle /> Энэ талбарыг бөглөх шаардлагатай.</motion.div>}
                        {errors.lastname && props.setRequired && props.setRequired(true)}
                    </div>
                    <div className="container">                        
                        <label className="smallTitle">Хүйс*</label>
                        <input 
                        className="formInput" 
                            defaultValue={user.gender} 
                            name="gender" 
                            ref={register({ required: true })} 
                            placeholder="Мэдээлэл оруулаагүй байна."                        
                            type="gender" />
                            {errors.gender && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle /> Энэ талбарыг бөглөх шаардлагатай.</motion.div>}
                            {errors.gender && props.setRequired && props.setRequired(true)}
                    </div>
                    <div className="container">
                        <label className="smallTitle">Төрсөн өдөр*</label>
                        <input
                        className="formInput" 
                            defaultValue={user.birthdate} 
                            name="birthdate" 
                            ref={register({ required: true })} 
                            placeholder="Мэдээлэл оруулаагүй байна." 
                            type="text" />
                        {errors.birthdate && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><FaInfoCircle />
                        Төрсөн огноогоо оруулна уу. (e.g: 1990-01-01)</motion.div>}
                        {errors.phone && props.setRequired && props.setRequired(true)}
                    </div>
                    <div className="">                            
                        <button className="button fix-size" ref={props.buttonRef} type="submit">Хадгалах </button>                                                        
                    </div>
                </form>
        </Container>
    );
};

export default Info;

const Container = styled.div`    
    
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
        font-weight: 600;
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
