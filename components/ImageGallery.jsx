import { Tab } from '@headlessui/react';
import { classNames } from '../utils/helpers';
export default function ImageGallery({ images }) {
	return (
		<Tab.Group
			as="div"
			className="flex flex-col-reverse mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 mb-8"
		>
			{/* Image selector */}
			<div className=" mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
				<Tab.List className="grid grid-cols-3 gap-6">
					{images.map((image) => (
						<Tab
							key={image.id}
							className="relative h-24 lg:h-36  bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
						>
							{({ selected }) => (
								<>
									<span className="sr-only">{image.alt}</span>
									<span className="absolute inset-0 rounded-md overflow-hidden">
										<img
											src={image.src}
											alt={image.alt}
											className="w-full h-full object-center object-cover"
										/>
									</span>
									<span
										className={classNames(
											selected ? 'ring-indigo-500' : 'ring-transparent',
											'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
										)}
										aria-hidden="true"
									/>
								</>
							)}
						</Tab>
					))}
				</Tab.List>
			</div>

			<Tab.Panels className="w-full ">
				{images.map((image) => (
					<Tab.Panel key={image.id}>
						<img
							src={image.src}
							alt={image.alt}
							className="w-full h-full aspect-w-1 object-center object-cover rounded-lg"
						/>
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
}
