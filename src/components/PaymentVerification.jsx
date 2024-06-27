import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../index.css';

const PaymentVerification = () => {
  const { count, setCount } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null); // State to hold the orderId
  const [CheckOut, setCheckout] = useState({});

  useEffect(() => {
    function getCookie(name) {
      const cookieArr = document.cookie.split(';');
      for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }
      return null;
    }

    // Use the function to get the 'data' cookie
    const dataCookie = getCookie('data');
    if (dataCookie) {
      try {
        const parsedData = JSON.parse(dataCookie); // Store the parsed data in a new variable
        setOrderId(parsedData.objectIdString); // Directly set the objectIdString to orderId state
      } catch (e) {
        console.error('Error parsing cookie data:', e);
      }
    }

    console.log('Cookie data:', dataCookie); // Print the raw cookie data
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
