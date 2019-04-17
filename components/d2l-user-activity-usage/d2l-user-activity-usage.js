/**
`d2l-user-activity-usage`

Polymer-based web component for a organization due and completion dates.

@demo demo/d2l-user-activity-usage/d2l-user-activity-usage-demo.html Organization Updates
*/

import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/mixin/entity-mixin.js';
import { EnrollmentEntity } from '../../EnrollmentEntity.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import './localize-behavior.js';

class EnrollmentUserActivityUsage extends mixinBehaviors([
	D2L.PolymerBehaviors.Enrollment.UserActivityUsage.LocalizeBehavior
], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(EnrollmentEntity);
	}

	static get template() {
		return html`
			<span hidden$="[[overrideToDefault]]">
				[[_dateText]]
			</span>
			<span hidden$="[[_hideDefaultSlot(_date, overrideToDefault)]]">
				<slot name="default"></slot>
			</span>
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
			_isCompletionDate: Boolean,
			_dateText: {
				type: String,
				computed: '_computeDateText(_date, _isCompletionDate)'
			}
		};
	}

	static get observers() {
		return [
			'_onEnrollmentChange(_entity)',
		];
	}

	_onEnrollmentChange(enrollment) {
		var completionDate = enrollment.completionDate();
		var dueDate = enrollment.dueDate();

		this._isCompletionDate = !!completionDate;
		this._date = this._isCompletionDate ? completionDate : dueDate;

		if (!enrollment.isAttended()) {
			this.fire('d2l-enrollment-new');
		}
	}

	_computeDateText(date, isCompletionDate) {
		if (!date || typeof isCompletionDate !== 'boolean') {
			return null;
		}

		var msInDay = 86400000;
		var msInAWeek = 604800000;
		var nowDate = new Date(Date.now());
		nowDate.setHours(0, 0, 0, 0);

		var tomorrowDate = new Date(Date.now() + msInDay);
		tomorrowDate.setHours(0, 0, 0, 0);

		var yesterdayDate = new Date(Date.now() - msInDay);
		yesterdayDate.setHours(0, 0, 0, 0);

		var pastWeekFromNow = new Date(Date.now() - msInAWeek);
		pastWeekFromNow.setHours(0, 0, 0, 0);

		date = new Date(Date.parse(date));

		var dateTypeText = isCompletionDate ? 'completed' : 'due';

		var dateText;
		if (this._compareDate(date, nowDate)) {
			dateText = this.localize(dateTypeText + 'Today');
		} else if (this._compareDate(date, tomorrowDate)) {
			dateText = this.localize(dateTypeText + 'Tomorrow');
		} else if (this._compareDate(date, yesterdayDate)) {
			dateText = this.localize(dateTypeText + 'Yesterday');
		} else if (date >= pastWeekFromNow && date <= nowDate) {
			var daysAgo = Math.ceil((nowDate - date) / msInDay);
			dateText = this.localize(dateTypeText + 'DaysAgo', 'number', daysAgo.toString());
		} else {
			dateText = this.localize(dateTypeText + 'On', 'dateTime', this.formatDate(date, {format: this._dateFormat(date, nowDate)}));
		}

		this.fire('d2l-user-activity-usage-accessible', dateText);

		if (isCompletionDate && date < tomorrowDate) {
			this.fire('d2l-enrollment-status', {status: 'completed'});
		} else if (date < nowDate) {
			this.fire('d2l-enrollment-status', {status: 'overdue'});
		}

		return dateText;
	}
	_dateFormat(date, nowDate) {
		var msInAWeek = 604800000;
		var weekFromNow = new Date(Date.now() + msInAWeek);
		weekFromNow.setHours(0, 0, 0, 0);

		if (date < weekFromNow && date > nowDate) {
			return 'dddd';
		} else if (date.getFullYear() === nowDate.getFullYear()) {
			return 'MMM d';
		}

		return 'MMM d, yyyy';
	}
	_compareDate(dateOne, dateTwo) {
		return dateOne.getFullYear() === dateTwo.getFullYear() &&
			dateOne.getMonth() === dateTwo.getMonth() &&
			dateOne.getDate() === dateTwo.getDate();
	}
	_hideDefaultSlot(date, overrideToDefault) {
		return date && !overrideToDefault;
	}
}

window.customElements.define(EnrollmentUserActivityUsage.is, EnrollmentUserActivityUsage);
