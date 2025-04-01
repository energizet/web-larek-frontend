export abstract class Form {
	private readonly button: HTMLButtonElement;

	protected constructor(protected readonly form: HTMLFormElement) {
		this.button = this.form.querySelector('.button_submit');

		this.form.addEventListener('submit', (e) => this.onSubmitBase(e));
	}

	protected abstract onSubmit(): void;

	protected setDisable(state: boolean) {
		this.button.disabled = state;
	}

	private onSubmitBase(e: SubmitEvent) {
		e.preventDefault();
		this.onSubmit();
	}
}
