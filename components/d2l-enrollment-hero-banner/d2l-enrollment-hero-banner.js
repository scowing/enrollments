/**
`d2l-enrollment-hero-banner`

Polymer-based web component for a organization name.

@demo demo/d2l-enrollment-hero-banner/d2l-enrollment-hero-banner-demo.html Organization Name
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import 'd2l-link/d2l-link-behavior.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import 'd2l-organizations/components/d2l-organization-date/d2l-organization-date.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-status-indicator/d2l-status-indicator.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import '../d2l-enrollment-card/d2l-enrollment-updates.js';
import '../d2l-enrollment-summary-view/d2l-enrollment-summary-view-tag-list.js';
import '../d2l-user-activity-usage/d2l-user-activity-usage.js';
import { EnrollmentEntity } from 'siren-sdk/src/enrollments/EnrollmentEntity.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-menu/d2l-menu-item.js';
import 'd2l-menu/d2l-menu-item-link.js';
import { EnrollmentsLocalize } from '../EnrollmentsLocalize.js';
import '@brightspace-ui/core/components/meter/meter-linear.js';
import { classes as organizationClasses } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { StateTree } from 'siren-sdk/src/helpers/StateTree.js';
import { DateTextAndStatusMixin } from '../date-text-status-mixin.js';

/**
 * @customElement
 * @polymer
 */
