'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'changeImage': 'Modifier l’image',
			'closed': 'Fermé',
			'completed': 'Terminé',
			'completedDaysAgo': 'Terminé il y a {number} jours',
			'completedOn': 'Terminé le {dateTime}',
			'completedToday': 'Terminé aujourd’hui',
			'completedTomorrow': 'Terminé demain',
			'completedYesterday': 'Terminé hier',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Informations sur l’offre de cours',
			'coursePinButton': '{course} est épinglé. Désépingler le cours',
			'courseSettings': 'Paramètres du cours {course}',
			'description': 'Description',
			'disabled': 'Désactivé',
			'dueDaysAgo': 'Dû dans {number} jours',
			'dueOn': 'Dû le {dateTime}',
			'dueToday': 'Dû aujourd’hui',
			'dueTomorrow': 'Dû demain',
			'dueYesterday': 'Dû hier',
			'ended': 'Terminé le {date} à {time}',
			'endsAt': 'Termine le {date} à {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Inactif',
			'new': 'Nouveau',
			'overdue': 'En retard',
			'pin': 'Épingler',
			'pinActionResult': '{course} a été épinglé',
			'startsAt': 'Commence le {date} à {time}',
			'unpin': 'Désépingler',
			'unpinActionResult': '{course} a été désépinglé'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);

