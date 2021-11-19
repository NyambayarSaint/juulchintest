import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const LeftFilter = (props) => {
  const router = useRouter()
  const [selected, setSelected] = useState(router.query.categories ?? [])
  useEffect(() => {
    props.handleChange(selected)
  }, [selected])
  const handleClick = (cat) => {
    let tmp = Array.isArray(selected) ? [...selected] : [selected] 
    if (tmp.indexOf(cat.name) !== -1) {
      setSelected(tmp.filter((el) => el !== cat.name))
    } else {
      setSelected([...tmp, cat.name])
    }
  }
  return (
    <Container>
      <h5 className="heading">Аялалын ангилал</h5>
      {props.categories && props.categories.map(cat =>
        <p className={`${selected.indexOf(cat.name) >= 0 && 'is-active'} filter`} key={Math.random()} onClick={() => handleClick(cat)}>
          <input type="checkbox" />{cat.name}
        </p>
      )}
    </Container>
  )
}

export default LeftFilter

const Container = styled.div`
  border: 1px solid #eee;
  padding: 0px 5px 10px 25px;
  letter-spacing: 0.06em;
  border-radius: 10px;
  margin-bottom: 40px;
  
  .heading {
    font-size: ${props => props.theme.fontSize3};
    margin: 20px 0 15px 0;
  }
  .filter {
    cursor: pointer;
    padding-left: 30px;
    position: relative;
    input {
      display: none;
    }
    &:before {
      width: 18px;
      height: 18px;
      content: "";
      border-radius: 2px;
      border: 1.4px solid #777;
      position: absolute;
      left: 0px;
      top: 0px;
    }
    &:after {
      width: 18px;
      height: 18px;
      content: "";
      border-radius: 4px;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transform: scale(0);
      position: absolute;
      left: 0px;
      top: 0px;
      background-size: 10px;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNDUuNzAxIDQ1LjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1LjcwMSA0NS43OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTIwLjY4NywzOC4zMzJjLTIuMDcyLDIuMDcyLTUuNDM0LDIuMDcyLTcuNTA1LDBMMS41NTQsMjYuNzA0Yy0yLjA3Mi0yLjA3MS0yLjA3Mi01LjQzMywwLTcuNTA0ICAgIGMyLjA3MS0yLjA3Miw1LjQzMy0yLjA3Miw3LjUwNSwwbDYuOTI4LDYuOTI3YzAuNTIzLDAuNTIyLDEuMzcyLDAuNTIyLDEuODk2LDBMMzYuNjQyLDcuMzY4YzIuMDcxLTIuMDcyLDUuNDMzLTIuMDcyLDcuNTA1LDAgICAgYzAuOTk1LDAuOTk1LDEuNTU0LDIuMzQ1LDEuNTU0LDMuNzUyYzAsMS40MDctMC41NTksMi43NTctMS41NTQsMy43NTJMMjAuNjg3LDM4LjMzMnoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K");
    }
    &.is-active:after {
      transform: scale(1);
      background-color: #777;
    }
  }
`