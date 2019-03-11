import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentDetailCard extends PolymerElement {
	static get template() {
		return html`
			<div>
				D2lEnrollmentDetailCard
			</div>
		`;
	}

	static get properties() {
		return {};
	}
}

window.customElements.define('d2l-enrollment-detail-card', D2lEnrollmentDetailCard);
