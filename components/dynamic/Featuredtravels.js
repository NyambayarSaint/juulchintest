import Link from 'next/link';
import React, { useContext, useRef } from "react";
import { GrNext, GrPrevious } from 'react-icons/gr';
import styled from "styled-components";
import { A11y, Autoplay, Scrollbar } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MenuContext } from "../miscs/ContextMenuProvider";
import formatNumber from "../miscs/formatNumber";
import getStars from "../miscs/getStars";
import minimize from "../miscs/minimize";

const FeaturedTravels = (props) => {
  const swiperRef = useRef()
  const { config } = useContext(MenuContext);
  return (
    <Container className="container">
      <div className="swider-header">
        <h5>{props.data.title}</h5>
        {config.width > 768 && (
          <div className="swiper-custom-control">
            <div id="previousButton" className="control-button" onClick={() => swiperRef.current.swiper.slidePrev()}><GrPrevious /></div>
            <div id="nextButton" className="control-button" onClick={() => swiperRef.current.swiper.slideNext()}><GrNext /></div>
          </div>
        )}
      </div>
      <Swiper
        ref={swiperRef}
        modules={[Scrollbar, A11y, Autoplay]}
        scrollbar={{ draggable: true }}
        slidesPerView={'auto'}
        spaceBetween={30}
        loop={true}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": false,
          "pauseOnMouseEnter": true
        }}
      >
        {props.data.travels.map(travel => (
          <SwiperSlide key={travel.id}>
            <Link href={`/travels/${travel.slug}`}>
              <a className="travel">
                <img src={minimize(travel.thumbnail_img, 'medium')} alt="slider image" />
                <div className="description">
                  <div className="description-top">
                    <p>Дотоодын аялал</p>
                    <p>{travel.name}</p>
                  </div>
                  <div className="description-bottom">
                    <div>
                      <div className="rating">{getStars(travel.rating)} <span>{travel.reviews ? travel.reviews.length : 0}</span></div>
                      <div className="price">{formatNumber(travel.price_adult)} ₮ <span>/ 1 хүн</span></div>
                    </div>
                    <button className="order-button">Захиалах</button>
                  </div>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container >
  )
}

export default FeaturedTravels
const Container = styled.div`
  margin: 50px auto;
  .swider-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    h5 {
      font-weight: bold;
      font-size: 30px;
      line-height: 39px;
      letter-spacing: 0.08em;
    }
    .swiper-custom-control {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      #previousButton, #nextButton {
        cursor: pointer;
        font-size: 12px;
        padding: 10px 12px;
        border-radius: 50%;
        color: #c0c0c0;
        line-height: 0;
        box-shadow: 0 0 3px 0 rgba(0,0,0,0.1);
        transition: all 0.2s ease;
        border: 1px solid transparent;
        img {
          margin: 0;
        }
        &:hover {
          border: 1px solid ${props => props.theme.mainColor};
        }
      }
      #nextButton {
        margin-left: 10px;
        padding-right: 10px;
      }
      #previousButton {
        padding-left: 10px;
      }
    }
  }
  .swiper {
    padding: 5px 15px 15px 15px;
    margin-left: -15px;
    margin-right: -15px;
    overflow-y: visible;
  }
  .swiper-slide {
    width: 255px;
    .travel {
      display: block;
      border-radius: 12px;
      border: 1px solid #eee;
      cursor: pointer;
      overflow: hidden;
      overflow-y: visible;
      transition: all 0.2s ease;
      &:hover {
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
        transform: translateY(-5px);
      }
      > img {
        height: 220px;
        object-fit: cover;
      }
      .description {
        display: flex;
        flex-direction: column;
        height: 128px;
        padding: 10px;
        color: ${(props) => props.theme.mainColor1};
        .description-top {
          font-weight: bold;
          font-size: 16px;
          line-height: 21px;
          letter-spacing: 0.04em;
          flex-grow: 1;
          p:first-child {
            margin-bottom: 3px;
            color: #c0c0c0;
            font-family: ${(props) => props.theme.fontFamily1};
            font-weight: 500;
            font-size: ${(props) => props.theme.fontSizeSmaller};
            line-height: 15px;
            letter-spacing: 0.06em;
          }
        }
        .description-bottom {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .price {
            font-family: ${(props) => props.theme.fontFamily1};
            font-style: normal;
            font-weight: 500;
            font-size: ${(props) => props.theme.fontSizeSmall};
            letter-spacing: 0.06em;
            span {
              font-size: ${(props) => props.theme.fontSizeSmaller};
              line-height: 15px;
              color: #cfcfcf;
            }
          }
          .rating {
            color: #ffc107;
            font-size: ${(props) => props.theme.fontSizeSmaller};
            margin-bottom: 2px;
            span {
              color: #cfcfcf;
              font-family: ${(props) => props.theme.fontFamily1};
              font-style: normal;
              font-weight: 500;
              font-size: ${(props) => props.theme.fontSizeSmaller};
              vertical-align: middle;
            }
          }
          .order-button {
            padding: 5px 10px;
            border-radius: 4px;
            background-color: ${(props) => props.theme.mainColor};
            color: #fff;
            font-family: ${(props) => props.theme.fontFamily1};
            font-weight: 500;
            font-size: ${(props) => props.theme.fontSizeSmaller};
            letter-spacing: 0.06em;
          }
        }
      }
    }
  }
`