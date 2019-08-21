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
		rootSequenceEntity,
		onOrganizationChangeStub,
		onRootSequenceChangeStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('d2l-enrollment-hero-banner-fixture');

		pinStub = sinon.stub();
		pinActionStub = sandbox.stub(component, 'performSirenAction');
		organizationHasActionByNameStub = sinon.stub();
		courseInfoUrlStub = sinon.stub();
		organizationHasClassStub = sinon.stub();

		onOrganizationChangeStub = sinon.stub();
		onRootSequenceChangeStub = sinon.stub();

		pinStub.returns(true);
		organizationHasActionByNameStub.returns(true);
		courseInfoUrlStub.returns('courseInfoUrl');
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
				code: function() { return 'code'; },
				courseInfoUrl: courseInfoUrlStub,
				organizationHomepageUrl: function() { return 'organizationHomepageUrl'; },
				hasClass: organizationHasClassStub,
				canChangeCourseImage: organizationHasActionByNameStub,
				onSequenceChange: onRootSequenceChangeStub
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

			onOrganizationChangeStub.callsArgWith(0, organizationEntity);
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
					var unpinMenuItem = component.$$('d2l-menu-item.d2l-menu-item-last');

					expect(unpinMenuItem).to.not.be.null;
					expect(unpinMenuItem.text).to.equal('Unpin');
					done();
				});
			});

			it('should have a visible "Pin" menu item when pinned', done => {
				pinStub.returns(false);
				component._entity = enrollmentEntity;

				setTimeout(() => {
					var pinMenuItem = component.$$('d2l-menu-item.d2l-menu-item-last');
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
				code: function() { return 'code'; },
				courseInfoUrl: courseInfoUrlStub,
				organizationHomepageUrl: function() { return 'organizationHomepageUrl'; },
				hasClass: organizationHasClassStub,
				canChangeCourseImage: organizationHasActionByNameStub,
				onSequenceChange: onRootSequenceChangeStub
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
