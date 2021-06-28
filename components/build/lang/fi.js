'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/fi.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = lang;
	}
};

export const LangFi = dedupingMixin(LangFiImpl);

