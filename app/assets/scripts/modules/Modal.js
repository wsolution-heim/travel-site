import $ from 'jquery';

class Modal {
	constructor() {
		this.openModalButton = $(".open-modal");
		this.modal = $(".modal");
		this.closeModalButton = $(".modal__close");
		this.events();
	}

	
	events(){
		// clicking the open modal button
		// bind(this) --> behält den Inhalt des this in allen weiteren classen bei
		this.openModalButton.click(this.openModal.bind(this));
		
		// clicking the x close modal button
		this.closeModalButton.click(this.closeModal.bind(this));
		// pushes any key
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e) {
		// 27 is the value for the escape button
		if (e.keyCode == 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.addClass("modal--is-visible");
		// damit das # zeichen im href nicht die Seite nach oben scrollt
		return false;
	}

	closeModal() {
		this.modal.removeClass("modal--is-visible");
		return false;
	}
}

export default Modal;