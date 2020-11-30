import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import * as StoreOperations from '../../store/models/types';

@Component({
	template: `
                <article class="two-ranges-filter">
	                <section class="two-ranges-filter__values">
	                  <div class="two-ranges-filter__value-item two-ranges-filter__value-min">{{ isMillions ? (this.value1 / 1000000).toFixed(2) : Math.floor(this.value1) }}</div>
	                  -
	                  <div class="two-ranges-filter__value-item two-ranges-filter__value-max">{{ isMillions ? (this.value2 / 1000000).toFixed(2) : this.value2 }}</div>
	                </section>
	                <section class="two-ranges-filter__inputs">
	                  <input @change="emit" class="two-ranges-filter__inputs_min" v-model="value1" :min="this.min" :max="max1" type="range" :style="fill1">
	                  <input @change="emit" class="two-ranges-filter__inputs_max" v-model="value2" :min="this.min2" :max="this.max" type="range" :style="fill2">
	                </section>
                </article>
	          `,
})
export default class TwoRangesFilter extends Vue {
	@Prop({type: Boolean, default: false})
	private isMillions: number;

	@Prop({type: Number})
	private min: number;

	@Prop({type: Number})
	private max: number;

	private min2: number;
	private max1: number;
	private value1: number = 4;
	private value2: number = 2;
	private oneTickPart: number;

	private beforeMount(): void {
		this.initValues();
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === StoreOperations.RESTART_FILTERS) {
				console.log(1111);
				this.value1 = this.min;
				this.value2 = this.max;
			}
		});

		this.emit();
	}

	/**
	 * Инициализировать значения для начальныз позиций.
	 */
	private initValues(): void {
		let position     = this.max - this.min;
		this.oneTickPart = Math.ceil(100 / (position / 2));
		this.max1        = Math.ceil(this.min + (position / 2));
		this.value1      = this.min;
		this.min2        = Math.floor(this.max1 + 1);
		this.value2      = this.max;
	};

	get fill1(): string {
		const part = (this.value1 - this.min) / (this.max1 - this.min);

		return `background: linear-gradient(to right, #f2f2f2 0%, #f2f2f2 ${part * 100}%, #70D24E ${part * 100}%)`;
	}

	get fill2(): string {
		const part = (this.value2 - this.min2) / (this.max - this.min2);

		return `background: linear-gradient(to right, #70D24E 0%, #70D24E ${part * 100}%, #f2f2f2 ${part * 100}%)`;
	}

	/**
	 * Перадача изменения значений в родительский инстурмент.
	 */
	private emit(): void {
		this.$emit('tick', {
			min: (<number> this.value1),
			max: (<number> this.value2),
		});
	}
}
