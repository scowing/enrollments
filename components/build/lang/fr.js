'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'activityProgress': 'Activités',
			'changeImage': 'Modifier l\'image',
			'closed': 'Fermé',
			'completed': 'Terminé',
			'completedDaysAgo': 'Terminé il y a {number} jours',
			'completedOn': 'Terminé à {dateTime}',
			'completedToday': 'Terminé aujourd\'hui',
			'completedTomorrow': 'Terminé demain',
			'completedYesterday': 'Terminé hier',
			'continue': 'Continuer',
			'continueToModule': 'Continuer pour accéder au module, {module}',
			'courseOfferingInformation': 'Information sur l\'offre de cours',
			'coursePinButton': 'Le cours {course} est épinglé. Annuler l\'épinglage du cours',
			'courseSettings': 'Paramètres du cours {course}',
			'description': 'Description',
			'disabled': 'Désactivé(e)',
			'dueDaysAgo': 'À remettre il y a {number} jours',
			'dueOn': 'À remettre {dateTime}',
			'dueToday': 'À remettre aujourd\'hui',
			'dueTomorrow': 'À remettre demain',
			'dueYesterday': 'À remettre hier',
			'ended': 'S\'est terminé le {date} à {time}',
			'endsAt': 'Se termine le {date} à {time}',
			'enrollmentProgressBar': 'Achèvement à {percentage} % pour {title}',
			'inactive': 'Inactif',
			'moduleProgress': 'Modules',
			'new': 'Nouvelle',
			'overdue': 'En retard',
			'pin': 'Épingler',
			'pinActionResult': 'Le cours {course} a été épinglé',
			'startsAt': 'Commence le {date} à {time}',
			'unpin': 'Annuler l\'épinglage',
			'unpinActionResult': 'L\'épinglage du cours {course} a été annulé',
			'noCoursesMessage': 'Vous n\'avez aucun cours ou chemin d\'apprentissage à afficher.',
			'viewAllLearning': 'Voir tous les apprentissages'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

