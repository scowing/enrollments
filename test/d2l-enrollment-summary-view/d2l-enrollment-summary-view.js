describe('d2l-enrollment-summary-view', () => {

	var component;

	beforeEach(() => {
		component = fixture('d2l-enrollment-summary-view-fixture');
	});

	describe('Unit Tests on Methods', () => {
		it('_updateFlattenedOrgHrefs', () => {
			// Add the first elements
			const currentList = [
				'/org/1',
				'/org/2',
				'/org/3',
				'/org/4'
			];
			const oldSet = [
				'/org/1',
				'/org/2',
				'/org/3'
			];
			const newSet = [
				'/org/1',
				'/org/5'
			];
			const expectedResults = [
				'/org/1',
				'/org/4',
				'/org/5'
			];
			const results = component._updateFlattenedOrgHrefs(currentList, oldSet, newSet);
			expect(results).deep.equal(expectedResults);

		});
	});

});
