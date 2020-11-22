import {GetterTree, Store, StoreOptions} from 'vuex';
import * as StoreOperations from '../models/types';

const getters: GetterTree<StoreState, any> = {
	[StoreOperations.GET_APARTMENTS]: (state) => {
		return state.apartments;
	}
};

export default getters;
