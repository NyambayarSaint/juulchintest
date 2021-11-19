import React from 'react';
import Root from "@/core/Root";
import { motion } from "framer-motion";
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa'
import getStars from '@/components/miscs/getStars';
import minimize from '@/components/miscs/minimize';
import formatNumber from "@/components/miscs/formatNumber"
import Link from 'next/link'

const Wishlist = (props) => {

    
    return (
                <Container>
                  
                    {/* <div className="container">               
                        <div className="row">                                           
                            <div className="col-lg-12 col-md-12 col-sm-12">                                 */}
                                    <div className="row">
                                        <div className="col-lg-12">                                        
                                            <h4 className="title"><FaUserAlt /> Хүслийн жагсаалт</h4>
                                        </div>                                
                                    </div>  
                                    <div className="row ">    
                                      
                                        { 
                                            props.data.map(travel => ( 

                                                <div className="card" key={travel.id}>
                                                <Link href={`/travels/${travel.slug}`}>
                                                <div className="travel-card">
                                                  <img className="travel-card-img" src={minimize(travel.thumbnail_img, 'small')} />
                                                  <div className="travel-card-description">
                                                    <h4 className="travel-card-description-title">{travel.name}</h4>
                                                    <div className="travel-card-description-bottom">
                                                      <div className="travel-card-description-bottom-left">
                                                        <span>Эхлэх үнэ</span><br />
                                                        <b>{formatNumber(travel.price_adult)} ₮</b>
                                                      </div>
                                                      <div className="travel-card-description-bottom-right">
                                                        {getStars(travel.rating)} <span className="reviewCount">( {travel.reviews ? travel.reviews.length : 0} )</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </Link>
                                                </div>
                                              
                                              
                                            )) 
                                        }
                                        </div>
                                    
                            {/* </div>
                        </div>
                    </div> */}
                  
                </Container>

    );
};

export default Wishlist;


const Container = styled.div`

    padding:50px 0px;
    font-family: PT Sans;
    font-style: normal;
  
    .dropdown{
        text-align:right        
    }

    .dropdown > select {
        padding: 10px 10px;
        width: 300px;
        border-radius: 5px;
        border-color:rgba(0, 0, 0, 0.3);
    }

    .flex{
        display:flex;        
    }

    .flex-column{
        flex-direction: row;
        align-content: center;
    }

    .title {
      color: #5a5a5a;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 0.04em;
    }

    .card {
        margin-top: 30px !important;
        width: 220px;        
        margin:0 10px;
        cursor:pointer;
        border:none;
        border-radius:none;
    }
   
    .travel-card {
        position: relative;
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 12px;
        margin-bottom: 10px;
        color: ${(props) => props.theme.mainColor1};
        cursor: pointer;
        transition-duration: 0.2s;
        transition-property: all;
        border: 1px solid #eee;
        &:hover{
          box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
        }
        &-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        &-description {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100px;;
          padding: 10px;
          background-color: #F7F7F7;
          font-family: ${(props) => props.theme.fontFamily3};
          font-style: normal;
          &-title {
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
            letter-spacing: 0.08em;
          }
          &-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            &-left {
              font-weight: bold;
              font-size: ${(props) => props.theme.fontSize};
              letter-spacing: 0.06em;
              span {
                font-weight: normal;
                font-size: ${(props) => props.theme.fontSizeSmall};
                color: ${(props) => props.theme.mainColor};
                letter-spacing: 0.08em;
              }
            }
            &-right {
              color: #ffc107;
              font-size: ${(props) => props.theme.fontSize};
              align-self: center;
              span {
                font-size: ${(props) => props.theme.fontSizeSmall};
                color: ${(props) => props.theme.mainColor1};
              }
              .reviewCount {
                color: #cfcfcf;
                font-family: ${(props) => props.theme.fontFamily1};
                font-weight: 500;
                vertical-align: middle;
                display: inline-flex;
                margin-top: 3px;
              }
            }
          }
        }
      }
    `