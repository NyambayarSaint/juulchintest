import React from 'react';
import styled from 'styled-components';
import formatNumber, { calculateDiscount } from './miscs/formatNumber';
import minimize from './miscs/minimize';
import { RiStarFill } from 'react-icons/ri'
import { useRouter } from 'next/router';
import { FaCartPlus } from 'react-icons/fa'
import { MenuContext } from './miscs/ContextMenuProvider';
import Magnifier from "react-magnifier";
import ResolveComponent from './dynamic/ResolveComponent';
import { Ecommerce } from './miscs/ContextEcommerceProvider';
import notify from './miscs/notify';
import Reviews from './Reviews';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import Axios from 'axios';
import repeatStars from './miscs/repeatStars';
import calcAverage from './miscs/calcAverage';

const ProductDetail = ({ data }) => {

    const R = useRouter(); //Router to redirect when options have selected
    const { completelyLoaded, config } = React.useContext(MenuContext); //To load lazy layout components
    const { handleAddCart } = React.useContext(Ecommerce); //Add to cart
    const pieceRef = React.useRef(); //Quantity ref
    const writeReviewRef = React.useRef();
    const [reviewCount, setReviewCount] = React.useState(0);
    const [averageStars, setAverageStars] = React.useState(0);
    const [currentImage, setCurrentImage] = React.useState(data.Images[0]);

    React.useEffect(() => {
        go();
    }, []);

    const go = async () => {
        let reviewResult = await Axios(process.env.serverUrl + `/reviews?Product.id=${data.id}`);
        setAverageStars(calcAverage(reviewResult.data));
        setReviewCount(reviewResult.data.length);
    }

    return (
        <Container className="container">
            <div className="row">
                <div className="col-md-6 left">
                    {config.width > 768 ?
                        <Magnifier src={minimize(currentImage, 'medium')} width={'100%'} mgWidth={400} mgHeight={400} mgShape={'square'} zoomFactor={0.6} />
                        :
                        <img className="mainimg-mobile" src={minimize(currentImage, 'medium')} />
                    }
                    <div className="others-con">
                        {data.Images?.map(el => <img key={Math.random()} onClick={() => setCurrentImage(el)} src={minimize(el, 'thumbnail')} />)}
                    </div>
                </div>
                <div className="col-md-6 right">
                    <div className="con">
                        <div className="slug-con">
                            {data.Types.length && data.Types[0].Caption.split('>').map(sp => <p key={Math.random()}>{sp}</p>)}
                        </div>
                        <h3>{data.Title}</h3>
                        <h2 className="price">
                            <b>{formatNumber(data.Price)}₮</b>
                            {data.Discount ? <small>{formatNumber(data.InitialPrice)}₮</small> : ''}
                        </h2>
                        <div className="star-con">
                            <div className="star">{averageStars ? repeatStars(averageStars) : repeatStars(0)}</div>
                            {/* <div className="number">{averageStars && averageStars}</div> */}
                            <div className="total">(Нийт {reviewCount} сэтгэгдэл байна)</div>
                            <div className="write hvr" onClick={() => writeReviewRef.current.click()}>Сэтгэгдэл илгээх</div>
                        </div>
                        <div className="options row">
                            <div className="col-8">
                                <p>Тоо ширхэгийн сонголт</p>
                                <select onChange={(e) => {
                                    if (e.target.value) {
                                        location.href = e.target.value
                                    }
                                }}>
                                    {data.Options && data.Options.Piece && data.Options.Piece.length ? data.Options.Piece.map(el => (
                                        <option key={Math.random()} value={el.Path}>{el.Title}</option>
                                    )) : <option>Сонголтгүй байна</option>}
                                </select>
                            </div>
                            <div className="col-8">
                                <p>Баглаа, боодол сонгох</p>
                                <select onChange={(e) => {
                                    if (e.target.value) {
                                        location.href = e.target.value
                                    }
                                }}>
                                    {data.Options && data.Options.Ribbon && data.Options.Ribbon.length ? data.Options.Ribbon.map(el => (
                                        <option key={Math.random()} value={el.Path}>{el.Title}</option>
                                    )) : <option>Сонголтгүй байна</option>}
                                </select>
                            </div>
                            <div className="col-4">
                                <p>Ширхэг</p>
                                <select ref={pieceRef}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => (
                                        <option key={Math.random()} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button onClick={() => {
                            handleAddCart(data, pieceRef.current.value);
                            notify({ title: data.Title, message: 'бүтээгдэхүүн сагсанд нэмэгдлээ.', onScreen: true, at: 'bottom-left' });
                            // fbq('track', 'AddToCart', { content_ids: data.id, content_name: data.Title, currency: 'mnt', value: data.Price });
                        }}>Сагсанд нэмэх <FaCartPlus /></button>
                        <div className="availability">
                            <p>Агуулахад:</p>
                            {data.Stock < 10 && data.Stock > 0 ?
                                <p><AiFillCheckCircle size={16} color="#359e35" /> Бэлэн ({data.Stock} ширхэг)</p>
                                :
                                ''
                            }
                            {data.Stock > 10 && <p><AiFillCheckCircle size={16} color="#359e35" /> Бэлэн</p>}
                            {data.Stock === 0 && <p><AiFillCloseCircle size={16} color="red" /> Дууссан</p>}
                        </div>
                    </div>
                </div>
                <div className="content-con">
                    <div className="content">
                        {completelyLoaded && <ResolveComponent data={data.Layout} />}
                    </div>
                </div>
                <Reviews writeReviewRef={writeReviewRef} product={data} />
            </div>
        </Container>
    );
};

export default ProductDetail;

const Container = styled.div`
    padding:35px 0px;
    .content-con{
        width:100%;
    }
    .left{
        margin-bottom:30px;
        .magnifier{
            border-bottom:1px solid rgba(0,0,0,0.1);
            height:calc(100% - 100px) !important;
            img{
                width:100%;
            }
        }
        .others-con{
            padding:15px 0px 0px;
            margin-bottom:30px;
            img{
                height:80px;
                border:1px solid rgba(0,0,0,0.1);
                margin-right:15px;
                &:last-child{
                    margin-right:0px;
                }
                &:hover{
                    border-color:black;
                    cursor:pointer;
                }
            }
        }
    }
    .right{
        padding-top:15px;
        .con{
            margin-bottom:30px;
            .price{
                small{
                    margin-top:-30px;
                    margin-left:15px;
                    display:inline-block;
                    top:-2px;
                    position:relative;
                    width:fit-content;
                    font-size:${({ theme }) => theme.fontSizeMedium};
                    &:after{
                        content:"";
                        display:block;
                        width:100%;
                        height:1px;
                        background:black;
                        position:absolute;
                        transform: rotate(-15deg);
                        top: 9px;
                    }
                }
            }
            .slug-con{
                display:flex;
                display:none;
                p{
                    margin-right:8px;
                    &:last-child{
                        &:after{
                            display:none;
                        }
                    }
                    &:after{
                        content:"/";
                        margin-left:5px;
                        opacity:0.7;
                    }
                }
            }
            h2{
                margin-top:15px;
            }
            .star-con{
                display:flex;
                border-top:1px solid rgba(0,0,0,0.1);
                border-bottom:1px solid rgba(0,0,0,0.1);
                padding:5px 0px;
                font-weight:bold;
                margin-bottom:30px;
                .star{
                    margin-right:3px;
                    font-size:18px;
                    color:${({ theme }) => theme.mainColor};
                }
                .number,.total,.write{
                    margin-left:10px;
                    text-decoration:underline;
                }
            }
            .options{
                p{
                    margin-bottom:8px;
                }
                select{
                    border:1px solid rgba(0,0,0,0.1);
                    padding:5px;
                    font-size: ${({ theme }) => theme.fontSizeSmall};
                    width:100%;
                    margin-bottom:15px;
                    outline:none;
                }
            }
            button{
                border:none;
                background:${({ theme }) => theme.red};
                padding:10px 50px;
                color:white;
                font-weight:bold;
                font-size:${({ theme }) => theme.fontSizeSmall};
                text-transform:uppercase;
                svg{
                    margin-top:-3px;
                    margin-left:5px;
                    font-size:${({ theme }) => theme.fontSize};
                }
            }
            .availability{
                display:flex;
                margin-top:30px;
                border-bottom:1px solid black;
                p{
                    margin-right:30px;
                    opacity:0.7;
                    font-size:${({ theme }) => theme.fontSizeSmall};
                }
            }
        }
    }
    .content-con{
        .content{
            h1,h2,h3,h4,h5,h6{
                font-size:${({ theme }) => theme.fontSize};
            }
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:15px;
        padding-right:15px;
        .right{
            .con{
                h3{
                    font-size:${({ theme }) => theme.fontSize2};
                    font-weight:500;
                }
                h2{
                    font-size:${({ theme }) => theme.fontSize2};
                    small{
                        font-size:${({ theme }) => theme.fontSize2} !important;
                    }
                }
                .slug-con{
                    display:none;
                }
                .star-con{
                    flex-wrap:wrap;
                    padding:10px 0px;
                    .write{
                        display:none;
                    }
                    .star{
                        margin-top:-2px;
                    }
                }
                .price{

                }
            }
        }
        .left{
            .mainimg-mobile{
                width:100%;
            }
            .others-con{
                padding:8px 0px;
                margin-bottom:0px;
                img{
                    height:80px;
                    margin-right:8px;
                    &:last-child{
                        margin-right:0px;
                    }
                }
            }
        }
    }
`