import React from 'react';
import styled from 'styled-components';
import { BiCheckbox } from 'react-icons/bi';
import Slider from 'react-input-slider';

const Panel = ({products, setFilterPrice, filterPrice}) => {

    const [priceLowest, setPriceLowest] = React.useState(0);
    const [priceHighest, setPriceHighest] = React.useState(0);
    let priceRange = [];

    const calculateRange = (data) => {
        data.map(el => priceRange.push(el.Price));
        let tmp = priceRange.sort(function (a, b) { return a - b; });
        setPriceLowest(tmp[0]);
        setPriceHighest(tmp[tmp.length - 1]);
    }

    const handleChangePrice = (x) => {
        setFilterPrice(x);
    }

    React.useEffect(()=>{
        calculateRange(products)
    },[])

    return (
        <Container>
            <button>Clear All</button>
            <div className="pan">
                <p>Price</p>
                <div className="select">
                    <div className="each">
                        {filterPrice ? <div style={{marginBottom:5}}>{filterPrice} ₮</div> : <div style={{marginBottom:5}}>{priceHighest} ₮</div>}
                        <Slider styles={{ track: { backgroundColor: 'rgba(0,0,0,0.1)' }, active: { backgroundColor: 'rgba(0,0,0,1)' } }} xmin={priceLowest} xmax={priceHighest} x={filterPrice ? filterPrice : priceHighest} onChange={({ x }) => handleChangePrice(x)} />
                    </div>
                </div>
            </div>
            <div className="pan unavailable">
                <p>Piece Count (Currently unavailable)</p>
                <div className="select">
                    <div className="each"><BiCheckbox /> 6 - 25</div>
                </div>
            </div>
            <div className="pan unavailable">
                <p>Flavor (Currently unavailable)</p>
                <div className="select">
                    <div className="each"><BiCheckbox /> Dark</div>
                    <div className="each"><BiCheckbox /> Milk</div>
                    <div className="each"><BiCheckbox /> White</div>
                    <div className="each"><BiCheckbox /> Assorted</div>
                    <div className="each"><BiCheckbox /> Fruit</div>
                    <div className="each"><BiCheckbox /> Nut</div>
                    <div className="each"><BiCheckbox /> Spices</div>
                </div>
            </div>
        </Container>
    );
};

export default Panel;

const Container = styled.div`
    min-width:250px;
    margin-right:30px;
    font-size:${({ theme }) => theme.fontSizeSmall};
    button{
        width:100%;
        border:none;
        background:black;
        padding:8px 15px;
        color:white;
        margin-bottom:15px;
    }
    .pan{
        margin-bottom:15px;
        border:1px solid rgba(0,0,0,1);
        border-radius:3px;
        &.unavailable{
            &:hover{
                cursor:not-allowed;
            }
        }
        p{
            border-bottom:1px solid rgba(0,0,0,1);
            margin:0px;
            padding:8px 15px;
        }
        .select{
            padding:30px 15px;
            .each{
                margin-bottom:5px;
                &:last-child{
                    margin-bottom:0px;
                }
                svg{
                    font-size:20px;
                    margin-top:-2px;
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        margin-right:0px;
        .css-1nmxudx-Slider{
            width:100% !important
        }
        .unavailable{
            display:none;
        }
        .pan{
            border-radius:0px;
            .select{
                padding:15px;
            }
        }
    }
`