import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [orderId,setOrderId]=useState('');

  return (
    <CartContext.Provider value={{ orderId,setOrderId,count, setCount, userId, setUserId, cartId, setCartId }}>
      {children}
    </CartContext.Provider>
  );
};
