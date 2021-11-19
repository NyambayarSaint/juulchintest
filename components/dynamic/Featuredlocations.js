import styled from "styled-components"

const Featuredlocations = (props) => {
  return (
    <Container className="container">
      <h3>{props.data.title}</h3>
    </Container>
  )
}

export default Featuredlocations

const Container = styled.div`
  padding: 30px 0;
  h3 {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    line-height: 39px;
    letter-spacing: 0.08em;
    margin-bottom: 35px;
  }
`