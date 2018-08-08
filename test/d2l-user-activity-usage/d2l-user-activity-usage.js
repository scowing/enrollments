describe('d2l-user-activity-usage', () => {

	var component,
		fetchStub,
		sandbox,
		userActivityUsageEntity;

	function SetupFetchStub(url, entity) {
		fetchStub.withArgs(sinon.match.has('url', sinon.match(url)))
			.returns(Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(entity); }
			}));
	}

	function loadUserActivityUsage(properties) {
		sandbox = sinon.sandbox.create();
		userActivityUsageEntity = window.D2L.Hypermedia.Siren.Parse({
			'properties': properties
		});

		fetchStub = sandbox.stub(window.d2lfetch, 'fetch');
		SetupFetchStub(/\/userActivityUsage$/, userActivityUsageEntity);

		component.userActivityUsageHref = '/userActivityUsage';
	}

	beforeEach(() => {
		component = fixture('d2l-user-activity-usage-fixture');
	});
	afterEach(() => {
		if (sandbox) sandbox.restore();
	});

	describe('Due Date correctly displayed', () => {

		it('Show year if not in the same year.', done => {
			var properties = {
				DueDate: '2017-08-01T04:00:00.000Z'
			};

			loadUserActivityUsage(properties);

			setTimeout(() => {
				expect(component._dateText).to.equal('Due Aug 1, 2017');
				done();
			});

		});
		it('Show completed.', done => {
			var properties = {
				DueDate: '2017-08-01T04:00:00.000Z',
				CompletionDate: '2017-08-01T04:00:00.000Z'
			};

			loadUserActivityUsage(properties);

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
			].forEach((testCase) => {
				it(testCase.display, (done) => {

					var properties = {
						DueDate: testCase.date.toISOString()
					};

					loadUserActivityUsage(properties);

					setTimeout(() => {
						expect(component._dateText).to.equal(testCase.display);
						done();
					});

				});

			});

		});

	});

	describe('Check if events fire.', () => {
		it('Overdue', (done) => {
			var properties = {
				DueDate: '2017-08-01T04:00:00.000Z'
			};

			component.addEventListener('d2l-enrollment-status', function(e) {
				expect(e.detail.status).to.equal('overdue');
				done();
			});

			loadUserActivityUsage(properties);

		});

		it('Completed', (done) => {
			var properties = {
				DueDate: '2017-08-01T04:00:00.000Z',
				CompletionDate: '2017-08-01T04:00:00.000Z'
			};

			component.addEventListener('d2l-enrollment-status', function(e) {
				expect(e.detail.status).to.equal('completed');
				done();
			});

			loadUserActivityUsage(properties);

		});

		it('No event fires', (done) => {
			var properties = {
				DueDate: '2100-08-01T04:00:00.000Z'
			};

			var eventSpy = sinon.spy();
			component.addEventListener('d2l-enrollment-status', eventSpy);

			loadUserActivityUsage(properties);

			setTimeout(() => {
				sinon.assert.notCalled(eventSpy);
				done();
			}, 1000);

		});

	});

});
