'use strict';

import { Entity } from 'siren-sdk/es6/Entity.js';
import { Rels } from 'd2l-hypermedia-constants';
import { OrganizationEntity } from 'd2l-organizations/OrganizationEntity.js';

export const classes = {
	pinned: 'pinned',
	enrollment: 'enrollment'
};

export class EnrollmentEntity extends Entity {
	// Entity has a constructor that is called from the factory to keep track of what is required to be cleaned.
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

	onOrganizationChange(onChange) {
		const organizationHref = this.organizationHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
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