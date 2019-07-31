import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { DirMixin } from '@polymer/polymer/lib/mixins/dir-mixin.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryViewLayout extends DirMixin(PolymerElement) {
	static get template() {
		return html`
			<style>
				.desvl-center {
					margin: auto;
					max-width: 1230px;
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
					padding: 0 1.5rem 0 0;
				}
				.desvl-second-column {
					flex-basis: 0;
					flex-grow: 1;
					overflow: hidden;
					padding: 0 0 0 1.5rem;
				}
				:host(:dir(rtl)) .desvl-first-column {
					border-left: var(--d2l-enrollment-summary-view-tag-layout-inner-border, none);
					border-right: none;
					padding: 0 0 0 1.5rem;
				}
				:host(:dir(rtl)) .desvl-second-column {
					padding: 0 1.5rem 0 0;
				}
				@media only screen and (max-width: 929px) {
					.desvl-center {
						margin: auto;
						max-width: 920px;
					}
					.desvl-flex {
						flex-direction: column;
						margin: 0 1.15rem;
						max-width: 903px;
					}
					.desvl-first-column,
					:host(:dir(rtl)) .desvl-first-column {
						border-right: none;
						overflow: visible;
						padding: 0;
					}
					.desvl-second-column,
					:host(:dir(rtl)) .desvl-second-column {
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
						<slot name="first-column"></slot>
					</span>
					<span class="desvl-second-column">
						<slot name="second-column"></slot>
					</span>
				</div>
			</div>
		`;
	}
}

window.customElements.define('d2l-enrollment-summary-view-layout', D2lEnrollmentSummaryViewLayout);
