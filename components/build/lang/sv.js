'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/sv.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = lang;
	}
};

export const LangSv = dedupingMixin(LangSvImpl);

