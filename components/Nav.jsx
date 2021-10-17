import Link from 'next/link';
import MiniCart from './MiniCart';
import { useShopContext } from '../context/shopContext';
export default function Nav() {
	const { cart, checkout, openCart, setOpenCart, test } = useShopContext();
	const cartQunatity =
		cart.length > 0 &&
		cart.reduce((acc, curr) => {
			return acc + curr.quantity;
		}, 0);

	return (
		<nav className="bg-white shadow dark:bg-gray-800 sticky top-0 left-0 z-20">
			<div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
				<div className="flex items-center justify-between">
					<div>
						<Link href="/">
							<a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
								NextShop
							</a>
						</Link>
					</div>

					{/* <!-- Mobile menu button --> */}
					<div className="flex md:hidden">
						<button
							type="button"
							className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
							aria-label="toggle menu"
						>
							<svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
								<path
									fillRule="evenodd"
									d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
								></path>
							</svg>
						</button>
					</div>
				</div>

				{/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
				<div className="items-center md:flex">
					<div className="flex flex-col md:flex-row md:mx-6">
						<Link href="/products">
							<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
								Products
							</a>
						</Link>
						<Link href="#">
							<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
								About
							</a>
						</Link>
					</div>

					<div className="flex justify-center md:block">
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
