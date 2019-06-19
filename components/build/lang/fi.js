'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = {
			'changeImage': 'Change Image',
			'closed': 'Closed',
			'completed': 'Complete',
			'completedDaysAgo': 'Completed {number} Days Ago',
			'completedOn': 'Completed {dateTime}',
			'completedToday': 'Completed Today',
			'completedTomorrow': 'Completed Tomorrow',
			'completedYesterday': 'Completed Yesterday',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Course Offering Information',
			'coursePinButton': '{course} is pinned. Unpin course',
			'courseSettings': '{course} course settings',
			'description': 'Description',
			'disabled': 'Disabled',
			'dueDaysAgo': 'Due {number} Days Ago',
			'dueOn': 'Due {dateTime}',
			'dueToday': 'Due Today',
			'dueTomorrow': 'Due Tomorrow',
			'dueYesterday': 'Due Yesterday',
			'ended': 'Ended {date} at {time}',
			'endsAt': 'Ends {date} at {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Inactive',
			'new': 'New',
			'overdue': 'Overdue',
			'pin': 'Pin',
			'pinActionResult': '{course} has been pinned',
			'startsAt': 'Starts {date} at {time}',
			'unpin': 'Unpin',
			'unpinActionResult': '{course} has been unpinned'
		};
	}
};

export const LangFi = dedupingMixin(LangFiImpl);

