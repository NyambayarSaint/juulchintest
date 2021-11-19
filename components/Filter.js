import axios from 'axios';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { BiSearch } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styled from "styled-components";
import CustomSelect from './CustomSelect';

const Filter = () => {
  const router = useRouter()
  const [date, setDate] = useState(null);
  const [destinations, setDestinations] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleDestinationChange = (val) => {
    setDestination(val)
  }
  const handleDateChange = (val) => {
    setDate(val)
  }
  const handleSearch = () => {
    let query = router.query
    
    if (date)
      query.date = date
    if (destination)
      query.destination = destination
    if (!query.id) {
      router.push({ pathname: '/p/search', query })
    } else {
      let pathname = `/p/${query.id}`
      delete query.id
      router.push({ pathname, query }, undefined, { shallow: true })
    }
  }

  useEffect(() => {
    setDate(router.query.date || null)
    setDestination(router.query.destination || null)

    const fetch = async () => {
      const { data } = await axios.get(process.env.serverUrl + '/destinations')
      setDestinations(data)
    }
    fetch()
  }, [])

  return (
    <Container className="row">
      <div className="col-md-5 search-card-col search-card-col__destination">
        <span className="mark-icon"><FaMapMarkerAlt /></span>
        <CustomSelect
          data={destinations && destinations.map(d => d.name)}
          handleChange={handleDestinationChange}
          value={destination}
          placeholder="Аялах газар сонгох" />
      </div>
      <div className="col-md-5 search-card-col">
        <span className="mark-icon"><BsCalendar /></span>
        <CustomSelect
          data={['Хэзээ ч хамаагүй', 'Долоо хоногийн дотор', 'Сарын дотор', 'Улирлын дотор', 'Жилийн дотор']}
          handleChange={handleDateChange}
          value={date}
          placeholder="Явах боломжтой огноо" />
      </div>
      {/* <div className="col-md-4 search-card-col">
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => { setStartDate(date) }}
          customInput={<CustomDatePickerInput />}
        />
      </div> */}
      <div className="col-md-2 search-card-col">
        <button className="search-card-col-button" onClick={handleSearch}><span><BiSearch /></span>Хайх</button>
      </div>
    </Container>
  )
}

export default Filter

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 0 auto;
  width: 700px;
  background-color: #fff;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  border-radius: 6px;
  @media only screen and (max-width: 767px){
    width: 300px;
  }
  .search-card-col {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    border-left: 1px solid #ddd;
    &:first-child {
      border: none;
    }
    @media only screen and (max-width: 767px){
      border: none;
      border-top: 1px solid #ddd;
    }
    span.mark-icon {
      font-size: 25px;
      color: ${props => props.theme.mainColor};
      margin-right: 10px;
    }
    &-date {
      border: none;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;
      font-weight: bold;
      color: #777;
      padding: 0;
      span {
        &:first-child {
          font-size: 25px;
          color: ${(props) => props.theme.mainColor};
          margin-right: 10px;
        }
        &:nth-child(2) {
          color: ${(props) => props.theme.mainColor};
          font-size: 18px;
          margin-left: auto;
        }
      }
    }
    &-button {
      display: flex;
      align-items: center; 
      padding: 10px 20px;
      border: none;
      color: #fff;
      border-radius: 8px;
      background-color: ${(props) => props.theme.mainColor};
      font-weight: bold;
      span {
        font-size: 25px;
        margin-right: 5px;
      }
    }
  }
`
