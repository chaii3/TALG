/**
 * Описание данных объекта отдельной кватиры.
 */
interface Apartment {
	/** Уникальный идентификатор здания, в котором находится квартира. */
	building_id: number;

	/** Наименование квартиры. */
	building_name: string;

	/** Этаж */
	floor: number

	/** Уникальный идентификатор квартиры. */
	id: number;

	/** Является ли квартира студией. */
	is_studio: number;

	/** Изображение плана квартиры (url). */
	plan: string;

	/** Этаж */
	porch: number;

	/** Цена */
	price: number;

	/** Количество комнат  */
	rooms: number;

	/** Размер квартиры. */
	size: string;

	/** количество квадратных метров. */
	square: number;
}
