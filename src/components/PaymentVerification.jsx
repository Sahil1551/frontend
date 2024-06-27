import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../index.css';

const PaymentVerification = () => {
  const { count, setCount } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null); // State to hold the orderId
  const [CheckOut, setCheckout] = useState({});

  useEffect(() => {
    // Function to decode cookie value
    const decodeCookie = (cookie) => {
      const decodedCookie = decodeURIComponent(cookie);
      return JSON.parse(decodedCookie); // Parse the JSON string to JavaScript object
    };

    // Read the paymentData cookie
    const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)paymentData\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (cookie) {
      try {
        const orderIdFromCookie = decodeCookie(cookie);
        setOrderId(orderIdFromCookie);
      } catch (error) {
        console.log('Error parsing cookie:', error);
        setOrderId(null); // Handle error case
      }
    }
  }, []);

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const response = await axios.get(`https://mancots.onrender.com/api/paymentDetails/${orderId}`);
        setCheckout(response.data);
      } catch (error) {
        console.log('Error fetching checkout details:', error);
        setCheckout({}); // Handle error case or set default state
      }
    };

    if (orderId) {
      fetchCheckout();
    }
  }, [orderId]);

  useEffect(() => {
    const deleteCart = async () => {
      try {
        if (CheckOut.cart) {
          const response = await axios.delete(`https://mancots.onrender.com/api/DeleteCart/${CheckOut.cart}`);
          setCount(response.data.cart.products.length);
        }
      } catch (error) {
        console.error('Error deleting cart items:', error);
      }
    };

    deleteCart();
  }, [CheckOut, setCount]);

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
