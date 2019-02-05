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
window.D2L.PolymerBehaviors.Enrollment.Card = window.D2L.PolymerBehaviors.Enrollment.Card || {};
/*
* @polymerBehavior D2L.PolymerBehaviors.Enrollment.Card.LocalizeBehavior
*/
D2L.PolymerBehaviors.Enrollment.Card.LocalizeBehaviorImpl = {
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
* @polymerBehavior D2L.PolymerBehaviors.Enrollment.Card.LocalizeBehavior
*/
D2L.PolymerBehaviors.Enrollment.Card.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LocalizeBehaviorImpl,
	D2L.PolymerBehaviors.Enrollment.Card.LangArBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangDeBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangEnBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangEsBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangFiBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangFrBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangJaBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangKoBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangNlBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangPtBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangSvBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangTrBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangZhtwBehavior,
	D2L.PolymerBehaviors.Enrollment.Card.LangZhBehavior
];
