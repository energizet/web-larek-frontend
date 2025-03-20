import { Product } from '../types';
import { cloneTemplate } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from './base/events';
import { ProductMapper } from '../utils/ProductMapper';

export class CardCatalogView {
	public readonly card: Element;

	private readonly category: Element;
	private readonly title: Element;
	private readonly image: HTMLImageElement;
	private readonly price: Element;

	private static clone = cloneTemplate('#card-catalog');

	constructor(private readonly emitter: EventEmitter) {
		this.card = CardCatalogView.clone();

		this.category = this.card.querySelector('.card__category');
		this.title = this.card.querySelector('.card__title');
		this.image = this.card.querySelector('.card__image');
		this.price = this.card.querySelector('.card__price');
	}

	render(product: Product) {
		this.category.textContent = product.category;
		this.category.classList.add(ProductMapper.getCategory(product));
		this.title.textContent = product.title;
		this.image.src = ProductMapper.getUrl(product);
		this.image.alt = product.title;
		this.price.textContent = ProductMapper.getPrice(product);

		this.card.addEventListener('click', () => this.onOpenCard(product));
	}

	private onOpenCard(product: Product) {
		this.emitter.emit<Product>(settings.openCard, product);
	}
}