class EnrollmentHeroBanner extends DateTextAndStatusMixin(EnrollmentsLocalize(EntityMixin(PolymerElement))) {
	constructor() {
		super();
		this._setEntityType(EnrollmentEntity);
		this._orgModulesTree = new StateTree(this._onOrgModulesChanged.bind(this));
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
				.dehb[disabled] {
					/*
					Chrome 19+,
					Safari 6+,
					Safari 6+ iOS,
					Opera 15+
					*/
					-webkit-filter: grayscale(1);

					/* Firefox 35+ */
					filter: grayscale(1);

					opacity: 0.5;
					position: relative;
					z-index: -1;
				}
				.dehb[disabled]:hover,
				.dehb[disabled]:focus {
					cursor: not-allowed;
				}
				.dehb[disabled] d2l-enrollment-updates {
					display: none;
				}
				.dehb-container {
					padding: 0.9rem;
				}
				.dehb-image {
					border-radius: 8px;
					height: 100%;
					left: 0;
					overflow:hidden;
					position: absolute;
					top: 0;
					width: 100%;
					z-index: -2;
				}
				.dehb-info-container {
					min-height: 252px;
					position: relative;
					max-width: 474px;
				}
				.dehb-info-transparent {
					background: white;
					border-radius: 8px;
					min-height: 252px;
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
				.dehb-status-indicator {
					align-self: flex-start
				}
				.dehb-tag-container {
					margin: 0.4rem 0;
				}
				.dehb-progress-container {
					margin-bottom: 1rem;
					margin-top: 0.35rem;
				}
				.dehb-progress {
					width: 55%;
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
					word-wrap: break-word;
					width: 100%;
				}
				.dehb-title {
					align-items: flex-end;
					display: flex;
					min-height: 2.26em; /* not a typo meant em */
				}
				.dehb-context-menu {
					position: absolute;
					z-index: 3;
					right: 0.6rem;
					top: 0.6rem;
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
				@keyframes loadingPulse {
					0% { background-color: var(--d2l-color-sylvite); }
					50% { background-color: var(--d2l-color-regolith); }
					100% { background-color: var(--d2l-color-sylvite); }
				}
				.dehb-image-pulse {
					animation: loadingPulse 1.8s linear infinite;
					background-color: var(--d2l-color-sylvite);
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
					animation: loadingPulse 1.8s linear infinite;
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
				}
				.dehb-title-placeholder {
					height: 1.1rem;
					margin: 0.45rem 0;
					width: 60%;
				}
				.dehb-update-placeholder {
					animation: loadingPulse 1.8s linear infinite;
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
					height: 18px;
					margin-right: 1.7rem;
					margin-top: 0.6rem;
					width: 18px;
				}
				.dehb-alert-colour-circle {
					height: .75rem;
					width: .75rem;
					border-radius: 50%;
					border: 1px solid #f6f7f8;
					background-color: var(--d2l-color-celestine);
					position: absolute;

					position: absolute;
					z-index: 4;
					top: -0.375rem;
					right: -0.375rem;
				}

			</style>
			<div class="d2l-visible-on-ancestor-target dehb" disabled$="[[disabled]]">
				<a class="d2l-focusable" href$="[[_organizationHomepageUrl]]" on-focus="_onFocus" on-blur="_onBlur">
					<span class="dehb-link-text">[[_accessibilityDataToString(_accessibilityData)]]</span>
				</a>
				<div class="dehb-container">
					<div class="dehb-image">
						<div class="dehb-image-pulse"></div>
						<d2l-organization-image type="wide" href="[[_organizationUrl]]" token=[[token]]></d2l-organization-image>
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
							<d2l-status-indicator class="dehb-status-indicator" state="[[_badgeState]]" text="[[localize(_badgeText)]]" hidden$="[[!_badgeText]]"></d2l-status-indicator>
							<div class="dehb-title"><h2>[[_organizationName]]</h2></div>
							<div class="dehb-context-menu">
								<template is="dom-if" if="[[_shouldShowDropDown(_canAccessCourseInfo, _canChangeCourseImage)]]">
									<d2l-dropdown-more text="[[_courseSettingsLabel]]" visible-on-ancestor>
										<d2l-dropdown-menu>
											<d2l-menu label="[[_courseSettingsLabel]]">
												<d2l-menu-item-link hidden$="[[!_canAccessCourseInfo]]" text="[[localize('courseOfferingInformation')]]" href="[[_courseInfoUrl]]">
												</d2l-menu-item-link>
												<d2l-menu-item on-d2l-menu-item-select="_launchCourseImageSelector" hidden$="[[!_canChangeCourseImage]]" text="[[localize('changeImage')]]">
												</d2l-menu-item>
												<d2l-menu-item on-d2l-menu-item-select="_pinClickHandler" hidden$="[[_shouldHidePinOption(_pinned)]]" text="[[localize('pin')]]">
												</d2l-menu-item>
												<d2l-menu-item on-d2l-menu-item-select="_pinClickHandler" hidden$="[[_shouldHideUnpinOption(_pinned)]]" text="[[localize('unpin')]]">
												</d2l-menu-item>
										</d2l-dropdown-menu>
									</d2l-dropdown-more>

									<d2l-button-icon hidden$="[[_shouldHideUnpinOption(_pinned)]]" text="[[_pinButtonLabel]]" icon="d2l-tier1:pin-filled" on-tap="_pinClickHandler" on-keypress="_pinPressHandler">
									</d2l-button-icon>
								</template>
							</div>
							<div class="dehb-alert-colour-circle" hidden$="[[!_newEnrollment]]"></div>

							<d2l-organization-info href="[[_organizationUrl]]" token="[[token]]"
								show-organization-code
								show-semester-name>
							</d2l-organization-info>

							<d2l-user-activity-usage class="enrollment-content-block" href="[[_userActivityUsageUrl]]" override-to-default$="[[_orgDateSlot]]" token="[[token]]">
								<d2l-organization-date slot="default" href="[[_organizationUrl]]" token="[[token]]"
									hide-course-start-date="[[hideCourseStartDate]]"
									hide-course-end-date="[[hideCourseEndDate]]">
								</d2l-organization-date>
							</d2l-user-activity-usage>

							<div class="dehb-tag-container dehb-tag-placeholder-container">
								<div class="dehb-tag-placeholder"></div>
								<div class="dehb-tag-placeholder"></div>
							</div>
							<div class="dehb-progress-container">
								<d2l-meter-linear class="dehb-progress" value="[[_enrollmentCompletion.value]]" max="[[_enrollmentCompletion.max]]" text="[[_progressLabel]]" text-inline></d2l-meter-linear>
							</div>
							<div class="dehb-updates-container">
								<d2l-enrollment-updates
									href="[[_organizationUrl]]"
									token=[[token]]
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
				value: false,
				reflectToAttribute: true,
				readOnly: true,
				observer: '_handleDisabledChange'
			},
			hideCourseStartDate: {
				type: Boolean,
				value: false
			},
			hideCourseEndDate: {
				type: Boolean,
				value: false
			},
			hidePinning: {
				type: Boolean,
				value: false
			},
			_isLearningPath: Boolean,
			_organization: Object,
			_organizationName: String,
			_organizationHomepageUrl: String,
			_organizationUrl: String,
			_notificationsUrl: String,
			_courseInfoUrl: String,
			_canAccessCourseInfo: Boolean,
			_canChangeCourseImage: Boolean,
			_courseSettingsLabel: String,
			_pinButtonLabel: String,
			_progressLabel: String,
			_pinAction: String,
			_pinned: {
				type: Boolean,
				value: false,
				observer: '_handlePinnedChange'
			},
			_enrollment: {
				type: Object,
				value: function() { return {}; }
			},
			_tags: {
				type: Array,
				value: () => ['Due April 25, 2018', '1 hour remaining']
			},
			_orgModulesTree: Object,
			_enrollmentCompletion: {
				type: Object,
				value: function() {
					return {
						value: 0,
						max: 0
					};
				}
			},
			_newEnrollment: {
				type: Boolean,
				value: false,
				observer: '_handleNewChange'
			},
			_userActivityUsageUrl: String,
			_orgDateSlot: {
				type: Boolean,
				value: false
			},
			_beforeStartDate: Boolean,
			_badgeText: {
				type: String,
				value: null,
				observer: '_handleBadgeTextChange'
			},
			_badgeState: {
				type: String,
				value: null,
			},
			overdue: {
				type: Boolean,
				reflectToAttribute: true,
				value: false,
				readOnly: true
			},
			completed: {
				type: Boolean,
				reflectToAttribute: true,
				readOnly: true,
			},
			closed: {
				type: Boolean,
				reflectToAttribute: true,
				value: false,
				readOnly: true,
			},
			inactive: {
				type: Boolean,
				reflectToAttribute: true,
				value: false,
				readOnly: true
			},
			_accessibilityData: {
				type: Object,
				value: function() { return {}; }
			}
		};
	}

