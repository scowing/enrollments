/*
`d2l-enrollment-updates`

Polymer-based web component for a enrollment updates.

Note: Audited tooltip accessibility warning, all good (DE39047)
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { OrganizationEntity } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { OrganizationUpdatesMixin } from 'd2l-organizations/components/d2l-organization-updates/OrganizationUpdatesMixin.js';
import 'd2l-card/d2l-card-footer-link.js';
import 'd2l-tooltip/d2l-tooltip.js';

/**
 * @customElement
 * @polymer
 */
class EnrollmentUpdates extends OrganizationUpdatesMixin(EntityMixin(PolymerElement)) {
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
					<d2l-card-footer-link id="[[item.key]]" icon="[[item.icon]]" text="[[item.ariaLabel]]" href$="[[item.link]]" secondary-count="[[_toNumber(item.updateCount)]]">
						<d2l-tooltip slot="tooltip" class="d2l-enrollment-card-updates-tooltip" for="[[item.key]]" position="top" disabled$="[[item.isDisabled]]">
							<ul>
								<template is="dom-repeat" items="[[item.toolTip]]">
									<li>[[item]]</li>
								</template>
							</ul>
						</d2l-tooltip>
					</d2l-card-footer-link>
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

	_toNumber(updateCount) {
		if (typeof a === Number) {
			return updateCount;
		}

		return updateCount === '99+' ? 100 : parseInt(updateCount);
	}
}

window.customElements.define(EnrollmentUpdates.is, EnrollmentUpdates);
