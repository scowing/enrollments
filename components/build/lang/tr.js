'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'activityProgress': 'Etkinlikler',
			'changeImage': 'Görüntüyü Değiştir',
			'closed': 'Kapatıldı',
			'completed': 'Tamamla',
			'completedDaysAgo': '{number} Gün Önce Tamamlandı',
			'completedOn': '{dateTime} Tarihinde Tamamlandı',
			'completedToday': 'Bugün Tamamlandı',
			'completedTomorrow': 'Yarın Tamamlanacak',
			'completedYesterday': 'Dün Tamamlandı',
			'continue': 'Devam',
			'continueToModule': '{module} modülüne giderek devam edin',
			'courseOfferingInformation': 'Ders Önerisi Bilgileri',
			'coursePinButton': '{course} adlı ders sabitlendi. Dersin sabitlemesini geri al',
			'courseSettings': '{course} adlı dersin ayarları',
			'description': 'Açıklama',
			'disabled': 'Devre Dışı Bırakıldı',
			'dueDaysAgo': 'Son Teslim Tarihi {number} Gün Önceydi',
			'dueOn': 'Son Teslim Tarihi: {dateTime}',
			'dueToday': 'En Geç Bugün Teslim Edilecek',
			'dueTomorrow': 'En Geç Yarın Teslim Edilecek',
			'dueYesterday': 'Dün Teslim Edilmeliydi',
			'ended': '{date} tarihinde, şu saatte sona erdi: {time}',
			'endsAt': '{date} tarihinde, şu saatte sona erecek: {time}',
			'enrollmentProgressBar': '%{percentage} / {title} tamamlandı',
			'inactive': 'Etkin Değil',
			'moduleProgress': 'Modüller',
			'new': 'Yeni',
			'overdue': 'Süresi Dolmuş',
			'pin': 'Sabitle',
			'pinActionResult': '{course} adlı ders sabitlendi',
			'startsAt': '{date} tarihinde, şu saatte başlayacak: {time}',
			'unpin': 'Sabitlemeyi Geri Al',
			'unpinActionResult': '{course} dersinin sabitlemesi geri alındı',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

