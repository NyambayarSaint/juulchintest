import getStars from '@/components/miscs/getStars';
import minimize from '@/components/miscs/minimize';
import React from 'react';
import styled from 'styled-components';
import "swiper/css";
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ContentParser from '@/components/miscs/ContentParser';
import { MenuContext } from '@/components/miscs/ContextMenuProvider';
import dateFormat from 'dateformat';
import Link from 'next/link';

const Detail = ({ data }) => {
    const { general } = useContext(MenuContext);    
    console.log(general.socials.social, 'fdsfd');
    return (
        <Container>          
            <div className="container">
                 <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrapper">
                            <h2>{data.title}</h2>
                            <div className="row">
                                <div className="col-md-6 col-sm-6 left-side">
                                    <div className="avatar">
                                        <img src={minimize(data.author.Avatar[0], 'thumbnail')}/>
                                    </div>
                                    <div className="userinfo">
                                        <div className="role">Нийтлэгч</div>
                                        <div className="author">{data.author.name}</div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 rightside">
                                    <div className="social-link">
                                        {
                                            general.socials.social.map((el, index) => (
                                                // <a href={el.link} target="_blank">
                                                <Link className="social" href={el.link}>
                                                     <a target="_blank" rel="noreferrer" className="social">
                                                        <img key={index} src={minimize(el.image, 'small')}/>
                                                    </a>
                                                </Link>
                                            ))
                                        }                                       
                                    </div>
                                    <div className="date">
                                        <div className="datetime">{dateFormat(data.published_at, 'mm сарын dd, yyyy')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-wrapper">
                            { data.Layout.map((item, key) =>{
                                    let content
                                    if (item.__component =="components.blogtext") content =`<div className="text">${item.text}</div>`
                                    else if (item.__component =="components.blogimage") content =`<img className="image" src=${minimize(item.img, 'large')}>`
                                    return <ContentParser key={key}  html={content} /> 
                                }                                
                            )}
                        </div>
                    </div>                   
                </div>
            </div>
        </Container>
    );
};

export default Detail;

const Container = styled.div`
    font-family: PT Sans;
    font-style: normal;
    color: #000;

    .container{
        .name_wrapper{
            margin-top:30px;
            margin-bottom:30px;
        }

        .title-wrapper{
            margin-top: 30px;
            display:block;

            h2 {
                text-align: center;
                font-weight: bold;
                font-size: 30px;
                line-height: 39px;
            }  

            .left-side{
                display: flex;
                flex-direction: row;

                .avatar{
                    img{
                        object-fit: cover;
                        object-position: center;
                        border-radius: 50%;
                        height: 50px;
                        width:auto;
                    }
                }
                .userinfo{
                    align-self: center;
                    padding-left: 10px;
                    .role{
                        font-size: 12px;
                    }
                    .author{
                        margin-top: 0px;                    
                        font-weight: 600;
                        font-size: 12px;
                    }
                }
            }

            .rightside{
                
                .social-link{
                    display: flex;
                    flex-direction: row;
                    justify-content:flex-end;

                    .social{
                        padding-left: 30px;
                    }                
                }

                .date {
                    display: flex;
                    justify-content: flex-end;

                    .datetime {
                        padding-top: 14px;                        
                        font-style: normal;
                        font-weight: 600;
                        font-size: 12px;
                        color:#000;
                    }
                }
            }
        }
        .main-wrapper{
            text-align:center;
            margin: 20px 0 50px;

            .image {
                padding:30px 0;
                object-fit: cover;
                object-position: center;
                width: 100%;
            }

            p{
                font-family: "PT Serif";
                font-style: normal;
                font-weight: normal;
                font-size: 17.8px;
                line-height: 24px;
                letter-spacing: 0.04em;
                text-align:justify;
                margin: 0 15%;
            }

            img{

            }

            .content {
                font-family: "PT Serif";   
                color:#000;         
                font-weight: normal;
                font-size: 17.8px;
                line-height: 24px;
                letter-spacing: 0.04em;
                padding:30px 0;
                margin:0 150px;
                text-align: justify;
            }

        }
    }
`