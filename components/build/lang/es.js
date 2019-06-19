'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'changeImage': 'Cambiar imagen',
			'closed': 'Cerrado',
			'completed': 'Completo',
			'completedDaysAgo': 'Completado hace {number} días',
			'completedOn': 'Completado a la(s) {dateTime}',
			'completedToday': 'Completado hoy',
			'completedTomorrow': 'Completado mañana',
			'completedYesterday': 'Completado ayer',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Información de oferta de cursos',
			'coursePinButton': '{course} está anclado. Desanclar curso',
			'courseSettings': 'Configuración del curso {course}',
			'description': 'Description',
			'disabled': 'Deshabilitado',
			'dueDaysAgo': 'Entrega hace {number} días',
			'dueOn': 'Entrega a la(s) {dateTime}',
			'dueToday': 'Entrega hoy',
			'dueTomorrow': 'Entrega mañana',
			'dueYesterday': 'Entrega ayer',
			'ended': 'Finalizado {date} a la(s) {time}',
			'endsAt': 'Finaliza {date} a la(s) {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Inactivo',
			'new': 'Nuevo',
			'overdue': 'Plazo vencido',
			'pin': 'Anclar',
			'pinActionResult': '{course} se ancló',
			'startsAt': 'Comienza {date} a la(s) {time}',
			'unpin': 'Desanclar',
			'unpinActionResult': '{course} se desancló'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);

