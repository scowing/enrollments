'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/cy-gb.js';

/* @polymerMixin */
const LangCygbImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.cygb = lang;
	}
};

export const LangCygb = dedupingMixin(LangCygbImpl);

