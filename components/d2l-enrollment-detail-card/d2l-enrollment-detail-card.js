import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class D2lEnrollmentDetailCard extends PolymerElement {
	static get template() {
		return html`
			<style>
				:host {
					background-color: #ffffff;
					box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.03);
					border-radius: 8px;
					box-sizing: border-box;
					display: inline-block;
					height: 190px;
					position: relative;
					width: 746px;
					z-index: 0;
				}
				.d2l-enrollment-detail-card-base-container {
					border-radius: 6px;
					display: flex;
					flex-direction: row;
					height: 100%;
					overflow: hidden;
					position: relative;
				}
				.d2l-enrollment-detail-card-description-placeholder-container {
					margin: 0.1rem 0;
				}
				.d2l-enrollment-detail-card-description-placeholder {
					display: block;
					height: 0.6rem;
					margin: 0.45rem 0;
					width: 95%;
				}
				@keyframes loadingShimmer {
					0% { transform: translate3d(-100%, 0, 0); }
					100% { transform: translate3d(100%, 0, 0); }
				}
				.d2l-enrollment-detail-card-image {
					flex-shrink: 0;
					height: 190px;
					width: 220px;
				}
				.d2l-enrollment-detail-card-image-shimmer {
					background-color: var(--d2l-color-regolith);
					overflow: hidden;
					position: relative;
					height: 100%;
					width: 100%;
				}
				.d2l-enrollment-detail-card-image-shimmer::after {
					animation: loadingShimmer 1.5s ease-in-out infinite;
					background: linear-gradient(90deg, rgba(249, 250, 251, 0.1), rgba(114, 119, 122, 0.1), rgba(249, 250, 251, 0.1));
					background-color: var(--d2l-color-regolith);
					content: '';
					height: 100%;
					left: 0;
					position: absolute;
					top: 0;
					width: 100%;
				}
				.d2l-enrollment-detail-card-base-info {
					display: flex;
					flex-grow: 1;
					flex-direction: column;
					padding: 1.2rem 1rem;
					width: 100%;
				}
				.d2l-enrollment-detail-card-tag-placeholder-container {
					display: flex;
					flex-direction: row;
					margin: 0.7rem 0px;
				}
				.d2l-enrollment-detail-card-tag-placeholder {
					display: block;
					height: 0.6rem;
					margin-right: 0.5rem;
					width: 5rem;
				}
				.d2l-enrollment-detail-card-text-placeholder {
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
				}
				.d2l-enrollment-detail-card-title-placeholder {
					display: block;
					height: 0.85rem;
					margin: 0.075rem 0;
					width: 75%;
				}
			</style>
			<div>
				<div class="d2l-enrollment-detail-card-base-container">
					<div class="d2l-enrollment-detail-card-image">
						<div class="d2l-enrollment-detail-card-image-shimmer"></div>
					</div>
					<div class="d2l-enrollment-detail-card-base-info">
						<div>
							<div class="d2l-enrollment-detail-card-text-placeholder d2l-enrollment-detail-card-title-placeholder"></div>
						</div>
						<div>
							<div class="d2l-enrollment-detail-card-tag-placeholder-container">
								<div class="d2l-enrollment-detail-card-text-placeholder d2l-enrollment-detail-card-tag-placeholder"></div>
								<div class="d2l-enrollment-detail-card-text-placeholder d2l-enrollment-detail-card-tag-placeholder"></div>
							</div>
						</div>
						<div>
							<div class="d2l-enrollment-detail-card-description-placeholder-container">
								<div class="d2l-enrollment-detail-card-text-placeholder d2l-enrollment-detail-card-description-placeholder"></div>
								<div class="d2l-enrollment-detail-card-text-placeholder d2l-enrollment-detail-card-description-placeholder"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	static get properties() {
		return {};
	}
}

window.customElements.define('d2l-enrollment-detail-card', D2lEnrollmentDetailCard);
