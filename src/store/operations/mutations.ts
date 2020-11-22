import {GetterTree, MutationTree, Store, StoreOptions} from 'vuex';
import * as StoreOperations from '../models/types';

const mutations: MutationTree<StoreState> = {
	[StoreOperations.SET_APARTMENTS]: (state, payload: Apartment[]) => {
		state.apartments = payload;

		console.log('изменил состояние.', console.log(state.apartments))
	}
}

export default mutations;
