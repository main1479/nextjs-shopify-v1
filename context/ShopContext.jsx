import { createContext, useContext, useEffect, useState } from 'react';
import { createCheckout, updateCheckout } from '../lib/shopify/shopify';

const ShopContext = createContext();

export function ShopProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [openCart, setOpenCart] = useState(false);
	const [checkout, setCheckout] = useState({});
	const addToCart = async (newItem) => {
		setOpenCart(true);
		if (cart.length === 0) {
			setCart([newItem]);

			const checkoutObj = await createCheckout(newItem.id, newItem.quantity);

			setCheckout(checkoutObj);
			localStorage.setItem('checkout', JSON.stringify([cart, checkoutObj]));
		} else {
			let newCart = [];
			cart.map((item) => {
				if (item.id === newItem.id) {
					item.quantity + 1;
					newCart = [...cart];
					return;
				} else {
					newCart = [...cart, newItem];
				}
			});

			setCart(newCart);
			const newCheckout = await updateCheckout(checkout?.id, newCart);
			setCheckout(newCheckout);
			localStorage.setItem('checkout', JSON.stringify([cart, newCheckout]));
		}
	};

	const removeCartItem = async (itemId) => {
		const newItems = cart.filter((item) => item.id !== itemId);
		setCart(newItems);
		const newCheckout = await updateCheckout(checkout.id, newItems);
		setCheckout(newCheckout);
		localStorage.setItem('checkout', JSON.stringify([newItems, newCheckout]));
	};

	useEffect(() => {
		if (localStorage.checkout) {
			const cartObject = JSON.parse(localStorage.checkout);

			if (cartObject[0].id) {
				setCart([cartObject[0]]);
			} else if (cartObject[0].length > 0) {
				setCart(...[cartObject[0]]);
			}
			setCheckout(cartObject[1]);
		}
	}, []);

	return (
		<ShopContext.Provider
			value={{
				addToCart,
				checkout,
				cart,
				openCart,
				setOpenCart,
				checkout,
				removeCartItem,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
}

export const useShopContext = () => {
	return useContext(ShopContext);
};
