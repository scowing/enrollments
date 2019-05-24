'use strict';

import { Entity } from 'siren-sdk/src/es6/Entity.js';
import { Rels } from 'd2l-hypermedia-constants';

export class EnrollmentCollectionEntity extends Entity {
	enrollmentsHref() {
		if (!this._entity || !this._entity.getSubEntitiesByRel) {
			return;
		}
		const enrollmentEntities = this._entity.getSubEntitiesByRel(Rels.userEnrollment);
		return enrollmentEntities.map(e => e.href).filter(href => href);
	}
}
