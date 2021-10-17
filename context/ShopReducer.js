import { produce } from 'immer';

const cart_reducer = (state, action) => {
	if (action.type === 'ADD_TO_CART') {
		return produce(state, (draftState) => {
			const { id } = action.payload;
			const tempItem = state.cart.find((item) => item.id === id);
			if (tempItem) {
				draftState.cart = draftState.cart.map((item) => {
					if (item.id === id) {
						item.quantity++;
					}
					return item;
				});
			} else {
				draftState.cart.push(action.payload);
			}
		});
	}
	if (action.type === 'REMOVE_CART_ITEM') {
		return produce(state, (draftState) => {
			draftState.cart = draftState.cart.filter((item) => item.id !== action.payload.id);
		});
	}
	if (action.type === CLEAR_CART) {
		return produce(state, (draftState) => {
			draftState.cart = [];
		});
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
