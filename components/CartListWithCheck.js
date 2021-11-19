import React from "react";
import { IoMdClose } from 'react-icons/io'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import minimize from "@/components/miscs/minimize";
import formatNumber from "@/components/miscs/formatNumber";
import Axios from "axios";

const CartList = ({ handleSetQuantity, el }) => {

    const [stock, setStock] = React.useState(0);
    const [qty, setQty] = React.useState(el.qty);
    const [waiting, setWaiting] = React.useState(false);

    const goCheck = async () => {
        setWaiting(true);
        let res = await Axios(process.env.serverUrl + '/products/' + el.id);
        setStock(res.data.Stock);
        setWaiting(false);
    }

    React.useEffect(() => {
        goCheck();
    }, [qty]);

    return (
        <div className="box">
            <p className="title">{el.Title}</p>
            <div className="section-con">
                <div className="section first">
                    <img src={minimize(el.Images[0])} />
                </div>
                <div className="section sku">
                    <div className="info">
                        <p><small>SKU</small></p>
                        <p><b></b>{el.SKU}</p>
                    </div>
                </div>
                <div className="section price">
                    <p><small>Нэг бүрийн үнэ</small></p>
                    <p>
                        <b style={{color: el.Discount && '#cb0c34'}}>{formatNumber(el.Price)}₮</b>
                        {el.Discount ? <span>{formatNumber(el.InitialPrice)}₮</span> : ''}
                    </p>
                </div>
                <div className="section quantity">
                    <p><small>Тоо, ширхэг</small></p>
                    <select onChange={(e) => handleSetQuantity(el, e.target.value)}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={Math.random()} selected={num === qty} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                <div className="section stock-info">
                    <p><small>Бэлэн</small></p>
                    {waiting ? <>
                        <img src="/img/spinner.gif" />
                    </> : <>
                        {stock >= qty ? <AiFillCheckCircle className="check" /> : <AiFillCloseCircle className="wrong" />}
                    </>}
                </div>
                {stock >= qty ?
                    <div className="section last">
                        <p><small>Нийт</small></p>
                        <p><b>{formatNumber(el.Price * qty)} ₮</b></p>
                    </div>
                    :
                    <div className="section only last">
                        <p><small>Агуулахад</small></p>
                        {!waiting && <p style={{ color: 'red' }}>{stock ? <b>Only {stock} remained!</b> : <b>{stock}</b>}</p>}
                    </div>}
            </div>
            <div className="trash" onClick={() => handleSetQuantity(el, 0)}><IoMdClose /></div>
        </div>
    );
};

export default CartList;