import { useContext } from 'react';
import CartContext, { CartContextValueType } from '../context/CartProvider';

export function useCart(): CartContextValueType {
  return useContext(CartContext);
}

export default useCart;
