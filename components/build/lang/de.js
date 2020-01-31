'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'activityProgress': 'Aktivitäten',
			'changeImage': 'Bild ändern',
			'closed': 'Geschlossen',
			'completed': 'Abgeschlossen',
			'completedDaysAgo': 'Vor {number} abgeschlossen',
			'completedOn': 'Am {dateTime} abgeschlossen',
			'completedToday': 'Heute abgeschlossen',
			'completedTomorrow': 'Morgen abgeschlossen',
			'completedYesterday': 'Gestern abgeschlossen',
			'continue': 'Weiter',
			'continueToModule': 'Fahren Sie fort, indem Sie zu Modul {module} navigieren',
			'courseOfferingInformation': 'Informationen zum Kursangebot',
			'coursePinButton': '{course} ist angeheftet. Kurs lösen',
			'courseSettings': 'Kurseinstellungen für {course}',
			'description': 'Beschreibung',
			'disabled': 'Deaktiviert',
			'dueDaysAgo': 'Vor {number} Tagen fällig',
			'dueOn': 'Fällig am {dateTime}',
			'dueToday': 'Heute fällig',
			'dueTomorrow': 'Morgen fällig',
			'dueYesterday': 'Gestern fällig',
			'ended': 'Beendet am {date} um {time}',
			'endsAt': 'Endet am {date} um {time}',
			'enrollmentProgressBar': '{percentage} % von {title} abgeschlossen',
			'inactive': 'Inaktiv',
			'moduleProgress': 'Module',
			'new': 'Neu',
			'overdue': 'Überfällig',
			'pin': 'Anheften',
			'pinActionResult': '{course} wurde angeheftet',
			'startsAt': 'Beginnt am {date} um {time}',
			'unpin': 'Lösen',
			'unpinActionResult': '{course} wurde gelöst',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