	static get observers() {
		return [
			'_onEnrollmentChange(_entity)',
			'_startedInactive(_beforeStartDate, closed, inactive)'
		];
	}

	static get is() { return 'd2l-enrollment-hero-banner'; }

	_onEnrollmentChange(enrollment) {
		this._resetState();
		if (!enrollment) {
			return;
		}

		this._orgModulesTree.removeAllChildren();
		this._enrollment = enrollment._entity;
		this._pinned = enrollment.pinned();
		this._organizationUrl = enrollment.organizationHref();
		this._pinAction = enrollment.pinAction();
		this._userActivityUsageUrl = enrollment.userActivityUsageUrl();
		enrollment.onOrganizationChange(this._onOrganizationChange.bind(this));
		enrollment.onUserActivityUsageChange(this._onUserActivityUsageChange.bind(this));
	}

	_onOrganizationChange(organization) {

		this._isLearningPath = organization.hasClass(organizationClasses.learningPath);
		this._orgModulesTree.removeAllChildren();
		this._updateOrganizationModules(organization, this._orgModulesTree);
		this._organization = organization._entity;

		this._courseInfoUrl = organization.courseInfoUrl();
		this._canAccessCourseInfo = !!this._courseInfoUrl;
		this._organizationName = organization.name();
		this._courseSettingsLabel = this._organizationName && this.localize('courseSettings', 'course', this._organizationName);
		this._pinButtonLabel = this._organizationName && this.localize('coursePinButton', 'course', this._organizationName);
		this._progressLabel = this._isLearningPath
			? this.localize('activityProgress')
			: this.localize('moduleProgress');
		this._canChangeCourseImage = organization._entity && organization.canChangeCourseImage();

		this._organizationHomepageUrl = organization.organizationHomepageUrl();
		if (!this._organizationHomepageUrl) {
			// If the user doesn't have access, don't animate image/show menu/underline on hover
			this._organizationHomepageUrl = null;
			this._setDisabled(true);
		}

		const processedDate = organization.processedDate(this.hideCourseStartDate, this.hideCourseEndDate);
		const dateText = processedDate && this.localize(
			processedDate.type,
			'date', this.formatDate(processedDate.date, {format: 'MMMM d, yyyy'}),
			'time', this.formatTime(processedDate.date)
		);
		this._setOrganizationAccessibleData(organization.name(), organization.code(), dateText);
		this._setOrganizationDate(processedDate, organization.isActive());

		organization.onSemesterChange(function(semester) {
			this._setSemesterAccessibleData(semester.name());
		}.bind(this));
	}

