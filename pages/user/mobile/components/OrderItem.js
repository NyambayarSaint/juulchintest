import React from 'react';
import styled from 'styled-components';

const OrderItem = () => {

     return (
        <Container>
            <div className="card">
                <div className="sub-item">
                    <h5 className="order-title"><span className="dot red"> &#183;</span>Төлбөр хүлээгдэж буй</h5>
                    <div className="sub-text">2021/11/9 12:19</div>
                </div> 
                <div className="item-body">
                    <div className="image">
                        <img src="/img/khiid.png" className="sub-image" />
                    </div>
                    <div className="travel-name">Аглаг бүтээлийн хийд</div>
                    <div>
                        <h5 className="order-title">Захиалгын дугаар</h5>
                        <div className="">21313213231</div>
                    </div>
                </div>  
                <div className="footer">
                    <div className="wrapper">
                        <div className="order">
                            <h5 className="order-title">Захиалгын дүн</h5>
                        </div>
                        <div className="amount">500.000₮</div>
                    </div>
                </div>  
            </div>
        </Container>
    );
};

export default OrderItem;

const Container = styled.div`        
    font-family: PT Sans;
    font-style: normal;
    margin-top: 35px;    
    border-bottom: 4px solid #E5E5E5;   
    border-radius: 8px;      
    width:100%;
    padding:0;
       
    .travel-name{
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;   
        width:30%;        
    }

    .image{
        margin-left:0;
        padding-left:0;
    }
        
    .sub-image{        
        width:70%;
        margin:0 auto;       
    }

    .item-body{
        display:flex;
        margin-left:30px;
        align-items: flex-start
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
        display:flex;        
        margin-top: 20px;
        border-right: 1px solid #1111;
        padding:0 10px;
        margin-left: 20px;
        color: #000;
        margin-bottom: 20px;
        width:100%;

        .sub-text{
            font-size: 14px;
            line-height: 18px;
            padding-left: 30px;              
        }

        .order-title{        
            position:relative;
            font-weight: bold;
            font-size: 14px;
            line-height: 18px;
            letter-spacing: 0.08em;
              
        }
      
    }

    .footer{
        margin-top:10px;
        background: #F8F8F8; 

        .wrapper{
            display:flex;        
            justify-content: space-between;    

            .order{                
                padding-top:10px;
                margin-left:30px;
            }
            .amount {
                padding-top:10px;
                margin-right: 30px;
                font-size: 12px;
                line-height: 16px;
                letter-spacing: 0.08em;
            }
        }
    }
    
`;