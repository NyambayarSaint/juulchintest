import styled from "styled-components"
import { useRouter } from "next/router"

const Tunudahgui = (props) => {
  const router = useRouter()
  return (
    <Container className="container">

      <div className="row">
        <div className="col-lg-4">
          <h1>Тун удахгүй</h1>
          <p>Бид энэхүү үйлчилгээг тун удахгүй танд хүргэхээр ажиллаж байна</p>
        </div>
        {router.query.id == 'bilet-zahialga' && (<img className="col-lg-8" src="../img/Tun-udahgui.jpg" />)}
        {router.query.id == 'buudal-zahialga' && (<img className="col-lg-8" src="../img/Hotel.jpg" />)}
        {router.query.id == 'gift-card' && (<img className="col-lg-8" src="../img/Gift-card.jpg" />)}
      </div>
    </Container>
  )
}

export default Tunudahgui

const Container = styled.div`
  font-family: ${props => props.theme.fontFamily3};
  img {
    width: 100%;
  }
  .col-lg-4 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  h1 {
    margin: 20px 0;
    font-weight: bold;
    font-size: 40px;
  }
  p {
    font-size: 15px;
  }
`
