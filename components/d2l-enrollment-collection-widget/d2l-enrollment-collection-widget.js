/**
`d2l-enrollment-hero-banner`

Polymer-based web component for a organization name.

@demo demo/d2l-enrollment-hero-banner/d2l-enrollment-hero-banner-demo.html Organization Name
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-button/d2l-button-subtle.js';
import { EnrollmentCollectionEntity } from 'siren-sdk/src/enrollments/EnrollmentCollectionEntity.js';
import '../d2l-enrollment-card/d2l-enrollment-card.js';
import '../d2l-enrollment-hero-banner/d2l-enrollment-hero-banner.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import { EnrollmentsLocalize } from '../EnrollmentsLocalize.js';
import { ResizeObserver } from 'd2l-resize-aware/resize-observer-module.js';

/**
 * @customElement
 * @polymer
 */
class EnrollmentCollectionWidget extends EnrollmentsLocalize(EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(EnrollmentCollectionEntity);
		this._onResize = this._onResize.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();

		this._resizeObserver = new ResizeObserver(this._onResize);
		this._resizeObserver.observe(this);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this._resizeObserver) {
			this._resizeObserver.unobserve(this);
		}
	}

	_onResize(entries) {
		if (!entries || entries.length === 0) {
			return;
		}
		const entry = entries[0];

		this._numColumns = this._computeNumColumns(parseInt(entry.contentRect.width, 10));
	}

	static get template() {
		return html`
			<style include="d2l-typography-shared-styles">
				:host {
					display: block;
				}
				.decw-grid {
					display: grid;
					grid-auto-columns: 1fr;
					grid-gap: 15px 15px;
				}
				.decw-grid-3 {
					grid-template-columns: [hero-start] 1fr 1fr 1fr [hero-end];
				}
				.decw-grid-3-3 {
					grid-template-columns: [hero-start] 1fr 1fr [hero-end];
				}
				.decw-grid-3-2 {
					grid-template-columns: [hero-start] 1fr 1fr [hero-end] 1fr;
				}
				.decw-grid-2 {
					grid-template-columns: [hero-start] 1fr 1fr [hero-end];
				}
				.decw-grid-1 {
					grid-template-columns: [hero-start] 1fr [hero-end];
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
				.decw-grid[has-hero] > d2l-enrollment-card:first-of-type {
					display: none;
				}
				.decw-spinner-container {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.decw-view-all-learning-button {
					margin-top: 24px;
					margin-bottom: 4px;
				}

			</style>
			<template is="dom-if" if="[[_isLoaded]]">
				<template is="dom-if" if="[[_hasEnrollments]]">
					<div class$="decw-grid decw-grid-[[_numColumns]] decw-grid-[[_numColumns]]-[[_numEnrollments]]" has-hero$=[[_hasHero]]>
						<template is="dom-if" if="[[_hasHero]]">
							<d2l-enrollment-hero-banner href="[[_enrollmentHeroHref]]" token="[[token]]" hide-pinning></d2l-enrollment-hero-banner>
						</template>
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
						<a href="[[_myLearningHref]]" class="decw-view-all-learning-button" tabindex="-1">
							<d2l-button-subtle
								aria-hidden="true"
								text="[[localize('viewAllLearning')]]">
							</d2l-button-subtle>
						</a>
					</div>
				</template>
				<template is="dom-if" if="[[!_hasEnrollments]]">
					<d2l-alert>
						[[localize('noCoursesMessage')]]
					</d2l-alert>
				</template>
			</template>
			<template is="dom-if" if="[[!_isLoaded]]">
				<div class="decw-spinner-container">
					<d2l-loading-spinner size="100">
					</d2l-loading-spinner>
				</div>
			</template>
		`;
	}
	static get properties() {
		return {
			_isLoaded: {
				type: Boolean,
				value: false
			},
			_enrollmentHeroHref: String,
			_enrollmentsHref: {
				type: Array,
				value: () => []
			},
			_numColumns: {
				type: Number,
				value: 0
			},
			_numEnrollments: {
				type: Number,
				value: 0
			},
			_hasHero: {
				type: Boolean,
				computed: '_computeHasHero(_numColumns, _numEnrollments)'
			},
			_hasEnrollments: {
				type: Boolean,
				value: true
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

		enrollmentCollection.subEntitiesLoaded().then(() => {
			this._isLoaded = true;
		});

		const enrollments = enrollmentCollection.enrollmentsHref();
		this._myLearningHref = enrollmentCollection.getMyLearningHref();
		this._enrollmentHeroHref = enrollments[0];
		this._enrollmentsHref = enrollments;
		this._numEnrollments = enrollments.length;
		this._hasEnrollments = this._numEnrollments !== 0;
	}

	_computeHasHero(numColumns, numEnrollments) {
		if (numColumns === 3) {
			return true;
		}
		if (numColumns === 2) {
			return numEnrollments % 2 !== 0;
		}
		return false;
	}

	_computeNumColumns(containerWidth) {
		return Math.min(Math.floor(containerWidth / 350), 2) + 1;
	}
}

window.customElements.define(EnrollmentCollectionWidget.is, EnrollmentCollectionWidget);
