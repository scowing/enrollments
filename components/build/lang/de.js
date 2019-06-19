'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'changeImage': 'Bild ändern',
			'closed': 'Geschlossen',
			'completed': 'Abgeschlossen',
			'completedDaysAgo': 'Vor {number} abgeschlossen',
			'completedOn': 'Am {dateTime} abgeschlossen',
			'completedToday': 'Heute abgeschlossen',
			'completedTomorrow': 'Morgen abgeschlossen',
			'completedYesterday': 'Gestern abgeschlossen',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Informationen zum Kursangebot',
			'coursePinButton': '{course} ist angeheftet. Kurs lösen',
			'courseSettings': 'Kurseinstellungen für {course}',
			'description': 'Description',
			'disabled': 'Deaktiviert',
			'dueDaysAgo': 'Vor {number} Tagen fällig',
			'dueOn': 'Fällig am {dateTime}',
			'dueToday': 'Heute fällig',
			'dueTomorrow': 'Morgen fällig',
			'dueYesterday': 'Gestern fällig',
			'ended': 'Beendet am {date} um {time}',
			'endsAt': 'Endet am {date} um {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Inaktiv',
			'new': 'Neu',
			'overdue': 'Überfällig',
			'pin': 'Anheften',
			'pinActionResult': '{course} wurde angeheftet',
			'startsAt': 'Beginnt am {date} um {time}',
			'unpin': 'Lösen',
			'unpinActionResult': '{course} wurde gelöst'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

