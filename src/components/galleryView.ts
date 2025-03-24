import { Product } from '../types';
import { CardCatalogView } from './cardCatalogView';
import { EventEmitter } from './base/events';
import { ProductMapper } from '../utils/ProductMapper';

export class GalleryView {
	private readonly gallery: Element;

	constructor(
		private readonly emitter: EventEmitter,
		private readonly mapper: ProductMapper
	) {
		this.gallery = document.querySelector('.gallery');
	}

	render(products: Product[]) {
		const emitter = this.emitter;
		const cards = products.map((p) => {
			const view = new CardCatalogView(emitter, this.mapper);
			view.render(p);
			return view.card;
		});
		this.gallery.replaceChildren(...cards);
	}
}
