'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'changeImage': '變更影像',
			'closed': '已關閉',
			'completed': '完成',
			'completedDaysAgo': '已完成：{number} 天前',
			'completedOn': '已完成：{dateTime}',
			'completedToday': '已完成：今天',
			'completedTomorrow': '已完成：明天',
			'completedYesterday': '已完成：昨天',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': '開課項目資訊',
			'coursePinButton': '{course} 已置頂。將課程取消置頂',
			'courseSettings': '{course} 課程設定',
			'description': 'Description',
			'disabled': '已停用',
			'dueDaysAgo': '截止時間：{number} 天前',
			'dueOn': '截止時間：{dateTime}',
			'dueToday': '今天截止',
			'dueTomorrow': '截止時間：明天',
			'dueYesterday': '截止時間：昨天',
			'ended': '已結束於 {date} 的 {time}',
			'endsAt': '結束於 {date} 的 {time}',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': '停用',
			'new': '新',
			'overdue': '逾期',
			'pin': '置頂',
			'pinActionResult': '已將 {course} 置頂',
			'startsAt': '開始於 {date} 的 {time}',
			'unpin': '取消置頂',
			'unpinActionResult': '已將 {course} 取消置頂'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

