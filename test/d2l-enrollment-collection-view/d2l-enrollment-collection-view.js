import { runAxe } from '@brightspace-ui/core/tools/a11y-test-helper.js';

describe('d2l-enrollment-collection-view', () => {
	let element;

	beforeEach(async() => {
		element = fixture('d2l-enrollment-collection-view-fixture');
		await element.updateComplete;
	});

	it('should pass all axe tests', async() => {
		await runAxe(element);
	});

});
