import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { EnrollmentEntity } from 'siren-sdk/src/enrollments/EnrollmentEntity.js';
import 'd2l-button/d2l-button-shared-styles.js';
import 'd2l-link/d2l-link.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-organizations/components/d2l-organization-detail-card/d2l-organization-detail-card.js';
import './d2l-enrollment-summary-view-layout.js';
import './d2l-enrollment-summary-view-tag-list.js';
import './d2l-enrollment-summary-view-meter.js';
import { EnrollmentsLocalize } from '../EnrollmentsLocalize.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryView extends EnrollmentsLocalize(EntityMixin(PolymerElement)) {
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
					--desv-header-background-color: #FFFFFF;
					background: linear-gradient(to bottom, #f6f7f8, #f6f7f8), linear-gradient(to top, #ffffff, #f9fafb);
					display: block;
					margin: auto;
				}
				.desv-header {
					background-color: var(--desv-header-background-color);
					margin: auto;
				}
				.desv-title-bar {
					background-color: inherit;
					box-sizing: border-box;
					margin: auto;
					max-width: 1230px;
					overflow: hidden;
					padding: 2.45rem 6.75rem 1rem 6.75rem;
					position: relative;
				}
				.desv-sticky-header {
					position: sticky;
					top: 0;
					z-index: 100;
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
				.desv-progress {
					position: relative;
					height: 100%;
				}
				.desv-progress d2l-enrollment-summary-view-meter {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
				}
				.desv-continue {
					position: relative;
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
					position: relative;
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
			<!-- Loading Skeleton Styles -->
			<style>
				@keyframes loadingPulse {
					0% { background-color: var(--d2l-color-sylvite); }
					50% { background-color: var(--d2l-color-regolith); }
					100% { background-color: var(--d2l-color-sylvite); }
				}
				/* shared placeholder styles */
				.desv-placeholder-container {
					background-color: inherit;
					bottom: 0;
					box-sizing: border-box;
					height: 100%;
					left: 0;
					padding: inherit;
					position: absolute;
					right: 0;
					top: 0;
					width: 100%;
				}
				.desv-placeholder {
					animation: loadingPulse 1.8s linear infinite;
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
				}
				.desv-header-1-placeholder {
					height: 2rem;
					margin: 0.2rem 0;
					width: 18rem;
				}
				.desv-standard-text-placeholder {
					height: 0.9rem;
					margin-bottom: 0.7rem;
					width: 5rem;
				}
				.desv-compact-text-placeholder {
					height: 0.8rem;
					width: 4.75rem;
				}
				.desv-paragraph-placeholder.desv-paragraph-placeholder {
					width: 100%;
				}
				.desv-paragraph-placeholder + .desv-paragraph-placeholder {
					margin-top: 0.25rem;
				}
				.desv-button-placeholder {
					height: 2rem;
					margin: 0.5rem 0.6rem 0.6rem 0;
					min-width: 6rem;
				}

				/* desv-title-bar placeholder styles */
				.desv-title-bar-placeholder {
					display: var(--d2l-enrollment-summary-view-title-bar-placeholder-display, none);
				}
				.desv-title-placeholder + .desv-tags-placeholder {
					margin-top: 0.4rem;
				}

				/* desv-progress placeholder styles */
				.desv-progress-placeholder {
					align-items: center;
					background-color: var(--desv-header-background-color);
					display: var(--d2l-enrollment-summary-view-progress-placeholder-display, none);
					justify-content: center;
					z-index: 2;
				}
				.desv-enrollment-summary-view-meter-placeholder {
					border-radius: .225rem;
					height: 0.6rem;
					width: 100%;
				}

				/* desv-continue placeholder styles */
				.desv-continue-placeholder {
					align-items: center;
					background-color: var(--desv-header-background-color);
					display: var(--d2l-enrollment-summary-view-continue-placeholder-display, none);
					z-index: 1;
				}
				.desv-continue-placeholder > * {
					display: inline-block;
				}

				/* desv-side-bar placeholder styles */
				.desv-side-bar-placeholder {
					background-color: #f6f7f8;
					display: var(--d2l-enrollment-summary-view-side-bar-placeholder-display, none);
				}
			</style>

			<div class="desv-header">
				<div class="desv-title-bar">
					<div class="desv-placeholder-container desv-title-bar-placeholder">
						<div class="desv-placeholder desv-header-1-placeholder desv-title-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-tags-placeholder"></div>
					</div>
					<h1> [[_title]] </h1>
					<d2l-enrollment-summary-view-tag-list list=[[_tags]]></d2l-enrollment-summary-view-tag-list>
				</div>
			</div>
			<div class="desv-header desv-sticky-header">
				<d2l-enrollment-summary-view-layout>
					<div class="desv-progress" slot="first-column">
						<div class="desv-placeholder-container desv-progress-placeholder">
							<div class="desv-placeholder desv-enrollment-summary-view-meter-placeholder"></div>
						</div>
						<d2l-enrollment-summary-view-meter
							text$="[[_progressBarText(_title, _enrollmentCompletion.value, _enrollmentCompletion.max)]]"
							value$="[[_enrollmentCompletion.value]]"
							max$="[[_enrollmentCompletion.max]]">
						</d2l-enrollment-summary-view-meter>
					</div>
					<div class="desv-continue" slot="second-column">
						<div class="desv-placeholder-container desv-continue-placeholder">
							<div class="desv-placeholder desv-button-placeholder"></div>
							<div class="desv-placeholder desv-compact-text-placeholder desv-continue-title-placeholder"></div>
						</div>
						<a
							class="desv-button"
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
					<div class="desv-placeholder-container desv-side-bar-placeholder">
						<div class="desv-placeholder desv-standard-text-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
					</div>
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
				value: function() { return ['', '', '', '']; }
			},
			_continueModule: {
				type: Object,
				value: function() { return {
					title: undefined,
					href: undefined
				}; }
			},
			_description: String,
			_enrollmentCompletion: {
				type: Object,
				value: function() { return {
					value: 0,
					max: 0
				}; }
			}
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
				const completion = orgSubSequence.completion() || {};

				modulesBySequence[orgSubSequence.index()] = {
					title: orgSubSequence.title(),
					href: orgSubSequence.sequenceViewerApplicationHref(),
					completion
				};

				let foundContinue = false;
				orgHrefsByActivitySequence[subSequenceIndex][sequencedActivityIndex].continue = undefined;
				orgHrefsByActivitySequence[subSequenceIndex][sequencedActivityIndex].completion = {
					value: 0,
					max: 0
				};
				modulesBySequence.filter(element => typeof(element) !== 'undefined')
					.forEach((orgModule) => {
						if (!orgModule.completion.isCompleted && !foundContinue) {
							orgHrefsByActivitySequence[subSequenceIndex][sequencedActivityIndex].continue = orgModule;
							foundContinue = true;
						}

						orgHrefsByActivitySequence[subSequenceIndex][sequencedActivityIndex].completion.value += orgModule.completion.completed || 0;
						orgHrefsByActivitySequence[subSequenceIndex][sequencedActivityIndex].completion.max += orgModule.completion.total || 0;
					});

				const flattenModuleList = this._flattenDeep(orgHrefsByActivitySequence).filter(element => typeof(element) !== 'undefined');
				this._enrollmentCompletion = flattenModuleList.filter(element => element.completion)
					.reduce((accumulator, activityInfo) => {
						accumulator.value += activityInfo.completion.value || 0;
						accumulator.max += activityInfo.completion.max || 0;

						return accumulator;
					}, { value: 0, max: 0 });

				this._continueModule = flattenModuleList.filter(element => element.continue).map(element => element.continue).shift();

			});
		});
	}

	// Couldn't use flat so I stole it from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
	_flattenDeep(arr1) {
		return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this._flattenDeep(val)) : acc.concat(val), []);
	}

	_progressBarText(title, value, max) {
		const percentage = max > 0 ? Math.floor(value / max * 100) : 0;
		return this.localize('enrollmentProgressBar', 'title', title, 'percentage', percentage);
	}
}

