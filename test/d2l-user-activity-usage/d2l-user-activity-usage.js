describe('d2l-user-activity-usage', () => {

	var component,
		sandbox,
		userActivityUsageEntity,
		isCompletionDateStub,
		dateStub,
		isAttendedStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		component = fixture('d2l-user-activity-usage-fixture');

		isCompletionDateStub = sinon.stub();
		dateStub = sinon.stub();
		isAttendedStub = sinon.stub();

		userActivityUsageEntity = {
			isCompletionDate: isCompletionDateStub,
			date: dateStub,
			isAttended: isAttendedStub
		};
	});

	afterEach(() => {
		if (sandbox) sandbox.restore();
	});

	describe('Due Date correctly displayed', () => {

		it('Show year if not in the same year.', done => {
			isCompletionDateStub.returns(false);
			dateStub.returns('2017-08-01T04:00:00.000Z');
			component._entity = userActivityUsageEntity;
			setTimeout(() => {
				expect(component._dateText).to.equal('Due Aug 1, 2017');
				done();
			});

		});

		it('Show completed.', done => {
			isCompletionDateStub.returns(true);
			dateStub.returns('2017-08-01T04:00:00.000Z');
			component._entity = userActivityUsageEntity;
			setTimeout(() => {
				expect(component._dateText).to.equal('Completed Aug 1, 2017');
				done();
			});
		});

		describe('Relative times', () => {
			var offset = (new Date(0)).getTimezoneOffset() * 60 * 1000;
			var dateNow = Date.now;

			before(() => {
				Date.now = function() { return  offset; };
			});

			after(() => {
				Date.now  = dateNow;
			});

			[
				{
					date: new Date(offset),
					display: 'Due Today'
				},
				{
					date: new Date(24 * 3600 * 1000 + offset),
					display: 'Due Tomorrow'
				},
				{
					date: new Date(24 * 3600 * 1000 * 2 + offset),
					display: 'Due Saturday'
				},
				{
					date: new Date(24 * 3600 * 1000 * 3 + offset),
					display: 'Due Sunday'
				},
				{
					date: new Date(24 * 3600 * 1000 * 4 + offset),
					display: 'Due Monday'
				},
				{
					date: new Date(24 * 3600 * 1000 * 5 + offset),
					display: 'Due Tuesday'
				},
				{
					date: new Date(24 * 3600 * 1000 * 6 + offset),
					display: 'Due Wednesday'
				},
				{
					date: new Date(24 * 3600 * 1000 * 7 + offset),
					display: 'Due Jan 8'
				},
				{
					date: new Date(24 * 3600 * 1000 * 365 + offset),
					display: 'Due Jan 1, 1971'
				},
				{
					date: new Date(-24 * 3600 * 1000 + offset),
					display: 'Due Yesterday'
				},
				{
					date: new Date(-24 * 3600 * 1000 * 2 + offset),
					display: 'Due 2 Days Ago'
				},
				{
					date: new Date(-24 * 3600 * 1000 * 3 + offset),
					display: 'Due 3 Days Ago'
				},
				{
					date: new Date(-24 * 3600 * 1000 * 4 + offset),
					display: 'Due 4 Days Ago'
				},
				{
					date: new Date(-24 * 3600 * 1000 * 5 + offset),
					display: 'Due 5 Days Ago'
				},
				{
					date: new Date(-24 * 3600 * 1000 * 6 + offset),
					display: 'Due 6 Days Ago'
				},
				{
					date: new Date(-24 * 3600 * 1000 * 7 + offset),
					display: 'Due 7 Days Ago'
				},
				{
					date: new Date(-24 * 3600 * 1000 * 8 + offset),
					display: 'Due Dec 24, 1969'
				},
				{
					date: new Date(24 * 3600 * 1000 * 31 + offset),
					display: 'Due Feb 1'
				},
				{
					date: new Date(24 * 3600 * 1000 * 365 + offset),
					display: 'Due Jan 1, 1971'
				},
			].forEach((testCase) => {
				it(testCase.display, (done) => {
					isCompletionDateStub.returns(false);
					dateStub.returns(testCase.date.toISOString());
					component._entity = userActivityUsageEntity;

					setTimeout(() => {
						expect(component._dateText).to.equal(testCase.display);
						done();
					});
				});
			});
		});
	});

	describe('Check if events fire.', () => {
		it('New Enrollment', (done) => {
			isCompletionDateStub.returns(false);
			dateStub.returns('2017-08-01T04:00:00.000Z');

			var eventSpy = sandbox.spy();
			component.addEventListener('d2l-enrollment-new', eventSpy);

			component._entity = userActivityUsageEntity;

			setTimeout(() => {
				sinon.assert.called(eventSpy);
				done();
			});

		});

		it('No event fires', (done) => {
			isCompletionDateStub.returns(false);
			dateStub.returns('2100-08-01T04:00:00.000Z');
			isAttendedStub.returns(true);

			var eventSpy = sandbox.spy();
			component.addEventListener('d2l-enrollment-new', eventSpy);

			component._entity = userActivityUsageEntity;

			setTimeout(() => {
				sinon.assert.notCalled(eventSpy);
				done();
			}, 1000);

		});

	});
});
