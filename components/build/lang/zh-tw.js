'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'activityProgress': '活動',
			'changeImage': '變更影像',
			'closed': '已關閉',
			'completed': '完成',
			'completedDaysAgo': '{number} 天前完成',
			'completedOn': '{dateTime} 時完成',
			'completedToday': '今天完成',
			'completedTomorrow': '明天完成',
			'completedYesterday': '昨天完成',
			'continue': '繼續',
			'continueToModule': '導覽至單元 {module} 以繼續',
			'courseOfferingInformation': '開課項目資訊',
			'coursePinButton': '{course} 已置頂。將課程取消置頂',
			'courseSettings': '{course} 課程設定',
			'description': '說明',
			'disabled': '已停用',
			'dueDaysAgo': '{number} 天前截止',
			'dueOn': '{dateTime} 時截止',
			'dueToday': '今天截止',
			'dueTomorrow': '明天截止',
			'dueYesterday': '昨天截止',
			'ended': '已於 {date} 的 {time} 結束',
			'endsAt': '於 {date} 的 {time} 結束',
			'enrollmentProgressBar': '{title} 已完成 {percentage}%',
			'inactive': '停用',
			'moduleProgress': '單元',
			'new': '新式',
			'overdue': '逾期',
			'pin': '置頂',
			'pinActionResult': '已將 {course} 置頂',
			'startsAt': '於 {date} 的 {time} 開始',
			'unpin': '取消置頂',
			'unpinActionResult': '已將 {course} 取消置頂',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

