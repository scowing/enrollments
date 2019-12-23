import { css, html, LitElement } from 'lit-element/lit-element.js';
import {bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';

/**
 * @customElement
 * @polymer
 * Simple, 0-indexed, 3 slot list that displays a bullet between each filled slot.
 */
class D2lEnrollmentSummaryViewTagSlotList  extends LitElement {
	static get properties() {
		return {
			_showMiddleSlot: {
				type: Boolean,
				value: false
			},
			_showLastSlot: {
				type: Boolean,
				value: false
			}
		};
	}

	static get styles() {
		return [bodySmallStyles, css`
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
			.desvtl-container li {
				display: inline-block;
				list-style-type: none;
				white-space: nowrap;
			}
		`];
	}

	render() {
		return html `
			<ul class="desvtl-container d2l-body-small">
				<li>
					<slot name="first"></slot>
				</li>
				<li>
					${this._showMiddleSlot ? html`<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>` : null }
					<slot name="middle"></slot>
				</li>
				<li>
					${this._showLastSlot ? html`<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>` : null }
					<slot name="last"></slot>
				</li>
			</ul>
		`;
	}

	firstUpdated() {
		this._slotPopulated();
	}

	_slotPopulated() {
		const slots = this.shadowRoot.querySelectorAll('slot');
		var self = this;

		slots[1].addEventListener('slotchange', function() {
			const populated = slots[1].assignedNodes();
			self._showMiddleSlot = populated.length > 0;
		});

		slots[2].addEventListener('slotchange', function() {
			const populated = slots[2].assignedNodes();
			self._showLastSlot = populated.length > 0;
		});
	}
}
window.customElements.define('d2l-enrollment-summary-view-tag-slot-list', D2lEnrollmentSummaryViewTagSlotList);
