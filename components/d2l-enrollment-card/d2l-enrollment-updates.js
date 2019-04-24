/*
`d2l-enrollment-updates`

Polymer-based web component for a enrollment updates.
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/mixin/entity-mixin.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { OrganizationEntity } from 'd2l-organizations/OrganizationEntity.js';
import 'd2l-organizations/components/d2l-organization-updates/d2l-organization-updates.js';
import 'd2l-card/d2l-card-footer-link.js';
import 'd2l-tooltip/d2l-tooltip.js';

/**
 * @customElement
 * @polymer
 */
class EnrollmentUpdates extends mixinBehaviors([
	D2L.PolymerBehaviors.Organization.Updates.Behavior
], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	static get template() {
		return html`
			<style>
				.d2l-enrollment-card-updates-tooltip {
					@apply --d2l-body-small-text;
					color: #FFFFFF;
					white-space:nowrap;
				}
				.d2l-enrollment-card-updates-tooltip[disabled] {
					display: none;
				}
				.d2l-enrollment-card-updates-tooltip ul {
					margin: 0px;
					padding: 0px;
					list-style-type: none;
				}
				.d2l-enrollment-card-updates-tooltip ul li {
					margin: 0px;
					padding: 0px;
				}
			</style>
			<template is="dom-repeat" items="[[_notifications]]">
				<template is="dom-if" if="[[!item.isDisabled]]">
					<d2l-card-footer-link id="[[item.key]]" icon="[[item.icon]]" text="[[item.ariaLabel]]" href$="[[item.link]]" secondary-text="[[_toString(item.updateCount)]]">
					</d2l-card-footer-link>
					<d2l-tooltip class="d2l-enrollment-card-updates-tooltip" for="[[item.key]]" position="top" disabled$="[[item.isDisabled]]">
						<ul>
							<template is="dom-repeat" items="[[item.toolTip]]">
								<li>[[item]]</li>
							</template>
						</ul>
					</d2l-tooltip>
				</template>
			</template>
		`;
	}
	static get properties() {
		return {
			showDropboxUnreadFeedback: {
				type: Boolean,
				value: false
			},
			showUnattemptedQuizzes: {
				type: Boolean,
				value: false
			},
			showUngradedQuizAttempts: {
				type: Boolean,
				value: false
			},
			showUnreadDiscussionMessages: {
				type: Boolean,
				value: false
			},
			showUnreadDropboxSubmissions: {
				type: Boolean,
				value: false
			},
			_notifications: {
				type: Array,
				value: function() { return []; }
			}
		};
	}

	static get observers() {
		return [
			'_loadData(_entity)'
		];
	}

	static get is() { return 'd2l-enrollment-updates'; }

	_loadData(organizationEntity) {
		organizationEntity.onNotificationsChange(
			(notificationCollection) => {
				const notificationList = notificationCollection.getNotifications();

				var presentationAttributes = {
					'ShowDropboxUnreadFeedback': this.showDropboxUnreadFeedback,
					'ShowUnattemptedQuizzes': this.showUnattemptedQuizzes,
					'ShowUngradedQuizAttempts': this.showUngradedQuizAttempts,
					'ShowUnreadDiscussionMessages': this.showUnreadDiscussionMessages,
					'ShowUnreadDropboxSubmissions': this.showUnreadDropboxSubmissions,
				};

				var notification = this._orgUpdates_fetch(notificationList, presentationAttributes);
				this._notifications = this._orgUpdates_notifications(notification);
			}
		);
	}

	_toString(a) {
		if (typeof a !== String) {
			return a.toString();
		}

		return a;
	}
}

window.customElements.define(EnrollmentUpdates.is, EnrollmentUpdates);
