'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'changeImage': 'Afbeelding wijzigen',
			'closed': 'Gesloten',
			'completed': 'Voltooien',
			'completedDaysAgo': '{number} dagen geleden voltooid',
			'completedOn': 'Voltooid op {dateTime}',
			'completedToday': 'Vandaag voltooid',
			'completedTomorrow': 'Morgen voltooid',
			'completedYesterday': 'Gisteren voltooid',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Informatie cursuseditie',
			'coursePinButton': '{course} is vastgepind. Cursus losmaken',
			'courseSettings': '{course}-cursusinstellingen',
			'description': 'Description',
			'disabled': 'Uitgeschakeld',
			'dueDaysAgo': 'Uiterste datum {number} dagen geleden',
			'dueOn': 'Uiterste datum {dateTime}',
			'dueToday': 'Uiterste datum vandaag',
			'dueTomorrow': 'Uiterste datum morgen',
			'dueYesterday': 'Uiterste datum gisteren',
			'ended': 'Geëindigd op {date} om {time}',
			'endsAt': 'Eindigt op {date} om {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Inactief',
			'new': 'Nieuw',
			'overdue': 'Achterstallig',
			'pin': 'Vastpinnen',
			'pinActionResult': '{course} is vastgepind',
			'startsAt': 'Start op {date} om {time}',
			'unpin': 'Losmaken',
			'unpinActionResult': '{course} is losgemaakt'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