window.customElements.define('d2l-enrollment-summary-view', D2lEnrollmentSummaryView);

// Make shared style so it is easy to mass hide loading.
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<custom-style>
	<style is="custom-style">
		html {

			--d2l-enrollment-summary-view-loading: {
				@apply --d2l-enrollment-summary-view-header-loading-text;

				@apply --d2l-enrollment-summary-view-side-bar-loading-text;
				@apply --d2l-enrollment-summary-view-body-loading-image;
				@apply --d2l-organization-detail-card-loading-text;
			}

			--d2l-enrollment-summary-view-header-loading: {
				@apply --d2l-enrollment-summary-view-header-loading-text;
			}

			--d2l-enrollment-summary-view-header-loading-text: {
				--d2l-enrollment-summary-view-title-bar-placeholder-display: block;
				--d2l-enrollment-summary-view-continue-placeholder-display: flex;
				--d2l-enrollment-summary-view-progress-placeholder-display: flex;
			}

			--d2l-enrollment-summary-view-body-loading: {
				@apply --d2l-enrollment-summary-view-side-bar-loading-text;
				@apply --d2l-organization-detail-card-loading-text;
				@apply --d2l-enrollment-summary-view-body-loading-image;
			}

			--d2l-enrollment-summary-view-body-loading-text: {
				@apply --d2l-enrollment-summary-view-side-bar-loading-text;
				@apply --d2l-organization-detail-card-loading-text;
			}

			--d2l-enrollment-summary-view-body-loading-image: {
				@apply --d2l-organization-detail-card-loading-image;
			}

			--d2l-enrollment-summary-view-side-bar-loading-text: {
				--d2l-enrollment-summary-view-side-bar-placeholder-display: block;
			};
		}
	</style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
