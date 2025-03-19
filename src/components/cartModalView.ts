import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';
import { CartModel } from '../types';
import { ProductMapper } from '../utils/ProductMapper';
import { ModalView } from './modalView';
import { settings } from '../utils/constants';
import { CardCartView } from './cardCartView';

export class CartModalView {
	public readonly element: Element;

	private readonly list: Element;
	private readonly button: Element;
	private readonly price: Element;

	private static clone = cloneTemplate('#basket');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly modal: ModalView,
		private readonly cart: CartModel
	) {
		this.element = CartModalView.clone();

		this.list = this.element.querySelector('.basket__list');
		this.price = this.element.querySelector('.basket__price');
		this.button = this.element.querySelector('.basket__button');
	}

	render() {
		const emitter = this.emitter;
		const products = this.cart.getProducts();
		const cards = products.map((p, index) => {
			const view = new CardCartView(emitter, this);
			view.render(p, index + 1);
			return view.card;
		});
		this.list.replaceChildren(...cards);

		this.price.textContent = ProductMapper.getPrice(this.cart.getPrice());

		this.button.addEventListener('click', () => this.emitter.emit(settings.openOrder));

		this.modal.render(this.element);
	}
}