	_onUserActivityUsageChange(userActivityUsage) {
		const dateTextAndStatus = this.dateTextAndStatus(userActivityUsage.isCompletionDate(), userActivityUsage.date());
		this._setEnrollmentStatus(dateTextAndStatus && dateTextAndStatus.status);
		this._setUserActivityUsageAccessible(dateTextAndStatus && dateTextAndStatus.dateText);
		if (!userActivityUsage.isAttended()) {
			this._newEnrollment = true;
		}
	}

	_setOrganizationAccessibleData(name, code, dateText) {
		if (name) {
			this._accessibilityData.organizationName = name;
		}
		if (code) {
			this._accessibilityData.organizationCode = code;
		}
		if (dateText) {
			this._accessibilityData.organizationDate = dateText;
		}
		this._accessibilityDataReset();
	}

	_setSemesterAccessibleData(semesterName) {
		if (semesterName) {
			this._accessibilityData.semesterName = semesterName;
		}
		this._accessibilityDataReset();
	}

	_updateOrganizationModules(organization, modulesTree) {
		if (organization.hasClass(organizationClasses.learningPath)) {
			this._updateLearningPathModules(organization, modulesTree);
		} else {
			this._updateCourseOfferingModules('0', organization, modulesTree);
		}
	}

	_updateLearningPathModules(organization, modulesTree) {
		organization.onSequenceChange(rootSequence => {
			modulesTree.removeAllChildren();

			rootSequence.onSubSequencesChange(subSequence => {
				const subSequenceNode = modulesTree.setChild(subSequence.index());

				subSequence.onSequencedActivityChange(sequencedActivity => {
					const sequencedActivityNode = subSequenceNode.setChild(sequencedActivity.index(), {
						type: 'sequenced-activity',
						sequencedActivity
					});
					sequencedActivity.onOrganizationChange(organizationEntity => {
						sequencedActivityNode.removeAllChildren();

						const orgKey = `${subSequence.index()}-${sequencedActivity.index()}`;
						this._updateCourseOfferingModules(orgKey, organizationEntity, sequencedActivityNode);
					});
				});
			});
		});
	}

	_updateCourseOfferingModules(orgKey, organization, modulesTree) {
		organization.onSequenceChange(orgSequenceRoot => {
			modulesTree.removeAllChildren();

			orgSequenceRoot.onSubSequencesChange(orgModule => {
				modulesTree.setChild(orgModule.index(), {
					type: 'orgModule',
					orgKey,
					orgModule
				});
			});
		});
	}

	_onOrgModulesChanged(modulesTree) {
		const moduleItems = modulesTree.items();
		this._updateOrganizationCompletion(moduleItems);
	}

	_updateOrganizationCompletion(moduleItems) {
		const completions = {};
		let total = 0;
		moduleItems.forEach(item => {
			if (item.type === 'sequenced-activity') {
				total += 1;
			} else {
				const curCompletion = item.orgModule && item.orgModule.completion() || {};
				const prevCompletion = completions[item.orgKey] || {};
				completions[item.orgKey] = {
					completed: (prevCompletion.completed || 0) + (curCompletion.completed || 0),
					total: (prevCompletion.total || 0) + (curCompletion.total || 0)
				};
			}
		});
		const completionsList = Object.values(completions);

		let completion;
		if (this._isLearningPath) {
			const completedActivities = completionsList
				.map(activityCompletion => activityCompletion.completed === activityCompletion.total)
				.filter(isComplete => isComplete)
				.length;
			completion = { completed: completedActivities, total };
		} else {
			completion = completionsList[0] || {};
		}

		this._enrollmentCompletion = {
			value: completion.completed || 0,
			max: completion.total || 0
		};
	}

	_onFocus() {
		this._setActive(true);
	}

	_onBlur() {
		this._setActive(false);
	}

	_launchCourseImageSelector() {
		this.fire('open-change-image-view', {
			organization: this._organization
		});
	}

	_accessibilityDataToString(accessibility) {
		if (!accessibility || !accessibility.organizationName) {
			return this.localize('closed');
		}
		const textData = [
			accessibility.new,
			accessibility.disabled,
			accessibility.badge,
			accessibility.organizationName,
			accessibility.organizationCode,
			accessibility.semesterName,
			accessibility.userActivityUsageInfo ? accessibility.userActivityUsageInfo : accessibility.organizationDate
		];

		return textData.filter(function(text) {
			return text && typeof text === 'string';
		}).join(', ');
	}

