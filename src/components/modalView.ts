export class ModalView {
	private readonly modal: Element;
	private readonly container: Element;
	private readonly close: Element;
	private readonly content: Element;

	constructor() {
		this.modal = document.querySelector('#modal-container');
		this.container = this.modal.querySelector('.modal__container');
		this.close = this.modal.querySelector('.modal__close');
		this.content = this.modal.querySelector('.modal__content');

		this.modal.addEventListener('click', (e) => this.hide());
		this.container.addEventListener('click', (e) => e.stopPropagation());
		this.close.addEventListener('click', (e) => this.hide());
	}

	render(modal: Element) {
		this.content.replaceChildren(modal);
	}

	show() {
		this.modal.classList.add('modal_active');
	}

	hide() {
		this.modal.classList.remove('modal_active');
	}
}
