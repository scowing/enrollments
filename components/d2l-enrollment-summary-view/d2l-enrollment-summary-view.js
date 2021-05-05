import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { EnrollmentEntity } from 'siren-sdk/src/enrollments/EnrollmentEntity.js';
import '@brightspace-ui/core/components/offscreen/offscreen.js';
import 'd2l-button/d2l-button-shared-styles.js';
import 'd2l-link/d2l-link.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-organizations/components/d2l-organization-detail-card/d2l-organization-detail-card.js';
import './d2l-enrollment-summary-view-layout.js';
import './d2l-enrollment-summary-view-tag-list.js';
import './d2l-enrollment-summary-view-meter.js';
import { EnrollmentsLocalize } from '../EnrollmentsLocalize.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryView extends EnrollmentsLocalize(EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(EnrollmentEntity);
		this._onCourseTextLoaded = this._onCourseTextLoaded.bind(this);
		this._onCourseImageLoaded = this._onCourseImageLoaded.bind(this);
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
					padding: 1.25rem 1.5rem;
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
				.desv-header {
					border-top: 1px solid var(--d2l-color-gypsum);
				}
				.desv-header d2l-enrollment-summary-view-layout {
					--d2l-enrollment-summary-view-tag-layout-inner-border: 1px solid var(--d2l-color-gypsum);
					border-bottom: 1px solid var(--d2l-color-gypsum);
					box-shadow: 0 2px 4px -2px var(--d2l-color-mica);
					display: block;
				}
				.desv-button {
					margin: 0.5rem 0.6rem 0.6rem 0;
				}
				:host(:dir(rtl)) .desv-button {
					margin: 0.5rem 0 0.6rem 0.6rem;
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
					display: flex;
					position: relative;
				}
				.desv-continue span {
					@apply --d2l-body-compact-text;
					margin: auto;
					letter-spacing: 0.3px;
					margin-left: 0.2rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				:host(:dir(rtl)) .desv-continue span {
					margin-left: 0;
					margin-right: 0.2rem;
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
						max-width: 908px;
						padding: 1.0rem 0.9rem;
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
				:host(:dir(rtl)) .desv-button-placeholder {
					margin: 0.5rem 0 0.6rem 0.6rem;
				}

				/* desv-title-bar placeholder styles */
				.desv-title-bar-placeholder {
					display: var(--d2l-enrollment-summary-view-title-bar-placeholder-display, block);
				}
				.desv-title-placeholder + .desv-tags-placeholder {
					margin-top: 0.4rem;
				}

				/* desv-progress placeholder styles */
				.desv-progress-placeholder {
					align-items: center;
					background-color: var(--desv-header-background-color);
					display: var(--d2l-enrollment-summary-view-progress-placeholder-display, flex);
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
					display: var(--d2l-enrollment-summary-view-continue-placeholder-display, flex);
					z-index: 1;
				}
				.desv-continue-placeholder > * {
					display: inline-block;
				}

				/* desv-side-bar placeholder styles */
				.desv-side-bar-placeholder {
					background-color: #f6f7f8;
					display: var(--d2l-enrollment-summary-view-side-bar-placeholder-display, block);
				}
			</style>
			<!-- Loading Skeleton Reveal Styles -->
			<style>
				.desv-side-bar[show-text] {
					--d2l-enrollment-summary-view-side-bar-placeholder-display: none;
				}
				.desv-course-list:not([show-text]) {
					@apply --d2l-organization-detail-card-loading-text;
				}
				.desv-course-list:not([show-image]) {
					@apply --d2l-organization-detail-card-loading-image;
				}
				.desv-title-bar[show-text] {
					--d2l-enrollment-summary-view-title-bar-placeholder-display: none;
				}
				.desv-progress[show-text] {
					--d2l-enrollment-summary-view-progress-placeholder-display: none;
				}
				.desv-continue[show-text] {
					--d2l-enrollment-summary-view-continue-placeholder-display: none;
				}
			</style>

			<div class="desv-header">
				<div class="desv-title-bar" show-text$=[[_showTitle]]>
					<div class="desv-placeholder-container desv-title-bar-placeholder">
						<div class="desv-placeholder desv-header-1-placeholder desv-title-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-tags-placeholder"></div>
					</div>
					<h1> [[_title]] </h1>
					<d2l-offscreen>[[_description]]</d2l-offscreen>
					<d2l-enrollment-summary-view-tag-list list=[[_tags]]></d2l-enrollment-summary-view-tag-list>
				</div>
			</div>
			<div class="desv-header desv-sticky-header">
				<d2l-enrollment-summary-view-layout>
					<div class="desv-progress" slot="first-column" show-text$=[[_showCompletionContinue]]>
						<div class="desv-placeholder-container desv-progress-placeholder">
							<div class="desv-placeholder desv-enrollment-summary-view-meter-placeholder"></div>
						</div>
						<d2l-enrollment-summary-view-meter
							text$="[[_progressBarText(_title, _enrollmentCompletion.value, _enrollmentCompletion.max)]]"
							value$="[[_enrollmentCompletion.value]]"
							max$="[[_enrollmentCompletion.max]]">
						</d2l-enrollment-summary-view-meter>
					</div>
					<div class="desv-continue" slot="second-column" show-text$=[[_showCompletionContinue]]>
						<div class="desv-placeholder-container desv-continue-placeholder">
							<div class="desv-placeholder desv-button-placeholder"></div>
							<div class="desv-placeholder desv-compact-text-placeholder desv-continue-title-placeholder"></div>
						</div>
						<a
							class="desv-button"
							primary
							disabled$="[[!_continueModule.href]]"
							href$="[[_continueModule.href]]"
							aria-label$="[[localize('continueToModule', 'module', _continueModule.title)]]">
								[[localize('continue')]]
						</a>
						<span>[[_continueModule.title]]</span>
					</div>
				</d2l-enrollment-summary-view-layout>
			</div>
			<d2l-enrollment-summary-view-layout>
				<div slot="first-column">
					<ul class="desv-course-list" show-text$=[[_showCourseTexts]] show-image$=[[_isBodyImagesChunkLoaded]]>
						<template is="dom-repeat" items="[[_orgHrefs]]">
							<li>
								<d2l-organization-detail-card href="[[item]]" token="[[token]]"></d2l-organization-detail-card>
							</li>
						</template>
					</ul>
				</div>
				<div slot="second-column" class="desv-side-bar" show-text$=[[_showDescription]]>
					<div class="desv-placeholder-container desv-side-bar-placeholder">
						<div class="desv-placeholder desv-standard-text-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
						<div class="desv-placeholder desv-compact-text-placeholder desv-paragraph-placeholder"></div>
					</div>
					<h3 aria-hidden="true">[[localize('description')]]</h3>
					<p aria-hidden="true">[[_description]]</p>
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
			_title: {
				type: String,
				value: '\0'
			},
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
			},
			_revealTimeoutMs: {
				type: Number,
				value: 2000
			},
			_revealTimerId: Number,
			_revealOnLoad: {
				type: Boolean,
				value: false
			},
			/* body text chunk loading */
			_isDescriptionLoaded: {
				type: Boolean,
				value: false
			},
			_courseTextsLoaded: Object,
			_isCourseTextsLoaded: {
				type: Boolean,
				value: false
			},
			_showDescription: {
				type: Boolean,
				computed: '_computeShowElement(_isDescriptionLoaded, _isBodyTextsChunkLoaded, _revealOnLoad)'
			},
			_showCourseTexts: {
				type: Boolean,
				computed: '_computeShowElement(_isCourseTextsLoaded, _isBodyTextsChunkLoaded, _revealOnLoad)'
			},
			_isBodyTextsChunkLoaded: {
				type: Boolean,
				computed: '_computeIsLoaded(_isDescriptionLoaded, _isCourseTextsLoaded)'
			},
			/* body images chunk loading */
			_courseImagesLoaded: Object,
			_isCourseImagesLoaded: {
				type: Boolean,
				value: false
			},
			_isBodyImagesChunkLoaded: {
				type: Boolean,
				computed: '_computeIsLoaded(_isCourseImagesLoaded)'
			},
			/* header chunk loading */
			_isCompletionContinueLoaded: {
				type: Boolean,
				value: false
			},
			_isTitleLoaded: {
				type: Boolean,
				value: false
			},
			_showCompletionContinue: {
				type: Boolean,
				computed: '_computeShowElement(_isCompletionContinueLoaded, _isHeaderTextChunkLoaded, _revealOnLoad)'
			},
			_showTitle: {
				type: Boolean,
				computed: '_computeShowElement(_isTitleLoaded, _isHeaderTextChunkLoaded, _revealOnLoad)'
			},
			_isHeaderTextChunkLoaded: {
				type: Boolean,
				computed: '_computeIsLoaded(_isCompletionContinueLoaded, _isTitleLoaded)'
			},
		};
	}
	static get observers() {
		return [
			'_onEnrollmentChange(_entity)',
			'_onCoursesChange(_orgHrefs)'
		];
	}
	connectedCallback() {
		super.connectedCallback();
		afterNextRender(this, () => {
			this._revealTimerId = setTimeout(this._onRevealTimeout.bind(this), this._revealTimeoutMs);

			this.addEventListener('d2l-organization-detail-card-text-loaded', this._onCourseTextLoaded);
			this.addEventListener('d2l-organization-detail-card-image-loaded', this._onCourseImageLoaded);
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		clearTimeout(this._revealTimerId);
		this.removeEventListener('d2l-organization-detail-card-text-loaded', this._onCourseTextLoaded);
		this.removeEventListener('d2l-organization-detail-card-image-loaded', this._onCourseImageLoaded);
	}
	_onRevealTimeout() {
		this._revealOnLoad = true;
	}
	_onCourseTextLoaded(e) {
		this._courseTextsLoaded[e.detail.href] = true;
		if (!this._isCourseTextsLoaded) {
			this._isCourseTextsLoaded = this._computeIsLoaded(...Object.values(this._courseTextsLoaded));
		}
	}
	_onCourseImageLoaded(e) {
		this._courseImagesLoaded[e.detail.href] = true;
		if (!this._isCourseImagesLoaded) {
			this._isCourseImagesLoaded = this._computeIsLoaded(...Object.values(this._courseImagesLoaded));
		}
	}
	_computeIsLoaded() {
		return [...arguments].reduce((isLoadedA, isLoadedB) => isLoadedA && isLoadedB, true);
	}
	_computeShowElement(isElementLoaded, isChunkLoaded, revealOnLoad) {
		return isChunkLoaded || (isElementLoaded && revealOnLoad);
	}
	_computeTags(courses) {
		const tags = [];
		if (courses) {
			tags.push(this.localize('activityCount', 'count', courses.length));
		}
		return tags;
	}
	_onCoursesChange(courses) {
		const coursesLoaded = courses.reduce((map, href) => {
			map[href] = false;
			return map;
		}, {});
		this._courseTextsLoaded = {...coursesLoaded};
		this._courseImagesLoaded = {...coursesLoaded};
	}
	_onEnrollmentChange(enrollment) {
		enrollment.onOrganizationChange((org) => {
			this._title = org.name();
			this._isTitleLoaded = true;

			this._description = org.description();
			this._isDescriptionLoaded = true;

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

				// Stop-gap solution to delay loaded event firing until the module sequences have loaded until we can get the sequence count from the siren-sdk
				setTimeout(() => {
					this._isCompletionContinueLoaded = true;
				}, 200);
			});
		});

		// Stop-gap solution to delay loaded event firing. If no module is ever loaded, ensures the loaded event still fires after a period of time.
		setTimeout(() => {
			this._isCompletionContinueLoaded = true;
		}, 800);
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
