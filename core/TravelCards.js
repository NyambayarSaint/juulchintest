import { useEffect } from "react"
import styled from "styled-components"
import TravelCard from "./TravelCard"
import { useRouter } from "next/router"
import nProgress from "nprogress"
import Axios from "axios"
import { useState } from "react"
import dateFormat from "dateformat"

const TravelCards = () => {
  const [travels, setTravels] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const fetch = async () => {
      nProgress.start()
      let params = { ...router.query }

      if (params.date) {
        let now = new Date()
        delete params.start
        delete params.end
        switch (params.date) {
          case 'Долоо хоногийн дотор':
            params.start = dateFormat(now, 'yyyy-mm-dd')
            params.end = dateFormat(now.setDate(now.getDate() + 7), 'yyyy-mm-dd')
            break;
          case 'Сарын дотор':
            params.start = dateFormat(now, 'yyyy-mm-dd')
            params.end = dateFormat(now.setMonth(now.getMonth() + 1), 'yyyy-mm-dd')
            break;
          case 'Улирлын дотор':
            params.start = dateFormat(now, 'yyyy-mm-dd')
            params.end = dateFormat(now.setMonth(now.getMonth() + 3), 'yyyy-mm-dd')
            break;
          case 'Жилийн дотор':
            params.start = dateFormat(now, 'yyyy-mm-dd')
            params.end = dateFormat(now.setFullYear(now.getFullYear() + 1), 'yyyy-mm-dd')
            break;
          default:
            break;
        }
      }
      const { data } = await Axios.get(process.env.serverUrl + '/travels/filtered', { params })
      setTravels(data)
      nProgress.done()
    }
    fetch()
  }, [router.query])
  return (
    <Container className="row margin-left-inc">
      {travels && travels.map(travel => (
        <div className="col-md-6 col-lg-4" key={travel.id}>
          {<TravelCard travel={travel} />}
        </div>
      ))}
    </Container>
  )
}

export default TravelCards

const Container = styled.div`
  @media only screen and (min-width: 768px){
    [class*="col-"] {
      padding: 0 8px;
    }
    .margin-left-inc {
      margin-left: 0;
    }
  }
`
