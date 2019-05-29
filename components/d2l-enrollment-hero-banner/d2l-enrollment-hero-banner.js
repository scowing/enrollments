/**
`d2l-enrollment-hero-banner`

Polymer-based web component for a organization name.

@demo demo/d2l-enrollment-hero-banner/d2l-enrollment-hero-banner-demo.html Organization Name
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import 'd2l-link/d2l-link-behavior.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import '../d2l-enrollment-card/d2l-enrollment-updates.js';
import '../d2l-enrollment-summary-view/d2l-enrollment-summary-view-tag-list.js';
import { EnrollmentEntity } from 'siren-sdk/src/enrollments/EnrollmentEntity.js';

/**
 * @customElement
 * @polymer
 */
class EnrollmentHeroBanner extends EntityMixin(PolymerElement) {
	constructor() {
		super();
		this._setEntityType(EnrollmentEntity);
	}

	static get template() {
		return html`
			<style include="d2l-offscreen-shared-styles"></style>
			<style include="d2l-typography-shared-styles">
				:host {
					border-radius: 8px;
					box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03);
					display: block;
					max-width: 1170px;
					position: relative;
					-webkit-transition: transform 300ms ease-out;
					transition: transform 300ms ease-out 50ms;
					z-index: 0;
				}
				:host(:hover) {
					transform: translateY(-4px);
				}
				:host(:hover) .dehb-image {
					box-shadow: 0 4px 18px 2px rgba(0,0,0,0.06);
				}
				:host([disabled]),
				:host([disabled]) .dehb-image {
					box-shadow: none;
					transform: none;
				}
				:host([active]) .dehb-image,
				:host([active]:hover) .dehb-image {
					border-color: rgba(0, 111, 191, 0.4);
					box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
				}
				a.d2l-focusable {
					display: block;
					position: absolute;
					height: 100%;
					outline: none;
					width: 100%;
					z-index: 1;
				}
				.dehb-container {
					padding: 0.9rem;
				}
				.dehb-image {
					border-radius: 8px;
					height: 100%;
					left: 0;
					min-width: 510px;
					overflow:hidden;
					position: absolute;
					top: 0;
					width: 100%;
					z-index: -2;
				}
				.dehb-info-container {
					height: 252px;
					position: relative;
					width: 474px;
				}
				.dehb-info-transparent {
					background: white;
					border-radius: 8px;
					height: 100%;
					left: 0;
					opacity: 0.98;
					position: absolute;
					top: 0;
					width: 100%;
					z-index: -1;
				}
				.dehb-base-info {
					display: flex;
					flex-direction:column;
					padding: 1.25rem 0.9rem;
					position: relative;
				}
				.dehb-tag-container {
					margin: 0.4rem 0;
				}
				.dehb-progress-container {
					margin-bottom: 1rem;
					margin-top: 0.35rem;
				}
				.dehb-updates-container {
					display: flex;
					flex-direction:row;
				}
				.dehb-title,
				.dehb-title h2 {
					@apply --d2l-heading-2;
					font-weight: bold;
					letter-spacing: 0.8px;
					line-height: 1.4;
					margin: 0;
				}
				.dehb-title {
					align-items: flex-end;
					display: flex;
					max-height: 2.8em; /* not a typo meant em */
					min-height: 2.26em; /* not a typo meant em */
				}
				.dehb-link-text {
					@apply --d2l-offscreen;
					display: inline-block;
				}

				:host(:dir(rtl)) .dehb-link-text {
					@apply --d2l-offscreen-rtl
				}
			</style>
			<!-- Loading Skeleton Styles -->
			<style>
				@keyframes loadingShimmer {
					0% { transform: translate3d(-100%, 0, 0); }
					100% { transform: translate3d(100%, 0, 0); }
				}
				.dehb-image-shimmer {
					background-color: var(--d2l-color-regolith);
					border-radius: 8px;
					display: var(--d2l-enrollment-hero-banner-image-shimmer-display, none);
					height: 100%;
					left: 0;
					overflow:hidden;
					position: absolute;
					top: 0;
					width: 100%;
					z-index: 1;
				}
				.dehb-image-shimmer::after {
					animation: loadingShimmer 1.5s ease-in-out infinite;
					background-color: var(--d2l-color-regolith);
					background: linear-gradient(90deg, rgba(249, 250, 251, 0.1), rgba(114, 119, 122, 0.1), rgba(249, 250, 251, 0.1));
					content: '';
					height: 100%;
					left: 0;
					position: absolute;
					top: 0;
					width: 100%;
				}
				.dehb-base-info-placeholder {
					background-color: #ffffff;
					border-radius: 8px;
					display: var(--d2l-enrollment-hero-banner-text-placeholder-display, none);
					height: 100%;
					position: absolute;
					width: 100%;
					z-index: 5;
				}
				.dehb-progress-placeholder {
					display: block;
					height: 0.6rem;
					margin: 0.2rem 0;
					width: 55%;
				}
				.dehb-tag-placeholder-container {
					display: flex;
					flex-direction: row;
				}
				.dehb-tag-placeholder {
					height: 0.6rem;
					margin: 0.2rem 0;
					margin-right: 0.5rem;
					width: 5rem;
				}
				.dehb-text-placeholder {
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
				}
				.dehb-title-placeholder {
					height: 1.1rem;
					margin: 0.45rem 0;
					width: 60%;
				}
				.dehb-update-placeholder {
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
					height: 18px;
					margin-right: 1.7rem;
					margin-top: 0.6rem;
					width: 18px;
				}
			</style>
			<a class="d2l-focusable" href$="[[_organizationHomepageUrl]]" on-focus="_onFocus" on-blur="_onBlur">
				<span class="dehb-link-text">[[_title]]</span>
			</a>
			<div class="dehb-container">
				<div class="dehb-image">
					<div class="dehb-image-shimmer"></div>
					<d2l-organization-image type="wide" href="[[_organizationUrl]]" token$=[[token]]></d2l-organization-image>
				</div>
				<div class="dehb-info-container">
					<div class="dehb-info-transparent"></div>
					<!-- Skeleton for text -->
					<div class="dehb-base-info-placeholder">
						<div class="dehb-base-info">
							<div class="dehb-title">
								<div class="dehb-text-placeholder dehb-title-placeholder"></div>
							</div>
							<div class="dehb-tag-container dehb-tag-placeholder-container">
								<div class="dehb-text-placeholder dehb-tag-placeholder"></div>
								<div class="dehb-text-placeholder dehb-tag-placeholder"></div>
							</div>
							<div class="dehb-progress-container">
								<div class="dehb-text-placeholder dehb-progress-placeholder"></div>
							</div>
							<div class="dehb-updates-container">
								<div class="dehb-update dehb-update-placeholder"></div>
								<div class="dehb-update dehb-update-placeholder"></div>
								<div class="dehb-update dehb-update-placeholder"></div>
							</div>
						</div>
					</div>
					<div class="dehb-base-info">
						<div class="dehb-title"><h2>[[_organizationName]]</h2></div>
						<div class="dehb-tag-container dehb-tag-placeholder-container">
							<div class="dehb-text-placeholder dehb-tag-placeholder"></div>
							<div class="dehb-text-placeholder dehb-tag-placeholder"></div>
						</div>
						<div class="dehb-progress-container">
							<div class="dehb-text-placeholder dehb-progress-placeholder"></div>
						</div>
						<div class="dehb-updates-container">
							<d2l-enrollment-updates
								href="[[_organizationUrl]]"
								token$=[[token]]
								show-unattempted-quizzes
								show-dropbox-unread-feedback
								show-ungraded-quiz-attempts
								show-unread-discussion-messages
								show-unread-dropbox-submissions>
							</d2l-enrollment-updates>
						</div>
					</div>
				</div>
			</div>
		`;
	}
	static get properties() {
		return {
			active: {
				type: Boolean,
				value: false,
				reflectToAttribute: true,
				readOnly: true
			},
			disabled: {
				type: Boolean,
				value: true,
				computed: '_computeDisabled(_organizationHomepageUrl)',
				reflectToAttribute: true,
				readOnly: true
			},
			_organizationName: String,
			_organizationHomepageUrl: String,
			_organizationUrl: String,
			_notificationsUrl: String,
			_tags: {
				type: Array,
				value: () => ['Due April 25, 2018', '1 hour remaining']
			}
		};
	}

