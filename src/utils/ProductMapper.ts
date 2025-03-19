import { Product } from '../types';
import { CDN_URL } from './constants';

export class ProductMapper {
	static getCategory(product: Product) {
		switch (product.category) {
			case 'софт-скил':
				return 'card__category_soft';
			case 'хард-скил':
				return 'card__category_hard';
			case 'другое':
				return 'card__category_other';
			case 'дополнительное':
				return 'card__category_additional';
			case 'кнопка':
				return 'card__category_button';
		}
	}

	static getUrl(product: Product) {
		return CDN_URL + product.image;
	}

	static getPrice(product: Product | number) {
		const price = (typeof product === 'number') ? product : product.price;
		return price != null ? `${price} синапсов` : 'Бесценно';
	}
}
