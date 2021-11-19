import { useContext, useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdAirplanemodeActive } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { RiHotelLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import styled from "styled-components"
import Link from 'next/link'

import { MenuContext } from "../miscs/ContextMenuProvider";
import minimize from "../miscs/minimize";
import formatNumber from "../miscs/formatNumber";

const Featureddestinations = (props) => {
  const swiperRef = useRef()
  const { config } = useContext(MenuContext);
  return (
    <Container className="container">
      <div className="swider-header">
        <h5>{props.data.title}</h5>
        {config.width > 768 && (
          <div className="swiper-custom-control">
            <div id="previousButton" onClick={() => swiperRef.current.swiper.slidePrev()}><GrPrevious /></div>
            <div id="nextButton" onClick={() => swiperRef.current.swiper.slideNext()}><GrNext /></div>
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
        {props.data.instances.map((instance, i) => (
          <SwiperSlide key={i}>
            <Link href={`/p/search?destination=${instance.destination.name}`}>
              <a className="destination">
                <div className="destination-name">{instance.destination.name}<span>.</span></div>
                <div className="description">
                  <div className="icons">
                    {instance.flight && (<MdAirplanemodeActive />)}
                    {(instance.hotel && instance.flight) && (<BiPlus className="icons-plus" />)}
                    {instance.hotel && (<RiHotelLine />)}
                  </div>
                  <div className="caption">{instance.caption}</div>
                </div>
                <div className="price">{instance.travel && formatNumber(instance.travel.price_adult)}₮</div>
                <div className="backdrop"></div>
                <img src={minimize(instance.destination.image, 'medium')} alt="slider image" />
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default Featureddestinations

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
        border: 1px solid transparent;
        transition: all 0.2s ease;
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
  }
  .swiper-slide {
    cursor: pointer;
    position: relative;
    width: 255px;
    overflow: hidden;
    border-radius: 4px;
    transition: all 0.2s ease;
    &:hover {
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    }
    img {
      height: 350px;
      object-fit: cover;
    }
    .backdrop {
      top: 0;
      left: 0;
      position: absolute;
      z-index: 100;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.2);
    }
    .destination-name {
      z-index: 101;
      position: absolute;
      top: 45%;
      left: 0; 
      right: 0; 
      margin: 0 auto; 
      width: 100%;
      text-align: center;
      font-family: ${(props) => props.theme.fontFamily2};
      font-style: normal;
      font-weight: bold;
      font-size: 25px;

      text-transform: uppercase;

      color: #FFFFFF;

      span {
        color: #00aeff;
      }
    }
    .description {
      z-index: 101;
      color: #fff;
      position: absolute;
      left: 15px;
      bottom: 15px;
      .icons {
        font-size: 30px;
        svg {
          margin-right: -5px;
        }
        .icons-plus {
          font-size: 20px;
        }
      }
      .caption {
        font-style: normal;
        font-weight: bold;
        font-size: ${(props) => props.theme.fontSizeSmall};
        letter-spacing: 0.03em;
      }
    }
    .price {
      z-index: 101;
      color: #fff;
      position: absolute;
      right: 15px;
      bottom: 25px;
      font-style: normal;
      font-weight: bold;
      font-size: ${(props) => props.theme.fontSizeMedium};
      text-align: right;
      letter-spacing: 0.01em;
    }
  }
  .swiper-slide:hover {
    box-shadow: 0 5px 11px 0 rgba(0,0,0,0.1);
  }
`
