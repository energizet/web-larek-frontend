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
import { ProductMapper } from './utils/ProductMapper';
import { CardCartViewBuilder } from './components/cardCartView';
import { CardCatalogViewBuilder } from './components/cardCatalogView';

const emitter = new EventEmitter();
const api = new Api(new ApiUtil(API_URL));
const cart = new CartModel();
const order = new OrderModel();
const mapper = new ProductMapper();

const cardCartBuilder = new CardCartViewBuilder(emitter, mapper);
const cardCatalogBuilder = new CardCatalogViewBuilder(emitter, mapper);

const cartButton = document.querySelector('.header__basket');
const cartCounter = document.querySelector('.header__basket-counter');
cartButton.addEventListener('click', () => emitter.emit(settings.openCart));
const galleryView = new GalleryView(cardCatalogBuilder);
const modalView = new ModalView();

const cardModalView = new CardModalView(emitter, modalView, cart, mapper);
const cartModalView = new CartModalView(
	emitter,
	modalView,
	cart,
	mapper,
	cardCartBuilder
);
const orderModalView = new OrderModalView(emitter, modalView, order);
const contactsModalView = new ContactsModalView(emitter, modalView, order);
const successModalView = new SuccessModalView(modalView);

emitter.on(
	settings.updateCart,
	() => (cartCounter.textContent = `${cart.getProducts().length}`)
);
emitter.on<Product[]>(settings.onLoadedProducts, (p) => galleryView.render(p));
emitter.on<Product>(settings.openCard, (p) => {
	cardModalView.render(p);
	modalView.show();
});
emitter.on(settings.openCart, () => {
	cartModalView.render();
	modalView.show();
});
emitter.on(settings.openOrder, () => {
	orderModalView.render();
	modalView.show();
});
emitter.on(settings.openContacts, () => {
	contactsModalView.render();
	modalView.show();
});
emitter.on<OrderResponse>(settings.onOrdered, (r) => {
	successModalView.render(r);
	modalView.show();
});

emitter.on<Product>(settings.addProduct, (p) => {
	cart.add(p);
	emitter.emit(settings.updateCart);
});
emitter.on<Product>(settings.deleteProduct, (p) => {
	cart.delete(p);
	emitter.emit(settings.updateCart);
});
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
			emitter.emit(settings.updateCart);
			emitter.emit(settings.onOrdered, response);
		})
		.catch((e) => console.log(e))
);

(() => {
	api
		.loadProducts()
		.then((response) => emitter.emit(settings.onLoadedProducts, response.items))
		.catch((e) => console.log(e));
})();
