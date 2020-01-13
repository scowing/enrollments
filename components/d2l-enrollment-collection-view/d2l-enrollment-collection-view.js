import { css, html, LitElement } from 'lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { heading1Styles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { getLocalizeResources } from './localization.js';
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
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';

class AdminList extends LocalizeMixin(EntityMixinLit(LitElement)) {
	constructor() {
		super();
		this._items = [];
		this._setEntityType(EnrollmentCollectionEntity);
		this._showLoadMoreSpinner = false;
		this._showSearchSpinner = false;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
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
			if (enrollmentCollection.replaceItems === true) {
				this._items = items;
			} else {
				this._items = this._items.concat(items);
			}

			this._showLoadMoreSpinner = false;
			this._showSearchSpinner = false;
			this._loaded = true;
		});
	}

	_handleLoadMore() {
		const nextEnrollmentHref = this._lastEnrollmentCollection.getNextEnrollmentHref();
		if (nextEnrollmentHref !== null) {
			this._showLoadMoreSpinner = true;
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

	_handleSearch(e) {
		const searchHref = this._buildSearchURL(this.href, e.target.value);
		this._showSearchSpinner = true;

		dispose(this._lastEnrollmentCollection);
		if (typeof this._entityType === 'function') {
			this._lastEnrollmentCollection = entityFactory(this._entityType, searchHref, this.token, entity => {
				this._lastEnrollmentCollection = entity;
				this._lastEnrollmentCollection.replaceItems = true;
				this._onEnrollmentUsageCollectionChanged(this._lastEnrollmentCollection);
				this._canLoadMore = this._lastEnrollmentCollection.hasMoreEnrollments();

			});
		}
	}

	_buildSearchURL(href, searchQuery) {
		if (href.indexOf('?') > -1) {
			href = href + '&';
		} else {
			href = href + '?';
		}
		return href + 'search=' + encodeURIComponent(searchQuery);
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
			},
			_showLoadMoreSpinner: {
				type: Boolean
			},
			_showSearchSpinner: {
				type: Boolean
			},
			_loaded: {
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
					display: flex;
					justify-content: center;
					position: relative;
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
					width: 100%;
				}
				.d2l-enrollment-collection-view-header{
					box-sizing: border-box;
					max-width: 1230px;
					padding-left: 2.439%;
					padding-right: 2.439%;
					width: 100%;
				}
				.d2l-enrollment-collection-view-header-label {
					margin: 24px 0;
				}
				.d2l-enrollment-collection-view-body-container {
					background-color: --var(--d2l-color-regolith);
					padding-left: 78px;
					padding-bottom: 72px;
				}
				.d2l-enrollment-collection-view-body-navigation-container {
					align-items: baseline;
					display: flex;
					justify-content: space-between;
					padding-bottom: 10px;
				}
				.d2l-enrollment-collection-view-search {
					width:270px;
					margin:12px 12px 12px 0px;
				}
				.d2l-enrollment-collection-view-search-spinner {
					margin:12px 12px 12px 0px;
				}
				.d2l-enrollment-collection-view-body {
					box-sizing: border-box;
					max-width: 1230px;
					width: 100%;
				}
				.d2l-enrollment-collection-view-load-container {
					display: flex;
					justify-content: space-between;
					width:50%;
				}
				.d2l-enrollment-collection-view-load-button {
					margin:12px 16px 32px 0px;
				}
				.d2l-enrollment-collection-no-enrollments {
					background-color: var(--d2l-color-regolith);
					border: solid 1px var(--d2l-color-gypsum);
					border-radius: 8px;
					padding: 2.1rem 2rem;
				}
				@media (max-width: 615px) {
					.d2l-enrollment-collection-view-header {
						padding-left: 15px;
						padding-right: 15px;
					}
				}
				@media (min-width: 1230px) {
					.d2l-enrollment-collection-view-header {
						padding-left: 30px;
						padding-right: 30px;
					}
				}
			`
		];
	}

	render() {
		const items = this._loaded ? this._renderItemList() : null;
		return html`
			<div class="d2l-enrollment-collection-view-header-container">
				<div class="d2l-enrollment-collection-view-header">
					<h1 class="d2l-heading-1 d2l-enrollment-collection-view-header-label">${this.localize('myLearning')}</h1>
				</div>
			</div>
			<div class="d2l-enrollment-collection-view-body-container">
				<div class="d2l-enrollment-collection-view-body-navigation-container">
					<d2l-input-search class="d2l-enrollment-collection-view-search" placeholder="Search..." @d2l-input-search-searched=${this._handleSearch}></d2l-input-search>
					<d2l-loading-spinner class="d2l-enrollment-collection-view-search-spinner" size="42" ?hidden="${!this._showSearchSpinner}"></d2l-loading-spinner>
				</div>

				<div class="d2l-enrollment-collection-view-body">
					${items}

					<div class="d2l-enrollment-collection-view-load-container">
						<d2l-button class="d2l-enrollment-collection-view-load-button" @click=${this._handleLoadMore} ?hidden="${!this._canLoadMore}">Load More</d2l-button>
						<d2l-loading-spinner size="85" ?hidden="${!this._showLoadMoreSpinner}"></d2l-loading-spinner>
					</div>
				</div>
			</div>
		`;
	}

	_renderItemList() {
		if (!this._showSearchSpinner && this._items.length <= 0) {
			return html`<div class="d2l-enrollment-collection-no-enrollments">There are no courses or learning paths found for your search entry.</div>`;
		}
		const items = repeat(this._items, (item) => item.org.self(), item => {
			var enrollmentType = item.org.hasClass(organizationClasses.learningPath) ? 'Learning Path' : 'Course';
			return html`
				<d2l-list-item href=${item.org.organizationHomepageUrl()}>
					<d2l-organization-image href="${item.href}" slot="illustration"></d2l-organization-image>
					<d2l-list-item-content>
						${item.org.name()}
						<d2l-enrollment-summary-view-tag-slot-list>
							<span slot="first">${enrollmentType}</span>
							${item.hasDueDate ? html`<d2l-user-activity-usage slot="middle" href="${item.activityUsageUrl}"></d2l-user-activity-usage>` : null}
						</d2l-enrollment-summary-view-tag-slot-list>
					</d2l-list-item-content>
				</d2l-list-item>
			`;
		});
		return html`<d2l-list>${items}</d2l-list>`;
	}
}
customElements.define('d2l-enrollment-collection-view', AdminList);
