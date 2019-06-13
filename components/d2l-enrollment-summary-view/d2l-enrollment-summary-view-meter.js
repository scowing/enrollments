import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-typography/d2l-typography-shared-styles.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryViewMeter extends PolymerElement {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
					position: relative;
				}
				:host > div  {
					display: block;
				}
				.desvm-linear-full-bar,
				.desvm-linear-inner-bar {
					border-radius: .225rem;
					flex-grow: 1;
					flex-shrink: 1;
					height: .45rem;
				}
				.desvm-linear-full-bar {
					position: relative;
					background-color: var(--d2l-color-gypsum);
				}
				.desvm-linear-inner-bar {
					position: absolute;
					left: 0;
					top: 0;
					background-color: var(--d2l-color-celestine);
				}
			</style>
			<div
				role="img"
				aria-label$="[[text]]">
				<div class="desvm-linear-full-bar">
					<div class="desvm-linear-inner-bar" style="width:[[_percentage(value, max)]]%;"></div>
				</div>
			</div>
		`;
	}
	static get properties() {
		return {
			max: { type: Number, value: 100 },
			text: { type: String },
			value: { type: Number, value: 0 }
		};
	}
	_percentage(value, max) {
		return max > 0 ? Math.min(Math.floor(value / max * 100), 100) : 0;
	}
}

window.customElements.define('d2l-enrollment-summary-view-meter', D2lEnrollmentSummaryViewMeter);
