'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {default as lang} from '../../lang/fr-on.js';

/* @polymerMixin */
const LangFrOnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fron = lang;
	}
};

export const LangFrOn = dedupingMixin(LangFrOnImpl);

