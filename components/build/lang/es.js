'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'activityProgress': 'Actividades',
			'changeImage': 'Cambiar imagen',
			'closed': 'Cerrado',
			'completed': 'Completo',
			'completedDaysAgo': 'Completado hace {number} días',
			'completedOn': 'Completado el {dateTime}',
			'completedToday': 'Completado hoy',
			'completedTomorrow': 'Completado mañana',
			'completedYesterday': 'Completado ayer',
			'continue': 'Continuar',
			'continueToModule': 'Para continuar, vaya al módulo {module}',
			'courseOfferingInformation': 'Información de oferta de cursos',
			'coursePinButton': '{course} está anclado. Desanclar curso',
			'courseSettings': 'Configuración del curso {course}',
			'description': 'Descripción',
			'disabled': 'Deshabilitado',
			'dueDaysAgo': 'Entrega hace {number} días',
			'dueOn': 'Entrega el {dateTime}',
			'dueToday': 'Entrega hoy',
			'dueTomorrow': 'Entrega mañana',
			'dueYesterday': 'Entrega ayer',
			'ended': 'Finalizado el {date} a la(s) {time}',
			'endsAt': 'Finaliza el {date} a la(s) {time}',
			'enrollmentProgressBar': 'El {percentage} % de {title} está completo',
			'inactive': 'Inactivo',
			'moduleProgress': 'Módulos',
			'new': 'Nuevo',
			'overdue': 'Plazo vencido',
			'pin': 'Anclar',
			'pinActionResult': '{course} se ancló',
			'startsAt': 'Comienza el {date} a la(s) {time}',
			'unpin': 'Desanclar',
			'unpinActionResult': '{course} se desancló',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);

