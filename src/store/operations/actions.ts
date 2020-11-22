import {ActionTree, GetterTree, Store, StoreOptions} from 'vuex';
import * as StoreOperations from '../models/types';

const actions: ActionTree<StoreState, any> = {
	[StoreOperations.FETCH_INIT_DATA]: (context) => {
		//url для json-server (npm package).
		fetch('http://localhost:3000/data')
			.then(response => {
			return response.json();
			}).then((data: Apartment[]) => {
			context.commit(StoreOperations.SET_APARTMENTS, data)
			});
	}
}

export default actions;
