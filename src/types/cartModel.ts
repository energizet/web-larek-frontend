import { Product } from './models';

export class CartModel {
	protected readonly products = new Map<string, Product>();

	add(product: Product) {
		this.products.set(product.id, product);
	}

	delete(product: Product) {
		this.products.delete(product.id);
	}

	contains(product: Product) {
		return this.products.has(product.id);
	}

	getProducts() {
		return [...this.products.values()];
	}

	getPrice() {
		return this.getProducts().reduce((sum, item) => sum + item.price, 0);
	}

	clear() {
		this.products.clear();
	}
}
