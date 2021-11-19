import styled from "styled-components"
import minimize from "./miscs/minimize"

const Banners = ({ banners }) => {
  return (
    <Container>
      {banners.map(banner => (
        <a href={banner.link} target="_blank" key={Math.random()}>
          <img src={minimize(banner.img, 'medium')} />
        </a>
      ))}
    </Container>
  )
}

export default Banners

const Container = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
`