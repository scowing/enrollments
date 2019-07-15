import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

describe('d2l-enrollment-detail-card', () => {

	var component,
		sandbox,
		enrollmentEntity,
		organizationEntity,
		onOrganizationChangeStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('d2l-enrollment-detail-card-fixture');
		onOrganizationChangeStub = sinon.stub();

		enrollmentEntity = {
			organizationHref: function() { return 'organizationHref'; },
			userActivityUsageUrl: function() { return 'userActivityUsageUrl'; },
			onOrganizationChange: onOrganizationChangeStub
		};

		organizationEntity = {
			description: function() { return 'description'; },
			sequenceLink: function() { return 'sequenceLink'; },
			organizationHomepageUrl: function() { return 'organizationHomepageUrl'; }
		};

		onOrganizationChangeStub.callsArgWith(0, organizationEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should fetch the organization', done => {
		component._entity = enrollmentEntity;
		afterNextRender(component, () => {
			expect(component._organizationUrl).to.equal('organizationHref');
			expect(component._userActivityUsageUrl).to.equal('userActivityUsageUrl');
			expect(component._description).to.equal('description');
			expect(component._sequenceLink).to.equal('sequenceLink');
			expect(component._organizationHomepageUrl).to.equal('organizationHomepageUrl');
			done();
		});
	});

	describe('Check if loaded events fire.', () => {
		beforeEach(done => {
			component = fixture('d2l-enrollment-detail-card-fixture');
			afterNextRender(component, done);
		});

		it('should fire the text loaded event', (done) => {
			var eventSpy = sandbox.spy();
			component.addEventListener('d2l-enrollment-detail-card-text-loaded', eventSpy);

			component._entity = enrollmentEntity;

			setTimeout(() => {
				sinon.assert.called(eventSpy);
				done();
			});

		});

		it('should fire the image loaded event', (done) => {
			var eventSpy = sandbox.spy();
			component.addEventListener('d2l-enrollment-detail-card-image-loaded', eventSpy);

			component.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
				bubbles: true,
				composed: true
			}));
			setTimeout(() => {
				sinon.assert.called(eventSpy);
				done();
			});

		});

	});

	describe('Check if content is revealed after the reveal timeout has passed.', () => {
		beforeEach(done => {
			component = fixture('d2l-enrollment-detail-card-fixture');
			afterNextRender(component, done);
		});

		it('should reveal loaded text content', (done) => {
			component._entity = enrollmentEntity;

			setTimeout(() => {
				expect(component._forceShowText).to.equal(true);
				done();
			}, component._revealTimeoutMs);
		});

		it('should not reveal loading text content', (done) => {
			setTimeout(() => {
				expect(component._forceShowText).to.equal(false);
				done();
			}, component._revealTimeoutMs);
		});

		it('should reveal loaded image content', (done) => {
			component.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
				bubbles: true,
				composed: true
			}));

			setTimeout(() => {
				expect(component._forceShowImage).to.equal(true);
				done();
			}, component._revealTimeoutMs);
		});

		it('should not reveal loading image content', (done) => {
			setTimeout(() => {
				expect(component._forceShowImage).to.equal(false);
				done();
			}, component._revealTimeoutMs);
		});

	});
});
