import Link from 'next/link';

import styled from 'styled-components';

import minimize from '@/miscs/minimize';
import Filter from '../Filter';

const Image = ({ data }) => {
  return (
    <Container container={data.container}>
      {data.link ? <Link href={data.link}><a><img src={minimize(data.image)} /></a></Link> : <img src={minimize(data.image)} />}
      <div className="search-card-container">
        <Filter />
      </div>
    </Container>
  );
};

export default Image;

const Container = styled.div`
  position: relative;
  ${({ container }) => container && `padding:0px 10vw;`};
  img{
    width:100%;
    object-fit:cover;
    height: 500px;
  }
  @media only screen and (max-width: 768px){
    padding:0px;
    /* img{
      min-height:200px;
      ${({ container }) => container && `min-height:unset !important;`};
      ${({ container }) => container && `height:auto;`};
    } */
  }
  margin-bottom: 70px;
  .search-card-container {
    position: absolute;
    left: 0;
    bottom: -35px;
    width: 100%;
  }
`