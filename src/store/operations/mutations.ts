import {GetterTree, MutationTree, Store, StoreOptions} from 'vuex';
import * as StoreOperations from '../models/types';

function filtered(state: StoreState, filters: FiltersValue): Apartment[] {
	let result: Apartment[] = [];

	for (let i = 0; i < state.apartments.length; i++) {
		const current: Apartment = state.apartments[i];

		// Фильтр по количеству комнат.
		if (0 !== filters.rooms && filters.rooms != current.rooms) {
			continue;
		}

		// Фильтр по этажу.
		if (null !== filters.floors && filters.floors.max < current.floor) {
			continue;
		}

		if (null !== filters.floors && filters.floors.min > current.floor) {
			continue;
		}

		//Фильтр по площади.
		if (null !== filters.square && filters.square.max < current.square) {
			continue;
		}

		if (null !== filters.square && filters.square.min > current.square) {
			continue;
		}

		if (null !== filters.price && filters.price.max < current.price) {
			continue;
		}

		if (null !== filters.price && filters.price.min > current.price) {
			continue;
		}

		result.push(current);
	}

	return result;
}

const mutations: MutationTree<StoreState> = {
	[StoreOperations.SET_APARTMENTS]: (state, payload: Apartment[]) => {
		state.apartments = payload;
	},

	[StoreOperations.USE_FILTERS]: (state, payload: FiltersValue) => {
		state.activeApartments = filtered(state, payload);
	},

	[StoreOperations.RESTART_FILTERS]: (state) => {
		state.activeApartments = filtered(state, {
			rooms:  0,
			floors: null,
			square: null,
			price:  null,
		});
	},
};

export default mutations;
