import {
  ReactElement,
  ReactNode,
  createContext,
  useMemo,
  useReducer,
} from 'react';
import { formatPrice } from '../utils';

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = {
  cart: CartItemType[];
};

const initCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
};

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const cartReducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action');
      }
      const { sku, name, price } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      return {
        ...state,
        cart: [...filteredCart, { sku, name, price, qty }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload missing in REMOVE action');
      }
      const { sku } = action.payload;
      const filteredCart = state.cart.filter((item) => item.sku !== sku);
      return { ...state, cart: filteredCart };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error('action.payload missing in QUANTITY action');
      }
      const { sku, qty } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!itemExists) {
        throw new Error('Item must exist in order to update quantity');
      }
      const updatedItem: CartItemType = { ...itemExists, qty };
      const filteredCart = state.cart.filter(
        (item) => item.sku !== action.payload?.sku
      );
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error('Unidentified reducer action type');
  }
};

export type CartContextValueType = {
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: typeof REDUCER_ACTION_TYPE;
  totalItems: number;
  totalPrice: string;
  cart: CartItemType[];
};

const defaultValue: CartContextValueType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: [],
};

const CartContext = createContext<CartContextValueType>(defaultValue);

interface CartProviderProps {
  children?: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(cartReducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => REDUCER_ACTION_TYPE, []);

  const totalItems = state.cart.reduce((previousValue, item) => {
    return previousValue + item.qty;
  }, 0);

  const totalPrice = formatPrice(
    state.cart.reduce((previousValue, item) => {
      return previousValue + item.qty * item.price;
    }, 0)
  );

  const cart = state.cart.sort((itemA, itemB) => {
    const a = Number(itemA.sku.slice(-4));
    const b = Number(itemB.sku.slice(-4));
    return a - b;
  });

  return (
    <CartContext.Provider
      value={{ dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
