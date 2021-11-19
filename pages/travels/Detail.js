import getStars from '@/components/miscs/getStars';
import minimize from '@/components/miscs/minimize';
import React from 'react';
import styled from 'styled-components';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Panel from './Panel'
import ContentParser from '@/components/miscs/ContentParser';

const Detail = ({ data }) => {
    console.log(data, 'data')



    return (
        <Container>
            <Swiper autoplay>
                {data.images?.map(inst => <SwiperSlide key={Math.random()}><img src={minimize(inst)} /></SwiperSlide>)}
            </Swiper>
            <div className="container">
                <div className="name_wrapper">
                    <h3>{data.name}</h3>
                    <div className="stars_wrapper">
                        <span className="stars">{getStars(data.rating)}</span>
                        <span className="dot">•</span>
                        <span className="rating">{data.rating}</span>
                        <span className="total">({data.reviews.length})</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="general_wrapper" onClick="">
                            <h4 style={{ fontWeight: 'bold', marginBottom: 30, opacity: 0.7 }}>Ерөнхий мэдээлэл</h4>
                            <div className="features_wrapper row">
                                {data.features?.map(feature => <div className="feature col-md-6" key={Math.random()}>
                                    <img src={minimize(feature.icon, 'thumbnail')} />
                                    <span>{feature.name}</span>
                                </div>)}
                            </div>
                            <div className="description_wrapper">
                                <ContentParser html={data.description} />
                            </div>
                            <h4 style={{ fontWeight: 'bold', marginBottom: 20, opacity: 0.7 }}>Аялалын үнэд багтсан зүйлс</h4>
                            <div className="includes_wrapper row">
                                {data.Includes?.map(include => <div className="include col-md-6" key={Math.random()}>
                                    <img src="/img/check.png" />
                                    <span>{include.name}</span>
                                </div>)}
                            </div>
                            <h4 style={{ fontWeight: 'bold', marginBottom: 20, opacity: 0.7 }}>Аялалын хөтөлбөр</h4>
                            <div className="plans_wrapper">
                                {data.plans?.map(plan => <div className="plan row" key={Math.random()}>
                                    <div className="col-md-4 l"><img src={minimize(plan.image)} /></div>
                                    <div className="col-md-8 r">
                                        <div className="top">
                                            <div className="day">Өдөр {plan.day}</div>
                                            <div className="name">{plan.name}</div>
                                        </div>
                                        <div className="bottom"><ContentParser html={plan.description} /></div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Panel data={data} />
                    </div>
                </div>

            </div>
        </Container>
    );
};

export default Detail;

const Container = styled.div`
    .swiper{
        .swiper-wrapper{
            .swiper-slide{
                height:500px;
                img{
                    width:100%;
                    height:100%;
                    object-fit:cover;
                }
            }
        }
    }
    .container{
        .name_wrapper{
            margin-top:30px;
            margin-bottom:30px;
        }
        .stars_wrapper{
            .stars{
                margin-right:10px;
                svg{
                    color:#ffc107;
                    margin-top:-4px;
                }
            }
            .dot{
                margin-right:10px;
            }
            .rating{
                margin-right:10px;
                font-weight:bold;
            }
            .total{
                font-weight:bold;
                color: ${({ theme }) => theme.mainColor};
            }
        }
        .general_wrapper{
            // box-shadow:1px 1px 5px rgba(0,0,0,0.1);
            margin-bottom:30px;
            border-radius:12px;
            border:1px solid rgba(0,0,0,0.1);
            padding:30px 30px;
            .features_wrapper{
                margin-bottom:15px;
                .feature{
                    margin-bottom:15px;
                    img{
                        width:18px;
                        height:18px;
                        object-fit:contain;
                        object-position:center;
                        margin-right:10px;
                    }
                }
            }
            .description_wrapper{
                margin-bottom:30px;
            }
            .includes_wrapper{
                margin-bottom:30px;
                .include{
                    margin-bottom:15px;
                    display:flex;
                    align-items:center;
                    img{
                        margin-right:10px;
                        width:16px;
                        height:16px;
                    }
                    span{
                        line-height:14px;
                    }
                }
            }
            .plans_wrapper{
                .plan{
                    margin-bottom:30px;
                    &:last-child{
                        margin-bottom:0px;
                    }
                    .l{
                        img{
                            width:100%;
                            height:100%;
                            object-fit:cover;
                            object-position:center;
                            border-radius:12px;
                        }
                    }
                    .r{
                        .top{
                            padding:15px;
                            border:1px solid rgba(0,0,0,0.1);
                            border-bottom:none;
                            border-top-left-radius:12px;
                            border-top-right-radius:12px;
                            display:flex;
                            align-items:center;
                            .day{
                                margin-right:15px;
                                font-weight:bold;
                                opacity:0.8;
                                color:${({ theme }) => theme.mainColor};
                            }
                            .name{
                                font-weight:bold;
                            }
                        }
                        .bottom{
                            padding:15px;
                            border:1px solid rgba(0,0,0,0.1);
                            border-bottom-left-radius:12px;
                            border-bottom-right-radius:12px;
                        }
                    }
                }
            }
        }
        .panel_wrapper{
            .img_wrap{
                img{
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                }
            }
            .count-wrap {
                padding: 20px;
                display: flex;
                flex-direction: row;
                align-items: stretch;
                justify-content: space-around;
                font-size: 16px;
                .count-wrap-col {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .count-wrap-control {
                        padding: 5px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .count-wrap-box {
                            padding: 7px 13px;
                            border: 1px solid #eee;
                            cursor: pointer;
                            &:hover {
                                background-color: rgba(0,0,0,0.1);
                            } 
                            &:active {
                                background-color: rgba(0,0,0,0.2);
                            } 
                            &:first-child {
                                border-right: none;
                                border-radius: 5px 0 0 5px;
                                font-size: 16px;
                            }
                            &:nth-child(2) {
                                font-size: 14px;
                            }
                            &:last-child {
                                border-left: none;
                                border-radius: 0 5px 5px 0;
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
            .main_wrap{
                padding:30px 15px;
                border:1px solid rgba(0,0,0,0.1);
                border-bottom-left-radius:12px;
                border-bottom-right-radius:12px;
                .control_wrap{
                    border-radius:12px;
                    border: 1px solid rgba(0,0,0,0.1);
                    .bar{
                        display: flex;
                        padding:15px;
                        align-items: center;
                        &:first-child{
                            border-bottom: 1px solid rgba(0,0,0,0.1);
                        }
                        .icon{
                            margin-right: 15px;
                        }
                        .arrow{
                            margin-left: auto;
                        }
                        .info{
                            .caption{
                                opacity: 0.4;
                                font-weight: bold;
                                margin-bottom: 6px;
                            }
                            .select-wrap{
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;
                                .seperate{
                                    font-size: ${({ theme }) => theme.fontSize2};
                                    &:first-child{
                                        margin-right: 15px;
                                    }
                                    span{
                                        margin-left: 5px;
                                    }
                                    select{
                                        /* appearance: none; */
                                        border:none;
                                        padding-bottom: 2px;
                                        outline: none !important;
                                        
                                    }
                                }
                            }
                        }
                    }
                }
                h4{
                    text-align:center;
                    padding:30px 0px;
                }
                .buttons_wrap{
                    padding:0px 30px;
                    margin-bottom: 30px;
                    button{
                        width: 100%;
                        border:none;
                        background:white;
                        font-weight: 500;
                        text-align:center;
                        padding:15px;
                        border-radius: 32px;
                        text-transform: uppercase;
                        font-size: ${({ theme }) => theme.fontSize2};
                        border:2px solid rgba(0,0,0,0.1);
                        img{
                            margin-right: 10px;
                            margin-top:-4px;
                        }
                    }
                    button.main{
                        background:${({ theme }) => theme.mainColor};
                        color:white;
                        margin-bottom: 15px;
                        &.disabled{
                            &:hover{
                                cursor: not-allowed;
                            }
                        }
                    }
                }
                .payments_wrap{
                    span{
                        text-align:center;
                        font-weight: bold;
                        display: block;
                        margin-bottom: 15px;
                    }
                    .logos_wrap{
                        text-align:center;
                        img{
                            margin:0px 10px;
                        }
                    }
                }
            }
        }
    }
`