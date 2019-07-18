/**
`d2l-enrollment-hero-banner`

Polymer-based web component for a organization name.

@demo demo/d2l-enrollment-hero-banner/d2l-enrollment-hero-banner-demo.html Organization Name
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import { EnrollmentCollectionEntity } from 'siren-sdk/src/enrollments/EnrollmentCollectionEntity.js';
import '../d2l-enrollment-card/d2l-enrollment-card.js';
import '../d2l-enrollment-hero-banner/d2l-enrollment-hero-banner.js';

/**
 * @customElement
 * @polymer
 */
class EnrollmentCollectionWidget extends EntityMixin(PolymerElement) {
	constructor() {
		super();
		this._setEntityType(EnrollmentCollectionEntity);
	}

	static get template() {
		return html`
			<style include="d2l-typography-shared-styles">
				:host {
					display: block;
				}
				.decw-flex {
					display: flex;
					justify-content: space-between;
				}
				.decw-flex d2l-enrollment-card {
					--course-image-height: 136px;
					flex-grow: 1;
					margin-top: 30px;
				}
				.decw-flex d2l-enrollment-card ~ d2l-enrollment-card {
					margin-left: 30px;
				}
				.decw-flex-two {
					display: flex;
					justify-content: space-between;
				}
				.decw-flex-two d2l-enrollment-card {
					--course-image-height: 150px;
					margin-left: 30px;
					max-width: 307px;
				}
				.decw-flex-two d2l-enrollment-hero-banner{
					flex-grow: 1;
				}
			</style>
			<template is="dom-if" if="[[!_hasTwoEnrollments]]">
				<d2l-enrollment-hero-banner href="[[_enrollmentHeroHref]]" token="[[token]]" hide-pinning></d2l-enrollment-hero-banner>
				<div class="decw-flex">
					<template is="dom-repeat"  items="[[_enrollmentsHref]]">
						<d2l-enrollment-card href="[[item]]" token="[[token]]"
								show-unattempted-quizzes
								show-dropbox-unread-feedback
								show-ungraded-quiz-attempts
								show-unread-discussion-messages
								show-unread-dropbox-submissions
								hide-pinning>
						</d2l-enrollment-card>
					</template>
				</div>
			</template>
			<template is="dom-if" if="[[_hasTwoEnrollments]]">
				<div class="decw-flex-two">
					<d2l-enrollment-hero-banner href="[[_enrollmentHeroHref]]" token="[[token]]" hide-pinning></d2l-enrollment-hero-banner>
					<d2l-enrollment-card href="[[_enrollmentsHref.0]]" token="[[token]]"
							show-unattempted-quizzes
							show-dropbox-unread-feedback
							show-ungraded-quiz-attempts
							show-unread-discussion-messages
							show-unread-dropbox-submissions
							hide-pinning>
					</d2l-enrollment-card>
				</div>
			</template>
		`;
	}
	static get properties() {
		return {
			_enrollmentHeroHref: String,
			_enrollmentsHref: {
				type: Array,
				value: () => []
			},
			_hasTwoEnrollments: {
				type: Boolean,
				value: false
			}
		};
	}

	static get observers() {
		return [
			'_onEnrollmentCollectionChange(_entity)'
		];
	}

	static get is() { return 'd2l-enrollment-collection-widget'; }

	_onEnrollmentCollectionChange(enrollmentCollection) {
		const enrollments = enrollmentCollection.enrollmentsHref();
		this._hasTwoEnrollments = enrollments.length === 2;
		this._enrollmentHeroHref = enrollments.shift();
		this._enrollmentsHref = enrollments;
	}
}

window.customElements.define(EnrollmentCollectionWidget.is, EnrollmentCollectionWidget);
