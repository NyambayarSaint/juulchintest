import styled from "styled-components"
import Link from "next/link"

const Featuredtouristcamps = (props) => {
  return (
    <Container className="container">
      <h3>{props.data.title}</h3>
      <div className="row">
        <div className="col-md-4 order-2">
          <Link href={`/p/search`}>
            <a className="camp-card camp-card__tall">
              <h4 className="camp-card-title"><span>Улаанбаатар</span></h4>
              <img className="camp-card-img" src="https://s3-alpha-sig.figma.com/img/0b91/fb17/5f75b70d159c4379ddcb730274ad69c1?Expires=1637539200&Signature=EiUCZfgyaAOkzSOmDUhsaecDb4J6g0lCLD-cSCSh~UJXmC~CNfJ3EUT4FBPoN7FlcYHSTEfyq14IPNR5JyaKwMH~w3ufvpLZ48uaVXNaNpEVcUxT5bIPhO4ql6XChb9wPBgaLJQm3441L~BGPIH-Zo1VIWnF3wvEJc5RMDz7tAFtY3guzTVVxoOxHpVRukNjaYCRszRfulp5w1H-tCNZDDGlDIKFGl8yqNuz0wX~xgSaUMsEpSM-Gh6VUScy2Tsb9Kuxr3k3USz3J7fJ~wXMmBX2cSYSW1fmJp8Of9XB3-FO8VLRqcDQpioYd6z~o-wqQezZi5HuSeFh8-KBw-m1mQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            </a>
          </Link>
        </div>
        <div className="col-md-4 order-1">
          <Link href={`/p/search`}>
            <a className="camp-card">
              <h4 className="camp-card-title"><span>Дорнод</span></h4>
              <img className="camp-card-img" src="https://s3-alpha-sig.figma.com/img/7bdc/e4f6/4e0f113dab0dbce7ccf768f9e2805195?Expires=1637539200&Signature=GGdXusKDiEGnokD95Alrce8ow4U6Zu-T-kLvWCVi1U6cXexG-hG~kNcLg9QsToLJJBYFvUYuKL9bC36oMoUij6Xarmwa-MfsyKUBL~88mibCOw~UTQWKGW3geb8PId92PYvWNd21vcN5W00z-UORlWyq~1zTxyqAlVs7jKO8bYPeQjet2Xd8hWhcVrZ-NNBLhqDSLeka~p0mflSZWlX2qO3q9CAjiP6ZFCgqoUacDBfe9MjSKS2YgswP~nA6x4-Bh7zPJeU8TvUy3IExmRtoTLBbrObOSVdXBGn50xekDZpZWPhr7p4QO0hGLqcqfPSAEd-ZIfZZlKOoWCaG3PYt-A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            </a>
          </Link>
          <Link href={`/p/search`}>
            <a className="camp-card">
              <h4 className="camp-card-title"><span>Завхан</span></h4>
              <img className="camp-card-img" src="https://s3-alpha-sig.figma.com/img/7235/4c7c/ea390df9a6790f624b0b6e8ef3915e3d?Expires=1637539200&Signature=MY2rZeNg5EOuaoHGPkI0xDouhVKvGT5yUQOQ4YbeVbPRmrxw3VrU73pesBtPeqkmZg6RbORcrsFD616RVbPoLQOayF1ZksNLFtSU-04URbV523he1sBebi4unDSBs0eyyGHF3TTpWTf6yJAjON0-FsJuEKc0ZqgPssIvVjy3KTzolHSkrSKUHNjYqRK2uNTnHQDJ2Icw6U67AP10juaUDQ-M5cXrwRIRBMdyXJHszqHSoZN--vjtbOuuu8oJpJHxyY1-o-~TofWfQC9GdKr~NtCXZqoIjHNGwBvdLiYfMq1H9wLliJladdw10cjXp2mS02gc7YacoX3GLBnmpBul5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            </a>
          </Link>
        </div>
        <div className="col-md-4 order-3">
          <Link href={`/p/search`}>
            <a className="camp-card">
              <h4 className="camp-card-title"><span>Архангай</span></h4>
              <img className="camp-card-img" src="https://s3-alpha-sig.figma.com/img/d8c2/c684/1aa914e6c1b35ec90e84ef60815646e0?Expires=1637539200&Signature=El-mi~rfDitkaj7yBGVNzz3FfzlvY84kUEaNBxtqGZIOp8yt9QEo5~eSv3LdBN~tvrw-LNhmf6n2SYFtyGcEhIuJHfck1yruito8WzsZXCU0fNaT44r9lcc~EPs0Y6qb4BYRIVSy8seCtlNoEhhfBfJ1ZAMCzPOjCR6fJ4TjV1ojZ8nHiue73qzG8RKvdAW9X3lz-9fFqXtj0Z8UaxjZu2I1MjJKBfk6kOQzWd3r901RmSegijMdGxdUslAyNiSyrv6yMieLUYuIpr5M-ebLCU4~B5dGyZxEoXk4KAE9B7yEGVi1v7we-X06HJHct6pDfon0fq6ZjJIbaks1rUdSug__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            </a>
          </Link>
          <Link href={`/p/search`}>
            <a className="camp-card">
              <h4 className="camp-card-title"><span>Өмнөговь</span></h4>
              <img className="camp-card-img" src="https://s3-alpha-sig.figma.com/img/c38e/ca89/e4d36bcc190cd0131ae758c9854c78ae?Expires=1637539200&Signature=cQIRBvDZO23NYSxbdc2tU9DXobUgQ54ztIeynA~~M1cZ6Q8ztc3eiw7cSoUm19WsRa7vGSaHPslMQ-xq1-772FrUxU8dWhakpyicNbh687yEn3zOGGSHsiX60Y5a~XNlTI-LLnFqmKbUtYfHAkGzxGkjOLJffA2N3ngb~B3cmGg-5uKDEuOWXWFEmG2UCJTXo1iwBZjmih3FGpypehg7YOF6jWqp~XS31TEZ4bnU~vUJlMJNbazSsHykJ30kJlzPcZ7LyiE7~EtmzETw9jnTQWNvkZdYJSF88nmcFO9ZprVYF~WV35muGmq-G-HjSCICXoKKc62rsIvPR4qJqmvkRg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            </a>
          </Link>
        </div>
      </div>
    </Container >
  )
}

export default Featuredtouristcamps

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
  .camp-card {
    display: block;
    position: relative;
    height: 220px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 16px;
    transition: all 0.2s ease;
    &:hover {
      .camp-card-img {
        filter: brightness(80%);
      }
      .camp-card-title {
        span {
          padding: 25px 35px;
        }
      }
    }
    &__tall {
      height: 456px;
    }
    &-title {
      z-index: 2;
      font-family: ${(props) => props.theme.fontFamily1};
      font-style: normal;
      font-size: ${(props) => props.theme.fontSizeMedium};
      color: #fff;
      text-transform: uppercase;
      position: absolute;
      top: 45%;
      left: 0;
      width: 100%;
      text-align: center;
      span {
        transition: all 0.2s ease;
        padding: 20px 30px;
        border-radius: 8px;
        border: 2px solid #fff;
        background-color: rgba(0,0,0,0.1);
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
      }
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2s ease;
    }
  }
`
