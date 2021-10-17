import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '../utils/helpers';
export default function ProductCard({ product }) {
	const { originalSrc, altText } = product.node.images.edges[0].node;
	const { title, handle } = product.node;
	const { amount } = product.node.priceRange.minVariantPrice;
	return (
		<div className="rounded-lg shadow-lg bg-white overflow-hidden">
			<Link href={`/products/${handle}`}>
				<a className="block relative h-64 hover:opacity-90 transition">
					<Image src={originalSrc} alt={altText} layout="fill" objectFit="cover" />
				</a>
			</Link>
			<div className="flex items-center justify-between p-5">
				<div>
					<Link href={`/products/${handle}`}>
						<a className="font-medium block text-xl mb-2">{title}</a>
					</Link>
					<p className="flex items-center">
						<span className="text-xs font-medium text-gray-600">by</span>
						<span className="text-xs font-medium ml-1 text-indigo-500">Next.js Shop</span>
					</p>
				</div>
				<span className="flex items-center font-medium h-8 bg-indigo-100 text-dark text-sm px-2 rounded">
					{formatPrice(amount)}
				</span>
			</div>
		</div>
	);
}
