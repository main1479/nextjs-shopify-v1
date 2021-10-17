export const formatPrice = (amount) => {
	const inUsd = new Intl.NumberFormat('en-us', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);

	return inUsd;
};

export const getUniqueValues = (data) => {
	return [...new Set(data.map((item) => item).flat())];
};

export const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ');
};
