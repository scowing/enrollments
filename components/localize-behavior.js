import 'd2l-localize-behavior/d2l-localize-behavior.js';
import './build/lang/ar.js';
import './build/lang/de.js';
import './build/lang/en.js';
import './build/lang/es.js';
import './build/lang/fi.js';
import './build/lang/fr.js';
import './build/lang/ja.js';
import './build/lang/ko.js';
import './build/lang/nl.js';
import './build/lang/pt.js';
import './build/lang/sv.js';
import './build/lang/tr.js';
import './build/lang/zh-tw.js';
import './build/lang/zh.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Enrollment = window.D2L.PolymerBehaviors.Enrollment || {};
/*
* @polymerBehavior D2L.PolymerBehaviors.Enrollment.LocalizeBehaviorImpl
*/
D2L.PolymerBehaviors.Enrollment.LocalizeBehaviorImpl = {
	properties: {
		locale: {
			type: String,
			value: function() {
				return document.documentElement.lang
					|| document.documentElement.getAttribute('data-lang-default')
					|| 'en-us';
			}
		},
		resources: {
			value: function() {
				return {
					'en': this.en,
					'ar': this.ar,
					'de': this.de,
					'es': this.es,
					'fi': this.fi,
					'fr': this.fr,
					'ja': this.ja,
					'ko': this.ko,
					'nl': this.nl,
					'pt': this.pt,
					'sv': this.sv,
					'tr': this.tr,
					'zh': this.zh,
					'zh-tw': this.zhTw
				};
			}
		}
	}
};

/*
* @polymerBehavior D2L.PolymerBehaviors.Enrollment.LocalizeBehavior
*/
D2L.PolymerBehaviors.Enrollment.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.Enrollment.LocalizeBehaviorImpl,
	D2L.PolymerBehaviors.Enrollment.LangArBehavior,
	D2L.PolymerBehaviors.Enrollment.LangDeBehavior,
	D2L.PolymerBehaviors.Enrollment.LangEnBehavior,
	D2L.PolymerBehaviors.Enrollment.LangEsBehavior,
	D2L.PolymerBehaviors.Enrollment.LangFiBehavior,
	D2L.PolymerBehaviors.Enrollment.LangFrBehavior,
	D2L.PolymerBehaviors.Enrollment.LangJaBehavior,
	D2L.PolymerBehaviors.Enrollment.LangKoBehavior,
	D2L.PolymerBehaviors.Enrollment.LangNlBehavior,
	D2L.PolymerBehaviors.Enrollment.LangPtBehavior,
	D2L.PolymerBehaviors.Enrollment.LangSvBehavior,
	D2L.PolymerBehaviors.Enrollment.LangTrBehavior,
	D2L.PolymerBehaviors.Enrollment.LangZhtwBehavior,
	D2L.PolymerBehaviors.Enrollment.LangZhBehavior
];
