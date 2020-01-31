'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'activityProgress': 'النشاطات',
			'changeImage': 'تغيير الصورة',
			'closed': 'تم الإغلاق',
			'completed': 'اكتمال',
			'completedDaysAgo': 'تم الإكمال منذ {number} من الأيام',
			'completedOn': 'تم الإكمال في {dateTime}',
			'completedToday': 'تم الإكمال اليوم',
			'completedTomorrow': 'سيتم الإكمال غدًا',
			'completedYesterday': 'تم الإكمال بالأمس',
			'continue': 'متابعة',
			'continueToModule': 'المتابعة عبر الانتقال إلى الوحدة النمطية، {module}',
			'courseOfferingInformation': 'معلومات مضمون المقرر التعليمي',
			'coursePinButton': 'تم تثبيت {course}. إلغاء تثبيت المقرر التعليمي',
			'courseSettings': 'إعدادات المقرر التعليمي {course}',
			'description': 'الوصف',
			'disabled': 'تم التعطيل',
			'dueDaysAgo': 'مضى على تاريخ الاستحقاق {number} من الأيام',
			'dueOn': 'تاريخ الاستحقاق في {dateTime}',
			'dueToday': 'تاريخ الاستحقاق اليوم',
			'dueTomorrow': 'تاريخ الاستحقاق غدًا',
			'dueYesterday': 'كان تاريخ الاستحقاق بالأمس',
			'ended': 'تم الانتهاء بتاريخ {date} عند {time}',
			'endsAt': 'ينتهي بتاريخ {date} عند {time}',
			'enrollmentProgressBar': 'تم إكمال {percentage}% من {title}',
			'inactive': 'غير نشط',
			'moduleProgress': 'الوحدات النمطية',
			'new': 'جديد',
			'overdue': 'تم تجاوز تاريخ الاستحقاق',
			'pin': 'تثبيت',
			'pinActionResult': 'تم تثبيت {course}',
			'startsAt': 'يبدأ بتاريخ {date} عند {time}',
			'unpin': 'إلغاء التثبيت',
			'unpinActionResult': 'تم إلغاء تثبيت {course}',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);

