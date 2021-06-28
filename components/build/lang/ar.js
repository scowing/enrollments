'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/ar.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = lang;
	}
};

export const LangAr = dedupingMixin(LangArImpl);

