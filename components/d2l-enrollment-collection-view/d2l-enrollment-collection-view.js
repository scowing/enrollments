import { css, html, LitElement } from 'lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { heading1Styles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory.js';
import { EnrollmentCollectionEntity } from 'siren-sdk/src/enrollments/EnrollmentCollectionEntity.js';
import { classes as organizationClasses } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import '../d2l-enrollment-summary-view/d2l-enrollment-summary-view-tag-slot-list';
import '../d2l-user-activity-usage/d2l-user-activity-usage.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';

class AdminList extends EntityMixinLit(LitElement) {
	constructor() {
		super();
		this._items = [];
		this._setEntityType(EnrollmentCollectionEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEnrollmentUsageCollectionChanged(entity);
			super._entity = entity;
			this._lastEnrollmentCollection = entity;
			this._canLoadMore = this._lastEnrollmentCollection.hasMoreEnrollments();
		}
	}

	_onEnrollmentUsageCollectionChanged(enrollmentCollection, error) {
		if (error || enrollmentCollection === null) {
			return;
		}

		const items = [];
		enrollmentCollection.onEnrollmentsChange((enrollment, index) => {
			items[index] = {};
			enrollment.onOrganizationChange((organization) => {
				items[index].org = organization;
				items[index].href = enrollment.organizationHref();
				items[index].activityUsageUrl = enrollment.userActivityUsageUrl();
			});

			enrollment.onUserActivityUsageChange((activityUsage) => {
				items[index].hasDueDate = (activityUsage.date() !== null);
			});
		});

		enrollmentCollection.subEntitiesLoaded().then(() => {
			this._items = this._items.concat(items);
		});
	}

	_handleLoadMore() {
		const nextEnrollmentHref = this._lastEnrollmentCollection.getNextEnrollmentHref();
		if (nextEnrollmentHref !== null) {
			dispose(this._lastEnrollmentCollection);
			if (typeof this._entityType === 'function') {
				this._lastEnrollmentCollection = entityFactory(this._entityType, nextEnrollmentHref, this.token, entity => {
					this._lastEnrollmentCollection = entity;
					this._onEnrollmentUsageCollectionChanged(this._lastEnrollmentCollection);
					this._canLoadMore = this._lastEnrollmentCollection.hasMoreEnrollments();
				});
			}
		}
	}

	static get properties() {
		return {
			'title-text': {
				type: String
			},
			_items: {
				type: Array
			},
			_lastEnrollmentCollection: {
				type: {}
			},
			_canLoadMore: {
				type: Boolean
			}
		};
	}

	static get styles() {
		return [
			heading1Styles,
			bodyStandardStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}

				.d2l-enrollment-collection-view-header-container {
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
				}
				.d2l-enrollment-collection-view-header-label {
					height:48px;
					margin:0px;
					padding:0px;
					padding-bottom:22px;
				}
				.d2l-enrollment-collection-view-body-container {
					background-color: --var(--d2l-color-regolith);
				}
				.d2l-enrollment-collection-view-search {
					width:270px;
					margin:12px 12px 12px 0px;
				}
				.d2l-enrollment-collection-view-body {
					box-sizing: border-box;
					max-width: 1230px;
					width: 100%;
					padding-top: 26px;
				}
				.d2l-enrollment-collection-view-load-more {
					margin:12px 12px 12px 0px;
				}
			`
		];
	}

	render() {
		const items = repeat(this._items, (item) => item.org.self(), item => {
			var enrollmentType = item.org.hasClass(organizationClasses.learningPath) ? 'Learning Path' : 'Course';
			return html`
				<d2l-list-item href=${item.org.organizationHomepageUrl()}>
					<d2l-organization-image href="${item.href}" slot="illustration"></d2l-organization-image>
					<d2l-list-item-content>
						${item.org.name()}
						<d2l-enrollment-summary-view-tag-slot-list>
							<span slot="first">${enrollmentType}</span>
							${item.hasDueDate ? html`<d2l-user-activity-usage slot="middle" href="${item.activityUsageUrl}"></d2l-user-activity-usage>` : null }
						</d2l-enrollment-summary-view-tag-slot-list>
					</d2l-list-item-content>
				</d2l-list-item>
			`;
		});
		return html`
			<div class="d2l-enrollment-collection-view-header-container">
				<h1 class="d2l-heading-1 d2l-enrollment-collection-view-header-label">${this['title-text']}</h1>
			</div>
			<div class="d2l-enrollment-collection-view-body-container">
				<div class="d2l-enrollment-collection-view-body-navigation-container">
					<d2l-input-search class="d2l-enrollment-collection-view-search" placeholder="Search..."></d2l-input-search>
				<div class="d2l-enrollment-collection-view-body">
					<d2l-list>${items}</d2l-list>
				</div>
				<d2l-button class="d2l-enrollment-collection-view-load-more" @click=${this._handleLoadMore} ?hidden="${!this._canLoadMore}">Load More</d2l-button>
			</div>
		`;
	}
}
customElements.define('d2l-enrollment-collection-view', AdminList);
