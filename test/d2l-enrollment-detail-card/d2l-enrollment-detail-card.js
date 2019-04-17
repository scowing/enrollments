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
			organizationHref: function() { return 'organizationHref' },
			userActivityUsageUrl: function() { return 'userActivityUsageUrl' },
			onOrganizationChange: onOrganizationChangeStub
		};

		organizationEntity = {
			description: function() { return 'description' },
			sequenceLink: function() { return 'sequenceLink' },
			organizationHomepageUrl: function() { return 'organizationHomepageUrl' },
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
});
