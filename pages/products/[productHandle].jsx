import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getProduct, getProductsInCollection } from '../../lib/shopify/shopify';
import { formatPrice, getUniqueValues } from '../../utils/helpers';
import ImageGallery from '../../components/ImageGallery';
import Colors from '../../components/Colors';
import Sizes from '../../components/Sizes';
import { useShopContext } from '../../context/ShopContext';

export default function ProductDetails({ product: item }) {
	const { addToCart } = useShopContext();
	const images = item.images.edges.map((img) => {
		return {
			src: img.node.originalSrc,
			alt: img.node.altText,
			id: img.node.id,
		};
	});
	const variants = item.variants.edges.map((variant) => {
		const { id, title, priceV2, selectedOptions } = variant.node;
		return {
			id,
			handle: item.handle,
			title: item.title,
			color: selectedOptions[0].value.toLowerCase().split(' ').join('-'),
			size: selectedOptions[1].value,
			price: priceV2.amount,
			quantity: 1,
			image: variant.node.image.originalSrc,
			altText: variant.node.image.altText,
			variantTitle: title,
		};
	});

	const allColors = variants.map((variant) => variant.color);
	const allSizes = variants.map((variant) => variant.size);

	const product = {
		title: item.title,
		images,
		variants,
		description: item.description,
		colors: getUniqueValues(allColors),
		sizes: getUniqueValues(allSizes),
	};

	const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
	const [selectedColor, setSelectedColor] = useState(product.variants[0].color);
	const [selectedSize, setSelectedSize] = useState(product.variants[0].size);

	useEffect(() => {
		const variant = product.variants.filter(
			(v) => v.color === selectedColor && v.size === selectedSize
		)[0];
		setSelectedVariant(variant);
	}, [selectedColor, selectedSize]);

	const handleSubmit = (e) => {
		e.preventDefault();
		addToCart(selectedVariant);
	};

	return (
		<div className="bg-white">
			<Head>
				<title>NEXT SHOP | {product.title}</title>
			</Head>
			<div className="pt-6 pb-16 sm:pb-24">
				<div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
						{/* Image gallery */}
						<ImageGallery images={product.images} />

						{/* Product details */}
						<div className="lg:col-start-8 lg:col-span-5">
							<div className="flex justify-between">
								<h1 className="text-3xl font-medium text-gray-900">{product.title}</h1>
								<p className="text-xl font-medium text-gray-900 px-2 rounded-md py-1 bg-indigo-100">
									{formatPrice(selectedVariant.price)}
								</p>
							</div>
						</div>

						<div className="mt-8 lg:col-span-5">
							<div className="mb-10">
								<h3 className="text-lg font-medium text-gray-900">Description</h3>

								<div
									className="mt-4 prose prose-sm text-gray-500"
									dangerouslySetInnerHTML={{ __html: product.description }}
								/>
							</div>

							{/* Product Variants Form */}

							<form onSubmit={handleSubmit}>
								{/* Color picker */}
								<Colors
									colors={product.colors}
									selectedColor={selectedColor}
									setSelectedColor={setSelectedColor}
								/>

								{/* Size picker */}
								<Sizes
									sizes={product.sizes}
									selectedSize={selectedSize}
									setSelectedSize={setSelectedSize}
								/>

								<button
									type="submit"
									className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Add to cart
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getStaticPaths = async () => {
	const products = await getProductsInCollection();
	const paths = products.map((product) => {
		return { params: { productHandle: product.node.handle } };
	});

	return {
		paths,
		fallback: false,
	};
};
export const getStaticProps = async (context) => {
	const { productHandle } = context.params;
	const product = await getProduct(productHandle);
	return {
		props: {
			product,
		},
		revalidate: 120,
	};
};
