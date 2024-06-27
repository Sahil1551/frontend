import React, { useContext,useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../index.css'
const PaymentVerification = () => {
  
const { count, setCount } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null); // State to hold the orderId
  const [CheckOut,setCheckout]=useState({});
  useEffect(() => {
    // Function to decode cookie value
    fetch('/api/paymentVerifcation')
    .then(response => {
      const customDataHeader = response.headers.get('X-Custom-Data');
      const data = JSON.parse(customDataHeader);
      console.log('Received custom data:', data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  useEffect(()=>{
    const fetchCheckout=async()=>{
      const response=await axios.get(`https://mancots.onrender.com/api/paymentDetails/${orderId}`)
      setCheckout(response.data)
    }
    fetchCheckout();
  },[orderId])
  useEffect(()=>{
    const DeleteCart=async()=>{
      const response=await axios.delete(`https://mancots.onrender.com/api/DeleteCart/${CheckOut.cart}`)
      setCount(response.data.cart.products.length);
    }
    DeleteCart()
  },[CheckOut])
  return (
    <div>
      <div className='cid oswald-bold'>
        <h1>Payment Succesfull</h1>
        <h3>Order Id : {CheckOut._id}</h3>
        <h3>Ordered By : {CheckOut.name}</h3>
        <h3>Email : {CheckOut.email}</h3>
        <h3>Payment : {CheckOut.paymentStatus} Rs.{CheckOut.Total}</h3>
        <h3>Delivery Updates Will Be Recieved On Your Email</h3>
        <h2 className='oswald-bold'>Thank You For Choosing Us</h2>
      </div>



    </div>
  );
};

export default PaymentVerification;
