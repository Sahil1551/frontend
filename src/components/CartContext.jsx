import React, { createContext, useState,useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [orderId,setOrderId]=useState(null);
  useEffect(() => {
    if (orderId) {
      localStorage.setItem('orderId', orderId);
      console.log(orderId);
    } 
  }, [orderId]);
  return (
    <CartContext.Provider value={{ orderId,setOrderId,count, setCount, userId, setUserId, cartId, setCartId }}>
      {children}
    </CartContext.Provider>
  );
};
