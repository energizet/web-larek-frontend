import { cloneTemplate } from '../utils/utils';
import { ModalView } from './modalView';
import { OrderResponse } from '../types';

export class SuccessModalView {
	public readonly element: Element;

	private readonly description: Element;
	private readonly button: HTMLButtonElement;

	private static clone = cloneTemplate('#success');

	constructor(private readonly modal: ModalView) {
		this.element = SuccessModalView.clone();

		this.description = this.element.querySelector(
			'.order-success__description'
		);
		this.button = this.element.querySelector('.order-success__close');

		this.button.addEventListener('click', () => this.onClick());
	}

	render(response: OrderResponse) {
		this.description.textContent = `Списано ${response.total} синапсов`;

		this.modal.render(this.element);
	}

	private onClick() {
		this.modal.hide();
	}
}
