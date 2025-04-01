import { Product } from '../types';
import { cloneTemplate } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from './base/events';
import { ProductMapper } from '../utils/ProductMapper';

export class CardCartView {
	public readonly card: Element;

	private readonly index: Element;
	private readonly title: Element;
	private readonly price: Element;
	private readonly button: Element;

	private static clone = cloneTemplate('#card-basket');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly mapper: ProductMapper
	) {
		this.card = CardCartView.clone();

		this.index = this.card.querySelector('.basket__item-index');
		this.title = this.card.querySelector('.card__title');
		this.price = this.card.querySelector('.card__price');
		this.button = this.card.querySelector('.basket__item-delete');
	}

	render(product: Product, index: number) {
		this.index.textContent = index.toString();
		this.title.textContent = product.title;
		this.price.textContent = this.mapper.getPrice(product);

		this.button.addEventListener('click', () => this.onDelete(product));
	}

	private onDelete(product: Product) {
		this.emitter.emit<Product>(settings.deleteProduct, product);
		this.emitter.emit(settings.openCart);
	}
}

export class CardCartViewBuilder {
	constructor(
		private readonly emitter: EventEmitter,
		private readonly mapper: ProductMapper
	) {}

	render(product: Product, index: number): CardCartView {
		const view = new CardCartView(this.emitter, this.mapper);
		view.render(product, index);
		return view;
	}
}
