import { RadioGroup } from '@headlessui/react';
import { classNames } from '../utils/helpers';

export default function Sizes({ sizes, selectedSize, setSelectedSize }) {
	return (
		<div className="mt-8">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium text-gray-900">Sizes</h3>
			</div>
			<RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
				<RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
					{sizes.map((size) => (
						<RadioGroup.Option
							key={size}
							value={size}
							className={({ active, checked }) =>
								classNames(
									active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
									checked
										? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
										: 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
									'border rounded-md py-3 px-3 flex items-center cursor-pointer focus:outline-none justify-center text-sm font-medium uppercase sm:flex-1'
								)
							}
						>
							<RadioGroup.Label as="p">{size}</RadioGroup.Label>
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>
	);
}
