import { Product } from '../types';
import { CardCatalogViewBuilder } from './cardCatalogView';

export class GalleryView {
	private readonly gallery: Element;

	constructor(private readonly builder: CardCatalogViewBuilder) {
		this.gallery = document.querySelector('.gallery');
	}

	render(products: Product[]) {
		const cards = products.map((p) => this.builder.render(p).card);
		this.gallery.replaceChildren(...cards);
	}
}
