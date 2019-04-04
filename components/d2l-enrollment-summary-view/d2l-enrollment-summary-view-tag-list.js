import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-typography/d2l-typography-shared-styles.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryViewTagList extends PolymerElement {
	static get template() {
		return html`
			<style>
				:host {
					@apply --d2l-body-small-text;
					color: var(--d2l-color-tungsten);
				}
				.desvtl-container {
					height: 1rem;
					margin: 0;
					overflow: hidden;
					padding: 0;
				}
				.desvtl-container li d2l-icon {
					--d2l-icon-height: 18px;
					--d2l-icon-width: 18px;
				}
				.desvtl-container li:first-child d2l-icon {
					display: none;
				}
				.desvtl-container li {
					display: inline-block;
					list-style-type: none;
					white-space: nowrap;
				}
			</style>
			<ul class="desvtl-container" hidden$="[[!list]]">
				<template is="dom-repeat" items="[[list]]">
					<li>
						<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
						[[item]]
					</li>
				</template>
			</ul>
		`;
	}
	static get properties() {
		return {
			list: {
				type: Array,
				value: () => []
			}
		};
	}
}

window.customElements.define('d2l-enrollment-summary-view-tag-list', D2lEnrollmentSummaryViewTagList);
