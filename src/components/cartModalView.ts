import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';
import { CartModel } from '../types';
import { ProductMapper } from '../utils/ProductMapper';
import { ModalView } from './modalView';
import { settings } from '../utils/constants';
import { CardCartView, CardCartViewBuilder } from './cardCartView';

export class CartModalView {
	public readonly element: Element;

	private readonly list: Element;
	private readonly button: HTMLButtonElement;
	private readonly price: Element;

	private static clone = cloneTemplate('#basket');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly modal: ModalView,
		private readonly cart: CartModel,
		private readonly mapper: ProductMapper,
		private readonly builder: CardCartViewBuilder
	) {
		this.element = CartModalView.clone();

		this.list = this.element.querySelector('.basket__list');
		this.price = this.element.querySelector('.basket__price');
		this.button = this.element.querySelector('.basket__button');
	}

	render() {
		const products = this.cart.getProducts();
		const cards = products.map(
			(p, index) => this.builder.render(p, index + 1).card
		);
		this.list.replaceChildren(...cards);

		this.price.textContent = this.mapper.getPrice(this.cart.getPrice());

		this.button.disabled = products.length == 0;
		this.button.addEventListener('click', () => this.onOpenOrder());

		this.modal.render(this.element);
	}

	onOpenOrder() {
		this.emitter.emit(settings.openOrder);
	}
}
