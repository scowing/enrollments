'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'activityProgress': 'アクティビティ',
			'changeImage': 'イメージの変更',
			'closed': 'クローズ',
			'completed': '完了',
			'completedDaysAgo': '{number} 日前に完了',
			'completedOn': '{dateTime} に完了',
			'completedToday': '本日完了',
			'completedTomorrow': '明日完了',
			'completedYesterday': '昨日完了',
			'continue': '続行',
			'continueToModule': 'モジュール、{module} に移動して続行',
			'courseOfferingInformation': 'コース内容情報',
			'coursePinButton': '{course} は固定されています。コースの固定解除',
			'courseSettings': '{course} コースの設定',
			'description': '説明',
			'disabled': '無効化',
			'dueDaysAgo': '期限は {number} 日前',
			'dueOn': '期限は {dateTime}',
			'dueToday': '本日期限',
			'dueTomorrow': '期限は明日',
			'dueYesterday': '期限は昨日',
			'ended': '{date} {time} に終了済み',
			'endsAt': '{date} {time} に終了',
			'enrollmentProgressBar': '{title} の {percentage}％完了済み',
			'inactive': '非アクティブ',
			'moduleProgress': 'モジュール',
			'new': '新規',
			'overdue': '期限切れ',
			'pin': '固定',
			'pinActionResult': '{course} は固定されました',
			'startsAt': '{date} {time} に開始',
			'unpin': '固定解除',
			'unpinActionResult': '{course} は固定解除されました',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

