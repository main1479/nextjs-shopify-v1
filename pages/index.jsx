import Head from 'next/head';
import Link from 'next/link';
import ProductList from '../components/ProductList';
import { getProductsInCollection } from '../lib/shopify/shopify';

export default function Home({ products }) {
	if (!products) return <h1 className="text-3xl text-center">Loading...</h1>;
	// if (error) return <h1 className="text-3xl text-center">Faild to load products</h1>;
	return (
		<>
			<Head>
				<title>NEXT SHOP | HOME</title>
			</Head>
			<header>
				<div className="lg:flex">
					<div className="flex items-center justify-center w-full px-6 py-8 lg:h-128 lg:w-1/2">
						<div className="max-w-xl">
							<h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-5xl mb-5">
								Shop Your <span className="text-indigo-600 dark:text-indigo-400">Needs</span>
							</h1>

							<p className="mt-2 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum
								cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem
								tempora voluptates.
							</p>

							<div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
								<Link href="/products">
									<a className="block px-10 py-4 text-md font-semibold text-center text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500">
										Get Started
									</a>
								</Link>
							</div>
						</div>
					</div>

					<div className="w-full h-64 lg:w-1/2 lg:h-auto">
						<div
							className="w-full h-full bg-cover"
							style={{
								backgroundImage: 'url(hero-img.png)',
								backgroundPosition: 'bottom center',
							}}
						>
							{/* <div className="w-full h-full bg-black opacity-25"></div> */}
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto">
				<h2 className="text-3xl font-bold mt-5 -mb-4">Products</h2>
				<ProductList products={products} />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const products = await getProductsInCollection();
	return {
		props: { products },
	};
}
