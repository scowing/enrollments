import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

describe('d2l-enrollment-hero-banner', () => {

	var component,
		sandbox,
		enrollmentEntity,
		organizationEntity,
		onOrganizationChangeStub,
		pinStub,
		pinActionStub,
		organizationHasActionByNameStub,
		courseInfoUrlStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('d2l-enrollment-hero-banner-fixture');
		onOrganizationChangeStub = sinon.stub();
		pinStub = sinon.stub();
		organizationHasActionByNameStub = sinon.stub();
		courseInfoUrlStub = sinon.stub();

		enrollmentEntity = {
			organizationHref: function() { return 'organizationHref'; },
			onOrganizationChange: onOrganizationChangeStub,
			pinned: pinStub,
			pinAction: function() {
				return {
					'href': '#pinned',
					'name': 'unpin-course',
					'method': 'PUT'
				};
			}
		};

		organizationEntity = {
			_entity: {
				getLinkByRel: function() { return { href: 'organizationHref' }; }
			},
			name: function() { return 'name'; },
			courseInfoUrl: courseInfoUrlStub,
			organizationHomepageUrl: function() { return 'organizationHomepageUrl'; },
			canChangeCourseImage: organizationHasActionByNameStub,
		};

		onOrganizationChangeStub.callsArgWith(0, organizationEntity);

		pinStub.returns(true);
		organizationHasActionByNameStub.returns(true);
		courseInfoUrlStub.returns('courseInfoUrl');
		pinActionStub = sandbox.stub(component, 'performSirenAction');
		pinActionStub.withArgs(sinon.match.defined).returns(Promise.resolve(enrollmentEntity._entity));
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should fetch the organization', done => {
		component._entity = enrollmentEntity;
		afterNextRender(component, () => {
			expect(component._organizationUrl).to.equal('organizationHref');
			expect(component._organizationName).to.equal('name');
			done();
		});
	});

	describe('Setting the enrollment attribute', () => {
		beforeEach(() => {
			component._entity = enrollmentEntity;
		});

		it('should fetch the organization', () => {
			expect(component._organization).to.equal(organizationEntity._entity);
		});

		it('should set the Course Offering Information URL', () => {
			expect(component._courseInfoUrl).to.equal('courseInfoUrl');
		});

		it('should set the homepage URL', () => {
			expect(component._organizationHomepageUrl).to.equal('organizationHomepageUrl');
		});

		it('should set the pin state', () => {
			expect(component._pinned).to.equal(true);
		});

	});

	describe('Updating the organization', () => {
		beforeEach(() => {
			component._entity = enrollmentEntity;
		});

		it('should update _canAccessCourseInfo', () => {
			expect(component._canAccessCourseInfo).to.equal(true);
		});

		it('should update _canChangeCourseImage', () => {
			expect(component._canChangeCourseImage).to.equal(true);
		});

		it('should update _courseSettingsLabel', () => {
			expect(component._courseSettingsLabel).to.equal('name course settings');
		});

		it('should update _pinButtonLabel', () => {
			expect(component._pinButtonLabel).to.equal('name is pinned. Unpin course');
		});

	});

	describe('Pinning functionality', () => {
		it('should have a visible "Unpin" menu item when pinned', done => {
			component._entity = enrollmentEntity;

			afterNextRender(component, () => {
				var unpinMenuItem = component.$$('d2l-menu-item.d2l-menu-item-last');

				expect(unpinMenuItem).to.not.be.null;
				expect(unpinMenuItem.text).to.equal('Unpin');
				done();
			});
		});

		it('should have a visible "Pin" menu item when pinned', done => {
			pinStub.returns(false);
			component._entity = enrollmentEntity;

			afterNextRender(component, () => {
				var pinMenuItem = component.$$('d2l-menu-item.d2l-menu-item-last');
				expect(pinMenuItem).to.not.be.null;
				expect(pinMenuItem.text).to.equal('Pin');
				done();
			});
		});

		it('should have a visible pinned button when pinned', done => {
			component._entity = enrollmentEntity;

			afterNextRender(component, () => {
				var pinButton = component.$$('.dehb-context-menu > d2l-button-icon');
				expect(pinButton.hasAttribute('hidden')).to.be.false;
				done();
			});
		});

		it('should hide the pinned button when unpinned', done => {
			pinStub.returns(false);
			component._entity = enrollmentEntity;

			afterNextRender(component, () => {
				var pinButton = component.$$('.dehb-context-menu > d2l-button-icon');
				expect(pinButton.hasAttribute('hidden')).to.be.true;
				done();
			});
		});

		it('should set the update action parameters correctly and call the pinning API', done => {
			component._entity = enrollmentEntity;
			component._pinClickHandler();

			setTimeout(() => {
				expect(pinActionStub).to.have.been
					.calledWith(sinon.match.has('name', sinon.match('unpin-course'))
						.and(sinon.match.has('href', sinon.match('#pinned')))
						.and(sinon.match.has('method', 'PUT')));
				done();
			});
		});

		it('should aria-announce the change in pin state', done => {
			component._entity = enrollmentEntity;

			component.addEventListener('iron-announce', function(e) {
				expect(e.detail.text).to.equal('name has been unpinned');
				done();
			});

			component._pinClickHandler();
		});

		it('should hide pinning options when hidePinning=true', done => {
			component.hidePinning = true;
			component._entity = enrollmentEntity;
			afterNextRender(component, () => {
				var menuItems = component.root.querySelectorAll('d2l-menu-item:not([hidden])');
				var changeImageMenuItem = menuItems[menuItems.length - 1];
				var pinButton = component.$$('d2l-button-icon');
				expect(pinButton).to.not.be.null;
				expect(pinButton.hasAttribute('hidden')).to.be.true;
				expect(changeImageMenuItem).to.not.be.null;
				expect(changeImageMenuItem.text).to.equal('Change Image');
				done();
			});
		});

		it('should hide menu when no options are available', done => {
			component.hidePinning = true;
			organizationHasActionByNameStub.returns(false);
			courseInfoUrlStub.returns(null);

			component._entity = enrollmentEntity;
			setTimeout(() => {
				var d2lMenu = component.$$('d2l-menu');
				var pinButton = component.$$('d2l-button-icon');
				expect(pinButton).to.be.null;
				expect(d2lMenu).to.be.null;
				done();
			});
		});

	});

});
