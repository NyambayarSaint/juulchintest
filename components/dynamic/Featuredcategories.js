import router from "next/router"
import styled from "styled-components"
import minimize from "../miscs/minimize"

const Featuredcategories = (props) => {
  return (
    <Container className="container">
      <h3>{props.data.title}</h3>
      <div className="row">
        {props.data.categories.sort(compare).map(category => (
          <div className="col-md-3 col-sm-4 col-6" key={category.id}>
            <div className="category" onClick={() => router.push({ pathname: `/p/search`, query: { categories: category.name } })}>
              <img src={minimize(category.image, 'small')} />
              <div className="description">
                <p>{category.name}</p>
                <p>{category.travels.length} аялалууд</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Featuredcategories
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
  .category {
    cursor: pointer;
    margin-bottom: 25px;
    border-radius: 4px;
    border: 1px solid #eee;
    overflow: hidden;
    backface-visibility: hidden;
    transition-duration: 0.3s;
    &:hover, &:active {
      transform: translateY(-5px);
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    }
    img {
      width: 100%;
      height: 90px;
      object-fit: cover;
    }
    .description {
      padding: 10px;
      p {
        color: #c0c0c0;
        font-style: normal;
        font-weight: bold;
        font-size: ${(props) => props.theme.fontSizeSmall};
        letter-spacing: 0.06em;
        margin-bottom: 0;
        &:first-child {
          font-size: ${(props) => props.theme.fontSize};
          letter-spacing: 0.06em;
          color: ${(props) => props.theme.mainColor1};
        }
      }
    }
  }
`
function compare(a, b) {
  if (a.travels.length > b.travels.length) {
    return -1;
  }
  if (a.travels.length < b.travels.length) {
    return 1;
  }
  return 0;
}
