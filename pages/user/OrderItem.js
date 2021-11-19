import React from 'react';
import styled from 'styled-components';
import minimize from '@/components/miscs/minimize';
import formatNumber from '@/components/miscs/formatNumber';
import FormatDate from '@/components/miscs/formatDate';
import Link from 'next/link'

const OrderItem = (props) => {
     
     return (
        <Container>
            <Link href={`/travels/${props.item.travel.slug}`}>
                <div className="flex flex-row link">
                    <div className="">
                        <img src={minimize(props.item.travel.thumbnail_img)} className="sub-image" />
                    </div>
                    
                    <div className="sub-item">
                        <h5 className="order-title">{FormatDate(props.date, '/')}</h5>
                        <div className="sub-text">{props.item.travel.name}</div>
                    </div>                    
                    <div className="sub-item">
                        <h5 className="order-title">Захиалгын дугаар</h5>
                        <div className="sub-text">{props.no}</div>
                    </div>  
                    <div className="sub-item">
                        <h5 className="order-title"><span className="dot red"> &#183;</span>Баталгаажсан</h5>
                        <div className="sub-text">{FormatDate(props.date, '/')}</div>
                    </div>  
                    <div className="sub-item">
                        <h5 className="order-title">Дүн</h5>
                        <div className="sub-text">{formatNumber(props.amount)}₮</div>
                    </div> 
                </div>
            </Link>               
        </Container>
    );
};

export default OrderItem;

const Container = styled.div`        
    font-family: PT Sans;
    font-style: normal;
    margin-top: 35px;
    padding-left: 15px;
    border-bottom: 4px solid #E5E5E5;   
    border-radius: 8px;  
    display:flex;
    flex-direction: row;    
    align-items: center;
    justify-content: center;

    .link{
        cursor: pointer;
    }

    .sub-image{
        margin-bottom: 7px;
        object-fit:cover;
    }

    .dot{                        
        position:absolute;
        color: #5A5A5A;        
        font-size:35px;        
        font-weight:bold;          
        top: 0px;           
        left: -14px;
    }
    .yellow {
        color: #FFC500;
    }
    .blue {
        color: #334195;
    }
    .red{
        color: #FF0000;
    }
    .sub-item {                        
        border-right: 1px solid #1111;
        padding:0 20px;
        color: #000;       

        .sub-text{
            font-size: 14px;
            line-height: 18px;
            display: flex;           
        }
        .order-title{        
            position:relative;
            font-weight: bold;
            font-size: 14px;
            line-height: 18px;
            letter-spacing: 0.08em;   
        }
    }
    .sub-item:last-child{
        border:none;
    }
    .flex-row{
        flex-direction: row
    }
 
    

`;