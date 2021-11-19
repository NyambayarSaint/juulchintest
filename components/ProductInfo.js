import React from 'react';
import styled from 'styled-components';
import { Ecommerce } from './miscs/ContextEcommerceProvider';
import minimize from './miscs/minimize';

const ProductInfo = () => {
    const { cart } = React.useContext(Ecommerce);
    return (
        <Container>
            {cart.map(el => (
                <div className="box" key={Math.random()}>
                    <img src={minimize(el.Images[0],'small')}/>
                    <div><small>{el.Title}</small></div>
                    <div className="qty"><small>x{el.qty}</small></div>
                    <div className="price"><small>{el.Price * el.qty}₮</small></div>
                </div>
            ))}
        </Container>
    );
};

export default ProductInfo;

const Container = styled.div`
    .box{
        display:flex;
        justify-content:flex-start;
        border:1px solid rgba(0,0,0,0.1);
        padding:15px;
        align-items:center;
        border-bottom:unset;
        img{
            height:50px;
            margin-right:15px;
        }
        div{
            margin-right:15px;
            small{
                font-weight:500;
            }
            &:last-child{
                margin-right:0px;
            }
        }
        .qty{
            margin-left:auto;
            small{
                font-weight:bold;
            }
        }
        .price{
            margin-left:auto;
        }
    }
`