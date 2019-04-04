import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryViewLayout extends PolymerElement {
	static get template() {
		return html`
			<style>
				.desvl-center {
					margin: auto;
					max-width: 1290px;
				}
				.desvl-flex {
					display: flex;
					justify-content: center;
					margin: 0 1.5rem;
					max-width: 1230px;
				}
				.desvl-first-column {
					border-right: var(--d2l-enrollment-summary-view-tag-layout-inner-border, none);
					flex-basis: 0;
					flex-grow: 2;
					overflow: hidden;
					padding: 0 1.5rem 0 0;
				}
				.desvl-second-column {
					flex-basis: 0;
					flex-grow: 1;
					overflow: hidden;
					padding: 0 0 0 1.5rem;
				}
				@media only screen and (max-width: 929px) {
					.desvl-center {
						margin: auto;
						max-width: 716px;
					}
					.desvl-flex {
						flex-direction: column;
						margin: 0 0.9rem;
						max-width: 680px;
					}
					.desvl-first-column {
						border-right: none;
						overflow: visible;
						padding: 0;
					}
					.desvl-second-column {
						overflow: visible;
						padding: 0;
					}
				}
				@media only screen and (max-width: 420px) {
					.desvl-flex {
						margin: 0;
						padding: 0 0.9rem;
					}
				}
			</style>
			<div class="desvl-center">
				<div class="desvl-flex">
					<span class="desvl-first-column">
						<slot name="first-coloumn"></slot>
					</span>
					<span class="desvl-second-column">
						<slot name="second-coloumn"></slot>
					</span>
				</div>
			</div>
		`;
	}
}

window.customElements.define('d2l-enrollment-summary-view-layout', D2lEnrollmentSummaryViewLayout);
