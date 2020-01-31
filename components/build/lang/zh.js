'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'activityProgress': '活动',
			'changeImage': '更改图像',
			'closed': '已关闭',
			'completed': '完成',
			'completedDaysAgo': '{number} 天前已完成',
			'completedOn': '{dateTime} 已完成',
			'completedToday': '今天已完成',
			'completedTomorrow': '明天完成',
			'completedYesterday': '昨天已完成',
			'continue': '继续',
			'continueToModule': '导航到模块继续操作，{module}',
			'courseOfferingInformation': '课程优惠信息',
			'coursePinButton': '{course} 已锁定。取消锁定课程',
			'courseSettings': '{course} 课程设置',
			'description': '描述',
			'disabled': '已禁用',
			'dueDaysAgo': '{number} 天前过期',
			'dueOn': '{dateTime} 过期',
			'dueToday': '今天过期',
			'dueTomorrow': '明天过期',
			'dueYesterday': '昨天过期',
			'ended': '已于 {date} {time} 结束',
			'endsAt': '{date} {time} 结束',
			'enrollmentProgressBar': '已完成 {title} 的 {percentage}%',
			'inactive': '非活动',
			'moduleProgress': '模块',
			'new': '新的',
			'overdue': '过期',
			'pin': '锁定',
			'pinActionResult': '{course} 已锁定',
			'startsAt': '{date} {time} 开始',
			'unpin': '取消锁定',
			'unpinActionResult': '{course} 已取消锁定',
			'noCoursesMessage': 'You don\'t have any courses or learning paths to display.',
			'viewAllLearning': 'View All Learning'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);

