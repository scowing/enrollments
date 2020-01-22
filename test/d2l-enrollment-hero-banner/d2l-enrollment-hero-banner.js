import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

describe('d2l-enrollment-hero-banner', () => {

	var component,
		sandbox,
		pinStub,
		pinActionStub,
		organizationHasActionByNameStub,
		courseInfoUrlStub,
		organizationHasClassStub,
		enrollmentEntity,
		organizationEntity,
		userActivityUsageEntity,
		rootSequenceEntity,
		semesterEntity,
		onOrganizationChangeStub,
		onUserActivityUsageChangeStub,
		onSemesterChangeStub,
		onRootSequenceChangeStub,
		isAttendedStub,
		isCompletionDateStub,
		dateStub,
		isActiveStub,
		processedDateStub,
		date;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('d2l-enrollment-hero-banner-fixture');

		pinStub = sinon.stub();
		pinActionStub = sandbox.stub(component, 'performSirenAction');
		isAttendedStub = sinon.stub();
		isCompletionDateStub = sinon.stub();
		organizationHasActionByNameStub = sinon.stub();
		courseInfoUrlStub = sinon.stub();
		organizationHasClassStub = sinon.stub();
		dateStub = sinon.stub();
		onOrganizationChangeStub = sinon.stub();
		onRootSequenceChangeStub = sinon.stub();
		onUserActivityUsageChangeStub = sinon.stub();
		onSemesterChangeStub = sinon.stub();
		isActiveStub = sinon.stub();
		processedDateStub = sinon.stub();
		date = new Date(Date.parse('1998-01-01T00:00:00.000Z'));

		pinStub.returns(true);
		isAttendedStub.returns(false);
		organizationHasActionByNameStub.returns(true);
		courseInfoUrlStub.returns('courseInfoUrl');
		isActiveStub.returns(true);
		processedDateStub.returns(null);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('course-offering', () => {

		let subSequenceEntity1,
			subSequenceEntity2,
			subSequenceEntity3,
			completionEntity1,
			completionEntity2,
			completionEntity3;

		beforeEach(() => {

			enrollmentEntity = {
				_entity: {},
				organizationHref: function() { return 'organizationHref'; },
				self: function() { return 'self'; },
				userActivityUsageUrl: function() { return 'userActivityUsageUrl'; },
				onOrganizationChange: onOrganizationChangeStub,
				onUserActivityUsageChange: onUserActivityUsageChangeStub,
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
				code: function() { return 'Course Code'; },
				courseInfoUrl: courseInfoUrlStub,
				organizationHomepageUrl: function() { return 'organizationHomepageUrl'; },
				hasClass: organizationHasClassStub,
				canChangeCourseImage: organizationHasActionByNameStub,
				isActive: isActiveStub,
				processedDate: processedDateStub,
				onSequenceChange: onRootSequenceChangeStub,
				onSemesterChange: onSemesterChangeStub
			};

			userActivityUsageEntity = {
				isAttended: isAttendedStub,
				isCompletionDate: isCompletionDateStub,
				date: dateStub
			};

			completionEntity1 = { completed: 1, total: 3 };
			completionEntity2 = { completed: 0, total: 5 };
			completionEntity3 = { completed: 3, total: 4 };

			subSequenceEntity1 = {
				completion: () => completionEntity1,
				index: () => 0
			};
			subSequenceEntity2 = {
				completion: () => completionEntity2,
				index: () => 1
			};
			subSequenceEntity3 = {
				completion: () => completionEntity3,
				index: () => 2
			};

			rootSequenceEntity = {
				onSubSequencesChange: function(callback) {
					callback(subSequenceEntity1);
					callback(subSequenceEntity2);
					callback(subSequenceEntity3);
				}
			};

			semesterEntity = {
				name: function() { return 'Semester Name'; },
			};

			onOrganizationChangeStub.callsArgWith(0, organizationEntity);
			onSemesterChangeStub.callsArgWith(0, semesterEntity);
			onUserActivityUsageChangeStub.callsArgWith(0, userActivityUsageEntity);
			onRootSequenceChangeStub.callsArgWith(0, rootSequenceEntity);

			pinActionStub.withArgs(sinon.match.defined).returns(Promise.resolve(enrollmentEntity._entity));
			organizationHasClassStub.withArgs(sinon.match('learning-path')).returns(false);
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
					var pinButton = component.$$('.dehb-context-menu > d2l-button-icon');
					expect(pinButton.hasAttribute('hidden')).to.be.false;
					done();
				});
			});

			it('should hide the pinned button when unpinned', done => {
				pinStub.returns(false);
				component._entity = enrollmentEntity;

				setTimeout(() => {
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

		describe('Module completion progress', () => {
			it('should sum module completions', () => {
				component._entity = enrollmentEntity;

				const expectedValue = completionEntity1.completed + completionEntity2.completed + completionEntity3.completed;
				const expectedMax = completionEntity1.total + completionEntity2.total + completionEntity3.total;

				expect(component._enrollmentCompletion.value).to.equal(expectedValue);
				expect(component._enrollmentCompletion.max).to.equal(expectedMax);
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
					date: date,
					afterEndDate: true
				});
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
					component._setOrganizationDate({
						type: 'ended',
						date: date,
						afterEndDate: true
					}, true);
				};
				var setOverdue = function() {
					component._setEnrollmentStatus('overdue');
				};
				var setCompleted = function() {
					component._setEnrollmentStatus('completed');
				};
				var setBeforeStart = function() {
					component._setOrganizationDate({
						type: 'ended',
						date: date,
						afterEndDate: true
					}, false);
				};

				[
					{
						name: 'Completed should be shown when recieved first',
						methods: [setCompleted, setBeforeStart, setOverdue, setClosed],
						badge: 'completed'
					},
					{
						name: 'Completed should be shown when recieved last',
						methods: [setBeforeStart, setOverdue, setClosed, setCompleted],
						badge: 'completed'
					},
					{
						name: 'Completed should be shown when recieved last',
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
	});

	describe('learning-path', () => {

		let subSequenceEntity,
			sequencedActivityEntity1,
			sequencedActivityEntity2,
			sequencedActivityEntity3,
			courseOfferingEntity1,
			courseOfferingEntity2,
			courseOfferingEntity3,
			completionEntity1,
			completionEntity2,
			completionEntity3,
			onSubSequencesChangeStub,
			activityCompletion;

		function createCourseOfferingEntity(completion) {

			const onCourseOfferingSequenceChangeStub = sinon.stub();
			const onCourseOfferingSubSequencesChangeStub = sinon.stub();

			const courseOfferingOrganizationEntity = {
				onSequenceChange: onCourseOfferingSequenceChangeStub
			};

			const courseOfferingSequenceEntity = {
				onSubSequencesChange: onCourseOfferingSubSequencesChangeStub
			};

			const courseOfferingSubSequencesEntity = {
				completion: () => completion,
				index: () => 0
			};

			onCourseOfferingSequenceChangeStub.callsArgWith(0, courseOfferingSequenceEntity);
			onCourseOfferingSubSequencesChangeStub.callsArgWith(0, courseOfferingSubSequencesEntity);

			return courseOfferingOrganizationEntity;
		}

		function createSequencedActivityEntity(organizationEntity, index) {

			const onOrganizationChangeStub = sinon.stub();

			const sequencedActivityEntity = {
				onOrganizationChange: onOrganizationChangeStub,
				index: () => index
			};

			onOrganizationChangeStub.callsArgWith(0, organizationEntity);

			return sequencedActivityEntity;
		}

		beforeEach(() => {
			onSubSequencesChangeStub = sinon.stub();

			enrollmentEntity = {
				_entity: {},
				organizationHref: function() { return 'organizationHref'; },
				self: function() { return 'self'; },
				userActivityUsageUrl: function() { return 'userActivityUsageUrl'; },
				onOrganizationChange: onOrganizationChangeStub,
				onUserActivityUsageChange: onUserActivityUsageChangeStub,
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
				code: function() { return 'Course Code'; },
				courseInfoUrl: courseInfoUrlStub,
				organizationHomepageUrl: function() { return 'organizationHomepageUrl'; },
				hasClass: organizationHasClassStub,
				canChangeCourseImage: organizationHasActionByNameStub,
				isActive: isActiveStub,
				processedDate: processedDateStub,
				onSequenceChange: onRootSequenceChangeStub,
				onSemesterChange: onSemesterChangeStub
			};

			rootSequenceEntity = {
				onSubSequencesChange: onSubSequencesChangeStub
			};

			activityCompletion = { completed: 2, total: 3 };
			completionEntity1 = { completed: 10, total: 10 };
			completionEntity2 = undefined;
			completionEntity3 = { completed: 2, total: 6 };

			courseOfferingEntity1 = createCourseOfferingEntity(completionEntity1);
			courseOfferingEntity2 = createCourseOfferingEntity(completionEntity2);
			courseOfferingEntity3 = createCourseOfferingEntity(completionEntity3);

			sequencedActivityEntity1 = createSequencedActivityEntity(courseOfferingEntity1, 0);
			sequencedActivityEntity2 = createSequencedActivityEntity(courseOfferingEntity2, 1);
			sequencedActivityEntity3 = createSequencedActivityEntity(courseOfferingEntity3, 2);

			subSequenceEntity = {
				onSequencedActivityChange: function(callback) {
					callback(sequencedActivityEntity1);
					callback(sequencedActivityEntity2);
					callback(sequencedActivityEntity3);
				},
				index: () => 0
			};

			onOrganizationChangeStub.callsArgWith(0, organizationEntity);
			onRootSequenceChangeStub.callsArgWith(0, rootSequenceEntity);
			onSubSequencesChangeStub.callsArgWith(0, subSequenceEntity);

			pinActionStub.withArgs(sinon.match.defined).returns(Promise.resolve(enrollmentEntity._entity));
			organizationHasClassStub.withArgs(sinon.match('learning-path')).returns(true);
		});

		describe('Activity completion progress', () => {
			it('should sum linked organization completions', () => {
				component._entity = enrollmentEntity;

				const expectedValue = activityCompletion.completed;
				const expectedMax = activityCompletion.total;

				expect(component._enrollmentCompletion.value).to.equal(expectedValue);
				expect(component._enrollmentCompletion.max).to.equal(expectedMax);
			});
		});
	});
});
