import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

describe('d2l-enrollment-detail-card', () => {

	var component,
		fetchStub,
		sandbox,
		enrollmentEntity,
		organizationEntity;

	function SetupFetchStub(url, entity) {
		fetchStub.withArgs(sinon.match(url), sinon.match.any)
			.returns(Promise.resolve({entity: window.D2L.Hypermedia.Siren.Parse(entity)}));
	}

	function loadEnrollment(fixtureText, done) {
		component = fixture(fixtureText);
		afterNextRender(component, done);
	}

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		enrollmentEntity = {
			class: ['pinned', 'enrollment'],
			rel: ['https://api.brightspace.com/rels/user-enrollment'],
			actions: [],
			links: [{
				rel: ['https://api.brightspace.com/rels/organization'],
				href: '/organizations/1'
			}, {
				rel: ['self'],
				href: '/enrollments/1'
			}]
		};
		organizationEntity = {
			class: ['active', 'course-offering'],
			properties: {
				name: 'Course name',
				code: 'COURSE100',
				startDate: null,
				endDate: null,
				isActive: true,
				description: 'description'
			},
			links: [{
				rel: ['self'],
				href: '/organizations/1'
			}, {
				rel: ['https://api.brightspace.com/rels/organization-homepage'],
				href: 'http://example.com/1/home',
				type: 'text/html'
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/organization-notifications'],
				href: '/organizations/1/my-notifications'
			}, {
				rel: ['https://api.brightspace.com/rels/parent-semester'],
				href: '/organizations/2'
			}, {
				rel: ['https://api.brightspace.com/rels/course-offering-info-page'],
				href: 'http://example.com/1/info',
				type: 'text/html'
			}],
			entities: [{
				class: ['course-image'],
				rel: ['https://api.brightspace.com/rels/organization-image'],
				links: [{
					rel: ['self'],
					href: '/organizations/1/image'
				}, {
					rel: ['alternate'],
					href: '',
					class: ['tile']
				}],
				propeties: {
					name: '1.jpg',
					type: 'image/jpeg'
				}
			}, {
				class: ['relative-uri'],
				rel: ['item', 'https://api.brightspace.com/rels/organization-homepage'],
				properties: {
					path: 'http://example.com/1/home'
				}
			}],
			actions: [{
				href: '/d2l/api/lp/1.9/courses/6609/image',
				name: 'set-catalog-image',
				method: 'POST',
				fields: [{
					type: 'text',
					name: 'imagePath',
					value: ''
				}]
			}]
		};

		fetchStub = sandbox.stub(window.D2L.Siren.EntityStore, 'fetch');
		SetupFetchStub(/\/enrollments\/1$/, enrollmentEntity);
		SetupFetchStub(/\/organizations\/1$/, organizationEntity);
		SetupFetchStub(/\/organizations\/1\/image/, {});
		SetupFetchStub(/\/organizations\/1\/my-notifications$/, { properties: {} });
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('loads element', () => {
		component = fixture('d2l-enrollment-detail-card-fixture');
		expect(component).to.exist;
	});

	describe('Setting the enrollment attribute', () => {

		beforeEach(done => loadEnrollment('d2l-enrollment-detail-card-href-fixture', done));

		it('should set the enrollment href', () => {
			expect(component.href).to.equal('/enrollments/1');
		});

		it('should fetch the organization', () => {
			expect(component._organizationUrl).to.equal('/organizations/1');
		});

		it('should set the image entity', () => {
			expect(JSON.stringify(component._image)).to.equal(JSON.stringify(window.D2L.Hypermedia.Siren.Parse(organizationEntity).entities[0]));
		});

	});
});
