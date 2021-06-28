'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/en.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = lang;
	}
};

export const LangEn = dedupingMixin(LangEnImpl);

