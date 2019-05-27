/**
`d2l-enrollment-card`

Polymer-based web component for a course/enrollment card.

@demo demo/d2l-enrollment-card/d2l-enrollment-card-demo.html d2l-enrollment-card
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import 'd2l-course-image/d2l-course-image.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-fetch/d2l-fetch.js';
import { Actions } from 'd2l-hypermedia-constants';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-menu/d2l-menu-item.js';
import 'd2l-menu/d2l-menu-item-link.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-organization-hm-behavior/d2l-organization-hm-behavior.js';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info.js';
import 'd2l-organizations/components/d2l-organization-updates/d2l-organization-updates.js';
import 'd2l-organizations/components/d2l-organization-date/d2l-organization-date.js';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name.js';
import 'd2l-card/d2l-card.js';
import 'd2l-card/d2l-card-content-meta.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-status-indicator/d2l-status-indicator.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import '../d2l-user-activity-usage/d2l-user-activity-usage.js';
import './d2l-enrollment-updates.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { EnrollmentEntity } from '../../EnrollmentEntity.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { DateTextAndStatusMixin } from '../date-text-status-mixin.js';

/**
 * @customElement
 * @polymer
 */
class EnrollmentCard extends mixinBehaviors([
	D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior,
	D2L.PolymerBehaviors.Siren.SirenActionBehavior,
], DateTextAndStatusMixin(EntityMixin(PolymerElement))) {
	constructor() {
		super();
		this._setEntityType(EnrollmentEntity);
	}

	static get template() {
		return html`
			<style>
				:host {
					display: block;
					position: relative;
				}

				d2l-card {
					height: 100%;
					/* Prevents long, non-breaking course names from overflowing */
					width: 100%;
				}
				d2l-card[disabled] .d2l-enrollment-card-image-container {
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
				d2l-card[disabled]:hover,
				d2l-card[disabled]:focus {
					cursor: not-allowed;
				}

				d2l-card[disabled] d2l-enrollment-updates {
					display: none;
				}

				d2l-icon {
					color: white;
					--d2l-icon-width: 18px;
					--d2l-icon-height: 18px;
				}

				.enrollment-content-block {
					display: block;
				}

				.d2l-enrollment-card-overlay {
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: center;
					position: absolute;
					top: 1px;
					height: var(--course-image-height);
					width: calc(100% - 2px);
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					color: white;
					padding: 10px;
					text-align: center;
					background-color: rgba(0,0,0,0.7);
				}
				.d2l-enrollment-card-overlay[hidden] {
					display: none;
				}

				.d2l-enrollment-card-image-container {
					height: var(--course-image-height);
					line-height:0;
				}

				.d2l-enrollment-card-icon-container {
					height: 64px;
					width: 64px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-style: none;
					border-radius: 100px;
					background-color: white;
					overflow: hidden;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					animation-name: container;
					animation-duration: 1s;
					animation-fill-mode: forwards;
				}
				@keyframes container {
					0% { height: 64px; width: 64px; }
					70% { height: 64px; width: 64px; opacity: 1; }
					90% { height: 80px; width: 80px; opacity: 0.4 }
					100% { height: 20px; width: 20px; opacity: 0; }
				}

				.d2l-enrollment-card-checkmark {
					color: var(--d2l-color-olivine);
				}
				.d2l-enrollment-card-fail-icon {
					color: #ffce51;
				}
				.d2l-enrollment-card-checkmark,
				.d2l-enrollment-card-fail-icon {
					display: flex;
					animation-name: inner;
					animation-duration: 1s;
					animation-fill-mode: forwards;
				}
				@keyframes inner {
					0% { transform: scale(1); }
					15% { transform: scale(2.30); }
					20% { transform: scale(2.0); }
					100% { transform: scale(2.0); }
				}

				.d2l-enrollment-card-alert-colour-circle {
					height: .75rem;
					width: .75rem;
					border-radius: 50%;
					border: 1px solid #f6f7f8;
					background-color: var(--d2l-color-celestine);
					position: absolute;
					top: -0.375rem;
					right: -0.375rem;
				}

				:host(:dir(rtl)) .d2l-enrollment-card-alert-colour-circle {
					right: auto;
					left: -0.375rem;
				}

				.d2l-enrollment-card-content-flex {
					overflow: hidden;
					word-wrap: break-word; /* IE/Edge */
					overflow-wrap: break-word; /* replaces 'word-wrap' in Firefox, Chrome, Safari */
					display: flex;
					flex-direction: column;
					margin: -0.35rem 0 -0.1rem -0.05rem;
				}
				.d2l-enrollment-card-content-flex[badge] {
					margin-top: -0.855rem;
				}
				.d2l-enrollment-card-status-indicator {
					background-color: #FFFFFF;
					box-shadow: 0 0 0 2px #FFFFFF;
					padding: 0.2rem 0.5rem 0.15rem 0.5rem;
					filter: grayscale(0);
					opacity: 1;
				}
			</style>

			<d2l-card disabled$="[[disabled]]" href="[[_organizationHomepageUrl]]" text="[[_accessibilityDataToString(_accessibilityData)]]">
				<div slot="header" aria-hidden="true">
					<div class="d2l-enrollment-card-image-container">
						<d2l-course-image image="[[_image]]" sizes="[[_tileSizes]]" type="tile">
						</d2l-course-image>
					</div>
					<div hidden$="[[!_imageLoading]]" class="d2l-enrollment-card-overlay">
						<d2l-loading-spinner hidden$="[[!_imageLoadingProgress]]" size="85"></d2l-loading-spinner>
						<div class="d2l-enrollment-card-icon-container" hidden$="[[_imageLoadingProgress]]">
							<d2l-icon></d2l-icon>
						</div>
					</div>
				</div>

				<d2l-status-indicator aria-hidden="true" class="d2l-enrollment-card-status-indicator" slot="badge" state="[[_badgeState]]" text="[[localize(_badgeText)]]" hidden$="[[!_badgeText]]">
				</d2l-status-indicator>

				<div badge$="[[_badgeText]]" class="d2l-enrollment-card-content-flex" slot="content" aria-hidden="true">
					<d2l-organization-name href="[[_organizationUrl]]" token="[[token]]"></d2l-organization-name>
					<d2l-card-content-meta>
						<d2l-organization-info class="enrollment-content-block" href="[[_organizationUrl]]" token="[[token]]"
							show-organization-code="[[showOrganizationCode]]"
							show-semester-name="[[showSemesterName]]"
						></d2l-organization-info>
						<d2l-user-activity-usage class="enrollment-content-block" href="[[_userActivityUsageUrl]]" override-to-default$="[[_orgDateSlot]]" token="[[token]]">
							<d2l-organization-date slot="default" href="[[_organizationUrl]]" token="[[token]]"
								hide-course-start-date="[[hideCourseStartDate]]"
								hide-course-end-date="[[hideCourseEndDate]]"
							></d2l-organization-date>
						</d2l-user-activity-usage>
					</d2l-card-content-meta>
				</div>

				<d2l-dropdown-more slot="actions" text="[[_courseSettingsLabel]]" translucent="" visible-on-ancestor="">
					<d2l-dropdown-menu>
						<d2l-menu>
							<d2l-menu-item-link hidden$="[[!_canAccessCourseInfo]]" text="[[localize('courseOfferingInformation')]]" href="[[_courseInfoUrl]]">
							</d2l-menu-item-link>
							<d2l-menu-item on-d2l-menu-item-select="_launchCourseImageSelector" hidden$="[[!_canChangeCourseImage]]" text="[[localize('changeImage')]]">
							</d2l-menu-item>
							<d2l-menu-item on-d2l-menu-item-select="_pinClickHandler" hidden$="[[_pinned]]" text="[[localize('pin')]]">
							</d2l-menu-item>
							<d2l-menu-item on-d2l-menu-item-select="_pinClickHandler" hidden$="[[!_pinned]]" text="[[localize('unpin')]]">
							</d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown-more>

				<d2l-button-icon slot="actions" translucent="" hidden$="[[!_pinned]]" text="[[_pinButtonLabel]]" icon="d2l-tier1:pin-filled" on-tap="_pinClickHandler" on-keypress="_pinPressHandler">
				</d2l-button-icon>

				<div slot="content" class="d2l-enrollment-card-alert-colour-circle" hidden$="[[!_newEnrollment]]"></div>

				<d2l-enrollment-updates slot="footer" href="[[_organizationUrl]]" token="[[token]]"
					show-dropbox-unread-feedback="[[showDropboxUnreadFeedback]]"
					show-unattempted-quizzes="[[showUnattemptedQuizzes]]"
					show-ungraded-quiz-attempts="[[showUngradedQuizAttempts]]"
					show-unread-discussion-messages="[[showUnreadDiscussionMessages]]"
					show-unread-dropbox-submissions="[[showUnreadDropboxSubmissions]]"
				></d2l-enrollment-updates>
			</d2l-card>
		`;
	}

	static get is() { return 'd2l-enrollment-card'; }

	static get properties() {
		return {
			href: {
				type: String,
				value: null
			},
			disabled: {
				type: Boolean,
				reflectToAttribute: true,
				value: false,
				readOnly: true,
				observer: '_handleDisabledChange'
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
				observer: '_handleCompletedChange'
			},
			closed: {
				type: Boolean,
				reflectToAttribute: true,
				value: false,
				readOnly: true,
				observer: '_handleClosedChange'
			},
			inactive: {
				type: Boolean,
				reflectToAttribute: true,
				value: false,
				readOnly: true
			},

			showOrganizationCode: {
				type: Boolean,
				value: false
			},
			showSemesterName: {
				type: Boolean,
				value: false
			},
			hideCourseStartDate: {
				type: Boolean,
				value: false
			},
			hideCourseEndDate: {
				type: Boolean,
				value: false
			},
			showDropboxUnreadFeedback: {
				type: Boolean,
				value: false
			},
			showUnattemptedQuizzes: {
				type: Boolean,
				value: false
			},
			showUngradedQuizAttempts: {
				type: Boolean,
				value: false
			},
			showUnreadDiscussionMessages: {
				type: Boolean,
				value: false
			},
			showUnreadDropboxSubmissions: {
				type: Boolean,
				value: false
			},

			_enrollment: {
				type: Object,
				value: function() { return {}; }
			},
			_selfHref: String,
			_pinAction: String,
			_pinned: {
				type: Boolean,
				value: false,
				observer: '_handlePinnedChange'
			},
			_tileSizes: {
				type: Object,
				value: function() {
					return {
						mobile: {
							maxwidth: 767,
							size: 100
						},
						tablet: {
							maxwidth: 1243,
							size: 67
						},
						desktop: {
							size: 25
						}
					};
				}
			},
			_canAccessCourseInfo: Boolean,
			_canChangeCourseImage: Boolean,
			_courseInfoUrl: String,
			_courseSettingsLabel: String,
			_image: Object,
			_imageLoading: {
				type: Boolean,
				value: false
			},
			_imageLoadingProgress: {
				type: Boolean,
				value: false
			},
			_load: Boolean,
			_organization: Object,
			_organizationUrl: String,
			_organizationHomepageUrl: String,
			_pinButtonLabel: String,
			_badgeText: {
				type: String,
				value: null,
				observer: '_handleBadgeTextChange'
			},
			_badgeState: String,
			_beforeStartDate: Boolean,
			_orgDateSlot: {
				type: Boolean,
				value: false
			},
			_userActivityUsageUrl: String,
			_accessibilityData: {
				type: Object,
				value: function() { return {}; }
			},
			_newEnrollment: {
				type: Boolean,
				value: false
			},
			_notifications: Array
		};
	}

	static get observers() {
		return [
			'_loadEnrollmentData(_load, _entity)',
			'_startedInactive(_beforeStartDate, closed, inactive)'
		];
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('set-course-image', this._boundOnSetCourseImage);

		afterNextRender(this, function() {
			var imageTile = this.$$('d2l-card');

			var observerCallback = function(entries, observer) {
				if (this._load) {
					// The tile already loaded via requestIdleCallback/setTimeout
					return;
				}

				for (var i = 0; i < entries.length; i++) {
					// Chrome/FF immediately call the callback when we observer.observe()
					// so we need to also make sure the tile is visible for that first run
					// see https://bugs.chromium.org/p/chromium/issues/detail?id=713819
					if (entries[i].intersectionRatio > 0) {
						observer.unobserve(imageTile);
						this.fire('initially-visible-course-tile');
						this._load = true;
						break;
					}
				}
			}.bind(this);

			// Small shim for Edge/IE/Safari
			var delayFunction = window.requestIdleCallback || setTimeout;
			delayFunction(function() {
				if (this._load) {
					// The tile already loaded via the IntersectionObserver
					return;
				}
				// Whether we load because the tile became visible, or because we got some
				// idle time, we want to disconnect the observer either way
				observer.unobserve(imageTile);
				this._load = true;
			}.bind(this));

			var observer = new IntersectionObserver(observerCallback.bind(this));
			observer.observe(imageTile);
		}.bind(this));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('set-course-image', this._boundOnSetCourseImage);
	}

	ready() {
		super.ready();

		IronA11yAnnouncer.requestAvailability();
		this._boundOnSetCourseImage = this._onSetCourseImage.bind(this);
	}

	refreshImage(organization) {
		if (this._getEntityIdentifier(organization) !== this._getEntityIdentifier(this._organization)) {
			return;
		}

		this._imageLoading = true;
		this._imageLoadingProgress = true;

		this._organizationUrl = organization.getLinkByRel('self').href;

		return this._entityStoreFetch(this._organizationUrl)
			.then(this._handleOrganizationResponse.bind(this))
			.then(this._displaySetImageResult.bind(this, true, true))
			.catch(this._displaySetImageResult.bind(this, false));
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

	_handleCompletedChange(completed) {
		if (!this._selfHref) {
			return;
		}
		this.fire('d2l-enrollment-card-status', {
			status: { completed: completed },
			enrollmentUrl: this._selfHref
		});
	}

	_handleClosedChange(closed) {
		if (!this._selfHref) {
			return;
		}
		this.fire('d2l-enrollment-card-status', {
			status: { closed: closed },
			enrollmentUrl: this._selfHref
		});
	}

	_handleBadgeTextChange(badgeText) {
		if (!badgeText) {
			return;
		}

		this._accessibilityData.badge = this.localize(badgeText);
		this._accessibilityDataReset();
	}

	_displaySetImageResult(success, skipSetImage) {
		setTimeout(function() {
			var icon = this.$$('.d2l-enrollment-card-icon-container d2l-icon');
			this.toggleClass('d2l-enrollment-card-checkmark', false, icon);
			this.toggleClass('d2l-enrollment-card-fail-icon', false, icon);
			var iconName = success ? 'd2l-tier2:check' : 'd2l-tier3:close';
			var className = success ? 'd2l-enrollment-card-checkmark' : 'd2l-enrollment-card-fail-icon';
			icon.setAttribute('icon', iconName);
			this.toggleClass(className, true, icon);

			// Hide the loading spinner, so that the success/failure icon shows
			this._imageLoadingProgress = false;

			if (success && !skipSetImage) {
				this._image = this._nextImage;
			}

			setTimeout(function() {
				// Hide the entire image-loading overlay and contents
				this._imageLoading = false;
			}.bind(this), 1000);
		}.bind(this), 1000);
	}

	_loadEnrollmentForPinning(enrollment) {
		this._entity._entity = enrollment;
		return this._loadEnrollmentData(true, this._entity);
	}

	_loadEnrollmentData(load, enrollment) {
		this._resetState();
		if (!load || !enrollment) {
			return;
		}

		this._enrollment = enrollment._entity;
		this._pinned = enrollment.pinned();
		this._organizationUrl = enrollment.organizationHref();
		this._selfHref = enrollment.self();
		this._pinAction = enrollment.pinAction();
		this._userActivityUsageUrl = enrollment.userActivityUsageUrl();

		this.fire('d2l-enrollment-card-fetched', {
			organizationUrl: this._organizationUrl,
			enrollmentUrl: this._selfHref
		});

		enrollment.onUserActivityUsageChange((userActivityUsage) => {
			const dateTextAndStatus = this.dateTextAndStatus(userActivityUsage.isCompletionDate(), userActivityUsage.date());
			this._setEnrollmentStatus(dateTextAndStatus && dateTextAndStatus.status);
			this._setUserActivityUsageAccessible(dateTextAndStatus && dateTextAndStatus.dateText);
			if (!userActivityUsage.isAttended()) {
				this._handleEnrollmentNew();
			}
		});

		enrollment.onOrganizationChange((org) => {
			this._organization = org._entity;

			afterNextRender(this, function() {
				// Telemetry event for organization loaded, meaning tile is interactive
				this.fire('course-tile-organization');
			}.bind(this));

			this._courseInfoUrl = org.courseInfoUrl();
			this._canAccessCourseInfo = !!this._courseInfoUrl;
			const orgName = org.name();
			this._courseSettingsLabel = orgName && this.localize('courseSettings', 'course', orgName);
			this._pinButtonLabel = orgName && this.localize('coursePinButton', 'course', orgName);
			this._canChangeCourseImage = org._entity && org._entity.hasActionByName(Actions.organizations.setCatalogImage);
			const processedDate = org.processedDate(this.hideCourseStartDate, this.hideCourseEndDate);
			this._setOrganizationDate(processedDate, org.isActive());

			org.onSemesterChange(function(semester) {
				const dateText = processedDate && this.localize(
					processedDate.type,
					'date', this.formatDate(processedDate.date, {format: 'MMMM d, yyyy'}),
					'time', this.formatTime(processedDate.date)
				);
				this._setOrganizationAccessibleData(org.name(), org.code(), semester.name(), dateText);
			}.bind(this));

			const imageEntity = org.imageEntity();
			if (imageEntity && imageEntity.href) {
				org.onImageChange((image) => {
					this._image = image.entity();
				});
			} else {
				this._image = imageEntity;
			}

			this._organizationHomepageUrl = org.organizationHomepageUrl();
			if (!this._organizationHomepageUrl) {
				// If the user doesn't have access, don't animate image/show menu/underline on hover
				this._organizationHomepageUrl = null;
				this._setDisabled(true);
			}

			return Promise.resolve();
		});
	}

	_setOrganizationAccessibleData(name, code, semesterName, dateText) {
		if (name) {
			this._accessibilityData.organizationName = name;
		}
		if (code) {
			this._accessibilityData.organizationCode = code;
		}
		if (dateText) {
			this._accessibilityData.organizationDate = dateText;
		}
		if (semesterName) {
			this._accessibilityData.semesterName = semesterName;
		}
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

	_handleEnrollmentNew() {
		this._newEnrollment = true;
		this._accessibilityData.new = this.localize('new');
		this._accessibilityDataReset();
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

	_getEntityIdentifier(entity) {
		// An entity's self href should be unique, so use it as an identifier
		var selfLink = entity.getLinkByRel('self');
		return selfLink.href;
	}

	_launchCourseImageSelector() {
		this.fire('open-change-image-view', {
			organization: this._organization
		});
	}

	_onSetCourseImage(e) {
		if (this._getEntityIdentifier(e.detail.organization) !== this._getEntityIdentifier(this._organization)) {
			return;
		}

		this._imageLoading = true;

		var status = e.detail.status;

		switch (status) {
			case 'set':
				this._imageLoadingProgress = true;
				// load the image while the loading spinner runs to that we have it when the spinner ends
				this._nextImage = e.detail.image;
				var imagePreloader = document.createElement('img');

				var newImageHref = this.getDefaultImageLink(e.detail.image);
				if (newImageHref) {
					imagePreloader.setAttribute('src', newImageHref);
				}

				var newSrcSet = this.getImageSrcset(e.detail.image, 'tile');
				if (newSrcSet) {
					imagePreloader.setAttribute('srcset', newSrcSet);
				}

				imagePreloader.setAttribute('sizes', this.$$('d2l-course-image').getTileSizes());
				break;
			case 'success':
				this._displaySetImageResult(true);
				break;
			case 'failure':
			default:
				this._displaySetImageResult(false);
				break;
		}
	}

	_badgeTextChange(badgeText) {
		this._accessibilityData.badge = badgeText;
		this._accessibilityDataReset();
	}

	_pinClickHandler() {
		this.fire(this._pinned ? 'enrollment-pinned' : 'enrollment-unpinned', {
			enrollment: this._enrollment,
			organization: this._organization
		});

		var localizeKey = this._pinned ? 'unpinActionResult' : 'pinActionResult';
		this.fire('iron-announce', {
			text: this.localize(localizeKey, 'course', this._organization.properties.name)
		}, { bubbles: true });

		return this.performSirenAction(this._pinAction).then(this._loadEnrollmentForPinning.bind(this)).then(function() {
			// Wait until after PUT has finished to fire, so that
			// listeners are guaranteed to fetch updated entity
			this.fire('d2l-course-pinned-change', {
				enrollment: this._enrollment,
				isPinned: this._pinned
			});
		}.bind(this));
	}

	_pinPressHandler(e) {
		if (e.code === 'Space' || e.code === 'Enter') {
			this._pinClickHandler();
		}
	}

	_accessibilityDataToString(accessibility) {
		if (!accessibility || !accessibility.organizationName) {
			return this.localize('closed');
		}
		var textData = [
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

	_accessibilityDataReset() {
		var accessiblity = this._accessibilityData;
		this._accessibilityData = {};
		this._accessibilityData = accessiblity;
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
		this._beforeStartDate = undefined;
		this._setDisabled(false);
		this._setCompleted(false);
		this._setClosed(false);
		this._setOverdue(false);
		this._setInactive(false);
		this._newEnrollment = false;
		this._userActivityUsageUrl = false;
		this._orgDateSlot = false;
		this._setBadgeText();
	}
}

window.customElements.define(EnrollmentCard.is, EnrollmentCard);
