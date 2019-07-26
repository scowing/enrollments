import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

describe('d2l-enrollment-summary-view', () => {

	var sandbox,
		component,
		onOrganizationChangeStub,
		onRootSequenceChangeStub,
		onSubSequencesChangeStub,
		onSequencedActivityChangeStub,
		onCourseOfferingOrganizationChangeStub,
		onCourseOfferingSequenceChangeStub,
		onCourseOfferingSubSequencesChangeStub,
		enrollmentEntity,
		organizationEntity,
		rootSequenceEntity,
		subSequenceEntity,
		sequencedActivityEntity,
		courseOfferingOrganizationEntity,
		courseOfferingSequenceEntity,
		courseOfferingSubSequencesEntity;

	beforeEach(() => {

		component = fixture('d2l-enrollment-summary-view-fixture');

		sandbox = sinon.sandbox.create();
		onOrganizationChangeStub = sandbox.stub();
		onRootSequenceChangeStub = sandbox.stub();
		onSubSequencesChangeStub = sandbox.stub();
		onSequencedActivityChangeStub = sandbox.stub();
		onCourseOfferingOrganizationChangeStub = sandbox.stub();
		onCourseOfferingSequenceChangeStub = sandbox.stub();
		onCourseOfferingSubSequencesChangeStub = sandbox.stub();

		enrollmentEntity = {
			organizationHref: () => '/organization',
			onOrganizationChange: onOrganizationChangeStub
		};

		organizationEntity = {
			name: () => 'Org Name',
			description: () => 'Org Description',
			onSequenceChange: onRootSequenceChangeStub
		};

		rootSequenceEntity = {
			onSubSequencesChange: onSubSequencesChangeStub
		};

		subSequenceEntity = {
			onSequencedActivityChange: onSequencedActivityChangeStub,
			index: () => 0
		};

		sequencedActivityEntity = {
			onOrganizationChange: onCourseOfferingOrganizationChangeStub,
			index: () => 0
		};

		courseOfferingOrganizationEntity = {
			self: () => '/course-offering-organization',
			onSequenceChange: onCourseOfferingSequenceChangeStub
		};

		courseOfferingSequenceEntity = {
			onSubSequencesChange: onCourseOfferingSubSequencesChangeStub,
		};

		courseOfferingSubSequencesEntity = {
			index: () => 0,
			completion: () => {},
			title: () => 'Sub Sequence Title',
			sequenceViewerApplicationHref: () => '/sequence-viewer-application'
		};

		onOrganizationChangeStub.callsArgWith(0, organizationEntity);
		onRootSequenceChangeStub.callsArgWith(0, rootSequenceEntity);
		onSubSequencesChangeStub.callsArgWith(0, subSequenceEntity);
		onSequencedActivityChangeStub.callsArgWith(0, sequencedActivityEntity);
		onCourseOfferingOrganizationChangeStub.callsArgWith(0, courseOfferingOrganizationEntity);
		onCourseOfferingSequenceChangeStub.callsArgWith(0, courseOfferingSequenceEntity);
		onCourseOfferingSubSequencesChangeStub.callsArgWith(0, courseOfferingSubSequencesEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('Basic', () => {
		it('exists', () => {
			expect(component).to.exist;
		});
	});

	describe('Loading States', () => {
		it('should load title, description, completion, and continue from enrollment', done => {
			component._entity = enrollmentEntity;

			setTimeout(() => {
				expect(component._isTitleLoaded).to.be.true;
				expect(component._isDescriptionLoaded).to.be.true;
				expect(component._isCompletionContinueLoaded).to.be.true;
				done();
			}, 500);
		});

		it('should load course texts on organization text loaded event', done => {
			component._entity = enrollmentEntity;

			afterNextRender(component, () => {
				component.dispatchEvent(
					new CustomEvent('d2l-organization-detail-card-text-loaded', {
						bubbles: true,
						composed: true,
						detail: {
							href: '/course-offering-organization'
						}
					})
				);

				expect(component._isCourseTextsLoaded).to.be.true;
				done();
			});
		});

		it('should load course images on organization image loaded event', done => {
			component._entity = enrollmentEntity;

			afterNextRender(component, () => {
				component.dispatchEvent(
					new CustomEvent('d2l-organization-detail-card-image-loaded', {
						bubbles: true,
						composed: true,
						detail: {
							href: '/course-offering-organization'
						}
					})
				);

				expect(component._isCourseImagesLoaded).to.be.true;
				done();
			});
		});

		it('should have loaded header when completion, continue and title loaded', () => {
			component._isTitleLoaded = true;
			component._isCompletionContinueLoaded = true;

			expect(component._isHeaderTextChunkLoaded).to.be.true;

			expect(component._showTitle).to.be.true;
			expect(component._showCompletionContinue).to.be.true;
		});

		it('should have loaded body text when description and course texts loaded', () => {
			component._isCourseTextsLoaded = true;
			component._isDescriptionLoaded = true;

			expect(component._isBodyTextsChunkLoaded).to.be.true;

			expect(component._showDescription).to.be.true;
			expect(component._showCourseTexts).to.be.true;
		});

		it('should have loaded body image when course images loaded', () => {
			component._isCourseImagesLoaded = true;

			expect(component._isBodyImagesChunkLoaded).to.be.true;
		});

		it('should show title if loaded after reveal timeout', done => {
			component._isTitleLoaded = true;

			setTimeout(() => {
				expect(component._showTitle).to.be.true;
				expect(component._isHeaderTextChunkLoaded).to.be.false;
				done();
			}, component._revealTimeoutMs + 500);
		});

		it('should show completion and continue if loaded after reveal timeout', done => {
			component._isCompletionContinueLoaded = true;

			setTimeout(() => {
				expect(component._showCompletionContinue).to.be.true;
				expect(component._isHeaderTextChunkLoaded).to.be.false;
				done();
			}, component._revealTimeoutMs + 500);
		});

		it('should show description if loaded after reveal timeout', done => {
			component._isDescriptionLoaded = true;

			setTimeout(() => {
				expect(component._showDescription).to.be.true;
				expect(component._isBodyTextsChunkLoaded).to.be.false;
				done();
			}, component._revealTimeoutMs + 500);
		});

		it('should show course texts if loaded after reveal timeout', done => {
			component._isCourseTextsLoaded = true;

			setTimeout(() => {
				expect(component._showCourseTexts).to.be.true;
				expect(component._isBodyTextsChunkLoaded).to.be.false;
				done();
			}, component._revealTimeoutMs + 500);
		});

	});

});
