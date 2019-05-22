/**
`d2l-user-activity-usage`

Polymer-based web component for a organization due and completion dates.

@demo demo/d2l-user-activity-usage/d2l-user-activity-usage-demo.html Organization Updates
*/

import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/mixin/entity-mixin.js';
import { UserActivityUsageEntity  } from '../../UserActivityUsageEntity.js';
import { DateTextAndStatusMixin } from '../date-text-status-mixin.js';

class EnrollmentUserActivityUsage extends DateTextAndStatusMixin(EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(UserActivityUsageEntity);
	}

	static get template() {
		return html`
			<span hidden$="[[overrideToDefault]]">
				[[_dateText]]
			</span>
			<span hidden$="[[_hideDefaultSlot(_date, overrideToDefault)]]"><slot name="default"></slot></span>
		`;
	}

	static get is() {
		return 'd2l-user-activity-usage';
	}

	static get properties() {
		return {
			overrideToDefault: {
				type: Boolean,
				value: false
			},
			_date: {
				type: String,
				value: null
			},
			_dateText: String
		};
	}

	static get observers() {
		return [
			'_onEnrollmentChange(_entity)'
		];
	}

	_onEnrollmentChange(userActivityUsage) {
		this._date = userActivityUsage.date();
		const dateTextAndStatus = this.dateTextAndStatus(userActivityUsage.isCompletionDate(), this._date);
		this._dateText = dateTextAndStatus && dateTextAndStatus.dateText;

		if (!userActivityUsage.isAttended()) {
			this.fire('d2l-enrollment-new');
		}
	}

	_hideDefaultSlot(date, overrideToDefault) {
		return date && !overrideToDefault;
	}
}

window.customElements.define(EnrollmentUserActivityUsage.is, EnrollmentUserActivityUsage);
