import ProductCard from './ProductCard';

export default function ProductList({ products }) {
	return (
		<div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 w-full my-8">
			{products?.map((product) => (
				<ProductCard key={product.node.id} product={product} />
			))}
		</div>
	);
}
