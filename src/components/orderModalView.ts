import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';
import { ModalView } from './modalView';
import { settings } from '../utils/constants';
import { OrderModel, PayType } from '../types';

export class OrderModalView {
	private readonly form: HTMLFormElement;
	private readonly buttonCard: HTMLButtonElement;
	private readonly buttonCash: HTMLButtonElement;
	private readonly address: HTMLInputElement;
	private readonly button: HTMLButtonElement;

	private static clone = cloneTemplate('#order');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly modal: ModalView,
		private readonly order: OrderModel,
	) {
		this.form = OrderModalView.clone() as HTMLFormElement;

		this.buttonCard = this.form.querySelector('.button__card');
		this.buttonCash = this.form.querySelector('.button__cash');
		this.address = this.form.querySelector('.form__input');
		this.button = this.form.querySelector('.order__button');
	}

	render() {
		this.address.value = this.order.address;
		if (this.order.payType == PayType.Online) {
			this.buttonCard.classList.add('button_alt-active');
		}
		if (this.order.payType == PayType.Offline) {
			this.buttonCash.classList.add('button_alt-active');
		}
		this.updateButtonStatus();

		this.address.addEventListener('input', () => {
			this.order.address = this.address.value;
			this.updateButtonStatus();
		});
		this.buttonCard.addEventListener('click', () => {
			this.order.payType = PayType.Online;
			this.buttonCard.classList.add('button_alt-active');
			this.buttonCash.classList.remove('button_alt-active');
			this.updateButtonStatus();
		});
		this.buttonCash.addEventListener('click', () => {
			this.order.payType = PayType.Offline;
			this.buttonCard.classList.remove('button_alt-active');
			this.buttonCash.classList.add('button_alt-active');
			this.updateButtonStatus();
		});
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.emitter.emit(settings.openContacts);
		});

		this.modal.render(this.form);
	}

	updateButtonStatus() {
		this.button.disabled = this.order.payType == null || this.order.address == '';
	}
}
