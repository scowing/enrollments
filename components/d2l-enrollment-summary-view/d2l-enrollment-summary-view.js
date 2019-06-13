import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { EnrollmentEntity } from 'siren-sdk/src/enrollments/EnrollmentEntity.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-button/d2l-button-shared-styles.js';
import 'd2l-link/d2l-link.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-organizations/components/d2l-organization-detail-card/d2l-organization-detail-card.js';
import './d2l-enrollment-summary-view-layout.js';
import './d2l-enrollment-summary-view-tag-list.js';
import '../localize-behavior';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryView extends mixinBehaviors([D2L.PolymerBehaviors.Enrollment.LocalizeBehavior], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(EnrollmentEntity);
	}

	static get template() {
		return html`
			<!-- Style for the continue button -->
			<style>
				.desv-button {
					font-family: inherit;
					padding: 0.5rem 1.5rem;
					@apply --d2l-button-shared;
					@apply --d2l-label-text;
					@apply --d2l-button;
					@apply --d2l-button-clear-focus;
					text-decoration: none;
				}
				/* Firefox includes a hidden border which messes up button dimensions */
				.desv-button::-moz-focus-inner {
					border: 0;
				}
				.desv-button,
				.desv-button[disabled]:hover,
				.desv-button[disabled]:focus {
					background-color: var(--d2l-color-regolith);
					border-color: var(--d2l-color-mica);
					color: var(--d2l-color-ferrite);
				}
				.desv-button[disabled] {
					opacity: 0.5;
					cursor: default;
				}
				.desv-button[primary],
				.desv-button[primary][disabled]:hover,
				.desv-button[primary][disabled]:focus {
					background-color: var(--d2l-color-celestine);
					border-color: var(--d2l-color-celestine-minus-1);
					color: #ffffff;
					@apply --d2l-button-primary;
				}
				.desv-button[primary]:hover,
				.desv-button[primary]:focus {
					background-color: var(--d2l-color-celestine-minus-1);
				}
				.desv-button[primary]:hover {
					@apply --d2l-button-primary-hover;
				}
				.desv-button[primary]:focus {
					@apply --d2l-button-focus;
					outline: none; /* needed for Edge, can't be in the mixin */
				}
			</style>
			<style include="d2l-typography-shared-styles">
				:host {
					background: linear-gradient(to bottom, #f6f7f8, #f6f7f8), linear-gradient(to top, #ffffff, #f9fafb);
					display: block;
					margin: auto;
				}
				.desv-header {
					background-color: #FFFFFF;
					margin: auto;
				}
				.desv-title-bar {
					box-sizing: border-box;
					margin: auto;
					max-width: 1230px;
					overflow: hidden;
					padding: 2.45rem 6.75rem 1rem 6.75rem;
				}
				.desv-title-bar h1 {
					@apply --d2l-heading-1;
					color: var(--d2l-color-ferrite);
					letter-spacing: 0.9px;
					margin: 0;
				}
				.desv-title-bar d2l-enrollment-summary-view-tag-list {
					@apply --d2l-body-compact-text;
				}
				.desv-header d2l-enrollment-summary-view-layout {
					--d2l-enrollment-summary-view-tag-layout-inner-border: 1px solid var(--d2l-color-gypsum);
					border-bottom: 1px solid var(--d2l-color-gypsum);
					border-top: 1px solid var(--d2l-color-gypsum);
					box-shadow: 0 2px 4px -2px var(--d2l-color-mica);
					display: block;
				}
				.desv-button {
					margin: 0.5rem 0.6rem 0.6rem 0;
				}
				.desv-continue span {
					@apply --d2l-body-small-text;
					letter-spacing: 0.3px;
				}
				.desv-course-list {
					margin: 2.5rem 0 0 0;
					padding: 0;
				}
				.desv-course-list li {
					list-style-type: none;
					margin: 1.5rem 0;
					line-height: 0;
				}
				.desv-side-bar {
					padding: 2.5rem 0 0 0;
				}
				.desv-side-bar h3 {
					@apply --d2l-body-standard-text;
					color: var(--d2l-color-ferrite);
					letter-spacing: 0.4px;
					line-height: 1;
					margin: 0;
					margin-bottom: 0.6rem;
				}
				.desv-side-bar p {
					@apply --d2l-body-small-text;
					letter-spacing: 0.3px;
					line-height: 1.5;
					margin: 0;
					margin-bottom: 0.6rem;
				}
				@media only screen and (max-width: 929px) {
					.desv-header d2l-enrollment-summary-view-layout div {
						line-height: 2.6rem;
					}
					.desv-title-bar {
						flex-direction: column;
						max-width: 680px;
						padding-bottom: 0.8rem;
						padding-top: 1.5rem;
						padding: 0.9rem;
					}
					.desv-title-bar h1 {
						font-size: 1.6rem;
						letter-spacing: 0.2px;
					}
					.desv-side-bar {
						display: none;
					}
					.desv-header d2l-enrollment-summary-view-layout {
						box-shadow: none;
						padding: 0.45rem 0;
					}
					.desv-header d2l-enrollment-summary-view-layout div {
						font-size: 0.8rem;
					}
					.desv-header d2l-enrollment-summary-view-layout div[slot="first-column"] {
						line-height: 1.3rem;
					}
					.desv-header d2l-enrollment-summary-view-layout div[slot="second-column"] {
						line-height: 2.6rem;
					}
					.desv-course-list {
						margin-top: 1.6rem;
					}
					.desv-course-list li {
						margin-top: 1.6rem;
					}
				}
				@media only screen and (max-width: 420px) {
					.desv-title-bar d2l-enrollment-summary-view-tag-list {
						font-size: 0.6rem;
						letter-spacing: 0.1px;
					}
				}
			</style>

			<div class="desv-header">
				<div class="desv-title-bar">
					<h1> [[_title]] </h1>
					<d2l-enrollment-summary-view-tag-list list=[[_tags]]></d2l-enrollment-summary-view-tag-list>
				</div>
				<d2l-enrollment-summary-view-layout>
					<div slot="first-column">Completion Bar</div>
					<div class="desv-continue" slot="second-column">
						<a	class="desv-button"
							primary
							disabled$="[[!_continueModule.href]]"
							href$="[[_continueModule.href]]"
							aria-label="[[localize('continueToModule', 'module', _continueModule.title)]]">
								[[localize('continue')]]
						</a>
						<span>[[_continueModule.title]]</span>
					</div>
				</d2l-enrollment-summary-view-layout>
			</div>
			<d2l-enrollment-summary-view-layout>
				<div slot="first-column">
					<ul class="desv-course-list">
						<template is="dom-repeat" items="[[_orgHrefs]]">
							<li>
								<d2l-organization-detail-card href="[[item]]" token="[[token]]"></d2l-organization-detail-card>
							</li>
						</template>
					</ul>
				</div>
				<div slot="second-column" class="desv-side-bar">
					<h3>[[localize('description')]]</h3>
					<p>[[_description]]</p>
				</div>
			</d2l-enrollment-summary-view-layout>
		`;
	}

	static get properties() {
		return {
			_organizationUrl: String,
			_courseEnrollment: String,
			_tags: {
				type: Array,
				value: function() { return []; },
				computed: '_computeTags(_orgHrefs)'
			},
			_title: String,
			_orgHrefs: {
				type: Array,
				value: function() { return []; }
			},
			_continueModule: {
				type: Object,
				value: function() { return {
					title: undefined,
					href: undefined
				}; }
			},
			_description: String
		};
	}
	static get observers() {
		return [
			'_onEnrollmentChange(_entity)'
		];
	}
	_computeTags(courses) {
		const tags = [];
		if (courses) {
			tags.push(courses.length > 1 ? courses.length + ' Activities' : '1 Activity');
		}
		return tags;
	}
	_onEnrollmentChange(enrollment) {
		enrollment.onOrganizationChange((org) => {
			this._title = org.name();
			this._description = org.description();
			org.onSequenceChange(this._onRootSequenceChange.bind(this));
		});
	}
	_onRootSequenceChange(rootSequence) {
		const orgHrefsByActivitySequence = [];

		rootSequence.onSubSequencesChange((subSequence) => {
			orgHrefsByActivitySequence[subSequence.index()] = [];

			subSequence.onSequencedActivityChange((sequencedActivity) => {
				orgHrefsByActivitySequence[subSequence.index()][sequencedActivity.index()] = {};

				sequencedActivity.onOrganizationChange((organizationEntity) => {
					orgHrefsByActivitySequence[subSequence.index()][sequencedActivity.index()].href = organizationEntity.self();
					this._orgHrefs = this._flattenDeep(orgHrefsByActivitySequence)
						.filter(element => typeof(element) !== 'undefined')
						.map(element => element.href);

					this._setLearningPathContinue(organizationEntity, orgHrefsByActivitySequence, subSequence.index(), sequencedActivity.index());
				});

			});
		});
	}

	_setLearningPathContinue(organizationEntity, orgHrefsByActivitySequence, subSequenceIndex, sequencedActivityIndex) {
		organizationEntity.onSequenceChange((orgSequenceRoot) => {
			const modulesBySequence = [];
			orgSequenceRoot.onSubSequencesChange((orgSubSequence) => {
				const completion = orgSubSequence.completion();
				const isCompleted = completion && completion.isCompleted;

				modulesBySequence[orgSubSequence.index()] = {
					title: orgSubSequence.title(),
					href: orgSubSequence.sequenceViewerApplicationHref(),
					isCompleted
				};

				modulesBySequence.filter(element => typeof(element) !== 'undefined')
					.some((orgModule) => {
						if (!orgModule.isCompleted) {
							orgHrefsByActivitySequence[subSequenceIndex][sequencedActivityIndex].continue = orgModule;
							return true;
						}
					});

				this._continueModule = this._flattenDeep(orgHrefsByActivitySequence)
					.filter(element => typeof(element) !== 'undefined')
					.map(element => element.continue)
					.shift();
			});
		});
	}

	// Couldn't use flat so I stole it from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
	_flattenDeep(arr1) {
		return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this._flattenDeep(val)) : acc.concat(val), []);
	}
}

window.customElements.define('d2l-enrollment-summary-view', D2lEnrollmentSummaryView);
