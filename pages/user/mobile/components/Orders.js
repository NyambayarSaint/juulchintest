import React from "react";
import styled from "styled-components";
import OrderItem from "./OrderItem";
import axios from 'axios'
import nookies from 'nookies'
import notify from '@/components/miscs/notify';


const Order = () => {
  const {jwt} = nookies.get(null)
  const [orders, setOrders] = React.useState([]);
  
  React.useEffect(() => {
    goFetch()
  }, [])

  console.log('orders', orders);

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
          <div className="dropdown">
            <select>
              <option>Төлөв сонгох</option>
              <option>Баталгаажсан</option>
              <option>Төлбөр хүлээгдэж байгаа</option>
              <option>Цуцлагдсан</option>
            </select>
          </div>
          <div className="wrapper">
            {
              orders.map((order, index) => ( 
                      order.cart.map((item, index) => (
                        <OrderItem className="travel" date={order.createdAt} no={order.No} amount ={order.amount} key={index} item={item}/>
                      ))
                  ))
              }              
          </div>
        </div>
    </Container>
  );
};

export default Order;

const Container = styled.div`
  padding: 20px 0px;
  font-family: PT Sans;
  font-style: normal;

  .dropdown {
    text-align: right;
  }

  .dropdown > select {
    padding: 10px 10px;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.3);
  }
  .wrapper{
    width:100%
  }
`;
