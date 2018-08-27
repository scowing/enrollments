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

	function loadUserActivityUsage(entities) {
		userActivityUsageEntity = window.D2L.Hypermedia.Siren.Parse({
			'entities': entities
		});

		fetchStub = sandbox.stub(window.d2lfetch, 'fetch');
		SetupFetchStub(/\/userActivityUsage$/, userActivityUsageEntity);

		component.href = '/userActivityUsage';
	}

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		component = fixture('d2l-user-activity-usage-fixture');
	});
	afterEach(() => {
		if (sandbox) sandbox.restore();
	});

	describe('Due Date correctly displayed', () => {

		it('Show year if not in the same year.', done => {
			var entities = [
				{
					class: [
						'date',
						'due-date'
					],
					rel: [
						'https://api.brightspace.com/rels/date'
					],
					properties: {
						date: '2017-08-01T04:00:00.000Z'
					}
				}
			];

			loadUserActivityUsage(entities);

			setTimeout(() => {
				expect(component._dateText).to.equal('Due Aug 1, 2017');
				done();
			});

		});
		it('Show completed.', done => {
			var entities = [
				{
					class: [
						'date',
						'due-date'
					],
					rel: [
						'https://api.brightspace.com/rels/date'
					],
					properties: {
						date: '2017-08-01T04:00:00.000Z'
					}
				},
				{
					class: [
						'completion',
						'complete'
					],
					entities: [
						{
							class: [
								'date',
								'completion-date'
							],
							rel: [
								'https://api.brightspace.com/rels/date'
							],
							properties: {
								date: '2017-08-01T04:00:00.000Z'
							}
						}
					],
					rel: [
						'item'
					]
				}
			];

			loadUserActivityUsage(entities);

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
			].forEach((testCase) => {
				it(testCase.display, (done) => {
					var entities = [
						{
							class: [
								'date',
								'due-date'
							],
							rel: [
								'https://api.brightspace.com/rels/date'
							],
							properties: {
								date: testCase.date.toISOString()
							}
						}
					];

					loadUserActivityUsage(entities);

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
			var entities = [
				{
					class: [
						'date',
						'due-date'
					],
					rel: [
						'https://api.brightspace.com/rels/date'
					],
					properties: {
						date: '2017-08-01T04:00:00.000Z'
					}
				}
			];

			component.addEventListener('d2l-enrollment-status', function(e) {
				expect(e.detail.status).to.equal('overdue');
				done();
			});

			loadUserActivityUsage(entities);

		});

		it('Completed', (done) => {
			var entities = [
				{
					class: [
						'date',
						'due-date'
					],
					rel: [
						'https://api.brightspace.com/rels/date'
					],
					properties: {
						date: '2017-08-01T04:00:00.000Z'
					}
				},
				{
					class: [
						'completion',
						'complete'
					],
					entities: [
						{
							class: [
								'date',
								'completion-date'
							],
							rel: [
								'https://api.brightspace.com/rels/date'
							],
							properties: {
								date: '2017-08-01T04:00:00.000Z'
							}
						}
					],
					rel: [
						'item'
					]
				}
			];

			component.addEventListener('d2l-enrollment-status', function(e) {
				expect(e.detail.status).to.equal('completed');
				done();
			});

			loadUserActivityUsage(entities);

		});

		it('No event fires', (done) => {
			var entities = [
				{
					class: [
						'date',
						'due-date'
					],
					rel: [
						'https://api.brightspace.com/rels/date'
					],
					properties: {
						date: '2100-08-01T04:00:00.000Z'
					}
				}
			];
			var eventSpy = sinon.spy();
			component.addEventListener('d2l-enrollment-status', eventSpy);

			loadUserActivityUsage(entities);

			setTimeout(() => {
				sinon.assert.notCalled(eventSpy);
				done();
			}, 1000);

		});

	});

	describe('Due Date correctly displayed', () => {
		it('Read a date', () => {
			var entity =  window.D2L.Hypermedia.Siren.Parse({
				entities: [
					{
						class: [
							'date',
							'due-date'
						],
						rel: [
							'https://api.brightspace.com/rels/date'
						],
						properties: {
							date: '2100-08-01T04:00:00.000Z'
						}
					}
				]
			});

			expect(component._sirenClassProperty(entity, 'due-date')).to.equal('2100-08-01T04:00:00.000Z');

		});

		it('Read a duration', () => {
			var entity =  window.D2L.Hypermedia.Siren.Parse({
				entities: [
					{
						class: [
							'duration',
							'due-date'
						],
						rel: [
							'https://api.brightspace.com/rels/date'
						],
						properties: {
							seconds: 6
						}
					}
				]
			});

			expect(component._sirenClassProperty(entity, 'due-date')).to.equal(6);

		});

		it('Read a completion', () => {
			var entity =  window.D2L.Hypermedia.Siren.Parse({
				entities: [
					{
						class: [
							'completion',
							'due-date'
						],
						entities: [
							{
								class: [
									'completion-date',
									'date'
								],
								rel: [
									'https://api.brightspace.com/rels/date'
								],
								properties: {
									date: '2100-08-01T04:00:00.000Z'
								}
							}
						],
						rel: [
							'https://api.brightspace.com/rels/date'
						]
					}
				]
			});

			expect(component._sirenClassProperty(entity, 'due-date')).to.equal('2100-08-01T04:00:00.000Z');

		});

	});

});
