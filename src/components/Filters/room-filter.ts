import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator/lib/decorators/Prop';

@Component({
	template: `
                <section class="room-filter">
                <div v-for="variant in variants" @click="emitChange(variant)" :class="itemClasses(variant)">
                  {{ 0 === variant ? 'S' : variant + 'к' }}
                </div>
                </section>
	          `,
})
export default class RoomFilter extends Vue {
	/** Варианты фильтров. */
	@Prop({type: Array})
	private variants: number[];

	/** Активный вариант. */
	@Prop({type: Number})
	private active: number;

	/**
	 * Классы для вариантов.
	 *
	 * @return {object}
	 */
	private itemClasses(variant: number): object {
		return {
			'room-filter__variant':        true,
			'room-filter__variant_active': this.active === variant,
		};
	}

	/**
	 * Сообщить родительскому компоненту о смене активной характеристики.
	 */
	private emitChange(variant: number): void {
		this.$emit('change', variant);
	}
}
