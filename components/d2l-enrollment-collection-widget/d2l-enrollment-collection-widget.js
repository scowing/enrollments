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
				.decw-grid {
					display: grid;
					grid-template-columns: [hero-start] 1fr [hero-end];
					grid-auto-columns: 1fr;
					grid-gap: 30px 30px;
				}
				.decw-grid-4 {
					grid-template-columns: [hero-start] 1fr 1fr 1fr [hero-end];
				}
				.decw-grid-3 {
					grid-template-columns: [hero-start] 1fr 1fr [hero-end];
				}
				.decw-grid-2 {
					grid-template-columns: [hero-start] 3fr [hero-end] 1fr;
				}
				.decw-grid-2 d2l-enrollment-card {
					--course-image-height: 150px;
				}
				d2l-enrollment-card {
					--course-image-height: 136px;
				}
				d2l-enrollment-hero-banner {
					grid-area: 1 / hero-start / 1 / hero-end;
				}
			</style>
			<div class$="decw-grid decw-grid-[[_countEnrollments]]">
				<d2l-enrollment-hero-banner href="[[_enrollmentHeroHref]]" token="[[token]]" hide-pinning></d2l-enrollment-hero-banner>
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
		`;
	}
	static get properties() {
		return {
			_enrollmentHeroHref: String,
			_enrollmentsHref: {
				type: Array,
				value: () => []
			},
			_countEnrollments: {
				type: Number,
				value: 0
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
		this._countEnrollments = enrollments.length;
		this._enrollmentHeroHref = enrollments.shift();
		this._enrollmentsHref = enrollments;
	}
}

window.customElements.define(EnrollmentCollectionWidget.is, EnrollmentCollectionWidget);
