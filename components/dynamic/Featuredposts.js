import styled from "styled-components"
import Link from "next/link"
import FeaturedBlogpostCard from "../FeaturedBlogpostCard"

const Featuredposts = (props) => {
  console.log(props.data)
  return (
    <BackgroundColored>
      <Container className="container">
        <h3>{props.data.title}</h3>
        <div className="row">
          {props.data.blogs.map(blog =>
            <div className="col-md-6" key={Math.random()}>
              <Link href={`/blog/${props.data.id}`}>
                <FeaturedBlogpostCard blog={blog}/>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </BackgroundColored>
  )
}

export default Featuredposts
const BackgroundColored = styled.div`
  background-color: #f4f4f4;
`
const Container = styled.div`
  padding: 30px 80px;
  @media only screen and (max-width: 768px){
    padding: 30px 15px;
  }
  h3 {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    line-height: 39px;
    letter-spacing: 0.08em;
    margin-bottom: 35px;
  }
  .post-card {
    cursor: pointer;
    margin-bottom: 30px;
    border-radius: 4px;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    overflow: hidden;
    height: 330px;
    position: relative;
    backface-visibility: hidden;
    transition-duration: 0.2s;
    &:hover, &:active {
      transform: scale(1.01);
      box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }
    &-content {
      background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 118.95%);;
      z-index: 101;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: absolute;
      top: 0;
      left: 0;
      padding: 20px;
      color: #eee;
      font-family: ${(props) => props.theme.fontFamily2};
      font-style: normal;


      &-date {
        font-size: ${(props) => props.theme.fontSizeSmall};
        margin-bottom: 25px;
      }
      &-title {
        font-weight: bold;
        font-size: ${(props) => props.theme.fontSizeMedium};
        margin-bottom: 5px;
      }
      &-subtitle {
        font-size: ${(props) => props.theme.fontSizeSmall};
        margin-bottom: 25px;
      }
      &-description {
        font-size: ${(props) => props.theme.fontSize};
        line-height: 22px;
      }
      &-author {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: auto;
        font-size: ${(props) => props.theme.fontSizeSmall};
        font-family: ${(props) => props.theme.fontFamily1};
        &-img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 20px;
          border: 2px solid #0882E0;
          margin-right: 10px;
        }
        span {
          font-weight: bold;
          line-height: 22px;
        }
      }
    }
  }
`