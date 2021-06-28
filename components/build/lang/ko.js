'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/ko.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = lang;
	}
};

export const LangKo = dedupingMixin(LangKoImpl);

