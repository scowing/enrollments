import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

describe('d2l-enrollment-hero-banner', () => {

	var component,
		sandbox,
		enrollmentEntity,
		organizationEntity,
		onOrganizationChangeStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('d2l-enrollment-hero-banner-fixture');
		onOrganizationChangeStub = sinon.stub();

		enrollmentEntity = {
			organizationHref: function() { return 'organizationHref'; },
			onOrganizationChange: onOrganizationChangeStub
		};

		organizationEntity = {
			name: function() { return 'name'; }
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
			expect(component._name).to.equal('name');
			done();
		});
	});
});
