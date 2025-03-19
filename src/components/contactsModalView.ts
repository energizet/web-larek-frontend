import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';
import { ModalView } from './modalView';
import { settings } from '../utils/constants';
import { OrderModel } from '../types';

export class ContactsModalView {
	private readonly form: HTMLFormElement;
	private readonly email: HTMLInputElement;
	private readonly phone: HTMLInputElement;
	private readonly button: HTMLButtonElement;

	private static clone = cloneTemplate('#contacts');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly modal: ModalView,
		private readonly order: OrderModel
	) {
		this.form = ContactsModalView.clone() as HTMLFormElement;

		this.email = this.form.querySelector('.input__email');
		this.phone = this.form.querySelector('.input__phone');
		this.button = this.form.querySelector('.button');
	}

	render() {
		this.email.value = this.order.email;
		this.phone.value = this.order.phone;
		this.updateButtonStatus();

		this.email.addEventListener('input', () => {
			this.order.email = this.email.value;
			this.updateButtonStatus();
		});
		this.phone.addEventListener('input', () => {
			this.order.phone = this.phone.value;
			this.updateButtonStatus();
		});
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.emitter.emit(settings.order);
		});

		this.modal.render(this.form);
	}

	updateButtonStatus() {
		this.button.disabled = this.order.email == '' || this.order.phone == '';
	}
}
