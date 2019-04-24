'use strict';

import { Entity } from 'siren-sdk/es6/Entity.js';
import { Rels } from 'd2l-hypermedia-constants';
import { OrganizationEntity } from 'd2l-organizations/OrganizationEntity.js';

export const classes = {
	pinned: 'pinned',
	enrollment: 'enrollment'
};

export class EnrollmentEntity extends Entity {
	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.organization).href;
	}

	completionDate() {
		if (!this._entity) {
			return;
		}
		return this._sirenClassProperty(this._entity, 'completion');
	}

	dueDate() {
		if (!this._entity) {
			return;
		}
		return this._sirenClassProperty(this._entity, 'due-date');
	}

	isAttended() {
		return this.hasClass('attended');
	}

	enrollments() {
		return this._entity && this._entity.getSubEntities('https://api.brightspace.com/rels/enrollment');
	}

	userActivityUsageUrl() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Activities.userActivityUsage)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Activities.userActivityUsage).href;
	}

	entity() {
		return this._entity;
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.organizationHref();
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	_sirenClassProperty(entity, sirenClass) {
		if (!entity.hasSubEntityByClass(sirenClass)) {
			return;
		}
		var subEntity = entity.getSubEntityByClass(sirenClass);

		if (subEntity.hasClass('date')) {
			return subEntity.properties ? subEntity.properties.date : null;
		} else if (subEntity.hasClass('duration')) {
			return subEntity.properties ? subEntity.properties.seconds : null;
		} else if (subEntity.hasClass('completion')) {
			return this._sirenClassProperty(subEntity,  'completion-date');
		}
	}

}
