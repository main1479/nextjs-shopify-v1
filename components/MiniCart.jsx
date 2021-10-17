import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useShopContext } from '../context/shopContext';
import { formatPrice } from '../utils/helpers';

export default function MiniCart({ products, checkout }) {
	const { openCart, setOpenCart, removeCartItem } = useShopContext();

	const totalPrice = products.reduce((acc, product) => {
		return (acc += +product.price * product.quantity);
	}, 0);

	return (
		<Transition.Root show={openCart} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 overflow-hidden z-50"
				onClose={() => setOpenCart(!openCart)}
			>
				<div className="absolute inset-0 overflow-hidden">
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="w-screen max-w-md">
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
									<div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
										<div className="flex items-start justify-between">
											<Dialog.Title className="text-lg font-medium text-gray-900">
												Shopping cart
											</Dialog.Title>
											<div className="ml-3 h-7 flex items-center">
												<button
													type="button"
													className="-m-2 p-2 text-gray-400 hover:text-gray-500"
													onClick={() => setOpenCart(false)}
												>
													<span className="sr-only">Close panel</span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="h-6 w-6"
														viewBox="0 0 16 16"
													>
														<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
													</svg>
												</button>
											</div>
										</div>

										<div className="mt-8">
											<div className="flow-root">
												<ul role="list" className="-my-6 divide-y divide-gray-200">
													{products.length === 0 && (
														<h3 className="text-center font-medium text-lg mt-10">
															There is no item ;(
														</h3>
													)}
													{products.map((product) => (
														<li key={product.id} className="py-6 flex">
															<div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
																<img
																	src={product.image}
																	alt={product.altText}
																	className="w-full h-full object-center object-cover"
																/>
															</div>

															<div className="ml-4 flex-1 flex flex-col">
																<div>
																	<div className="flex justify-between text-base font-medium text-gray-900">
																		<h3>
																			<Link href={`/products/${product.handle}`}>
																				<a onClick={() => setOpenCart(!openCart)}>
																					{product.title}
																				</a>
																			</Link>
																		</h3>
																		<p className="ml-4">{formatPrice(product.price)}</p>
																	</div>
																	<p className="mt-1 text-sm text-gray-500">
																		{product.variantTitle}
																	</p>
																</div>
																<div className="flex-1 flex items-end justify-between text-sm">
																	<p className="text-gray-500">Qty {product.quantity}</p>

																	<div className="flex">
																		<button
																			type="button"
																			className="font-medium text-indigo-600 hover:text-indigo-500"
																			onClick={() => removeCartItem(product.id)}
																		>
																			Remove
																		</button>
																	</div>
																</div>
															</div>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>

									{products.length > 0 && (
										<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p>{formatPrice(totalPrice)}</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												Shipping and taxes calculated at checkout.
											</p>
											<div className="mt-6">
												<a
													href={checkout.webUrl}
													className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
												>
													Checkout
												</a>
											</div>
										</div>
									)}
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
