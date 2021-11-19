import React from "react";
import formatNumber from '@/components/miscs/formatNumber';
import { getTotalPrice } from '@/components/miscs/cart';
import { Ecommerce } from "@/components/miscs/ContextEcommerceProvider";
import { useRouter } from "next/router";
import styled from "styled-components";

const Panel = ({action}) => {
    const {cart} = React.useContext(Ecommerce)
    const R = useRouter();
    return (
        <Container>
            <h5>Захиалгын мэдээлэл</h5>
            <div className="box_wrap">
                <div className="box">
                    <div className="l">
                        {cart?.map((inst) => (
                            <div className="travels" key={Math.random()}>
                                <span>{inst.travel.name}</span>
                                <small>
                                    ({inst.schedule.start} - {inst.schedule.end}
                                    )
                                </small>
                            </div>
                        ))}
                    </div>
                    <div className="r trav">
                        <b>{cart.length}ш</b>
                    </div>
                </div>
                <div className="box">
                    <div className="l">Нийт үнэ:</div>
                    <div className="r">{formatNumber(getTotalPrice())}₮</div>
                </div>
                <div className="box">
                    <div className="l">Хямдрал:</div>
                    <div className="r">-0₮</div>
                </div>
                <div className="box discount">
                    <div className="l">Хямдрал:</div>
                    <div className="r">-0₮</div>
                </div>
                <div className="box">
                    <div className="l">Таны тооцоо:</div>
                    <div className="r">{formatNumber(getTotalPrice())}₮</div>
                </div>
            </div>
            <div className="buttons_wrap">
                <button
                    onClick={action}
                    className="main"
                >
                    ХУДАЛДАН АВАХ
                </button>
                <button onClick={()=>R.back()}>ӨМНӨХ АЛХАМРУУ БУЦАХ</button>
            </div>
        </Container>
    );
};

export default Panel;

const Container = styled.div `
    h5{
        font-weight: bold;
        color: ${({theme})=>theme.mainColor};
        margin-bottom:32px;
    }
    .box_wrap{
        margin-bottom:30px;
        .box{
            display:flex;
            border:1px solid rgba(0,0,0,0.1);
            border-bottom:none;
            padding:15px;
            font-weight:bold;
            color:#5A5A5A;
            &:last-child{
                border-bottom:1px solid rgba(0,0,0,0.1);
                border-bottom-left-radius:8px;
                border-bottom-right-radius:8px;
            }
            &:first-child{
                border-top-left-radius:8px;
                border-top-right-radius:8px;
            }
            &.discount{
                color:#FC8233;
            }
            .l{
                flex:1;
                .travels{
                    margin-bottom:10px;
                    font-weight:normal;
                    &:last-child{
                        margin-bottom:0px;
                    }
                    span{
                        display:block;
                        margin-bottom:5px;
                    }
                    b{
                        display:block;
                    }
                }
            }
            .r{
                max-width:100px;
                min-width:100px;
                text-align:right;
            }
        }
    }
    .buttons_wrap{
        button{
            width:100%;
            padding:16px;
            color:white;
            background: #C4C4C4;
            border-radius:8px;
            border:none;
            margin-bottom:15px;
            &.main{
                background:${({theme})=>theme.mainColor};
            }
        }
    }
`