import { RadioGroup } from '@headlessui/react';
import { classNames } from '../utils/helpers';

export default function Colors({ colors, selectedColor, setSelectedColor }) {
	return (
		<div>
			<h3 className="text-lg font-medium text-gray-900">Colors</h3>

			<RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
				<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
				<div className="flex items-center space-x-3">
					{colors.map((color) => (
						<RadioGroup.Option
							key={color}
							value={color}
							className={({ checked }) =>
								classNames(
									checked ? 'ring-2 ring-offset-1 ring-indigo-600' : '',
									'-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
								)
							}
						>
							<RadioGroup.Label as="p" className="sr-only">
								{color}
							</RadioGroup.Label>
							<span
								aria-hidden="true"
								style={{ backgroundColor: color }}
								className={classNames('h-8 w-8 border border-black border-opacity-10 rounded-full')}
							/>
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>
	);
}
