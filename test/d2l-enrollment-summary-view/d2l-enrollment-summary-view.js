describe('d2l-enrollment-summary-view', () => {

	var component;

	beforeEach(() => {
		component = fixture('d2l-enrollment-summary-view-fixture');
	});

	describe('Unit Tests on Methods', () => {
		it('_onSequencedActivityChange', () => {
			// Add the first elements
			expect(component._courses).to.be.empty;
			const orgListOne = [
				'/org/1',
				'/org/2',
				'/org/3'
			];
			const sequenceActivityOne = {
				self: function() {
					return 'sequenceActivityOne';
				},
				organizationHrefs: function() {
					return orgListOne;
				}
			};
			component._onSequencedActivityChange(sequenceActivityOne);
			expect(component._orgHrefs).deep.equal(orgListOne);

			// Add a second one
			const orgListTwo = ['/org/4'];
			const orgListTwoResults = [
				'/org/1',
				'/org/2',
				'/org/3',
				'/org/4'
			];
			const sequenceActivityTwo = {
				self: function() {
					return 'sequenceActivityTwo';
				},
				organizationHrefs: function() {
					return orgListTwo;
				}
			};

			component._onSequencedActivityChange(sequenceActivityTwo);
			expect(component._orgHrefs).deep.equal(orgListTwoResults);

			// Change the first one
			const orgListOneChanged = [
				'/org/1',
				'/org/5'
			];
			const orgListOneChangedResults = [
				'/org/1',
				'/org/4',
				'/org/5'
			];
			const sequenceActivityOneChanged = {
				self: function() {
					return 'sequenceActivityOne';
				},
				organizationHrefs: function() {
					return orgListOneChanged;
				}
			};

			component._onSequencedActivityChange(sequenceActivityOneChanged);
			expect(component._orgHrefs).deep.equal(orgListOneChangedResults);
		});
	});

});
