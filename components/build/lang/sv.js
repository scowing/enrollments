'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'activityProgress': 'Aktiviteter',
			'changeImage': 'Ändra bild',
			'closed': 'Stängd',
			'completed': 'Klart',
			'completedDaysAgo': 'Slutfört för {number} dagar sedan',
			'completedOn': 'Slutfört {dateTime}',
			'completedToday': 'Slutfört idag',
			'completedTomorrow': 'Slutförs imorgon',
			'completedYesterday': 'Slutfördes igår',
			'continue': 'Fortsätt',
			'continueToModule': 'Fortsätt genom att navigera till modulen {module}',
			'courseOfferingInformation': 'Information om kursutbud',
			'coursePinButton': '{course} är markerad. Avmarkera kurs',
			'courseSettings': 'Kursinställningar för {course}',
			'description': 'Beskrivning',
			'disabled': 'Avaktiverad',
			'dueDaysAgo': 'Förföll för {number} dagar sedan',
			'dueOn': 'Förföll {dateTime}',
			'dueToday': 'Förfaller idag',
			'dueTomorrow': 'Förfaller imorgon',
			'dueYesterday': 'Förföll igår',
			'ended': 'Slutade {date} kl. {time}',
			'endsAt': 'Slutar {date} kl. {time}',
			'enrollmentProgressBar': 'Slutfört {percent} % av {title}',
			'inactive': 'Inaktiv',
			'moduleProgress': 'Moduler',
			'new': 'Ny',
			'overdue': 'Försenad',
			'pin': 'Markera',
			'pinActionResult': '{course} har markerats',
			'startsAt': 'Startar {date} kl. {time}',
			'unpin': 'Avmarkera',
			'unpinActionResult': '{course} har avmarkerats',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);

