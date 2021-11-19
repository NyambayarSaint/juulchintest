import React from "react";
import styled from "styled-components";
import OrderItem from "./OrderItem";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios'
import nookies from 'nookies'
import notify from '@/components/miscs/notify';

const Order = () => {
  const {jwt} = nookies.get(null)
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
      goFetch()
  }, [])

  const goFetch = async () => {
    const headers = { headers: { 'Authorization': 'Bearer ' + jwt } };
    try{
      const res = await axios(process.env.serverUrl + '/orders/me', headers)
      setOrders(res.data.orders)   
    }catch(e){
      notify({ type: 'danger', title: 'Алдаа гарлаа!' })
    }
  }

  return (
    <Container>
        <div className="">
          <div className="row">
            <div className="col-lg-6">
              <h4 className="title">
                <FaUserAlt /> Миний захиалгууд
              </h4>
            </div>
            <div className="col-lg-6">
              <div className="dropdown">
                <select>
                  <option>Төлөв сонгох</option>
                  <option>Баталгаажсан</option>
                  <option>Төлбөр хүлээгдэж байгаа</option>
                  <option>Цуцлагдсан</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row pt-34 ">
            <div className="col-md-12">
              {  
                  orders.map((order, index) => ( 
                      order.cart.map((item, index) => (
                        <OrderItem className="travel" date={order.createdAt} no={order.No} amount ={order.amount} key={index} item={item}/>
                      ))
                  ))
              }              
            </div>
          </div>
        </div>
    </Container>
  );
};

export default Order;

const Container = styled.div`
  padding: 50px 0px;
  font-family: PT Sans;
  font-style: normal;

  .dropdown {
    text-align: right;
  }

  .dropdown > select {
    padding: 10px 10px;
    width: 300px;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.3);
  }

  .title {
    color: #5a5a5a;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.04em;
  }

  .bordered {
    padding-left: 35px;
    border-bottom: 4px solid #e5e5e5;
    border-radius: 8px;
  }

  .travel:first-child {
    padding-left: 35px;
    border-bottom: 4px solid #e5e5e5;
    border-radius: 8px;
  }

  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: row;
    align-content: center;
  }
`;
