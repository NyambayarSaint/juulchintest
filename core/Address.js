import React from 'react';
import styled from 'styled-components';
import minimize from '@/components/miscs/minimize';

const Address = (props) => {
        
    return (
        <div className="col-lg-3">
            <div className="title">Хаяг</div>
            <div className="list-title">{props.location}</div>
            <div className="title pt-30">Сошиал Хаягууд</div>
            <div className="list-title">
            {  
                props.socials.map(el => (
                    // <a href={el.link} target="_blank">
                    <img className="pr-30" key={el.id} src={minimize(el.image, 'small')}/>
                    // </a>
                ))
            }
            </div>
        </div>   
    )
}

export default Address;

const Container = styled.div`
    footer {
        background: #F8F8F8;
    }
    .title{
        font-family: PT Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 0.08em;
        color: #000000;
        text-transform:uppercase;
        padding-bottom: 24px;
    }
    .list-unstyled {
        list-style-image: initial;
    }
    .mb {
        margin-bottom: 0.5rem !important;
    }

    ul > li{
        padding: 4px 0px;
    }

    .text-underline {
        text-decoration-line: underline;
    }

    .list-title{
        font-family: PT Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 17px;
        /* identical to box height */
        letter-spacing: 0.08em;
        color: rgba(0, 0, 0, 0.5);
    }

    /* padding */ 
    .pt-59{
        padding-top: 59px;
    }

    .pb-24{
        padding-bottom: 24px;
    }   
    .pt-30{
        padding-top: 30px;
    } 
    .pr-30{
        padding-right: 30px;
    }    

`