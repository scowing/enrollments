import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { EnrollmentEntity } from '../../EnrollmentEntity.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import '../d2l-enrollment-detail-card/d2l-enrollment-detail-card.js';
import './d2l-enrollment-summary-view-layout.js';
import './d2l-enrollment-summary-view-tag-list.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentSummaryView extends mixinBehaviors([
	D2L.PolymerBehaviors.Enrollment.UserActivityUsage.LocalizeBehavior
], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(EnrollmentEntity);
	}

	static get template() {
		return html`
			<style include="d2l-typography-shared-styles">
				:host {
					margin: auto;
				}
				.desv-header {
					background-color: #FFFFFF;
					margin: auto;
				}
				.desv-title-bar {
					margin: auto;
					max-width: 1230px;
					overflow: hidden;
					padding: 2.8rem 1.5rem 1rem 1.5rem;
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
				.desv-header d2l-enrollment-summary-view-layout div {
					line-height: 3.4rem;
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
					<h1> Introduction to User Experience Design </h1>
					<d2l-enrollment-summary-view-tag-list list=[[_tags]]></d2l-enrollment-summary-view-tag-list>
				</div>
				<d2l-enrollment-summary-view-layout>
					<div slot="first-column">Completion Bar</div>
					<div slot="second-column">Continue</div>
				</d2l-enrollment-summary-view-layout>
			</div>
			<d2l-enrollment-summary-view-layout>
				<div slot="first-column">
					<ul class="desv-course-list">
						<template is="dom-repeat" items="[[_courses]]">
							<li>
								<d2l-enrollment-detail-card href="[[item]]" token="whatever"></d2l-enrollment-detail-card>
							</li>
						</template>
					</ul>
				</div>
				<div slot="second-column" class="desv-side-bar">
					<h3>Description</h3>
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
				value: () => [],
				computed: '_computeTags(_courses)'
			},
			_courses: {
				type: Array,
				value: () => []
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
		tags.push('About 2 hour 30 minutes');
		return tags;
	}
	_onEnrollmentChange(enrollment) {
		this._courses = enrollment.enrollments().map(e => e.href);
		enrollment.onOrganizationChange((org) => {
			this._description = org.description();
		});
	}
}

window.customElements.define('d2l-enrollment-summary-view', D2lEnrollmentSummaryView);
