import TravelCards from "@/core/TravelCards"
import Axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { AiOutlineHome } from "react-icons/ai"
import styled from "styled-components"
import Banners from "../Banners"
import CustomSelectSort from "../CustomSelectSort"
import LeftFilter from "../LeftFilter"

const sortValues = ['Үнэ буурахаар', 'Үнэ өсөхөөр', 'Шинэ нь эхэндээ', 'Хуучин нь эхэндээ']

const Search = (props) => {
  const router = useRouter()
  const [categories, setCategories] = useState(null)
  const [sort, setSort] = useState('')
  
  const handleSortChange = (val) => {
    let query = router.query
    setSort(val ?? 'Шинэ нь эхэндээ')
    switch (val) {
      case 'Үнэ буурахаар':
        query.sort = 'price_desc'
        break;
      case 'Үнэ өсөхөөр':
        query.sort = 'price_asc'
        break;
      case 'Шинэ нь эхэндээ':
        query.sort = 'date_desc'
        break;
      case 'Хуучин нь эхэндээ':
        query.sort = 'date_asc'
        break;
      default:
        query.sort = 'date_desc'
        break;
    }
    let pathname = `/p/${query.id}`
    delete query.id
    router.push({ pathname, query }, undefined, { shallow: true })
  }
  const handleFilterChange = (selected) => {
    let query = router.query
    query.categories = selected
    let pathname = `/p/${query.id}`
    delete query.id
    router.push({ pathname, query }, undefined, { shallow: true })
  }
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await Axios.get(process.env.serverUrl + '/categories')
      setCategories(data)
    }
    fetchCategories()
  }, [router.query])
  return (
    <Container className="container">
      <div className="menu-bread">
        <span className="home"><Link href="/"><a><AiOutlineHome /></a></Link></span>
        <span className="chevron-right">{' > '}</span>
        <Link href={`/p/${router.query.id ?? 'search'}`}><span className="menu">Аялалууд</span></Link>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <LeftFilter handleChange={handleFilterChange} categories={categories} />
          <div className="banner-desktop">
            <Banners banners={props.data.banner} />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="sortWrapper">
            <CustomSelectSort
              handleChange={handleSortChange}
              data={sortValues}
              placeholder="Эрэмбэлэх"
              value={sort} />
          </div>
          <TravelCards />
          <div className="banner-mobile">
            <Banners banners={props.data.banner} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Search

const Container = styled.div`
  margin: 50px auto;
  .banner-mobile {
    display: block;
  }
  .banner-desktop {
    display: none;
  }
  
  @media only screen and (min-width: 1024px){
    .banner-mobile {
      display: none;
    }
    .banner-desktop {
      display: block;
    }
  }
  .sortWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
  .menu-bread {
    width: auto;
    color: #777;
    cursor: pointer;
    margin-bottom: 20px;
    .home {
      font-size: 16px;
    }
    .chevron-right {
      margin: 0 10px;
    }
    .menu {
      font-size: ${props => props.theme.fontSizeSmall};
      font-weight: bold;
    }
  }
`