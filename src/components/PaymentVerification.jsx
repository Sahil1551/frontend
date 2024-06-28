import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../index.css';
const PaymentVerification = () => {
  const {orderId, setOrderId, count, setCount } = useContext(CartContext);
  
  const [CheckOut, setCheckout] = useState({});
  console.log(orderId);
// Function to retrieve the value of a specific cookie by name
  useEffect(() => {
    const fetchCheckout = async () => {
      if (orderId) {
        const response = await axios.get(`https://mancots.onrender.com/api/paymentDetails/${orderId}`);
        setCheckout(response.data);
      }
    };
    fetchCheckout();
  }, [orderId]);

  useEffect(() => {
    const deleteCart = async () => {
      if (CheckOut.cart) {
        const response = await axios.delete(`https://mancots.onrender.com/api/DeleteCart/${CheckOut.cart}`);
        setCount(response.data.cart.products.length);
      }
    };
    deleteCart();
  }, [CheckOut]);

  return (
    <div>
      <div className='cid oswald-bold'>
        <h1>Payment Successful</h1>
        <h3>Order Id: {CheckOut._id}</h3>
        <h3>Ordered By: {CheckOut.name}</h3>
        <h3>Email: {CheckOut.email}</h3>
        <h3>Payment: {CheckOut.paymentStatus} Rs.{CheckOut.Total}</h3>
        <h3>Delivery Updates Will Be Received On Your Email</h3>
        <h2 className='oswald-bold'>Thank You For Choosing Us</h2>
      </div>
    </div>
  );
};

export default PaymentVerification;
