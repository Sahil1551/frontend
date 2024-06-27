import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../index.css';

const PaymentVerification = () => {
  const { count, setCount } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null); // State to hold the orderId
  const [CheckOut, setCheckout] = useState({});

  useEffect(() => {
    const decodeCookie = (cookie) => {
      const decodedCookie = decodeURIComponent(cookie);
      return JSON.parse(decodedCookie);
    };

    // Extract the 'data' cookie
    const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)data\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('Raw cookie:', document.cookie); // Log all cookies
    console.log('Extracted data cookie:', cookie); // Log extracted 'data' cookie

    if (cookie) {
      try {
        const orderIdFromCookie = decodeCookie(cookie);
        console.log('Parsed cookie:', orderIdFromCookie); // Log parsed cookie
        setOrderId(orderIdFromCookie.objectIdString); // Access objectIdString correctly
      } catch (error) {
        console.log('Error parsing cookie:', error);
        setOrderId(null);
      }
    }
  }, []);

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
    const DeleteCart = async () => {
      if (CheckOut.cart) {
        const response = await axios.delete(`https://mancots.onrender.com/api/DeleteCart/${CheckOut.cart}`);
        setCount(response.data.cart.products.length);
      }
    };
    DeleteCart();
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
