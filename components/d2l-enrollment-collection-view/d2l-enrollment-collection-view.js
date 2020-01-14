import { css, html, LitElement } from 'lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { until } from 'lit-html/directives/until.js';
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
		this._loadedImages = [];
		this._hasFirstLoad = false;
		this._mainPageLoad = new Promise(() => {});
		this._setEntityType(EnrollmentCollectionEntity);


		this._showLoadMoreSpinner = false;
		this._showSearchSpinner = false;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEnrollmentCollectionChanged(entity);
			super._entity = entity;
		}
	}

	_onEnrollmentCollectionChanged(enrollmentCollection, error) {
		if (error || enrollmentCollection === null) {
			return;
		}
		this._hasLoadMore = enrollmentCollection.hasMoreEnrollments();
		this._loadMoreHref = enrollmentCollection.getNextEnrollmentHref();
		this._mainPageLoad = this._loadEnrollmentItems(enrollmentCollection).then(items => {
			this._items = items;
			this._hasFirstLoad = true;
		});
	}

	async _loadEnrollmentItems(enrollmentCollection) {

		const items = [];
		const imageChunk = this._loadedImages.length;
		this._loadedImages[imageChunk] = { loaded: 0, total: null };

		let totalInLoadingChunk = 0;
		enrollmentCollection.onEnrollmentsChange((enrollment, index) => {
			items[index] = {};
			enrollment.onOrganizationChange((organization) => {
				items[index].org = organization;
				items[index].href = enrollment.organizationHref();
				items[index].activityUsageUrl = enrollment.userActivityUsageUrl();
				items[index].imageChunk = imageChunk;
				totalInLoadingChunk++;
			});

			enrollment.onUserActivityUsageChange((activityUsage) => {
				items[index].hasDueDate = (activityUsage.date() !== null);
			});
		});
		await enrollmentCollection.subEntitiesLoaded();
		this._loadedImages[imageChunk].total = totalInLoadingChunk;
		return items;
	}


	_handleLoadMore() {
		const nextEnrollmentHref = this._loadMoreHref + '&orgUnitTypeId=3';
		if (nextEnrollmentHref !== null) {
			this._isLoadingMore = true;
			entityFactory(this._entityType, nextEnrollmentHref, this.token, enrollmentCollection => {

				this._hasLoadMore = enrollmentCollection.hasMoreEnrollments();
				this._loadMoreHref = enrollmentCollection.getNextEnrollmentHref();
				this._loadEnrollmentItems(enrollmentCollection).then(newItems => {
					this._items = [ ...this._items, ...newItems ];
					this._isLoadingMore = false;
				});
			});
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
			_items: {
				type: Array
			},
			_hasLoadMore: {
				type: Boolean
			},
			_isLoadingMore: {
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
			},
			_mainPageLoad: {
				type: Object
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

				.d2l-enrollment-collection-view-container{
					display: flex;
					justify-content: center;
				}

				.d2l-enrollment-collection-view-content {
					box-sizing: border-box;
					padding: 0 30px;
					max-width: 1230px;
					width: 100%;
				}

				.d2l-enrollment-collection-view-header-container {
					position: relative;
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
					width: 100%;
				}
				.d2l-enrollment-collection-view-header{
					align-items: center;
					display: flex;
					padding-left: 2.439%;
					padding-right: 2.439%;
				}

				.d2l-enrollment-collection-view-body-container {
					background-color: --var(--d2l-color-regolith);
				}
				.d2l-enrollment-collection-view-body-navigation-container {
					display: flex;
					justify-content: space-between;
					margin: 24px 0;
				}
				.d2l-enrollment-collection-view-search {
					width: 270px;
				}
				.d2l-enrollment-collection-view-search-spinner {
					margin:12px 12px 12px 0px;
				}
				.d2l-enrollment-collection-view-body {
					box-sizing: border-box;
					max-width: 1230px;
					width: 100%;
					padding-left: 2.439%;
					padding-right: 2.439%;
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



				.d2l-enrollment-collection-view-list-item-illustration {
					display: grid;
					grid-template-columns: 100%;
					grid-template-rows: 100%;
					grid-template-areas: only-one;
					position: relative;
				}

				.d2l-activity-collection-image-skeleton,
				.d2l-enrollment-collection-view-organization-image {
					grid-column: 1;
					grid-row: 1;
				}

				@media (max-width: 615px) {
					.d2l-enrollment-collection-view-content,
					.d2l-enrollment-collection-view-header {
						padding-left: 15px;
						padding-right: 15px;
					}
				}
				@media (min-width: 1230px) {
					.d2l-enrollment-collection-view-content,
					.d2l-enrollment-collection-view-header {
						padding-left: 30px;
						padding-right: 30px;
					}
				}



				@keyframes loadingPulse {
					0% { fill: var(--d2l-color-sylvite); }
					50% { fill: var(--d2l-color-regolith); }
					75% { fill: var(--d2l-color-sylvite); }
					100% { fill: var(--d2l-color-sylvite); }
				}
				.d2l-activity-collection-skeleton-rect {
					animation: loadingPulse 1.8s linear infinite;
				}

				.d2l-activity-collection-body-compact-skeleton-svg {
					height: 0.55rem;
				}
				.d2l-activity-collection-body-compact-skeleton-svg {
					height: 0.55rem;
				}
				.d2l-activity-collection-body-small-skeleton-svg {
					height: 0.5rem;
				}
				.d2l-activity-collection-header-1-skeleton-svg {
					max-height: 0.95rem;
				}
				.d2l-activity-collection-header-1-skeleton {
					height: 2.4rem;
					margin: 1.5rem 0;
					min-width: 20rem;
				}
				.d2l-activity-collection-header-1-skeleton-svg {
					max-height: 100%;
				}
				.d2l-enrollment-collection-view-search-skeleton {
					height: 42px;
					display: flex;
					align-items: center;
					width: 270px;
				}
				.d2l-enrollment-collection-view-search-skeleton-svg {
					max-height: 100%;
				}

			`
		];
	}

	render() {

		const header = this._handleFirstLoad(() => {
			return html`
					<h1 class="d2l-heading-1">${this.localize('myLearning')}</h1>
			`;
		}, () => {
			return html`
				<div class="d2l-activity-collection-header-1-skeleton">
					<svg width="100%" class="d2l-activity-collection-header-1-skeleton-svg">
						<rect x="0" width="70%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
					</svg>
				</div>
			`;
		});

		const search = this._handleFirstLoad(() => {
			return html`<d2l-input-search class="d2l-enrollment-collection-view-search" placeholder="Search..." @d2l-input-search-searched=${this._handleSearch}></d2l-input-search>`
		}, () => {
			return html`
				<div class="d2l-enrollment-collection-view-search-skeleton">
						<svg width="100%" class="d2l-enrollment-collection-view-search-skeleton-svg">
							<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
						</svg>
					</div>
				</div>
			`;
		});

		const items = this._handleFirstLoad(
			() => this._renderItemList(),
			() => html`${this._renderItemListSkeleton(3)}`,
			this._hasFirstLoad
		);

		return html`
			<div class="d2l-enrollment-collection-view-container d2l-enrollment-collection-view-header-container">
				<div class="d2l-enrollment-collection-view-content d2l-enrollment-collection-view-header">
					${header}
				</div>
			</div>
			<div class="d2l-enrollment-collection-view-container d2l-enrollment-collection-view-body-container">
				<div class="d2l-enrollment-collection-view-content d2l-enrollment-collection-view-body">

					<div class="d2l-enrollment-collection-view-body-navigation-container">
						${search}
						<d2l-loading-spinner class="d2l-enrollment-collection-view-search-spinner" size="42" ?hidden="${!this._showSearchSpinner}"></d2l-loading-spinner>
					</div>

					${items}
					<div class="d2l-enrollment-collection-view-load-container">
						${
							this._hasLoadMore && !this._isLoadingMore
							? html`<d2l-button class="d2l-enrollment-collection-view-load-button" @click=${this._handleLoadMore}>Load More</d2l-button>`
							: this._isLoadingMore
							? html`<d2l-loading-spinner size="85"></d2l-loading-spinner>`
							: null
						}
					</div>
				</div>
			</div>
		`;
	}

	_handleFirstLoad(whenLoaded, whileLoading = () => null, firstLoad = null, promiseToWatch = null) {
		firstLoad = firstLoad === null ? this._loaded : firstLoad;
		promiseToWatch = promiseToWatch === null ? this._mainPageLoad : promiseToWatch;
		return firstLoad ? whenLoaded() : until(promiseToWatch.then(whenLoaded), whileLoading());
	}

	_renderItemList() {
		if (this._items.length <= 0) {
			return html`<div class="d2l-enrollment-collection-no-enrollments">There are no courses or learning paths found for your search entry.</div>`;
		}
		const items = repeat(this._items, (item) => item.org.self(), item => {
			var enrollmentType = item.org.hasClass(organizationClasses.learningPath) ? 'Learning Path' : 'Course';
			return html`
				<d2l-list-item href=${item.org.organizationHomepageUrl()}>
					<div slot="illustration" class="d2l-enrollment-collection-view-list-item-illustration">
						${this._renderCourseImageSkeleton()}
						<d2l-organization-image
							class="d2l-enrollment-collection-view-organization-image"
							href="${item.href}"
							@d2l-organization-image-loaded="${() => this._onListImageLoaded(item.imageChunk)}"
							?hidden="${!this._loadedImages[item.imageChunk].allLoaded}">
						</d2l-organization-image>
					</div>
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

	_onListImageLoaded(imageChunk) {
		console.log(imageChunk);
		this._loadedImages[imageChunk].loaded++;
		if (!this._loadedImages[imageChunk].allLoaded && this._loadedImages[imageChunk].total && this._loadedImages[imageChunk].loaded >= this._loadedImages[imageChunk].total) {
			this._loadedImages[imageChunk].allLoaded = true;
			this.requestUpdate('_loadedImages', []);
		}
	}

	_renderCourseImageSkeleton() {
		return html`
			<svg viewBox="0 0 180 77" width="100%" slot="illustration" class="d2l-activity-collection-image-skeleton">
				<rect x="0" width="100%" y="0" height="100%" stroke="none" class="d2l-activity-collection-skeleton-rect"></rect>
			</svg>
		`;
	}

	_renderItemListSkeleton(numberOfItems) {
		const itemsSkeleton = html`
			<d2l-list-item>
				${this._renderCourseImageSkeleton()}
				<d2l-list-item-content>
					<svg width="100%" class="d2l-activity-collection-body-compact-skeleton-svg">
						<rect x="0" width="40%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
					</svg>
					<div slot="secondary">
						<svg width="100%" class="d2l-activity-collection-body-small-skeleton-svg">
							<rect x="0" width="30%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
						</svg>
					</div>
				</d2l-list-item-content>
			</d2l-list-item>
		`;
		return html`<d2l-list>${(new Array(numberOfItems)).fill(itemsSkeleton)}</d2l-list>`;
	}
}
customElements.define('d2l-enrollment-collection-view', AdminList);
