import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';
import { CartModel, Product } from '../types';
import { ProductMapper } from '../utils/ProductMapper';
import { ModalView } from './modalView';
import { settings } from '../utils/constants';

enum ButtonStatus {
	Buy = 'Купить',
	Cart = 'В корзину',
}

export class CardModalView {
	public readonly card: Element;

	private readonly image: HTMLImageElement;
	private readonly category: Element;
	private readonly title: Element;
	private readonly description: Element;
	private readonly price: Element;
	private readonly button: Element;

	private buttonStatus: ButtonStatus;

	private static clone = cloneTemplate('#card-preview');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly modal: ModalView,
		private readonly cart: CartModel
	) {
		this.card = CardModalView.clone();

		this.image = this.card.querySelector('.card__image');
		this.category = this.card.querySelector('.card__category');
		this.title = this.card.querySelector('.card__title');
		this.description = this.card.querySelector('.card__text');
		this.price = this.card.querySelector('.card__price');
		this.button = this.card.querySelector('.card__row>.button');
	}

	render(product: Product) {
		this.category.textContent = product.category;
		this.category.classList.add(ProductMapper.getCategory(product));
		this.title.textContent = product.title;
		this.description.textContent = product.description;
		this.image.src = ProductMapper.getUrl(product);
		this.image.alt = product.title;
		this.price.textContent = ProductMapper.getPrice(product);
		this.button.textContent = this.buttonStatus = this.cart.contains(product)
			? ButtonStatus.Cart
			: ButtonStatus.Buy;

		this.button.addEventListener('click', () => this.onClick(product));

		this.modal.render(this.card);
	}

	onClick(product: Product) {
		if (product.price == null) {
			return;
		}

		if (this.buttonStatus === ButtonStatus.Buy) {
			this.emitter.emit<Product>(settings.addProduct, product);
			this.button.textContent = this.buttonStatus = ButtonStatus.Cart;
			return;
		}

		this.emitter.emit(settings.openCart);
	}
}
