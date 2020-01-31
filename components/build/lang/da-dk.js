'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDadkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'changeImage': 'Skift billede',
			'closed': 'Lukket',
			'completed': 'Fuldført',
			'completedDaysAgo': 'Fuldført for {number} dage siden',
			'completedOn': 'Fuldført den {dateTime}',
			'completedToday': 'Fuldført i dag',
			'completedTomorrow': 'Fuldført i morgen',
			'completedYesterday': 'Fuldført i går',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Oplysninger om kursustilbud',
			'coursePinButton': '{course} er fastgjort. Frigør kursus',
			'courseSettings': 'Kursusindstillinger for {course}',
			'description': 'Description',
			'disabled': 'Deaktiveret',
			'dueDaysAgo': 'Forfalden for {number} dage siden',
			'dueOn': 'Forfalden den {dateTime}',
			'dueToday': 'Forfalden i dag',
			'dueTomorrow': 'Forfalden i morgen',
			'dueYesterday': 'Forfalden i går',
			'ended': 'Sluttede {date} kl. {time}',
			'endsAt': 'Slutter {date} kl. {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Inaktiv',
			'new': 'Ny',
			'overdue': 'Forsinket',
			'pin': 'Fastgør',
			'pinActionResult': '{course} er blevet fastgjort',
			'startsAt': 'Begynder {date} kl. {time}',
			'unpin': 'Frigør',
			'unpinActionResult': '{course} er blevet frigjort',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangDadk = dedupingMixin(LangDadkImpl);

