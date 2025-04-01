import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from './base/events';
import { ModalView } from './modalView';
import { settings } from '../utils/constants';
import { OrderModel, PayType } from '../types';
import { Form } from './base/Form';

/*
Посмотрел я проект `Оно тебе надо`
и управление DOM элементами и близко не похоже на задачи базового класса
это похоже на сборище статических чистых методов.
Если уж инкапсулировать работу с DOM в классах, то нужно на каждый элемент делать свой компонент
`Оно тебе надо` так же далеко до ООП, как и этому проекту до фреймворка.
Так что не надо мне рассказывать про ООП
 */
export class OrderModalView extends Form {
	private readonly buttonCard: HTMLButtonElement;
	private readonly buttonCash: HTMLButtonElement;
	private readonly address: HTMLInputElement;

	private static clone = cloneTemplate('#order');

	constructor(
		private readonly emitter: EventEmitter,
		private readonly modal: ModalView,
		private readonly order: OrderModel
	) {
		super(OrderModalView.clone() as HTMLFormElement);

		this.buttonCard = this.form.querySelector('.button__card');
		this.buttonCash = this.form.querySelector('.button__cash');
		this.address = this.form.querySelector('.form__input');

		this.address.addEventListener('input', () => this.onInputAddress());
		this.buttonCard.addEventListener('click', () => this.onClickCard());
		this.buttonCash.addEventListener('click', () => this.onClickCash());
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

		this.modal.render(this.form);
	}

	private updateButtonStatus() {
		this.setDisable(this.order.payType == null || this.order.address == '');
	}

	private onInputAddress() {
		this.order.address = this.address.value;
		this.updateButtonStatus();
	}

	private onClickCard() {
		this.order.payType = PayType.Online;
		this.buttonCard.classList.add('button_alt-active');
		this.buttonCash.classList.remove('button_alt-active');
		this.updateButtonStatus();
	}

	private onClickCash() {
		this.order.payType = PayType.Offline;
		this.buttonCard.classList.remove('button_alt-active');
		this.buttonCash.classList.add('button_alt-active');
		this.updateButtonStatus();
	}

	protected onSubmit() {
		this.emitter.emit(settings.openContacts);
	}
}