	//Refreshes template references to _accessibilityData.
	_accessibilityDataReset() {
		var accessiblity = this._accessibilityData;
		this._accessibilityData = {};
		this._accessibilityData = accessiblity;
	}

	_pinClickHandler() {
		this.fire(this._pinned ? 'enrollment-pinned' : 'enrollment-unpinned', {
			enrollment: this._enrollment,
			organization: this._organization
		});

		var localizeKey = this._pinned ? 'unpinActionResult' : 'pinActionResult';
		this.fire('iron-announce', {
			text: this.localize(localizeKey, 'course', this._organizationName)
		}, { bubbles: true });

		if (!this._pinAction) {
			return;
		}

		return this._performAction(this._pinAction, enrollment => {
			this.fire('d2l-course-pinned-change', {
				enrollment: enrollment,
				isPinned: enrollment.pinned()
			});
		});
	}

	_pinPressHandler(e) {
		if (e.code === 'Space' || e.code === 'Enter') {
			this._pinClickHandler();
		}
	}

	_handlePinnedChange(pinned) {
		if (pinned) {
			this.setAttribute('pinned', '');
		} else {
			this.removeAttribute('pinned');
		}
	}

	_handleDisabledChange(disabled) {
		if (disabled) {
			this._accessibilityData.disabled = this.localize('disabled');
		} else {
			if (this._accessibilityData) {
				this._accessibilityData.disabled = null;
			}
		}

		this._accessibilityDataReset();
	}

	_handleNewChange(newValue) {
		if (!newValue) {
			return;
		}

		this._accessibilityData.new = this.localize('new');
		this._accessibilityDataReset();
	}

	_handleBadgeTextChange(badgeText) {
		if (!badgeText) {
			return;
		}

		this._accessibilityData.badge = this.localize(badgeText);
		this._accessibilityDataReset();
	}

	_setOrganizationDate(date, isActive) {
		this._setInactive(!isActive);
		const afterEndDate = date && date.afterEndDate;
		this._setClosed(afterEndDate);
		this._beforeStartDate = date && date.beforeStartDate;

		if (this._beforeStartDate || (afterEndDate && !this.completed)) {
			this._orgDateSlot = true;
		}
		this._setBadgeText();
	}

	_setEnrollmentStatus(status) {
		switch (status) {
			case 'completed':
				this._setCompleted(true);
				break;
			case 'overdue':
				this._setOverdue(true);
				break;
			default:
				this._setCompleted(false);
				this._setOverdue(false);
				break;
		}

		this._setBadgeText();
	}

	_setUserActivityUsageAccessible(dateText) {
		this._accessibilityData.userActivityUsageInfo = dateText;
		this._accessibilityDataReset();
	}

	_setBadgeText() {
		var priorityOrder = [
			[this.completed, 'completed', 'success'],
			[this._beforeStartDate && !this.inactive, null, null],
			[this.inactive, 'inactive', 'default'],
			[this.closed && !this.inactive, 'closed', 'default'],
			[this.overdue, 'overdue', 'alert']
		];
		for (var i = 0; i < priorityOrder.length; i++) {
			if (priorityOrder[i][0]) {
				this._badgeText = priorityOrder[i][1];
				this._badgeState = priorityOrder[i][2];
				return;
			}
		}

		this._badgeText = null;
		this._badgeState = null;
	}

	_startedInactive(beforeStartDate, closed, inactive) {
		if (!beforeStartDate && !closed && inactive) {
			this.setAttribute('started-inactive', '');
			this.fire('started-inactive');
		} else {
			this.removeAttribute('started-inactive');
		}
	}

	_resetState() {
		this._beforeStartDate = null;
		this._setDisabled(false);
		this._setCompleted(false);
		this._setClosed(false);
		this._setOverdue(false);
		this._setInactive(false);
		this._newEnrollment = false;
		this._setBadgeText();
	}

	_shouldHidePinOption(pinned) {
		return this.hidePinning || pinned;
	}

	_shouldHideUnpinOption(pinned) {
		return this.hidePinning || !pinned;
	}

	_shouldShowDropDown(canAccessCourseInfo, canChangeCourseImage) {
		return !this.hidePinning || canAccessCourseInfo || canChangeCourseImage;
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
