import { Product } from '../types';
import { cloneTemplate } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from './base/events';
import { ProductMapper } from '../utils/ProductMapper';
import { CartModalView } from './cartModalView';

export class CardCartView {
	public readonly card: Element;

	private readonly index: Element;
	private readonly title: Element;
	private readonly price: Element;
	private readonly button: Element;

	private static clone = cloneTemplate('#card-basket');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly cartModal: CartModalView
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
		this.price.textContent = ProductMapper.getPrice(product);

		this.button.addEventListener('click', () => {
			this.emitter.emit<Product>(settings.deleteProduct, product);
			this.cartModal.render();
		});
	}
}
