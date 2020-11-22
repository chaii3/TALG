import Component from 'vue-class-component';
import Vue from 'vue';
import * as StoreOperations from '../store/models/types';


@Component({
	template: `
	    <div @click="isActive = !isActive">
	    {{check}}
	    	<h1>component</h1>
		</div>

      `,
})
export default class Child extends Vue {
	protected mounted() {
		this.$store.dispatch(StoreOperations.FETCH_INIT_DATA)
	}

	get check() {
		return this.$store.getters[StoreOperations.GET_APARTMENTS];
	}



	private isActive: boolean = false;
}
