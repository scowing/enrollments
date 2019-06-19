'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'changeImage': 'イメージの変更',
			'closed': 'クローズ',
			'completed': '完了',
			'completedDaysAgo': '{number} 日前に完了',
			'completedOn': '{dateTime} に完了',
			'completedToday': '本日完了',
			'completedTomorrow': '明日完了',
			'completedYesterday': '昨日完了',
			'continue': 'Continue',
			'continueToModule': 'Continue by navigating to module, {module}',
			'courseOfferingInformation': 'コース内容情報',
			'coursePinButton': '{course} は固定されています。コースの固定解除',
			'courseSettings': '{course} コースの設定',
			'description': 'Description',
			'disabled': '無効',
			'dueDaysAgo': '期限は {number} 日前',
			'dueOn': '期限は {dateTime}',
			'dueToday': '本日期限',
			'dueTomorrow': '期限は明日',
			'dueYesterday': '期限は昨日',
			'ended': '{date} {time} に終了済み',
			'endsAt': '{date} {time} に終了',
			'enrollmentProgressBar': 'Completed {percentage}% of {title}',
			'inactive': '非アクティブ',
			'new': '新規',
			'overdue': '期限切れ',
			'pin': '固定',
			'pinActionResult': '{course} は固定されました',
			'startsAt': '{date} {time} に開始',
			'unpin': '固定解除',
			'unpinActionResult': '{course} は固定解除されました'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

