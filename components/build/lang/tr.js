'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'changeImage': 'Görüntüyü Değiştir',
			'closed': 'Kapandı',
			'completed': 'Tamamla',
			'completedDaysAgo': '{number} Gün Önce Tamamlandı',
			'completedOn': '{dateTime} Tarihinde Tamamlandı',
			'completedToday': 'Bugün Tamamlandı',
			'completedTomorrow': 'Yarın Tamamlanacak',
			'completedYesterday': 'Dün Tamamlandı',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'Ders Önerisi Bilgileri',
			'coursePinButton': '{course} dersi sabitlendi. Dersin sabitlemesini geri al',
			'courseSettings': '{course} dersi ayarları',
			'description': 'Description',
			'disabled': 'Devre Dışı Bırakıldı',
			'dueDaysAgo': 'Son Teslim Tarihi {number} Gün Önceydi',
			'dueOn': 'Son Teslim Tarihi {dateTime}',
			'dueToday': 'Bugün Süresi Doluyor',
			'dueTomorrow': 'Son Teslim Tarihi Yarın',
			'dueYesterday': 'Son Teslim Tarihi Dün',
			'ended': '{date} tarihinde, şu saatte sona erdi: {time}',
			'endsAt': '{date} tarihinde, şu saatte sona erecek: {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': 'Etkin Değil',
			'new': 'Yeni',
			'overdue': 'Süresi Dolmuş',
			'pin': 'Sabitle',
			'pinActionResult': '{course} dersi sabitlendi',
			'startsAt': '{date} tarihinde, şu saatte başlayacak: {time}',
			'unpin': 'Sabitlemeyi Geri Al',
			'unpinActionResult': '{course} dersinin sabitlemesi geri alındı'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

