import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { createCheckout, updateCheckout } from '../lib/shopify/shopify';
import reducer from './ShopReducer';

const getStorredCart = () => {
	const cart = localStorage.getItem('cart');
	if (cart) {
		return JSON.parse(localStorage.getItem('cart'));
	} else {
		return [];
	}
};

const initialState = {
	cart: [],
};

const ShopContext = createContext();
export function ShopProvider({ children }) {
	const [openCart, setOpenCart] = useState(false);
	const [checkout, setCheckout] = useState({});
	const [theme, setTheme] = useState('');
	useEffect(() => {
		const cart = localStorage.getItem('cart');
		if (cart) {
			initialState.cart = JSON.parse(localStorage.getItem('cart'));
		} else {
			initialState.cart = [];
		}
		setTheme('light');
	}, []);
	const [state, dispatch] = useReducer(reducer, initialState);

	const addToCart = (newItem) => {
		dispatch({ type: 'ADD_TO_CART', payload: newItem });
	};

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	const removeCartItem = (itemId) => {
		dispatch({ type: 'REMOVE_CART_ITEM', payload: { id: itemId } });
	};
	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	const createCheckoutLink = async () => {
		const checkoutObj = await createCheckout(state.cart);
		setCheckout(checkoutObj);

		return checkoutObj;
	};

	return (
		<ShopContext.Provider
			value={{
				...state,
				addToCart,
				openCart,
				setOpenCart,
				removeCartItem,
				checkout,
				createCheckoutLink,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
}

export const useShopContext = () => {
	return useContext(ShopContext);
};
