import Vue from 'vue';
import Vuex, {Store, StoreOptions} from 'vuex';
import actions from './operations/actions';
import getters from './operations/getters';
import mutations from './operations/mutations';

Vue.use(Vuex);

const store: StoreOptions<StoreState> = {
	strict: true,
	state:  {
		apartments: '1231231',
	},
	getters,
	mutations,
	actions,
}

export default new Vuex.Store(store);
