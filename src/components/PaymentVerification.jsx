import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../index.css';
import jwt from 'jsonwebtoken'; 
const PaymentVerification = () => {
  const { count, setCount } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null); 
  const [CheckOut, setCheckout] = useState({});

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const cookie = getCookie('idi');
    if (cookie) {
      try {
        // Decode JWT token to get payload
        const decodedToken = jwt.decode(cookie);
        console.log('Decoded JWT token:', decodedToken);
        if (decodedToken) {
          setOrderId(decodedToken.objectIdString);
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }, []);
  console.log('Parsed orderId:', orderId);
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
