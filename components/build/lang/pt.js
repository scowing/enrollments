'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'changeImage': 'Alterar imagem',
			'closed': 'Fechado',
			'completed': 'Concluído',
			'completedDaysAgo': 'Concluído há {number} dias',
			'completedOn': 'Concluído em {dateTime}',
			'completedToday': 'Concluído hoje',
			'completedTomorrow': 'Concluído amanhã',
			'completedYesterday': 'Concluído ontem',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Informações de Oferta de Curso',
			'coursePinButton': '{course} está fixado. Desafixar curso',
			'courseSettings': 'Configurações de curso de {course}',
			'description': 'Description',
			'disabled': 'Desabilitado',
			'dueDaysAgo': 'Vencido há {number} dias',
			'dueOn': 'Vencido em {dateTime}',
			'dueToday': 'Vence hoje',
			'dueTomorrow': 'Vence amanhã',
			'dueYesterday': 'Venceu ontem',
			'ended': 'Encerrado em {date} às {time}',
			'endsAt': 'Encerra em {date} às {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Inativo',
			'new': 'Novo',
			'overdue': 'Atraso',
			'pin': 'Fixar',
			'pinActionResult': '{course} foi fixado',
			'startsAt': 'Inicia em {date} às {time}',
			'unpin': 'Desafixar',
			'unpinActionResult': '{course} foi desafixado'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);

