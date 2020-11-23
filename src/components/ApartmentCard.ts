import Component from 'vue-class-component';
import Vue from 'vue';
import * as StoreOperations from '../store/models/types';
import { Prop } from 'vue-property-decorator';


@Component({
	template: `
	    <section class="apartment">
	    	<div class="apartment-info">
					<mark class="apartment-info__floor">{{apartment.floor}} этаж</mark>
					<span class="apartment-info__space">{{spaceString}}</span>
				</div>
			</section>
      `,
})
export default class ApartamentCard extends Vue {
	@Prop({ type: Object })
	private apartment: Apartment;

	get spaceString(): string {
		let rooms = this.apartment.rooms;
		let result = '' + rooms;

		if (1 === rooms) {
			result += ' комната';
		}
		else if (4 >= rooms) {
			result += ' комнаты';
		}
		else {
			result += ' комнат';
		}

		return `${result} - ${this.apartment.square}м2`;
	}
}
