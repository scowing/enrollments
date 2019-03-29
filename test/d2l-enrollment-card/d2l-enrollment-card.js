describe('d2l-enrollment-card', () => {

	var component,
		fetchStub,
		pinActionStub,
		sandbox,
		enrollmentEntity,
		organizationEntity,
		semesterOrganizationEntity;

	function SetupFetchStub(url, entity) {
		fetchStub.withArgs(sinon.match(url), sinon.match.string)
			.returns(Promise.resolve({entity: entity}));
	}

	function loadEnrollment(done) {
		var spy = sandbox.spy(component, '_handleOrganizationResponse');

		component.entity = enrollmentEntity;

		setTimeout(() => {
			expect(spy).to.have.been.calledOnce;
			done();
		});
	}

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		enrollmentEntity = window.D2L.Hypermedia.Siren.Parse({
			class: ['pinned', 'enrollment'],
			rel: ['https://api.brightspace.com/rels/user-enrollment'],
			actions: [{
				name: 'unpin-course',
				method: 'PUT',
				href: '/enrollments/users/169/organizations/1',
				fields: [{
					name: 'pinned',
					type: 'hidden',
					value: false
				}]
			}],
			links: [{
				rel: ['https://api.brightspace.com/rels/organization'],
				href: '/organizations/1'
			}, {
				rel: ['self'],
				href: '/enrollments/users/169/organizations/1'
			}]
		});
		organizationEntity = window.D2L.Hypermedia.Siren.Parse({
			class: ['active', 'course-offering'],
			properties: {
				name: 'Course name',
				code: 'COURSE100',
				startDate: null,
				endDate: null,
				isActive: true
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
				propeties: {
					name: '1.jpg',
					type: 'image/jpeg'
				},
				rel: ['https://api.brightspace.com/rels/organization-image'],
				links: [{
					rel: ['self'],
					href: '/organizations/1/image'
				}, {
					rel: ['alternate'],
					href: '',
					class: ['tile']
				}]
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
		});
		semesterOrganizationEntity = window.D2L.Hypermedia.Siren.Parse({
			class: ['active', 'semester'],
			properties: {
				name: 'Test Semester',
				code: 'SEM169'
			},
			links: [{
				rel: ['https://api.brightspace.com/rels/organization-homepage'],
				href: 'http://example.com/2/home',
				type: 'text/html'
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/organization-notifications'],
				href: '/organizations/2/my-notifications'
			}, {
				rel: ['self'],
				href: '/organizations/2'
			}],
			entities: [{
				class: ['course-image'],
				propeties: {
					name: '2.jpg',
					type: 'image/jpeg'
				},
				rel: ['https://api.brightspace.com/rels/organization-image'],
				links: [{
					rel: ['self'],
					href: '/organizations/2/image'
				}, {
					rel: ['alternate'],
					href: '',
					class: ['tile']
				}]
			}, {
				class: ['relative-uri'],
				rel: ['item', 'https://api.brightspace.com/rels/organization-homepage'],
				properties: {
					path: 'http://example.com/2/home'
				}
			}]
		});

		fetchStub = sandbox.stub(window.D2L.Siren.EntityStore, 'fetch');
		SetupFetchStub(/\/organizations\/1$/, organizationEntity);
		SetupFetchStub(/\/organizations\/2$/, semesterOrganizationEntity);
		SetupFetchStub(/\/organizations\/1\/image/, {});

		component = fixture('d2l-enrollment-card-fixture');
		component._load = true;
		component.token = 'fake';
		pinActionStub = sandbox.stub(component, 'performSirenAction');
		pinActionStub.withArgs(sinon.match.defined).returns(Promise.resolve(enrollmentEntity));
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('loads element', () => {
		expect(component).to.exist;
	});

	describe('Public API', () => {

		it('should implement all properties', () => {
			expect(component.href).to.equal(null);
		});

		it('should implement refreshImage', () => {
			expect(component.refreshImage).to.be.a('function');
		});

	});

	describe('Setting the enrollment attribute', () => {

		beforeEach(done => loadEnrollment(done));

		it('should fetch the organization', () => {
			expect(component._organization).to.equal(organizationEntity);
		});

		it('should set the Course Offering Information URL', () => {
			expect(component._courseInfoUrl).to.equal('http://example.com/1/info');
		});

		it('should set the notifications URL', () => {
			expect(component._notificationsUrl).to.equal('/organizations/1/my-notifications');
		});

		it('should set the image entity', () => {
			expect(component._image).to.equal(organizationEntity.entities[0]);
		});

		it('should set the homepage URL', () => {
			expect(component._organizationHomepageUrl).to.equal('http://example.com/1/home');
		});

		it('should set the pin state', () => {
			expect(component._pinned).to.equal(true);
		});

	});

	describe('Updating the organization', () => {

		it('should update _canAccessCourseInfo', () => {
			var spy = sandbox.spy(component, '_computeCanAccessCourseInfo');

			component._organization = organizationEntity;

			expect(spy).to.have.been.called;
			expect(component._canAccessCourseInfo).to.equal(true);
		});

		it('should update _canChangeCourseImage', () => {
			var spy = sandbox.spy(component, '_computeCanChangeCourseImage');

			component._organization = organizationEntity;

			expect(spy).to.have.been.called;
			expect(component._canChangeCourseImage).to.equal(true);
		});

		it('should update _courseSettingsLabel', () => {
			var spy = sandbox.spy(component, '_computeCourseSettingsLabel');

			component._organization = organizationEntity;

			expect(spy).to.have.been.called;
			expect(component._courseSettingsLabel).to.equal('Course name course settings');
		});

		it('should update _pinButtonLabel', () => {
			var spy = sandbox.spy(component, '_computePinButtonLabel');

			component._organization = organizationEntity;

			expect(spy).to.have.been.called;
			expect(component._pinButtonLabel).to.equal('Course name is pinned. Unpin course');
		});

	});

	describe('Pinning functionality', () => {

		beforeEach(done => loadEnrollment(done));

		it('should have a visible "Unpin" menu item when pinned', () => {
			component._pinned = true;

			var unpinMenuItem = component.$$('d2l-menu-item.d2l-menu-item-last');

			expect(unpinMenuItem).to.not.be.null;
			expect(unpinMenuItem.text).to.equal('Unpin');
		});

		it('should have a visible "Pin" menu item when pinned', () => {
			component._pinned = false;

			var pinMenuItem = component.$$('d2l-menu-item.d2l-menu-item-last');
			expect(pinMenuItem).to.not.be.null;
			expect(pinMenuItem.text).to.equal('Pin');
		});

		it('should have a visible pinned button when pinned', () => {
			component._pinned = true;

			var pinButton = component.$$('d2l-button-icon');
			expect(pinButton.hasAttribute('hidden')).to.be.false;
		});

		it('should hide the pinned button when unpinned', () => {
			component._pinned = false;

			var pinButton = component.$$('d2l-button-icon');
			expect(pinButton.hasAttribute('hidden')).to.be.true;
		});

		it('should set the update action parameters correctly and call the pinning API', done => {
			component.entity = enrollmentEntity;
			component._pinClickHandler();

			setTimeout(() => {
				expect(pinActionStub).to.have.been
					.calledWith(sinon.match.has('name', sinon.match('unpin-course'))
						.and(sinon.match.has('href', sinon.match('/enrollments/users/169/organizations/1')))
						.and(sinon.match.has('method', 'PUT')));
				done();
			});
		});

		it('should aria-announce the change in pin state', done => {
			component.entity = enrollmentEntity;

			component.addEventListener('iron-announce', function(e) {
				expect(e.detail.text).to.equal('Course name has been unpinned');
				done();
			});

			component._pinClickHandler();
		});

	});

	describe('set-course-image event', () => {

		beforeEach(done => loadEnrollment(done));

		it('should have a change-image-button if the set-catalog-image action exists on the organization', () => {
			var changeImageMenuItem = component.$$('d2l-menu-item:not([hidden])').$$('span');
			expect(changeImageMenuItem).to.not.be.null;
			expect(changeImageMenuItem.innerText).to.equal('Change Image');
		});

		it('should not have a change-image-button if the set-catalog-image action does not exist on the organization', () => {
			organizationEntity.actions = [];
			component._organization = window.D2L.Hypermedia.Siren.Parse(
				JSON.parse(JSON.stringify(organizationEntity))
			);
			var changeImageMenuItem = component.$$('d2l-menu-item[hidden]');
			expect(changeImageMenuItem).to.not.be.null;
			expect(changeImageMenuItem.text).to.contain('Change Image');
		});

		it('shows the loading spinner overlay when event status=set', () => {
			window.dispatchEvent(new CustomEvent('set-course-image', {
				detail: {
					organization: organizationEntity,
					status: 'set'
				}
			}));

			var imageOverlay = component.$$('div.d2l-enrollment-card-overlay');
			expect(imageOverlay.hasAttribute('hidden')).to.be.false;
			var spinner = component.$$('.d2l-enrollment-card-overlay d2l-loading-spinner');
			expect(spinner.hasAttribute('hidden')).to.be.false;
		});

		it('hides the loading spinner overlay and shows the checkmark when event status=success', () => {
			var clock = sinon.useFakeTimers();

			window.dispatchEvent(new CustomEvent('set-course-image', {
				detail: {
					organization: organizationEntity,
					status: 'success'
				}
			}));

			clock.tick(1001);
			var imageOverlay = component.$$('div.d2l-enrollment-card-overlay');
			expect(imageOverlay.hasAttribute('hidden')).to.be.false;
			var spinner = component.$$('.d2l-enrollment-card-overlay d2l-loading-spinner');
			expect(spinner.hasAttribute('hidden')).to.be.true;
			var icon = component.$$('.d2l-enrollment-card-overlay .d2l-enrollment-card-icon-container d2l-icon');
			expect(icon.getAttribute('icon')).to.equal('d2l-tier2:check');

			clock.tick(1001);
			expect(imageOverlay.hasAttribute('hidden')).to.be.true;
			clock.restore();
		});

		it('hides the loading spinner overlay and shows the X icon when event status=failure', () => {
			var clock = sinon.useFakeTimers();

			window.dispatchEvent(new CustomEvent('set-course-image', {
				detail: {
					organization: organizationEntity,
					status: 'failure'
				}
			}));

			clock.tick(1001);
			var imageOverlay = component.$$('div.d2l-enrollment-card-overlay');
			expect(imageOverlay.hasAttribute('hidden')).to.be.false;
			var spinner = component.$$('.d2l-enrollment-card-overlay d2l-loading-spinner');
			expect(spinner.hasAttribute('hidden')).to.be.true;
			var icon = component.$$('.d2l-enrollment-card-overlay .d2l-enrollment-card-icon-container d2l-icon');
			expect(icon.getAttribute('icon')).to.equal('d2l-tier3:close');

			clock.tick(1001);
			expect(imageOverlay.hasAttribute('hidden')).to.be.true;
			clock.restore();
		});

	});

	describe('Display Badge', () => {

		beforeEach(done => loadEnrollment(done));

		afterEach(() => sandbox.reset());

		it('Completed Badge', done => {
			component.fire('d2l-enrollment-status', {status: 'completed'});

			setTimeout(() => {
				expect(component._badgeText).to.equal('completed');
				expect(component._badgeState).to.equal('success');
				var badge = component.$$('d2l-status-indicator');
				expect(badge.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

		it('Overdue Badge', done => {
			component.fire('d2l-enrollment-status', {status: 'overdue'});

			setTimeout(() => {
				expect(component._badgeText).to.equal('overdue');
				expect(component._badgeState).to.equal('alert');
				var badge = component.$$('d2l-status-indicator');
				expect(badge.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

		it('Closed Badge', done => {
			component.fire('d2l-organization-date', {active: true, afterEndDate: true});

			setTimeout(() => {
				expect(component._badgeText).to.equal('closed');
				expect(component._badgeState).to.equal('default');
				var badge = component.$$('d2l-status-indicator');
				expect(badge.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

		it('No Badge', () => {
			expect(component._badgeText).to.be.null;
			expect(component._badgeState).to.be.null;
			var badge = component.$$('d2l-status-indicator');
			expect(badge.hasAttribute('hidden')).to.be.true;
		});

		describe('Badge Priority Order', () => {
			var fireClosed = function() {
				component.fire('d2l-organization-date', {active: true, afterEndDate: true});
			};
			var fireOverdue = function() {
				component.fire('d2l-enrollment-status', {status: 'overdue'});
			};
			var fireCompleted = function() {
				component.fire('d2l-enrollment-status', {status: 'completed'});
			};
			var fireBeforeStart = function() {
				component.fire('d2l-organization-date', {active: false, beforeStartDate: true});
			};

			[
				{
					name: 'Completed should be shown when recieved first',
					methods: [fireCompleted, fireBeforeStart, fireOverdue, fireClosed],
					badge: 'completed'
				},
				{
					name: 'Completed should be shown when recieved last',
					methods: [fireBeforeStart, fireOverdue, fireClosed, fireCompleted],
					badge: 'completed'
				},
				{
					name: 'Completed should be shown when recieved last',
					methods: [fireOverdue, fireCompleted],
					badge: 'completed'
				},
				{
					name: 'An inactive card before start, should show inactive badge.',
					methods: [fireBeforeStart, fireOverdue],
					badge: 'inactive'
				},
				{
					name: 'An inactive card before start, should show inactive badge.',
					methods: [fireOverdue, fireClosed, fireBeforeStart],
					badge: 'inactive'
				},
				{
					name: 'Closed should be shown over overdue when sent first.',
					methods: [fireClosed, fireOverdue],
					badge: 'closed'
				},
				{
					name: 'Closed should be shown over overdue when sent second.',
					methods: [fireOverdue, fireClosed],
					badge: 'closed'
				},
			].forEach((testCase) => {
				it(testCase.name, (done) => {
					flush(() => {
						testCase.methods.forEach((method) => method());

						setTimeout(() => {
							expect(component._badgeText).to.equal(testCase.badge);
							var badge = component.$$('d2l-status-indicator');
							expect(badge.hasAttribute('hidden')).to.be.false;
							done();
						});
					});
				});

			});

		});

	});

	describe('Accessibility', () => {

		beforeEach(done => loadEnrollment(done));

		afterEach(() => sandbox.reset());

		it('Organization', done => {
			component.fire('d2l-organization-accessible', {
				organization: {
					name: 'Course Name',
					code: 'Course Code'
				},
				semesterName: 'Semester Name'
			});

			setTimeout(() => {
				expect(component._accessibilityData.organizationName).to.equal('Course Name');
				expect(component._accessibilityData.organizationCode).to.equal('Course Code');
				expect(component._accessibilityData.semesterName).to.equal('Semester Name');
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Course Name');
				expect(cardText).to.contain('Course Code');
				expect(cardText).to.contain('Semester Name');
				done();
			});

		});

		it('user activity usage', done => {
			component.fire('d2l-organization-accessible', {
				organization: {
					name: 'Course Name',
					code: 'Course Code'
				},
				semesterName: 'Semester Name'
			});
			component.fire('d2l-user-activity-usage-accessible', 'Due Feb 15');

			setTimeout(() => {
				expect(component._accessibilityData.userActivityUsageInfo).to.equal('Due Feb 15');
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Due Feb 15');
				done();
			});

		});

		it('Badge', done => {
			component.fire('d2l-organization-accessible', {
				organization: {
					name: 'Course Name',
					code: 'Course Code'
				},
				semesterName: 'Semester Name'
			});
			component.fire('d2l-enrollment-status', {status: 'overdue'});

			setTimeout(() => {
				expect(component._accessibilityData.badge).to.equal('Overdue');
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Overdue');
				done();
			});

		});

		it('No semester name', () => {
			component.fire('d2l-organization-accessible', {
				organization: {
					name: 'Course Name',
					code: 'Course Code'
				},
				semesterName: undefined
			});
			expect(component._accessibilityData.semesterName).to.be.undefined;
			var cardText = component.$$('d2l-card').getAttribute('text');
			expect(cardText).to.not.contain('Semester Name');

		});

	});

	describe('New Enrollment Highlight', () => {

		beforeEach(done => loadEnrollment(done));

		afterEach(() => sandbox.reset());

		it('Highlight visible', done => {
			component.fire('d2l-enrollment-new');

			setTimeout(() => {
				var highlight = component.$$('.d2l-enrollment-card-alert-colour-circle');
				expect(highlight.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

	});

	describe('Events', () => {
		beforeEach(done => loadEnrollment(done));

		afterEach(() => sandbox.reset());

		it('d2l-enrollment-card-status event fired: completed', done => {
			component.addEventListener('d2l-enrollment-card-status', function(e) {
				expect(e.detail.status.completed).to.be.true;
				expect(e.detail.enrollmentUrl).to.equal('/enrollments/users/169/organizations/1');
				done();
			});

			component._setCompleted(true);
		});

		it('d2l-enrollment-card-status event fired: closed', done => {
			component.addEventListener('d2l-enrollment-card-status', function(e) {
				expect(e.detail.status.closed).to.be.true;
				expect(e.detail.enrollmentUrl).to.equal('/enrollments/users/169/organizations/1');
				done();
			});

			component._setClosed(true);
		});
	});
});