	static get observers() {
		return [
			'_onEnrollmentChange(_entity)'
		];
	}

	static get is() { return 'd2l-enrollment-hero-banner'; }

	_onEnrollmentChange(enrollment) {
		this._organizationUrl = enrollment.organizationHref();
		enrollment.onOrganizationChange(this._onOrganizationChange.bind(this));
	}

	_onOrganizationChange(organization) {
		this._organizationName = organization.name();
		this._organizationHomepageUrl = organization.organizationHomepageUrl();
	}

	_computeDisabled(organizationHomepage) {
		return !organizationHomepage;
	}

	_onFocus() {
		this._setActive(true);
	}

	_onBlur() {
		this._setActive(false);
	}
}

window.customElements.define(EnrollmentHeroBanner.is, EnrollmentHeroBanner);

// Make shared style so it is easy to mass hide loading.
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<custom-style>
	<style is="custom-style">
		html {

			--d2l-enrollment-hero-banner-loading: {
				--d2l-enrollment-hero-banner-image-shimmer-display: block;
				--d2l-enrollment-hero-banner-text-placeholder-display: block;
			};

			--d2l-enrollment-hero-banner-loading-text: {
				--d2l-enrollment-hero-banner-text-placeholder-display: block;
			};

			--d2l-enrollment-hero-banner-loading-image: {
				--d2l-enrollment-hero-banner-image-shimmer-display: block;
			};

		}
	</style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
