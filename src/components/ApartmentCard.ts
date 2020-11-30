import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator/lib/decorators/Prop';


@Component({
	template: `
	    <section class="apartment">
	    	<div class="apartment-info">
					<mark class="apartment-info__floor">{{apartment.floor}} этаж</mark>
					<span class="apartment-info__space">{{spaceString}} <mark class="apartment-info__space-mark">-</mark> {{this.apartment.square}}м2</span>
			</div>
              <figure class="apartment-image">
                <figcaption class="apartment-image__text">№{{this.apartment.building_id}}</figcaption>
                <div class="apartment-image__wrapper">
                  <img class="apartment-image__value" src="image3.jpg">
                </div>
              </figure>
              <div class="apartment-price">
                <span class="apartment-price__value">{{this.apartment.price.toLocaleString('ru')}}р.</span>
                <span class="apartment-price__detail">{{priceForSquare}}р. за м<sup>2</sup></span>
              </div>
		      <div class="apartment-button">
		      	Подробнее   			      
		      </div>
		</section>
      `,
})
export default class ApartmentCard extends Vue {
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

		return `${result}`;
	}

	/**
	 * Получить цену за один квадратный метр.
	 *
	 * @return {number}
	 */
	get priceForSquare(): number {
		return Math.ceil(this.apartment.price / this.apartment.square);
	}
}
