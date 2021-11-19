import styled from "styled-components"
import Link from "next/link"
import minimize from "@/components/miscs/minimize"
import formatNumber from "@/components/miscs/formatNumber"
import getStars from "@/components/miscs/getStars"

const TravelCard = ({travel}) => {
  return (
    <Link href={`/travels/${travel.slug}`}>
      <Container>
        <div className="travel-card">
          <img className="travel-card-img" src={minimize(travel.thumbnail_img, 'medium')} />
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
      </Container>
    </Link>
  )
}

export default TravelCard

const Container = styled.div`
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
      transform: translateY(-5px);
    }
    &-img {
      width: 100%;
      height: 220px;
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