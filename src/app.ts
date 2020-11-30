// @ts-ignore
import Component from 'vue-class-component';
import Vue from 'vue';
import ApartmentCard from './components/ApartmentCard';
import Filters from './components/Filters/filters';
import * as StoreOperations from './store/models/types';

@Component({
	template:   `
                  <main>
	                  <Filters></Filters>
	                  <article class="apartments-wrapper">
	                    <ApartmentCard v-for="apart in apartments" :apartment="apart"/>
	                  </article>
                  </main>
	            `,
	components: {
		ApartmentCard,
		Filters,
	},
})
export default class App extends Vue {
	public beforeMount(): void {
		this.$store.dispatch(StoreOperations.FETCH_INIT_DATA);
	}

	get apartments(): Apartment[] {
		return this.$store.getters[StoreOperations.GET_ACTIVE_APARTMENTS];
	}
}
