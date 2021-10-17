import Link from 'next/link';
import MiniCart from './MiniCart';
import { useShopContext } from '../context/ShopContext';
import { useEffect, useState } from 'react';
export default function Nav() {
	const { cart, checkout, openCart, setOpenCart } = useShopContext();
	const [cartQunatity, setCartQuantity] = useState(0);

	useEffect(() => {
		const newQuantity =
			cart.length > 0 &&
			cart.reduce((acc, curr) => {
				return acc + curr.quantity;
			}, 0);

		setCartQuantity(newQuantity);
	}, [cart]);

	return (
		<nav className="bg-white shadow dark:bg-gray-800 sticky top-0 left-0 z-20">
			<div className="container px-6 py-4 mx-auto flex justify-between items-center">
				<div className="flex items-center justify-between">
					<div>
						<Link href="/">
							<a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
								NextShop
							</a>
						</Link>
					</div>
				</div>

				{/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
				<div className="items-center flex">
					<div className="flex justify-center">
						<button
							className="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
							onClick={() => setOpenCart(!openCart)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								fill="currentColor"
								className="bi bi-cart2"
								viewBox="0 0 16 16"
							>
								<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
							</svg>

							{cartQunatity > 0 && (
								<span className="absolute w-5 h-5 flex items-center justify-center -top-2 -right-2 p-1 text-xs text-white bg-indigo-500 rounded-full">
									{cartQunatity}
								</span>
							)}

							<MiniCart products={cart} checkout={checkout} />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
