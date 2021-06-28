'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/es-es.js';

/* @polymerMixin */
const LangEsesImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.eses = lang;
	}
};

export const LangEses = dedupingMixin(LangEsesImpl);

