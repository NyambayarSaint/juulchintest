import React from 'react';
import minimize from "@/components/miscs/minimize";
import {BsTrash} from 'react-icons/bs'
import formatNumber from "@/components/miscs/formatNumber";
import styled from 'styled-components';
import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';

const CartInstance = ({instance}) => {
    const [adultCount, setAdultCount] = React.useState(Number(instance.adult))
    const [childCount, setChildCount] = React.useState(Number(instance.child))
    const [amount, setAmount] = React.useState(instance.amount)
    const {handleAddCart, handleRemoveCart} = React.useContext(Ecommerce)
    const [preventUseEffect, setPreventUseEffect] = React.useState(true)
    const handleChange = (type, inc) => {
        type === 'adult' && setAdultCount(adultCount + inc >= 0 ? adultCount + inc : 0 )
        type === 'child' && setChildCount(childCount + inc >= 0 ? childCount + inc : 0 )
        setPreventUseEffect(false)
    }
    React.useEffect(()=>{
        if (!preventUseEffect) {
            setAmount((adultCount * instance.travel.price_adult) + (childCount * instance.travel.price_child))
        }
    }, [adultCount, childCount])
    React.useEffect(() => {
        if (!preventUseEffect) {
            handleAddCart({ ...instance, adult: adultCount, child: childCount, amount })
        }
    },[amount])
    return (
        <ContainerRow className="row">
            <div className="col-md-6 cols">
                <div className="caption">Бараа</div>
                <div className="box info">
                    <img src={minimize(instance.travel.thumbnail_img, 'small')}/>
                    <div className="name">
                        <p>{instance.travel.name}</p>
                        <small>{instance.schedule.start} - {instance.schedule.end}</small>
                    </div>
                </div>
            </div>
            <div className="col-md-3 cols">
                <div className="caption">Тоо ширхэг</div>
                <div className="box operation">
                    <div className="seperate">
                        <span>Том хүн<small>({formatNumber(instance.travel.price_adult)}₮)</small></span>
                        <div className="control">
                            <button className="minus" onClick={()=>handleChange('adult', -1)}>-</button>
                            <div className="quantity">{adultCount}</div>
                            <button className="plus" onClick={()=>handleChange('adult', 1)}>+</button>
                        </div>
                    </div>
                    <div className="seperate">
                        <span>Хүүхэд<small>({formatNumber(instance.travel.price_child)}₮)</small></span>
                        <div className="control">
                            <button className="minus" onClick={()=>handleChange('child', -1)}>-</button>
                            <div className="quantity">{childCount}</div>
                            <button className="plus" onClick={()=>handleChange('child', 1)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-1 cols hide_mobile">
                <div className="caption" style={{textAlign:'center'}}>Нэгж үнэ</div>
                <div className="box prices">
                    <div className="price">{formatNumber(instance.travel.price_adult)}₮</div>
                    <div className="price">{formatNumber(instance.travel.price_child)}₮</div>
                </div>
            </div>
            <div className="col-md-1 cols" style={{textAlign:'right'}}>
                <div className="caption">Дүн</div>
                <div className="box unit">{formatNumber(amount)}₮</div>
            </div>
            <div className="col-md-1 cols hide_mobile" style={{textAlign:'right'}}>
                <div className="caption">&nbsp;</div>
                <div className="box delete"><button onClick={()=>handleRemoveCart(instance)} className="delete_button"><BsTrash/></button></div>
            </div>
            <div className="mobile_delete_wrap"><button onClick={()=>handleRemoveCart(instance)} className="delete_button"><BsTrash/></button></div>
        </ContainerRow>
    );
};

export default CartInstance;

const ContainerRow = styled.div `
    margin-left: 0px;
    margin-right: 0px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &:first-child{
        .cols{
            .caption{
                display: block !important;
            }
        }
    }
    .cols{
        padding:0px;
        .caption{
            display: none;
        }
    }
    .caption{
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding:10px 0px;
    }
    .mobile_delete_wrap{
        display: none;
    }
    .delete_button{
        border:none;
        background: #5A5A5A;
        color:white;
        border-radius:6px;
        width: 30px;
        height: 30px;
    }
    .box{
        padding:30px 0px;
        height: 170px;
        display: flex;
        align-items: center;
    }
    .box.info{
        img{
            width: 168px;
            height: 110px;
            object-fit: cover;
            margin-right: 30px;
            border-radius: 12px;
        }
        .name{
            font-weight: bold;
            opacity: 0.7;
        }
    }
    .box.unit{
        justify-content: flex-end;
        font-weight: bold;
    }
    .box.delete{
        justify-content: flex-end;
    }
    .box.operation{
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .seperate{
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            &:last-child{
                margin-bottom: 0px;
            }
            span{
                width: 50px;
                margin-right: 10px;
                small{
                    display: none;
                }
            }
            .control{
                display: flex;
                font-size: ${({theme})=>theme.fontSize2};
                div,button{
                    height:36px;
                    line-height: 36px;
                    padding:0px 15px;
                    border:1px solid rgba(0,0,0,0.1);
                    background: white;
                }
                button{
                    &:active{
                        background: rgba(0,0,0,0.4);
                    }
                }
                .quantity{
                    border-left: none;
                    border-right: none;
                }
                .minus{
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    font-size: 24px;
                }
                .plus{
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    font-size: 24px;
                }
            }
        }
    }
    .box.prices{
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .price{
            line-height: 36px;
            width: 100%;
            text-align:center;
            &:first-child{
                margin-bottom: 15px;
            }
        }
    }
    @media only screen and (max-width: 768px){
        position: relative;
        margin-bottom: 15px;
        .hide_mobile{
            display: none !important;
        }
        .mobile_delete_wrap{
            display: block;
            position: absolute;
            top: 15px;
            right: 15px;
        }
        .cols{
            display: flex;
            align-items: center;
            border:1px solid rgba(0,0,0,0.1);
            border-bottom: none;
            &:last-child{
                margin-bottom: 0px;
                border-bottom: 1px solid rgba(0,0,0,0.1);
            }
            .caption{
                max-width: 80px;
                min-width: 80px;
                border:none;
                text-align:left !important;
                padding:0px 15px;
                display: block;
            }
            .box{
                border-left: 1px solid rgba(0,0,0,0.1);
                padding:15px;
                height: auto;
            }
            .box.info{
                flex-direction: column;
                align-items: flex-start;
                img{
                    margin:0px;
                    margin-bottom: 15px;
                }
            }
            .box.operation{
                .seperate{
                    &:first-child{
                        margin-bottom: 0px;
                        padding-bottom: 10px;
                        margin-bottom: 10px;
                        border-bottom: 1px dashed rgba(0,0,0,0.1);
                    }
                    span{
                        width: 100px;
                        small{
                            display: inline-block;
                            margin-top: 3px;
                            margin-left: 5px;
                        }
                    }
                }
            }
            .box.prices{
                .price{
                    margin-bottom: 0px;
                    text-align:left;
                }
            }
        }
    }
`