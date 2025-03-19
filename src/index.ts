import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { ApiUtil } from './components/base/apiUtil';
import { API_URL, settings } from './utils/constants';
import { CartModel, OrderModel, OrderResponse, Product } from './types';
import { Api } from './components/api';
import { GalleryView } from './components/galleryView';
import { ModalView } from './components/modalView';
import { CardModalView } from './components/cardModalView';
import { CartModalView } from './components/cartModalView';
import { OrderModalView } from './components/orderModalView';
import { ContactsModalView } from './components/contactsModalView';
import { SuccessModalView } from './components/successModalView';

const emitter = new EventEmitter();
const api = new Api(new ApiUtil(API_URL), emitter);
const cart = new CartModel();
const order = new OrderModel();

const cartButton = document.querySelector('.header__basket');
cartButton.addEventListener('click', () => emitter.emit(settings.openCart));
const galleryView = new GalleryView(emitter);
const modalView = new ModalView(emitter);

emitter.on<Product[]>(settings.onLoadedProducts, (p) => galleryView.render(p));
emitter.on<Product>(settings.openCard, (p) => {
	const cardModalView = new CardModalView(emitter, modalView, cart);
	cardModalView.render(p);
	modalView.show();
});
emitter.on(settings.openCart, () => {
	const cartModalView = new CartModalView(emitter, modalView, cart);
	cartModalView.render();
	modalView.show();
});
emitter.on(settings.openOrder, () => {
	const cartModalView = new OrderModalView(emitter, modalView, order);
	cartModalView.render();
	modalView.show();
});
emitter.on(settings.openContacts, () => {
	const cartModalView = new ContactsModalView(emitter, modalView, order);
	cartModalView.render();
	modalView.show();
});
emitter.on<OrderResponse>(settings.onOrdered, (r) => {
	const cartModalView = new SuccessModalView(modalView);
	cartModalView.render(r);
	modalView.show();
});

emitter.on<Product>(settings.addProduct, (p) => cart.add(p));
emitter.on<Product>(settings.deleteProduct, (p) => cart.delete(p));
emitter.on(settings.order, () =>
	api
		.order({
			payment: order.payType,
			email: order.email,
			phone: order.phone,
			address: order.address,
			total: cart.getPrice(),
			items: cart.getProducts().map((p) => p.id),
		})
		.then((response) => {
			cart.clear();
			emitter.emit(settings.onOrdered, response);
		})
);

(() => {
	api
		.loadProducts()
		.then((response) =>
			emitter.emit(settings.onLoadedProducts, response.items)
		);
})();
