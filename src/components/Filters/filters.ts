import Component from 'vue-class-component';
import Vue from 'vue';
import RoomFilter from './room-filter';
import * as StoreOperations from '../../store/models/types';
import TwoRangesFilter from './two-ranges-filter';

/**
 * Компонент "коллектор" для всех фильтров
 */
@Component({
	template:   `
                  <section class="filters">
	                  <room-filter :variants="roomsVariants" :active="activeRoom" @change="changeRoom($event)"/>
	                  <TwoRangesFilter v-if="active" :max="maxFloors" :min="minFloors" @tick="setFloorValue($event)"/>
	                  <TwoRangesFilter v-if="active" :max="maxSquare" :min="minSquare" @tick="setSquareValue($event)"/>
	                  <TwoRangesFilter v-if="active" :max="maxPrice" :min="minPrice" @tick="setPriceValue($event)" :is-millions="true"/>
	                  <section class="filters-buttons">
	                    <div class="filters__use-button" @click="useFilter">
	                      Применить
	                    </div>
	                    <div class="filters__restart-button" @click="restartFilters">
	                      Сбросить фильтр
	                    </div>
	                  </section>
                  </section>
	            `,
	components: {
		RoomFilter,
		TwoRangesFilter,
	},
})
export default class Filters extends Vue {
	/** Активное значение фильтра  */
	private activeRoom: number = 0;

	/** Значения фильтра этажей. */
	private floorsValue = {
		min: this.minFloors,
		max: this.maxFloors,
	};

	/** Значение фильтров по площади. */
	private squareValue = {
		min: 0,
		max: 0,
	};

	/** Значение фильтров по цене. */
	private priceValue = {
		min: this.minPrice,
		max: this.maxPrice,
	};

	/** Флаг необходимости показа фильтров. */
	private active = false;

	/** Варианты для фильтров комнат. */
	private readonly roomsVariants: number[] = [0, 1, 2, 3];

	/**
	 *  Сбросить фильтры
	 */
	private restartFilters(): void {
		this.$store.commit(StoreOperations.RESTART_FILTERS);

		this.activeRoom = 0;
	}

	private beforeMount() {
		this.$store.subscribe((mutation) => {
			if (mutation.type === StoreOperations.SET_APARTMENTS) {
				this.active = true;
			}
		});
	};

	/**
	 * Получение всех квартир.
	 *
	 * @return {Apartment[]}
	 */
	get apartments(): Apartment[] {
		let apartments = this.$store.getters[StoreOperations.GET_APARTMENTS];

		return apartments ? apartments : [];
	}

	/**
	 * Получить максимальное значение этажей среди всех квартир, которые пришли с api.
	 *
	 * @return {number}
	 * */
	get maxFloors(): number {
		let result: number = 0;

		this.apartments.forEach((apart: Apartment) => {
			if (result < apart.floor) {
				result = apart.floor;
			}
		});

		return result;
	}

	/**
	 * Получить минимальное значение этажей квартир. которые пришли с api.
	 *
	 * @return {number}
	 */
	get minFloors(): number {
		if (0 === this.apartments.length) {
			return 0;
		}

		let result: number = this.apartments[0]?.floor;
		for (let i = 1; i < this.apartments.length; i++) {
			if (result > this.apartments[i].floor) {
				result = this.apartments[i].floor;
			}
		}

		return result;
	}

	get maxSquare(): number {
		let result = 0;

		this.apartments.forEach((apart: Apartment) => {
			if (result < apart.square) {
				result = apart.square;
			}
		});

		return Math.ceil(result);
	}

	/**
	 * Получить минимальное значение этажей квартир. которые пришли с api.
	 *
	 * @return {number}
	 */
	get minSquare(): number {
		if (0 === this.apartments.length) {
			return 0;
		}

		let result = this.apartments[0]?.square;

		for (let i = 1; i < this.apartments.length; i++) {
			if (result > this.apartments[i].square) {
				result = this.apartments[i].square;
			}
		}

		return Math.floor(result);
	}

	/**
	 * Получить максимальное значение цены. которые пришли с api.
	 *
	 * @return {number}
	 */
	get maxPrice(): number {
		let result = 0;

		this.apartments.forEach((apart: Apartment) => {
			if (result < apart.price) {
				result = apart.price;
			}
		});

		return result;
	}

	/**
	 * Получить минимальное значение цены. которые пришли с api.
	 *
	 * @return {number}
	 */
	get minPrice(): number {
		if (0 === this.apartments.length) {
			return 0;
		}

		let result = this.apartments[0]?.price;

		for (let i = 1; i < this.apartments.length; i++) {
			if (result > this.apartments[i].price) {
				result = this.apartments[i].price;
			}
		}

		result = result / 1000000;

		return result;
	}

	/**
	 * Изменить значение фильтра по комнатам.
	 *
	 * @return {number}
	 */
	private changeRoom(variant: number) {
		this.activeRoom = variant;
	}

	/**
	 * Применить фильтры
	 */
	private useFilter(): void {
		let value = <FiltersValue> {
			rooms:  this.activeRoom,
			floors: this.floorsValue,
			price:  this.priceValue,
			square: this.squareValue,
		};

		this.$store.commit(StoreOperations.USE_FILTERS, value);
	}

	/**
	 * Установить значения для фильтра по этажам.
	 */
	private setFloorValue(values: MinMaxObject): void {
		this.floorsValue.max = values.max;
		this.floorsValue.min = values.min;
	}

	/**
	 * Установить значения для фильтра по площади.
	 */
	private setSquareValue(values: MinMaxObject): void {
		this.squareValue.max = values.max;
		this.squareValue.min = values.min;
	}

	/**
	 * Установить значения для фильтра по цене.
	 */
	private setPriceValue(values: MinMaxObject): void {
		this.priceValue.max = values.max;
		this.priceValue.min = values.min;
	}
}
