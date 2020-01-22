import { css, html, LitElement } from 'lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { ifDefined } from 'lit-html/directives/if-defined';
import { heading1Styles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { getLocalizeResources } from './localization.js';
import { entityFactory } from 'siren-sdk/src/es6/EntityFactory.js';
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
import '@brightspace-ui/core/components/loading-spinner/loading-spinner.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';

class EnrollmentCollectionView extends LocalizeMixin(EntityMixinLit(LitElement)) {
	constructor() {
		super();
		this._items = [];
		this._loadMoreHref = null;

		// Search
		this._searchText = '';
		this._searchItems = [];
		this._searchLoadMoreHref = null;

		// Loading / Search State
		this._showSearchItems = false;
		this._hasFirstLoad = false;
		this._isLoadingMore = false;
		this._isSearching = false;

		// Image Chunking
		this._loadedImages = [];
		this._organizationImageChunk = {};

		this._setEntityType(EnrollmentCollectionEntity);
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
		this._loadMoreHref = enrollmentCollection.getNextEnrollmentHref();
		this._searchAction = enrollmentCollection.getActionByName('search-my-enrollments');
		this._loadEnrollmentItems(enrollmentCollection).then(items => {
			this._items = items;
			this._hasFirstLoad = true;
		});
	}

	static get properties() {
		return {
			_items: {
				type: Array
			},
			_isLoadingMore: {
				type: Boolean
			},
			_isSearching: {
				type: Boolean
			},
			_hasFirstLoad: {
				type: Boolean
			},
			_searchText: {
				type: String
			},
			_searchItems: {
				type: Array
			},
			_showSearchItems: {
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

				.d2l-enrollment-collection-view-container{
					display: flex;
					justify-content: center;
				}

				.d2l-enrollment-collection-view-content {
					box-sizing: border-box;
					padding: 0 30px;
					max-width: 1230px;
					width: 100%;
					padding-left: 2.439%;
					padding-right: 2.439%;
				}

				.d2l-enrollment-collection-view-header-container {
					border-bottom: solid 1px var(--d2l-color-gypsum);
				}
				.d2l-enrollment-collection-view-header {
					align-items: center;
					display: flex;
				}

				.d2l-enrollment-collection-view-search-container {
					display: flex;
					justify-content: space-between;
					margin: 24px 0;
				}
				.d2l-enrollment-collection-view-search {
					width: 270px;
				}

				.d2l-enrollment-collection-view-load-container {
					display: flex;
					justify-content: space-between;
					margin:12px 0 32px 0;
				}

				.d2l-enrollment-collection-no-enrollments {
					background-color: var(--d2l-color-regolith);
					border: solid 1px var(--d2l-color-gypsum);
					border-radius: 8px;
					padding: 2.1rem 2rem;
				}

				.d2l-enrollment-collection-view-list-container {
					position: relative;
				}
				.d2l-enrollment-collection-view-list-overlay {
					display: none;
					justify-content: center;
					position: absolute;
					height: 100%;
					width: 100%;
					z-index: 1;
				}
				.d2l-enrollment-collection-view-list-container[searching] > .d2l-enrollment-collection-view-list {
					filter: grayscale(100%);
					opacity: 0.6;
				}
				.d2l-enrollment-collection-view-list-container[searching] > .d2l-enrollment-collection-view-list-overlay {
					display: flex;
				}

				.d2l-enrollment-collection-view-list-item-illustration {
					display: grid;
					grid-template-columns: 100%;
					grid-template-rows: 100%;
					grid-template-areas: only-one;
					position: relative;
				}
				.d2l-enrollment-collection-view-image-skeleton,
				.d2l-enrollment-collection-view-organization-image {
					grid-column: 1;
					grid-row: 1;
				}

				@keyframes loadingPulse {
					0% { fill: var(--d2l-color-sylvite); }
					50% { fill: var(--d2l-color-regolith); }
					75% { fill: var(--d2l-color-sylvite); }
					100% { fill: var(--d2l-color-sylvite); }
				}
				.d2l-enrollment-collection-view-skeleton-rect {
					animation: loadingPulse 1.8s linear infinite;
				}

				.d2l-enrollment-collection-view-image-skeleton {
					width: 100%;
				}
				.d2l-enrollment-collection-view-body-compact-skeleton-svg {
					height: 0.55rem;
				}
				.d2l-enrollment-collection-view-body-small-skeleton-svg {
					height: 0.5rem;
				}
				.d2l-enrollment-collection-view-header-1-skeleton {
					height: 2.4rem;
					margin: 1.5rem 0;
					min-width: 20rem;
				}
				.d2l-enrollment-collection-view-header-1-skeleton-svg {
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
				.d2l-enrollment-collection-view-load-spinner {
					margin: auto;
				}

				@media only screen and (max-width: 420px) {
					.d2l-enrollment-collection-view-search,
					.d2l-enrollment-collection-view-load-button,
					.d2l-enrollment-collection-view-search-skeleton {
						width: 100%;
					}
				}
				@media only screen and (max-width: 615px) {
					.d2l-enrollment-collection-view-content {
						padding-left: 15px;
						padding-right: 15px;
					}
					.d2l-enrollment-collection-view-body-small-skeleton-svg {
						height: 0.4rem;
					}
					.d2l-enrollment-collection-view-header-1-skeleton {
						height: 1.8rem;
						min-width: 10rem;f
					}
				}
				@media only screen and (min-width: 1230px) {
					.d2l-enrollment-collection-view-content {
						padding-left: 30px;
						padding-right: 30px;
					}
				}
			}
			`
		];
	}

	render() {

		const isLoaded = this._hasFirstLoad;
		const header = this._renderHeader(isLoaded);
		const search = this._renderSearch(isLoaded);
		const list = this._renderList(isLoaded);
		const loadMore = this._renderLoadMore(isLoaded);

		return html`
			<div class="d2l-enrollment-collection-view-container d2l-enrollment-collection-view-header-container">
				<div class="d2l-enrollment-collection-view-content d2l-enrollment-collection-view-header">
					${header}
				</div>
			</div>
			<div class="d2l-enrollment-collection-view-container">
				<div class="d2l-enrollment-collection-view-content">

					<div class="d2l-enrollment-collection-view-search-container">
						${search}
					</div>
					<div class="d2l-enrollment-collection-view-list-container" ?searching=${this._isSearching}>
						<div class="d2l-enrollment-collection-view-list-overlay">
							<d2l-loading-spinner class="d2l-enrollment-collection-view-search-spinner" size="100"></d2l-loading-spinner>
						</div>
						${list}
					</div>
					<div class="d2l-enrollment-collection-view-load-container">
						${loadMore}
					</div>
				</div>
			</div>
		`;
	}

	_renderHeader(isLoaded) {
		if (!isLoaded) {
			return html`
				<div class="d2l-enrollment-collection-view-header-1-skeleton">
					<svg width="100%" class="d2l-enrollment-collection-view-header-1-skeleton-svg">
						<rect x="0" width="70%" y="0" height="100%" stroke="none" rx="4" class="d2l-enrollment-collection-view-skeleton-rect"></rect>
					</svg>
				</div>
			`;
		}
		return html`
			<h1 class="d2l-heading-1">${this.localize('myLearning')}</h1>
		`;
	}

	_renderSearch(isLoaded) {
		if (!isLoaded) {
			return html`
				<div class="d2l-enrollment-collection-view-search-skeleton">
						<svg width="100%" class="d2l-enrollment-collection-view-search-skeleton-svg">
							<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-enrollment-collection-view-skeleton-rect"></rect>
						</svg>
					</div>
				</div>
			`;
		}
		return html`
			<d2l-input-search
				class="d2l-enrollment-collection-view-search"
				placeholder=${this.localize('searchPlaceholder')}
				value=${this._searchText}
				@d2l-input-search-searched=${this._performSearch}
			></d2l-input-search>
		`;
	}

	_renderList(isLoaded) {
		if (!isLoaded) {
			return this._renderItemListSkeleton(3);
		}
		let items;
		let emptyMessage;
		if (this._showSearchItems) {
			items = this._searchItems;
			emptyMessage = this.localize('noSearchResults');
		} else {
			items = this._items;
			emptyMessage = this.localize('noLearning');
		}
		return this._renderItemList(items, emptyMessage);
	}

	_renderItemList(items, emptyMessage) {
		if (items.length <= 0) {
			return html`<div class="d2l-enrollment-collection-no-enrollments">${emptyMessage}</div>`;
		}
		const listItems = repeat(items, (item) => item.org.self(), item =>
			html`
				<d2l-list-item href="${ifDefined(this._isSearching ? undefined : item.org.organizationHomepageUrl())}">
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
							<span slot="first">${this._enrollmentType(item)}</span>
${
	item.hasDueDate ? html`
		<d2l-user-activity-usage slot="middle" href=${ifDefined(item.activityUsageUrl)} .token=${this.token}>
			<d2l-organization-date slot="default" href=${item.href} .token=${this.token} hide-course-start-date
			></d2l-organization-date>
		</d2l-user-activity-usage>
	` : null
}
						</d2l-enrollment-summary-view-tag-slot-list>
					</d2l-list-item-content>
				</d2l-list-item>
			`
		);
		return html`<d2l-list class="d2l-enrollment-collection-view-list">${listItems}</d2l-list>`;
	}

	_renderItemListSkeleton(numberOfItems) {
		const itemsSkeleton = html`
			<d2l-list-item>
				${this._renderCourseImageSkeleton()}
				<d2l-list-item-content>
					<svg width="100%" class="d2l-enrollment-collection-view-body-compact-skeleton-svg">
						<rect x="0" width="40%" y="0" height="100%" stroke="none" rx="4" class="d2l-enrollment-collection-view-skeleton-rect"></rect>
					</svg>
					<div slot="secondary">
						<svg width="100%" class="d2l-enrollment-collection-view-body-small-skeleton-svg">
							<rect x="0" width="30%" y="0" height="100%" stroke="none" rx="4" class="d2l-enrollment-collection-view-skeleton-rect"></rect>
						</svg>
					</div>
				</d2l-list-item-content>
			</d2l-list-item>
		`;
		return html`<d2l-list>${(new Array(numberOfItems)).fill(itemsSkeleton)}</d2l-list>`;
	}

	_renderCourseImageSkeleton() {
		return html`
			<svg viewBox="0 0 180 77" slot="illustration" class="d2l-enrollment-collection-view-image-skeleton">
				<rect x="0" width="100%" y="0" height="100%" stroke="none" class="d2l-enrollment-collection-view-skeleton-rect"></rect>
			</svg>
		`;
	}

	_renderLoadMore(isLoaded) {
		if (!isLoaded) {
			return html`
				<div class="d2l-enrollment-collection-view-search-skeleton">
						<svg width="100%" class="d2l-enrollment-collection-view-search-skeleton-svg">
							<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-enrollment-collection-view-skeleton-rect"></rect>
						</svg>
					</div>
				</div>
			`;
		}
		if (this._isLoadingMore) {
			return html`
				<d2l-loading-spinner class="d2l-enrollment-collection-view-load-spinner"size="85"></d2l-loading-spinner>
			`;
		}
		if (this._currentLoadMoreHref(this._showSearchItems)) {
			return html`
				<d2l-button class="d2l-enrollment-collection-view-load-button" @click=${() => this._performLoadMore(this._showSearchItems)}>
					${this.localize('loadMore')}
				</d2l-button>
			`;
		}
		return null;
	}

	_currentLoadMoreHref(isSearching) {
		return isSearching ? this._searchLoadMoreHref : this._loadMoreHref;
	}

	_performLoadMore(isSearching) {
		const loadMoreHref = this._currentLoadMoreHref(isSearching);
		if (loadMoreHref !== null) {
			// This is terrible, don't do this. It is a temporary hack just in case the enrollments HM API can't be fixed in time to allow multiple orgUnitTypeIds
			// You shouldn't be modifying HM entity links client side.
			const nextHref = loadMoreHref + '&orgUnitTypeId=3&orgUnitTypeId=7';
			this._isLoadingMore = true;
			entityFactory(this._entityType, nextHref, this.token, enrollmentCollection => {

				const newLoadMoreHref = enrollmentCollection.getNextEnrollmentHref();
				this._loadEnrollmentItems(enrollmentCollection).then(newItems => {
					this._updateItems(isSearching, newItems, newLoadMoreHref);
					this._isLoadingMore = false;
				});
			});
		}
	}

	_enrollmentType(enrollment) {
		if (!enrollment || !enrollment.org) {
			return null;
		}
		const isLearningPath = enrollment.org.hasClass(organizationClasses.learningPath);
		return this.localize(isLearningPath ? 'learningPathEnrollmentType' : 'courseEnrollmentType');
	}

	async _performSearch(e) {

		const searchText = e && e.target && e.target.value;
		if (!searchText) {
			this._searchItems = [];
			this._searchText = '';
			this._showSearchItems = false;
			return;
		}
		const fields = [
			{ name: 'search', value: searchText },
			// This is terrible, don't do this. It is a temporary hack just in case the enrollments HM API can't be fixed in time to allow multiple orgUnitTypeIds
			{ name: 'orgUnitTypeId', value: 3 },
			{ name: 'orgUnitTypeId', value: 7 }
		];
		this._searchText = searchText;
		this._isSearching = true;

		const entity = await performSirenAction(this.token, this._searchAction, fields, true);
		const enrollmentCollection = new EnrollmentCollectionEntity(entity, this.token);
		this._loadEnrollmentItems(enrollmentCollection).then(items => {
			this._searchItems = items;
			this._searchLoadMoreHref = enrollmentCollection.getNextEnrollmentHref();
			this._showSearchItems = true;
			this._isSearching = false;

			this._announceSearchCompleted(items.length, enrollmentCollection.hasMoreEnrollments());
		});
	}

	_announceSearchCompleted(itemCount, hasMore) {
		let message;
		if (itemCount === 0) {
			message = this.localize('noSearchResults');
		} else if (hasMore) {
			message = this.localize('searchCompletedPaged', 'count', itemCount);
		} else {
			message = this.localize('searchCompletedOne', 'count', itemCount);
		}
		announce(message);
	}

	async _loadEnrollmentItems(enrollmentCollection) {

		const items = [];
		const imageChunk = this._loadedImages.length;
		this._loadedImages[imageChunk] = { loaded: 0, total: null };

		let totalInLoadingChunk = 0;
		enrollmentCollection.onEnrollmentsChange((enrollment, index) => {
			items[index] = {};

			const organizationHref = enrollment.organizationHref();
			enrollment.onOrganizationChange((organization) => {

				if (typeof this._organizationImageChunk[organizationHref] === 'undefined') {
					this._organizationImageChunk[organizationHref] = imageChunk;
					totalInLoadingChunk++;
				}
				items[index].imageChunk = imageChunk;
				items[index].org = organization;
				items[index].href = organizationHref;
				items[index].activityUsageUrl = enrollment.userActivityUsageUrl();
				items[index].hasDueDate = items[index].hasDueDate || organization.endDate() !== null;
			});

			enrollment.onUserActivityUsageChange((activityUsage) => {
				// activityUsage.date() is undefined for incomplete courses, so using == here
				items[index].hasDueDate = items[index].hasDueDate || activityUsage.date() != null;
			});
		});
		await enrollmentCollection.subEntitiesLoaded();
		this._loadedImages[imageChunk].total = totalInLoadingChunk;
		if (totalInLoadingChunk === 0) {
			this._loadedImages[imageChunk].allLoaded = true;
		}
		return items;
	}

	_updateItems(isSearching, newItems, nextHref) {
		let firstNewItem;
		if (isSearching) {
			firstNewItem = this._searchItems.length + 1;
			this._searchItems = [...this._searchItems, ...newItems];
			this._searchLoadMoreHref = nextHref;
		} else {
			firstNewItem = this._items.length + 1;
			this._items = [...this._items, ...newItems];
			this._loadMoreHref = nextHref;
		}
		this.updateComplete.then(() => {
			this.shadowRoot.querySelector(`.d2l-enrollment-collection-view-list > d2l-list-item:nth-of-type(${firstNewItem})`).focus();
		});
	}

	_onListImageLoaded(imageChunk) {
		this._loadedImages[imageChunk].loaded++;
		if (!this._loadedImages[imageChunk].allLoaded && this._loadedImages[imageChunk].total && this._loadedImages[imageChunk].loaded >= this._loadedImages[imageChunk].total) {
			this._loadedImages[imageChunk].allLoaded = true;
			this.requestUpdate('_loadedImages', []);
		}
	}
}
customElements.define('d2l-enrollment-collection-view', EnrollmentCollectionView);
