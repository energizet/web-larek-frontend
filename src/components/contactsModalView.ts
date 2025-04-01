import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';
import { ModalView } from './modalView';
import { settings } from '../utils/constants';
import { OrderModel } from '../types';
import { Form } from './base/Form';

export class ContactsModalView extends Form {
	private readonly email: HTMLInputElement;
	private readonly phone: HTMLInputElement;

	private static clone = cloneTemplate('#contacts');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly modal: ModalView,
		private readonly order: OrderModel
	) {
		super(ContactsModalView.clone() as HTMLFormElement);

		this.email = this.form.querySelector('.input__email');
		this.phone = this.form.querySelector('.input__phone');

		this.email.addEventListener('input', () => this.onInputEmail());
		this.phone.addEventListener('input', () => this.onInputPhone());
	}

	render() {
		this.email.value = this.order.email;
		this.phone.value = this.order.phone;
		this.updateButtonStatus();

		this.modal.render(this.form);
	}

	private updateButtonStatus() {
		this.setDisable(this.order.email == '' || this.order.phone == '');
	}

	private onInputEmail() {
		this.order.email = this.email.value;
		this.updateButtonStatus();
	}

	private onInputPhone() {
		this.order.phone = this.phone.value;
		this.updateButtonStatus();
	}

	protected onSubmit() {
		this.emitter.emit(settings.order);
	}
}
