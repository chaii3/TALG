import {GetterTree, Store, StoreOptions} from 'vuex';
import * as StoreOperations from '../models/types';

const getters: GetterTree<StoreState, any> = {
	[StoreOperations.GET_APARTMENTS]: (state) => {
		return state.apartments;
	},

	[StoreOperations.GET_ACTIVE_APARTMENTS]: (state) => {
		return state.activeApartments;
	}
};

export default getters;
