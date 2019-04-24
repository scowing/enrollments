/**
`d2l-enrollment-hero-banner`

Polymer-based web component for a organization name.

@demo demo/d2l-enrollment-hero-banner/d2l-enrollment-hero-banner-demo.html Organization Name
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/mixin/entity-mixin.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import { EnrollmentCollectionEntity } from '../../EnrollmentCollectionEntity.js';
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
					flex-grow: 1;
					margin-top: 30px;
				}
				.decw-flex d2l-enrollment-card ~ d2l-enrollment-card {
					margin-left: 30px;
				}
			</style>
			<d2l-enrollment-hero-banner href="[[_enrollmentHeroHref]]" token="[[token]]"></d2l-enrollment-hero-banner>
			<div class="decw-flex">
				<template is="dom-repeat"  items="[[_enrollmentsHref]]">
					<d2l-enrollment-card href="[[item]]" token="[[token]]"
							show-organization-code
							show-semester-name
							show-unattempted-quizzes
							show-dropbox-unread-feedback
							show-ungraded-quiz-attempts
							show-unread-discussion-messages
							show-unread-dropbox-submissions></d2l-enrollment-card>
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
		this._enrollmentsHref = enrollmentCollection.enrollmentsHref();
		this._enrollmentHeroHref = this._enrollmentsHref.shift();
	}
}

window.customElements.define(EnrollmentCollectionWidget.is, EnrollmentCollectionWidget);
