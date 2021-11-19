import styled from "styled-components"
import Link from "next/link"

const Featuredarticles = (props) => {
  return (
    <Container className="container">
      <h3>{props.data.title}</h3>
      <div className="row">
        <div className="col-md-8">
          <div className="article-card">
            <div className="article-card-content">
              <div className="article-card-content-left">
                <h4 className="article-card-content-left-title">Амжилтыг аяллаар<span>.</span></h4>
                <p className="article-card-content-left-caption">200  гаруй зочид буудал, 345 шууд нислэгтэй.</p>
              </div>
              <Link href="#">
                <button className="article-card-content-button">Үзэх</button>
              </Link>
            </div>
            <img className="article-card-img" src="https://www.discovermongolia.mn/uploads/gallery_UB.jpg" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="article-card">
            <div className="article-card-content">
              <div className="article-card-content-left">
                <h4 className="article-card-content-left-title">Амжилтыг аяллаар<span>.</span></h4>
                <p className="article-card-content-left-caption">200  гаруй зочид буудал, 345 шууд нислэгтэй.</p>
              </div>
              <Link href="#">
                <button className="article-card-content-button">Үзэх</button>
              </Link>
            </div>
            <img className="article-card-img" src="https://www.discovermongolia.mn/uploads/gallery_UB.jpg" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="article-card">
            <div className="article-card-content">
              <div className="article-card-content-left">
                <h4 className="article-card-content-left-title">Амжилтыг аяллаар<span>.</span></h4>
                <p className="article-card-content-left-caption">200  гаруй зочид буудал, 345 шууд нислэгтэй.</p>
              </div>
              <Link href="#">
                <button className="article-card-content-button">Үзэх</button>
              </Link>
            </div>
            <img className="article-card-img" src="https://www.discovermongolia.mn/uploads/gallery_UB.jpg" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="article-card">
            <div className="article-card-content">
              <div className="article-card-content-left">
                <h4 className="article-card-content-left-title">Амжилтыг аяллаар<span>.</span></h4>
                <p className="article-card-content-left-caption">200  гаруй зочид буудал, 345 шууд нислэгтэй.</p>
              </div>
              <Link href="#">
                <button className="article-card-content-button">Үзэх</button>
              </Link>
            </div>
            <img className="article-card-img" src="https://www.discovermongolia.mn/uploads/gallery_UB.jpg" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="article-card">
            <div className="article-card-content">
              <div className="article-card-content-left">
                <h4 className="article-card-content-left-title">Амжилтыг аяллаар<span>.</span></h4>
                <p className="article-card-content-left-caption">200  гаруй зочид буудал, 345 шууд нислэгтэй.</p>
              </div>
              <Link href="#">
                <button className="article-card-content-button">Үзэх</button>
              </Link>
            </div>
            <img className="article-card-img" src="https://www.discovermongolia.mn/uploads/gallery_UB.jpg" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Featuredarticles

const Container = styled.div`
  margin: 50px auto;
  h3 {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    line-height: 39px;
    letter-spacing: 0.08em;
    margin-bottom: 35px;
  }
  @media only screen and (min-width: 768px){
    [class*="col-"] {
      padding: 0 8px;
    }
  }
  .article-card {
    position: relative;
    height: 300px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    margin-bottom: 16px;
    &-content {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      height: 100%;
      padding: 20px;
      color: #fff;
      &-left {
        padding-right: 20px;
        &-title {
          font-weight: bold;
          font-size: 29px;
          span {
            color: #00aeff;
          }
        }
        &-caption {
          font-family: ${(props) => props.theme.fontFamily1};
          font-style: normal;
          margin: 0;
          font-size: ${(props) => props.theme.fontSizeSmall};
        }
      }
      &-button {
        font-family: ${(props) => props.theme.fontFamily1};
        font-style: normal;
        font-size: ${(props) => props.theme.fontSizeSmall};
        padding: 8px 14px;
        border-radius: 15px;
        color: #fff;
        background-color: rgba(0,0,0,0.2);
        border: 1px solid #fff;
        transition-duration: 0.2s;
        &:hover {
          transform: scale(1.1)
        }
      }
    }
    
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(70%);
    }
  }
`