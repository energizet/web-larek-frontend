import { EventEmitter } from './base/events';
import { Order, OrderResponse, ProductResponse } from '../types';
import { ApiUtil } from './base/apiUtil';

export class Api {
	constructor(
		private readonly api: ApiUtil,
		private readonly emitter: EventEmitter
	) {}

	loadProducts() {
		return this.api.get('/product') as Promise<ProductResponse>;
	}

	order(order: Order) {
		return this.api.post('/order', order) as Promise<OrderResponse>;
	}
}
