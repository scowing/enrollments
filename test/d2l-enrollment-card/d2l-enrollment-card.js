describe('d2l-enrollment-card', () => {

	var component,
		sandbox,
		enrollmentEntity,
		organizationEntity,
		userActivityUsageEntity,
		semesterEntity,
		imageEntity,
		onOrganizationChangeStub,
		onUserActivityUsageChangeStub,
		onSemesterChangeStub,
		organizationHasActionByNameStub,
		pinStub,
		pinActionStub,
		isAttendedStub,
		isCompletionDateStub,
		dateStub,
		isActiveStub,
		processedDateStub,
		isBeforeStartDateStub,
		isAfterEndDateStub,
		courseInfoUrlStub,
		date;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		onOrganizationChangeStub = sinon.stub();
		onUserActivityUsageChangeStub = sinon.stub();
		onSemesterChangeStub = sinon.stub();
		pinStub = sinon.stub();
		isAttendedStub = sinon.stub();
		isCompletionDateStub = sinon.stub();
		dateStub = sinon.stub();
		organizationHasActionByNameStub = sinon.stub();
		isActiveStub = sinon.stub();
		processedDateStub = sinon.stub();
		isBeforeStartDateStub = sinon.stub();
		isAfterEndDateStub = sinon.stub();
		courseInfoUrlStub = sinon.stub();
		date = new Date(Date.parse('1998-01-01T00:00:00.000Z'));

		enrollmentEntity = {
			_entity: {},
			pinned: pinStub,
			organizationHref: function() { return 'organizationHref'; },
			self: function() { return 'self'; },
			userActivityUsageUrl: function() { return 'userActivityUsageUrl'; },
			pinAction: function() {
				return {
					'href':'#pinned',
					'name':'unpin-course',
					'method':'PUT'
				};
			},
			onOrganizationChange: onOrganizationChangeStub,
			onUserActivityUsageChange: onUserActivityUsageChangeStub
		};

		imageEntity = {
			'class': [
				'course-image'
			],
			'properties': {
				'name': 'nature(growth)_0014'
			}
		};

		organizationEntity = {
			_entity: {
				getLinkByRel: function() { return { href: 'organizationHref' }; }
			},
			imageEntity: function() { return imageEntity; },
			courseInfoUrl: courseInfoUrlStub,
			organizationHomepageUrl: function() { return 'organizationHomepageUrl'; },
			name: function() { return 'Course Name'; },
			code: function() { return 'Course Code'; },
			canChangeCourseImage: organizationHasActionByNameStub,
			isActive: isActiveStub,
			processedDate: processedDateStub,
			isBeforeStartDate: isBeforeStartDateStub,
			isAfterEndDate: isAfterEndDateStub,
			onSemesterChange: onSemesterChangeStub
		};

		userActivityUsageEntity = {
			isAttended: isAttendedStub,
			isCompletionDate: isCompletionDateStub,
			date: dateStub
		};

		semesterEntity = {
			name: function() { return 'Semester Name'; },
		};

		onOrganizationChangeStub.callsArgWith(0, organizationEntity);
		onUserActivityUsageChangeStub.callsArgWith(0, userActivityUsageEntity);
		onSemesterChangeStub.callsArgWith(0, semesterEntity);
		isAttendedStub.returns(false);
		pinStub.returns(true);
		organizationHasActionByNameStub.returns(true);
		isActiveStub.returns(true);
		processedDateStub.returns(null);
		isBeforeStartDateStub.returns(null);
		isAfterEndDateStub.returns(null);
		courseInfoUrlStub.returns('courseInfoUrl');

		component = fixture('d2l-enrollment-card-fixture');
		component._load = true;
		component.token = 'fake';
		pinActionStub = sandbox.stub(component, 'performSirenAction');
		pinActionStub.withArgs(sinon.match.defined).returns(Promise.resolve(enrollmentEntity._entity));
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('loads element', () => {
		expect(component).to.exist;
	});

	describe('Public API', () => {

		it('should implement all properties', () => {
			expect(component.href).to.equal(undefined);
		});

		it('if focusDropdownOpener called with different org, return false', (done) => {
			component._entity = enrollmentEntity;

			requestAnimationFrame(() => {
				expect(component.focusDropdownOpener({
					getLinkByRel: function() { return { href: 'different' }; }
				})).to.be.false;
				done();
			});
		});

		it('if focusDropdownOpener called with same org, try to focus the opener and return true', (done) => {
			component._entity = enrollmentEntity;

			requestAnimationFrame(() => {
				const spy = sandbox.spy(component.shadowRoot.querySelector('d2l-dropdown-more'), 'getOpenerElement');
				expect(component.focusDropdownOpener({
					getLinkByRel: function() { return { href: 'organizationHref' }; }
				})).to.be.true;
				expect(spy).to.have.been.called.calledOnce;
				done();
			});
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
			expect(component._courseSettingsLabel).to.equal('Course Name course settings');
		});

		it('should update _pinButtonLabel', () => {
			expect(component._pinButtonLabel).to.equal('Course Name is pinned. Unpin course');
		});

	});

	describe('Pinning functionality', () => {
		it('should have a visible "Unpin" menu item when pinned', done => {
			component._entity = enrollmentEntity;
			setTimeout(() => {
				var menuItems = component.root.querySelectorAll('d2l-menu-item:not([hidden])');
				var unpinMenuItem = menuItems[menuItems.length - 1];
				expect(unpinMenuItem).to.not.be.null;
				expect(unpinMenuItem.text).to.equal('Unpin');
				done();
			});
		});

		it('should have a visible "Pin" menu item when pinned', done => {
			pinStub.returns(false);
			component._entity = enrollmentEntity;

			setTimeout(() => {
				var menuItems = component.root.querySelectorAll('d2l-menu-item:not([hidden])');
				var pinMenuItem = menuItems[menuItems.length - 1];
				expect(pinMenuItem).to.not.be.null;
				expect(pinMenuItem.text).to.equal('Pin');
				done();
			});
		});

		it('should have a visible pinned button when pinned', done => {
			component._entity = enrollmentEntity;
			setTimeout(() => {
				var pinButton = component.$$('d2l-button-icon');
				expect(pinButton.hasAttribute('hidden')).to.be.false;
				done();
			});
		});

		it('should hide the pinned button when unpinned', done => {
			pinStub.returns(false);
			component._entity = enrollmentEntity;

			setTimeout(() => {
				var pinButton = component.$$('d2l-button-icon');
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
				expect(e.detail.text).to.equal('Course Name has been unpinned');
				done();
			});

			component._pinClickHandler();
		});

		it('should hide pinning options when hidePinning=true', done => {
			component.hidePinning = true;
			component._entity = enrollmentEntity;
			setTimeout(() => {
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

	describe('set-course-image event', () => {
		it('should have a change-image-button if the set-catalog-image action exists on the organization', done => {
			component._entity = enrollmentEntity;
			setTimeout(() => {
				var changeImageMenuItem = component.$$('d2l-menu-item:not([hidden])');
				expect(changeImageMenuItem).to.not.be.null;
				expect(changeImageMenuItem.text).to.equal('Change Image');
				done();
			});
		});

		it('should not have a change-image-button if the set-catalog-image action does not exist on the organization', done => {
			organizationHasActionByNameStub.returns(false);
			component._entity = enrollmentEntity;

			setTimeout(() => {
				var changeImageMenuItem = component.$$('d2l-menu-item[hidden]');
				expect(changeImageMenuItem).to.not.be.null;
				expect(changeImageMenuItem.text).to.contain('Change Image');
				done();
			});
		});

		it('shows the loading spinner overlay when event status=set', done => {
			component._entity = enrollmentEntity;
			setTimeout(() => {
				window.dispatchEvent(new CustomEvent('set-course-image', {
					detail: {
						organization: organizationEntity._entity,
						status: 'set'
					}
				}));
				var imageOverlay = component.$$('div.d2l-enrollment-card-overlay');
				expect(imageOverlay.hasAttribute('hidden')).to.be.false;
				var spinner = component.$$('.d2l-enrollment-card-overlay d2l-loading-spinner');
				expect(spinner.hasAttribute('hidden')).to.be.false;
				done();
			});
		});

		it('hides the loading spinner overlay and shows the checkmark when event status=success', () => {
			component._entity = enrollmentEntity;
			var clock = sinon.useFakeTimers();

			window.dispatchEvent(new CustomEvent('set-course-image', {
				detail: {
					organization: organizationEntity._entity,
					status: 'success'
				}
			}));

			clock.tick(1001);
			var imageOverlay = component.$$('div.d2l-enrollment-card-overlay');
			expect(imageOverlay.hasAttribute('hidden')).to.be.false;
			var spinner = component.$$('.d2l-enrollment-card-overlay d2l-loading-spinner');
			expect(spinner.hasAttribute('hidden')).to.be.true;
			var icon = component.$$('.d2l-enrollment-card-overlay .d2l-enrollment-card-icon-container d2l-icon');
			expect(icon.getAttribute('icon')).to.equal('tier2:check');

			clock.tick(1001);
			expect(imageOverlay.hasAttribute('hidden')).to.be.true;
			clock.restore();
		});

		it('hides the loading spinner overlay and shows the X icon when event status=failure', () => {
			component._entity = enrollmentEntity;
			var clock = sinon.useFakeTimers();

			window.dispatchEvent(new CustomEvent('set-course-image', {
				detail: {
					organization: organizationEntity._entity,
					status: 'failure'
				}
			}));

			clock.tick(1001);
			var imageOverlay = component.$$('div.d2l-enrollment-card-overlay');
			expect(imageOverlay.hasAttribute('hidden')).to.be.false;
			var spinner = component.$$('.d2l-enrollment-card-overlay d2l-loading-spinner');
			expect(spinner.hasAttribute('hidden')).to.be.true;
			var icon = component.$$('.d2l-enrollment-card-overlay .d2l-enrollment-card-icon-container d2l-icon');
			expect(icon.getAttribute('icon')).to.equal('tier3:close');

			clock.tick(1001);
			expect(imageOverlay.hasAttribute('hidden')).to.be.true;
			clock.restore();
		});

	});

	describe('Display Badge', () => {
		it('Completed Badge', done => {
			isCompletionDateStub.returns(true);
			dateStub.returns('2017-08-01T04:00:00.000Z');
			component._entity = enrollmentEntity;

			setTimeout(() => {
				expect(component._badgeText).to.equal('completed');
				expect(component._badgeState).to.equal('success');
				var badge = component.$$('d2l-status-indicator');
				expect(badge.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

		it('Overdue Badge', done => {
			isCompletionDateStub.returns(false);
			dateStub.returns('2017-08-01T04:00:00.000Z');
			component._entity = enrollmentEntity;

			setTimeout(() => {
				expect(component._badgeText).to.equal('overdue');
				expect(component._badgeState).to.equal('alert');
				var badge = component.$$('d2l-status-indicator');
				expect(badge.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

		it('Closed Badge', done => {
			processedDateStub.returns({
				type: 'ended',
				date: date
			});
			isAfterEndDateStub.returns(true);
			component._entity = enrollmentEntity;

			setTimeout(() => {
				expect(component._badgeText).to.equal('closed');
				expect(component._badgeState).to.equal('default');
				var badge = component.$$('d2l-status-indicator');
				expect(badge.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

		it('No Badge', () => {
			isCompletionDateStub.returns(true);
			dateStub.returns('2050-08-01T04:00:00.000Z');
			expect(component._badgeText).to.be.null;
			expect(component._badgeState).to.be.null;
			var badge = component.$$('d2l-status-indicator');
			expect(badge.hasAttribute('hidden')).to.be.true;
		});

		describe('Badge Priority Order', () => {
			var setClosed = function() {
				component._setOrganizationDate(
					false, // isBeforeStartDate
					true,  // isAfterEndDate
					true   // isActive
				);
			};
			var setOverdue = function() {
				component._setEnrollmentStatus('overdue');
			};
			var setCompleted = function() {
				component._setEnrollmentStatus('completed');
			};
			var setBeforeStart = function() {
				component._setOrganizationDate(
					true,   // isBeforeStartDate
					false,  // isAfterEndDate
					false   // isActive
				);
			};

			[
				{
					name: 'Completed should be shown when received first',
					methods: [setCompleted, setBeforeStart, setOverdue, setClosed],
					badge: 'completed'
				},
				{
					name: 'Completed should be shown when received last',
					methods: [setBeforeStart, setOverdue, setClosed, setCompleted],
					badge: 'completed'
				},
				{
					name: 'Completed should be shown when received last',
					methods: [setOverdue, setCompleted],
					badge: 'completed'
				},
				{
					name: 'An inactive card before start, should show inactive badge.',
					methods: [setBeforeStart, setOverdue],
					badge: 'inactive'
				},
				{
					name: 'An inactive card before start, should show inactive badge.',
					methods: [setOverdue, setClosed, setBeforeStart],
					badge: 'inactive'
				},
				{
					name: 'Closed should be shown over overdue when sent first.',
					methods: [setClosed, setOverdue],
					badge: 'closed'
				},
				{
					name: 'Closed should be shown over overdue when sent second.',
					methods: [setOverdue, setClosed],
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
		it('Organization', done => {
			component._setOrganizationAccessibleData('Course Name', 'Course Code', undefined);
			setTimeout(() => {
				expect(component._accessibilityData.organizationName).to.equal('Course Name');
				expect(component._accessibilityData.organizationCode).to.equal('Course Code');
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Course Name');
				expect(cardText).to.contain('Course Code');
				done();
			});
		});

		it('Semester Name', done => {
			component._accessibilityData.organizationName = 'Course Name';
			component._setSemesterAccessibleData('Semester Name');
			setTimeout(() => {
				expect(component._accessibilityData.semesterName).to.equal('Semester Name');
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Semester Name');
				done();
			});
		});

		it('user activity usage', done => {
			component._setOrganizationAccessibleData('Course Name', 'Course Code', 'Semester Name', 'Due Feb 15');
			component._setUserActivityUsageAccessible('Due Feb 15');
			setTimeout(() => {
				expect(component._accessibilityData.userActivityUsageInfo).to.equal('Due Feb 15');
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Due Feb 15');
				done();
			});
		});

		it('Badge', done => {
			component._setOrganizationAccessibleData('Course Name', 'Course Code', 'Semester Name', undefined);
			component._setEnrollmentStatus('overdue');
			setTimeout(() => {
				expect(component._accessibilityData.badge).to.equal('Overdue');
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Overdue');
				done();
			});

		});

		it('No semester name', done => {
			component._setOrganizationAccessibleData('Course Name', 'Course Code', undefined, undefined);
			setTimeout(() => {
				expect(component._accessibilityData.semesterName).to.be.undefined;
				var cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.not.contain('Semester Name');
				done();
			});
		});

		it('Properly clears values from previous org', done => {
			organizationEntity.onSemesterChange = () => {};
			component._badgeText = 'Closed';
			component._accessibilityData = {
				organizationName: 'Name',
				organizationCode: 'Code',
				semesterName: 'Semester',
				organizationDate: 'Date',
				badge: 'Closed'
			};

			setTimeout(() => {
				const cardText = component.$$('d2l-card').getAttribute('text');
				expect(cardText).to.contain('Name');
				expect(cardText).to.contain('Code');
				expect(cardText).to.contain('Semester');
				expect(cardText).to.contain('Date');
				expect(cardText).to.contain('Closed');

				component.onOrganizationChange(organizationEntity);

				setTimeout(() => {
					const cardText = component.$$('d2l-card').getAttribute('text');
					expect(cardText).to.contain('Course Name');
					expect(cardText).to.contain('Course Code');
					expect(cardText).to.not.contain('Semester');
					expect(cardText).to.not.contain('Date');
					expect(cardText).to.not.contain('Closed');
					done();
				});
			});
		});

	});

	describe('New Enrollment Highlight', () => {
		it('Highlight visible', done => {
			component._entity = enrollmentEntity;

			setTimeout(() => {
				var highlight = component.$$('.d2l-enrollment-card-alert-colour-circle');
				expect(highlight.hasAttribute('hidden')).to.be.false;
				done();
			});

		});

	});
});
