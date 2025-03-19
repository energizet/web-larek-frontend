import { Product } from '../types';
import { CardCatalogView } from './cardCatalogView';
import { EventEmitter } from './base/events';

export class GalleryView {
	private readonly gallery: Element;

	constructor(private readonly emitter: EventEmitter) {
		this.gallery = document.querySelector('.gallery');
	}

	render(products: Product[]) {
		const emitter = this.emitter;
		const cards = products.map((p) => {
			const view = new CardCatalogView(emitter);
			view.render(p);
			return view.card;
		});
		this.gallery.replaceChildren(...cards);
	}
}
