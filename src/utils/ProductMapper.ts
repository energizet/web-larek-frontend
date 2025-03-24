import { Product } from '../types';
import { CDN_URL } from './constants';

export class ProductMapper {
	getCategory(product: Product) {
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

	getUrl(product: Product) {
		return CDN_URL + product.image;
	}

	getPrice(product: Product | number) {
		const price = (typeof product === 'number') ? product : product.price;
		return price != null ? `${price} синапсов` : 'Бесценно';
	}
}
