'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'activityProgress': 'Atividades',
			'changeImage': 'Alterar imagem',
			'closed': 'Fechado',
			'completed': 'Concluído',
			'completedDaysAgo': 'Concluído há {number} dias',
			'completedOn': 'Concluído em {dateTime}',
			'completedToday': 'Concluído hoje',
			'completedTomorrow': 'Concluído amanhã',
			'completedYesterday': 'Concluído ontem',
			'continue': 'Continuar',
			'continueToModule': 'Continue navegando até o módulo, {module}',
			'courseOfferingInformation': 'Informações de oferta de curso',
			'coursePinButton': '{course} está fixado. Desafixar curso',
			'courseSettings': 'Configurações do curso de {course}',
			'description': 'Descrição',
			'disabled': 'Desabilitado',
			'dueDaysAgo': 'Vencido há {number} dias',
			'dueOn': 'Vencido em {dateTime}',
			'dueToday': 'Vence hoje',
			'dueTomorrow': 'Vence amanhã',
			'dueYesterday': 'Venceu ontem',
			'ended': 'Encerrado em {date} às {time}',
			'endsAt': 'Encerra em {date} às {time}',
			'enrollmentProgressBar': '{percentage}% concluído de {title}',
			'inactive': 'Inativo',
			'moduleProgress': 'Módulos',
			'new': 'Novo',
			'overdue': 'Atraso',
			'pin': 'Fixar',
			'pinActionResult': '{course} foi fixado',
			'startsAt': 'Inicia em {date} às {time}',
			'unpin': 'Desafixar',
			'unpinActionResult': '{course} foi desafixado',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);

