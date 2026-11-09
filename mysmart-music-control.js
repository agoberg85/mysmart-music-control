const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(a,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:m}=Object,p=globalThis,u=p.trustedTypes,_=u?u.emptyScript:"",g=p.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&l(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const s=r.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const s=this.constructor;if(!1===a&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??f)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,$=e=>e,x=k.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+A,M=`<${P}>`,V=document,D=()=>V.createComment(""),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,T="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,z=/>/g,L=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,R=/"/g,U=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),H=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),K=new WeakMap,W=V.createTreeWalker(V,129);function q(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,a=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=F;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===F?"!--"===l[1]?o=O:void 0!==l[1]?o=z:void 0!==l[2]?(U.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=L):void 0!==l[3]&&(o=L):o===L?">"===l[0]?(o=r??F,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?L:'"'===l[3]?R:N):o===R||o===N?o=L:o===O||o===z?o=F:(o=L,r=void 0);const h=o===L&&e[t+1].startsWith("/>")?" ":"";s+=o===F?i+M:c>=0?(a.push(n),i.slice(0,c)+C+i.slice(c)+A+h):i+A+(-2===c?t:h)}return[q(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0;const o=e.length-1,n=this.parts,[l,c]=G(e,t);if(this.el=X.createElement(l,i),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=W.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(C)){const t=c[s++],i=a.getAttribute(e).split(A),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?ee:"?"===o[1]?te:"@"===o[1]?ie:Z}),a.removeAttribute(e)}else e.startsWith(A)&&(n.push({type:6,index:r}),a.removeAttribute(e));if(U.test(a.tagName)){const e=a.textContent.split(A),t=e.length-1;if(t>0){a.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],D()),W.nextNode(),n.push({type:2,index:++r});a.append(e[t],D())}}}else if(8===a.nodeType)if(a.data===P)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(A,e+1));)n.push({type:7,index:r}),e+=A.length-1}r++}}static createElement(e,t){const i=V.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,a){if(t===H)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const s=E(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=Y(e,r._$AS(e,t.values),r,a)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??V).importNode(t,!0);W.currentNode=a;let r=W.nextNode(),s=0,o=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new J(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new ae(r,this,e)),this._$AV.push(t),n=i[++o]}s!==n?.index&&(r=W.nextNode(),s++)}return W.currentNode=V,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),E(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==H&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&E(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Q(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new X(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new J(this.O(D()),this.O(D()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(e,t=this,i,a){const r=this.strings;let s=!1;if(void 0===r)e=Y(this,e,t,0),s=!E(e)||e!==this._$AH&&e!==H,s&&(this._$AH=e);else{const a=e;let o,n;for(e=r[0],o=0;o<r.length-1;o++)n=Y(this,a[i+o],t,o),n===H&&(n=this._$AH[o]),s||=!E(n)||n!==this._$AH[o],n===B?e=B:e!==B&&(e+=(n??"")+r[o+1]),this._$AH[o]=n}s&&!a&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class te extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ie extends Z{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??B)===H)return;const i=this._$AH,a=e===B&&i!==B||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==B&&(i===B||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const re=k.litHtmlPolyfillSupport;re?.(X,J),(k.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;class oe extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new J(t.insertBefore(D(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const ne=se.litElementPolyfillSupport;ne?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.2");const le="all",ce="album",de="playlist",he="radio",me="full",pe="compact",ue="minimal",_e="tablet";function ge(e){return String(e||"").trim().toLowerCase().replace(/&amp;/g,"&").replace(/[^a-z0-9]+/g," ").trim()}function ve(e,t){return{mediaIdKey:ge(e),titleKey:ge(t),comboKey:ge(`${e||""}|${t||""}`)}}function be(e,{idField:t,titleField:i}){const a={},r=new Map;for(const a of e||[]){const{titleKey:e}=ve(a?.[t],a?.[i]);e&&r.set(e,(r.get(e)||0)+1)}for(const s of e||[]){const{mediaIdKey:e,titleKey:o,comboKey:n}=ve(s?.[t],s?.[i]);e&&!a[e]&&(a[e]=s),n&&!a[n]&&(a[n]=s),o&&1===r.get(o)&&!a[o]&&(a[o]=s)}return a}function fe(e,t,i){const{mediaIdKey:a,titleKey:r,comboKey:s}=ve(t,i),o=[a,s,r];for(const t of o)if(t&&e?.[t])return e[t];return{}}function ye(e){if(null==e||""===e)return"";if("number"==typeof e&&Number.isFinite(e))return`${e}px`;const t=String(e).trim();return t?/^\d+(\.\d+)?$/.test(t)?`${t}px`:t:""}const we={en:{player:"Player",grouping:"Grouping",volumes:"Volumes",browse:"Browse",no_speakers:"No configured Sonos speakers are currently available.",nothing_playing:"Nothing playing",choose_something:"Choose something to play",active_speakers_one:"1 active speaker",active_speakers_other:"{count} active speakers",seek_position:"Seek position",player_volume:"Player volume",overall:"Overall",overall_volume:"Overall volume",reset:"Reset",ungroup_all:"Ungroup all",apply_grouping:"Apply grouping",applying:"Applying...",coordinator:"Coordinator",currently_grouped:"Currently grouped",available:"Available",live:"Live",search_favorites:"Search favorites",filter:"Filter",close:"Close",all:"All",albums:"Albums",playlists:"Playlists",radio:"Radio",show_list_view:"Show list view",show_grid_view:"Show grid view",no_favorites_match:"No favorites match the current filter.",favorite_playback_failed:"Could not start {name}. Please try again.",compact_menu:"Open menu",close_menu:"Close menu",minimize:"Minimize",expand:"Expand",browse_default_list:"Browse default: List",browse_default_grid:"Browse default: Grid",sonos_speakers:"Sonos speakers",favorites_sensor:"Favorites sensor",card_title:"Card title",card_background:"Card background",active_color:"Active color",tab_row_background:"Tab row background",tab_row_border:"Tab row border",inactive_surface_background:"Inactive surface background",inactive_tab_button_background:"Inactive tab button background",stream_selector_active_color:"Stream selector active color",slider_remaining_color:"Slider remaining color",player_button_background:"Player button background",play_button_background:"Play button background",play_button_icon_color:"Play button icon color",browse_default_view:"Browse default view",display_mode:"Display mode",display_mode_full:"Display mode: Full",display_mode_compact:"Display mode: Compact",display_mode_minimal:"Display mode: Minimal",display_mode_tablet:"Display mode: Tablet (landscape)",mute:"Mute",unmute:"Unmute",height:"Height",start_collapsed:"Start collapsed in minimal mode",always_show_stream_selector:"Always show stream selector",show_track_title:"Show track title",show_album_art:"Show album art",show_speaker_pill:"Show speaker pill",show_album_title:"Show album title",show_seekbar:"Show seekbar",show_volume:"Show volume"},nb:{player:"Spiller",grouping:"Gruppering",volumes:"Volum",browse:"Bla gjennom",no_speakers:"Ingen konfigurerte Sonos-høyttalere er tilgjengelige akkurat nå.",nothing_playing:"Ingenting spiller",choose_something:"Velg noe å spille",active_speakers_one:"1 aktiv høyttaler",active_speakers_other:"{count} aktive høyttalere",seek_position:"Søkeposisjon",player_volume:"Spillervolum",overall:"Totalt",overall_volume:"Totalt volum",reset:"Tilbakestill",ungroup_all:"Fjern alle",apply_grouping:"Bruk gruppe",applying:"Bruker...",coordinator:"Koordinator",currently_grouped:"I gruppe",available:"Tilgjengelig",live:"Live",search_favorites:"Søk i favoritter",filter:"Filter",close:"Lukk",all:"Alle",albums:"Album",playlists:"Spillelister",radio:"Radio",show_list_view:"Vis listevisning",show_grid_view:"Vis rutenettvisning",no_favorites_match:"Ingen favoritter passer filteret.",favorite_playback_failed:"Kunne ikke starte {name}. Prøv igjen.",compact_menu:"Åpne meny",close_menu:"Lukk meny",minimize:"Minimer",expand:"Utvid",browse_default_list:"Standard bla gjennom: Liste",browse_default_grid:"Standard bla gjennom: Rutenett",sonos_speakers:"Sonos-høyttalere",favorites_sensor:"Favorittsensor",card_title:"Korttittel",card_background:"Kortbakgrunn",active_color:"Aktiv farge",tab_row_background:"Bakgrunn for fanelinje",tab_row_border:"Kantlinje for fanelinje",inactive_surface_background:"Bakgrunn for inaktiv flate",inactive_tab_button_background:"Bakgrunn for inaktiv fane",stream_selector_active_color:"Aktiv farge for strømvalg",slider_remaining_color:"Farge for resterende slider",player_button_background:"Bakgrunn for spillerknapper",play_button_background:"Bakgrunn for avspillingsknapp",play_button_icon_color:"Ikonfarge for avspillingsknapp",browse_default_view:"Standard visning for bla gjennom",display_mode:"Visningsmodus",display_mode_full:"Visningsmodus: Full",display_mode_compact:"Visningsmodus: Kompakt",display_mode_minimal:"Visningsmodus: Minimal",display_mode_tablet:"Visningsmodus: Nettbrett (liggende)",mute:"Demp",unmute:"Slå på lyd",height:"Høyde",start_collapsed:"Start minimert i minimal modus",always_show_stream_selector:"Vis alltid strømvelger",show_track_title:"Vis sportittel",show_album_art:"Vis albumomslag",show_speaker_pill:"Vis høyttalerindikator",show_album_title:"Vis albumtittel",show_seekbar:"Vis søkelinje",show_volume:"Vis volum"}};function ke(e,t,i={}){const a=function(e){const t=[e?.locale?.language,e?.language,e?.selectedLanguage,"undefined"!=typeof navigator?navigator.language:""].filter(Boolean),i=String(t[0]||"en").toLowerCase();return i.startsWith("nb")||i.startsWith("nn")||i.startsWith("no")?"nb":"en"}(e),r=we[a]||we.en,s=we.en[t]||t;return(r[t]||s).replace(/\{(\w+)\}/g,(e,t)=>String(i[t]??""))}customElements.define("mysmart-music-control-editor",class extends oe{static get properties(){return{hass:{},_config:{state:!0}}}setConfig(e){this._config={title:"",favorites_entity:"",card_background:"",accent_color:"",active_color:"",tab_background:"",tab_border_color:"",inactive_button_background:"",inactive_tab_button_background:"",stream_selector_active_color:"",slider_remaining:"",player_button_background:"",play_button_background:"",play_button_icon_color:"",browse_view:"list",display_mode:me,height:"",start_collapsed:!1,show_title:!0,show_artwork:!0,show_speaker_pill:!0,show_album_title:!0,show_seekbar:!0,show_volume:!0,...e}}_t(e,t){return ke(this.hass,e,t)}_emitConfig(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_valueChanged(e){const t=e.target,i=t?.configValue;if(!i)return;let a=e.detail?.value??t.value;"checkbox"!==t.type&&"ha-switch"!==t.localName||(a=t.checked);const r={...this._config||{}};""===a||null==a||Array.isArray(a)&&0===a.length||"browse_view"===i&&"list"===a||"display_mode"===i&&a===me||"start_collapsed"===i&&!1===a||"always_show_stream_selector"===i&&!1===a||"show_title"===i&&!0===a||"show_artwork"===i&&!0===a||"show_speaker_pill"===i&&!0===a||"show_album_title"===i&&!0===a||"show_seekbar"===i&&!0===a||"show_volume"===i&&!0===a?delete r[i]:r[i]=a,this._emitConfig(r)}_renderToggle(e,t){return j`
      <ha-formfield .label=${e}>
        <ha-switch
          .checked=${!1!==this._config?.[t]}
          .configValue=${t}
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `}render(){return this.hass?j`
      <div class="editor">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"media_player",multiple:!0}}}
          .value=${this._config?.entities||[]}
          .configValue=${"entities"}
          .label=${this._t("sonos_speakers")}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"sensor"}}}
          .value=${this._config?.favorites_entity||""}
          .configValue=${"favorites_entity"}
          .label=${this._t("favorites_sensor")}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{mode:"dropdown",options:[{value:me,label:this._t("display_mode_full")},{value:pe,label:this._t("display_mode_compact")},{value:ue,label:this._t("display_mode_minimal")},{value:_e,label:this._t("display_mode_tablet")}]}}}
          .value=${this._config?.display_mode||me}
          .configValue=${"display_mode"}
          .label=${this._t("display_mode")}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-input
          .value=${this._config?.height||""}
          .configValue=${"height"}
          .label=${this._t("height")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.title||""}
          .configValue=${"title"}
          .label=${this._t("card_title")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.card_background||""}
          .configValue=${"card_background"}
          .label=${this._t("card_background")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.active_color||this._config?.accent_color||""}
          .configValue=${"active_color"}
          .label=${this._t("active_color")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.tab_background||""}
          .configValue=${"tab_background"}
          .label=${this._t("tab_row_background")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.tab_border_color||""}
          .configValue=${"tab_border_color"}
          .label=${this._t("tab_row_border")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.inactive_button_background||""}
          .configValue=${"inactive_button_background"}
          .label=${this._t("inactive_surface_background")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.inactive_tab_button_background||""}
          .configValue=${"inactive_tab_button_background"}
          .label=${this._t("inactive_tab_button_background")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.stream_selector_active_color||""}
          .configValue=${"stream_selector_active_color"}
          .label=${this._t("stream_selector_active_color")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.slider_remaining||""}
          .configValue=${"slider_remaining"}
          .label=${this._t("slider_remaining_color")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.player_button_background||""}
          .configValue=${"player_button_background"}
          .label=${this._t("player_button_background")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.play_button_background||""}
          .configValue=${"play_button_background"}
          .label=${this._t("play_button_background")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-input
          .value=${this._config?.play_button_icon_color||""}
          .configValue=${"play_button_icon_color"}
          .label=${this._t("play_button_icon_color")}
          @input=${this._valueChanged}
        ></ha-input>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{mode:"dropdown",options:[{value:"list",label:this._t("browse_default_list")},{value:"grid",label:this._t("browse_default_grid")}]}}}
          .value=${this._config?.browse_view||"list"}
          .configValue=${"browse_view"}
          .label=${this._t("browse_default_view")}
          @value-changed=${this._valueChanged}
        ></ha-selector>

        <div class="toggles">
          <ha-formfield .label=${this._t("always_show_stream_selector")}>
            <ha-switch
              .checked=${!0===this._config?.always_show_stream_selector}
              .configValue=${"always_show_stream_selector"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield .label=${this._t("start_collapsed")}>
            <ha-switch
              .checked=${!0===this._config?.start_collapsed}
              .configValue=${"start_collapsed"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
          ${this._renderToggle(this._t("show_track_title"),"show_title")}
          ${this._renderToggle(this._t("show_album_art"),"show_artwork")}
          ${this._renderToggle(this._t("show_speaker_pill"),"show_speaker_pill")}
          ${this._renderToggle(this._t("show_album_title"),"show_album_title")}
          ${this._renderToggle(this._t("show_seekbar"),"show_seekbar")}
          ${this._renderToggle(this._t("show_volume"),"show_volume")}
        </div>
      </div>
    `:j``}static get styles(){return s`
      .editor {
        display: grid;
        gap: 16px;
        padding: 8px 0 16px;
      }

      .toggles {
        display: grid;
        gap: 10px;
      }
    `}});class $e extends oe{static get properties(){return{hass:{},activeStream:{attribute:!1},favorites:{attribute:!1},view:{},_favoriteSearch:{state:!0},_favoriteFilter:{state:!0},_isFilterOpen:{state:!0},_imageFailures:{state:!0},_visibleImages:{state:!0},_playingFavoriteId:{state:!0},_playbackError:{state:!0}}}constructor(){super(),this.activeStream=null,this.favorites=[],this.view="list",this._favoriteSearch="",this._favoriteFilter=le,this._isFilterOpen=!1,this._imageFailures={},this._visibleImages={},this._playingFavoriteId="",this._playbackError="",this._imageObserver=null,this._imageVisibilityQueue=new Set,this._imageVisibilityFrame=0}createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this._teardownImageObserver(),this._imageVisibilityFrame&&(window.cancelAnimationFrame(this._imageVisibilityFrame),this._imageVisibilityFrame=0)}updated(){this._observeImages()}_t(e,t={}){return ke(this.hass,e,t)}render(){const e=this._getVisibleFavorites(),t=Boolean(this._playingFavoriteId),i="grid"===this.view,a="tiles"===this.view,r=j`
      <input
        class="search-input"
        type="search"
        placeholder=${this._t("search_favorites")}
        .value=${this._favoriteSearch}
        @input=${e=>{this._favoriteSearch=e.target.value||""}}
      />
    `;return j`
      <div class="panel panel-tight favorite-panel">
        <div class="favorite-toolbar ${this._isFilterOpen?"filters-open":""}">
          <button
            class="filter-toggle ${this._favoriteSearch.trim()||this._favoriteFilter!==le?"active":""}"
            title=${this._t(this._isFilterOpen?"close":"filter")}
            aria-label=${this._t(this._isFilterOpen?"close":"filter")}
            aria-expanded=${this._isFilterOpen?"true":"false"}
            @click=${()=>{this._isFilterOpen=!this._isFilterOpen}}
          >
            <ha-icon icon=${this._isFilterOpen?"mdi:close":"mdi:filter-variant"}></ha-icon>
            <span>${this._t("filter")}</span>
          </button>
          ${a?j`
            <label class="search-field">
              <ha-icon icon="mdi:magnify" aria-hidden="true"></ha-icon>
              ${r}
            </label>
          `:r}
          <div class="favorite-toolbar-row">
            <div class="filter-pills">
              ${this._favoriteFilterOptions().map(e=>j`
                <button
                  class="filter-pill ${this._favoriteFilter===e.value?"active":""}"
                  @click=${()=>{this._favoriteFilter=e.value}}
                >
                  ${e.label}
                </button>
              `)}
            </div>
          </div>
        </div>

        ${this._playbackError?j`
          <div class="favorite-playback-error" role="alert">
            <ha-icon icon="mdi:alert-circle-outline" aria-hidden="true"></ha-icon>
            <span>${this._playbackError}</span>
          </div>
        `:B}

        ${0===e.length?j`
          <div class="empty-state small">
            <ha-icon icon="mdi:star-outline"></ha-icon>
            <div>${this._t("no_favorites_match")}</div>
          </div>
        `:j`
          <div class="favorite-list ${i?"favorite-list-grid":""} ${a?"favorite-list-tiles":""}">
            ${e.map(e=>{const r=e.mediaId===this._playingFavoriteId,s=Boolean(e.image&&!this._imageFailures[e.mediaId]);return j`
                <button
                  class="favorite-item ${i?"favorite-item-grid":""} ${a?"favorite-item-tile":""} ${a&&s?"has-artwork":""} ${r?"is-starting":""}"
                  aria-label=${a?e.name:B}
                  aria-busy=${r?"true":"false"}
                  ?disabled=${t}
                  @click=${()=>this._playFavorite(e)}
                >
                  <div class="favorite-art ${s?"has-artwork":""} ${i?"favorite-art-grid":""} ${a?"favorite-art-tile":""}">
                    ${e.image&&!this._imageFailures[e.mediaId]?j`
                      ${this._shouldLoadImage(e.mediaId)?j`
                        <img
                          class="favorite-art-image"
                          data-favorite-image
                          data-media-id=${e.mediaId}
                          src=${e.image}
                          alt=${e.name}
                          loading="lazy"
                          @error=${()=>this._handleImageError(e.mediaId)}
                        />
                      `:j`
                        <div class="favorite-art-placeholder" data-favorite-image data-media-id=${e.mediaId}>
                          <ha-icon icon=${this._favoriteTypeIcon(e.type)}></ha-icon>
                        </div>
                      `}
                    `:j`<ha-icon icon=${this._favoriteTypeIcon(e.type)}></ha-icon>`}
                    ${r?j`
                      <span class="favorite-loading-indicator" aria-hidden="true">
                        <ha-icon icon="mdi:loading"></ha-icon>
                      </span>
                    `:B}
                  </div>
                  ${a&&!s?j`
                    <div class="favorite-copy favorite-copy-tile" aria-hidden="true">
                      <div class="favorite-name">${e.name}</div>
                    </div>
                  `:B}
                  ${i||a?B:j`
                    <div class="favorite-copy">
                      <div class="favorite-name">${e.name}</div>
                      <div class="favorite-meta">${e.typeLabel}</div>
                    </div>
                  `}
                  ${i||a?B:j`<ha-icon class="favorite-chevron" icon="mdi:play-circle"></ha-icon>`}
                </button>
              `})}
          </div>
        `}
      </div>
    `}_getVisibleFavorites(){const e=this._favoriteSearch.trim().toLowerCase();return(this.favorites||[]).filter(t=>{const i=this._favoriteFilter===le||t.type===this._favoriteFilter,a=!e||t.name.toLowerCase().includes(e)||t.typeLabel.toLowerCase().includes(e);return i&&a})}_favoriteFilterOptions(){return[{value:le,label:this._t("all")},{value:ce,label:this._t("albums")},{value:de,label:this._t("playlists")},{value:he,label:this._t("radio")}]}_favoriteTypeIcon(e){return e===ce?"mdi:album":e===de?"mdi:playlist-music":e===he?"mdi:radio":"mdi:music-note-outline"}_handleImageError(e){e&&!this._imageFailures[e]&&(this._imageFailures={...this._imageFailures,[e]:!0})}_shouldLoadImage(e){return Boolean(e&&this._visibleImages[e])}_markImageVisible(e){e&&!this._visibleImages[e]&&(this._imageVisibilityQueue.add(e),this._imageVisibilityFrame||(this._imageVisibilityFrame=window.requestAnimationFrame(()=>{if(this._imageVisibilityFrame=0,!this._imageVisibilityQueue.size)return;const e={...this._visibleImages};let t=!1;for(const i of this._imageVisibilityQueue)e[i]||(e[i]=!0,t=!0);this._imageVisibilityQueue.clear(),t&&(this._visibleImages=e)})))}_observeImages(){if("undefined"==typeof window)return;const e=this.querySelectorAll("[data-favorite-image][data-media-id]");e.length&&("IntersectionObserver"in window?(this._imageObserver||(this._imageObserver=new IntersectionObserver(e=>{for(const t of e){if(!t.isIntersecting)continue;const e=t.target?.dataset?.mediaId||"";this._markImageVisible(e),this._imageObserver?.unobserve(t.target)}},{root:null,rootMargin:"120px 0px",threshold:.01})),e.forEach(e=>{const t=e.dataset.mediaId||"";this._visibleImages[t]?this._imageObserver?.unobserve(e):this._imageObserver.observe(e)})):e.forEach(e=>this._markImageVisible(e.dataset.mediaId||"")))}_teardownImageObserver(){this._imageObserver?.disconnect(),this._imageObserver=null}async _playFavorite(e){if(this._playingFavoriteId||!this.activeStream)return;const t=Date.now(),i=this.activeStream.coordinator,a=!0===this.activeStream.stateObj?.attributes?.shuffle;this._playingFavoriteId=e.mediaId,this._playbackError="";try{e.type===ce&&a&&await this.hass.callService("media_player","shuffle_set",{entity_id:i,shuffle:!1}),await this.hass.callService("media_player","play_media",{entity_id:i,media_content_type:e.media_content_type||"favorite_item_id",media_content_id:e.media_content_id||e.mediaId});const r=600-(Date.now()-t);r>0&&await new Promise(e=>window.setTimeout(e,r)),this.dispatchEvent(new CustomEvent("favorite-played",{bubbles:!0,composed:!0}))}catch(t){console.warn("[mysmart-music-control] Failed to play favorite",t),this._playbackError=this._t("favorite_playback_failed",{name:e.name})}finally{this._playingFavoriteId=""}}}function xe(e,t,i={}){const a=new Event(t,{bubbles:!0,cancelable:!1,composed:!0});a.detail=i,e.dispatchEvent(a)}customElements.get("mysmart-music-control-favorites")||customElements.define("mysmart-music-control-favorites",$e);const Se=s`
      mysmart-music-control-favorites {
        display: contents;
      }

      :host {
        display: block;
        --mysmart-music-card-accent: var(--accent-color, #ff8b5e);
        --mysmart-music-card-background: var(--ha-card-background, var(--card-background-color, #ffffff));
        --mysmart-music-card-ink: var(--primary-text-color, #171313);
        --mysmart-music-card-muted: var(--secondary-text-color, rgba(23, 19, 19, 0.62));
        --mysmart-music-card-surface: rgba(255, 255, 255, 0.72);
        --mysmart-music-card-tab-background: rgba(255, 255, 255, 0.5);
        --mysmart-music-card-button-surface: rgba(255, 255, 255, 0.68);
        --mysmart-music-card-tab-button-surface: rgba(255, 255, 255, 0.68);
        --mysmart-music-card-player-button-background: rgba(255, 255, 255, 0.68);
        --mysmart-music-card-play-button-background: var(--mysmart-music-card-accent);
        --mysmart-music-card-play-button-icon-color: #ffffff;
        --mysmart-music-card-stream-selector-active-color: var(--primary-text-color, #ffffff);
        --mysmart-music-card-tab-border-color: transparent;
        --mysmart-music-card-slider-remaining: rgba(255, 255, 255, 0.62);
        --mysmart-music-card-checkbox-border: rgba(255, 255, 255, 0.16);
      }

      ha-card.shell {
        position: relative;
        overflow: hidden;
        border: 0;
        border-radius: 32px;
        background: var(--mysmart-music-card-background);
        box-shadow: none;
        height: var(--mysmart-music-card-height, auto);
      }

      .content {
        display: grid;
        gap: 20px;
        padding: 22px;
        color: var(--mysmart-music-card-ink);
      }

      .content.has-fixed-height {
        box-sizing: border-box;
        height: 100%;
        grid-template-rows: auto minmax(0, 1fr);
        overflow: hidden;
      }

      .top-shell {
        display: grid;
        gap: 20px;
        min-height: 0;
      }

      .top-shell-fixed {
        min-height: 0;
      }

      .body-shell {
        min-height: 0;
      }

      .body-shell-scroll {
        overflow: auto;
        padding-right: 2px;
        padding-bottom: 0;
        box-sizing: border-box;
      }

      .header,
      .group-actions,
      .time-row,
      .transport-row,
      .screen-tabs,
      .stream-pills,
      .volume-slider-row,
      .filter-pills,
      .favorite-toolbar-row {
        display: flex;
        align-items: center;
      }

      .header,
      .time-row {
        justify-content: space-between;
      }
      .group-actions {justify-content: start;}

      .header,
      .favorite-toolbar,
      .volume-master,
      .volume-item,
      .player-layout,
      .panel,
      .group-list,
      .favorite-list,
      .volume-list,
      .meta {
        display: grid;
      }

      .header {
        gap: 16px;
      }

      .header-no-title {
        gap: 0;
      }

      .favorite-toolbar,
      .volume-master,
      .volume-item,
      .player-layout,
      .panel,
      .group-list,
      .favorite-list,
      .volume-list,
      .meta {
        gap: 12px;
      }

      .title {
        font-size: 16px;
        font-weight: 500;
      }

      .stream-pills,
      .screen-tabs,
      .filter-pills {
        gap: 8px;
        flex-wrap: wrap;
      }

      .favorite-toolbar-row {
        justify-content: space-between;
        gap: 12px;
      }

      button,
      input {
        font: inherit;
      }

      button {
        color: inherit;
        cursor: pointer;
      }

      .stream-pill,
      .screen-tab,
      .secondary-button,
      .primary-button,
      .icon-button,
      .play-button,
      .favorite-item,
      .filter-pill,
      .search-input,
      .view-toggle {
        border: 0;
      }

      .stream-pill,
      .screen-tab,
      .secondary-button,
      .primary-button,
      .filter-pill,
      .search-input,
      .view-toggle {
        border-radius: 999px;
      }

      .screen-tab {
        background: var(--mysmart-music-card-tab-button-surface);
      }

      .stream-pill {
        background: transparent;
      }

      .secondary-button,
      .filter-pill,
      .view-toggle,
      .group-item,
      .favorite-item,
      .volume-item,
      .volume-master {
        background: var(--mysmart-music-card-button-surface);
      }

      .stream-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 2px 0px;
        border-radius: 0;
        border: 0;
        color: var(--mysmart-music-card-muted);
      }

      .stream-pill-content {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding-bottom: 6px;
        border-bottom: 2px solid transparent;
      }

      .stream-pill-icon-slot {
        width: 12px;
        min-width: 12px;
        height: 12px;
        display: inline-grid;
        place-items: center;
        align-self: center;
        transform: translateY(-4px);
      }

      .stream-pill-bars {
        width: 10px;
        height: 10px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
      }

      .stream-pill-bars span {
        width: 2px;
        height: 100%;
        border-radius: 999px;
        background: currentColor;
        transform-origin: bottom;
        animation: stream-bars-bounce 1.8s ease-in-out infinite alternate;
      }

      .stream-pill-bars span:nth-child(2) {
        animation-delay: -1.8s;
      }

      .stream-pill-bars span:nth-child(3) {
        animation-delay: -1.1s;
      }

      .stream-pill.is-playing:not(.active) {
        color: var(--mysmart-music-card-ink);
      }

      .stream-pill.active {
        background-image: none;
        background-color: transparent;
        color: var(--mysmart-music-card-stream-selector-active-color);
      }

      .stream-pill-label {
        padding-bottom: 2px;
        border-bottom: 2px solid transparent;
      }

      .stream-pill.active.has-indicator .stream-pill-content {
        border-bottom-color: var(--mysmart-music-card-stream-selector-active-color);
      }

      .stream-pill.active.has-indicator .stream-pill-label {
        border-bottom-color: transparent;
      }

      .stream-pill.active:not(.has-indicator) .stream-pill-label {
        border-bottom-color: var(--mysmart-music-card-stream-selector-active-color);
      }

      @keyframes stream-bars-bounce {
        10% {
          transform: scaleY(0.3);
        }

        30% {
          transform: scaleY(1);
        }

        60% {
          transform: scaleY(0.45);
        }

        80% {
          transform: scaleY(0.75);
        }

        100% {
          transform: scaleY(0.6);
        }
      }

      .screen-tab.active,
      .primary-button,
      .icon-button.active,
      .filter-pill.active {
        background: var(--mysmart-music-card-accent);
        color: var(--mysmart-music-card-play-button-icon-color);
      }

      .track-album,
      .group-item-meta,
      .favorite-meta,
      .time-row,
      .tablet-time,
      .volume-value {
        color: var(--mysmart-music-card-muted);
      }

      .stream-pill-label,
      .group-item-name,
      .favorite-name {
        font-size: var(--ha-font-size-m);
      }

      .stream-pills {
        gap: 14px;
        align-items: flex-end;
      }

      .screen-tabs {
        display: inline-flex;
        max-width: 100%;
        padding: 4px;
        border-radius: 999px;
        background: var(--mysmart-music-card-tab-background);
        border: 1px solid var(--mysmart-music-card-tab-border-color);
      }

      .screen-tab {
        padding: 8px 16px;
        font-size: var(--ha-font-size-m);
        flex-grow: 1;
      }

      .player-layout,
      .panel {
        gap: 16px;
      }

      .panel-tight {
        padding: 0;
        background: transparent;
      }

      .compact-player {
        gap: 14px;
      }

      .artwork-shell {
        width: min(100%, 280px);
        aspect-ratio: 1;
        margin: 0 auto;
        border-radius: 32px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        place-items: center;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }

      .artwork-shell ha-icon {
        font-size: 88px;
        color: var(--mysmart-music-card-muted);
      }

      .meta {
        text-align: center;
        gap: 4px;
      }

      .meta-chip {
        justify-self: center;
        padding: 7px 12px;
        border-radius: 999px;
        background: var(--mysmart-music-card-button-surface);
        color: var(--mysmart-music-card-muted);
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .track-title {
        font-size: 2em;
        line-height: 1.1;
        font-weight: 300;
      }

      .track-subtitle {
        font-size: 16px;
        font-weight: 500;
      }

      .progress-block,
      .volume-block {
        display: grid;
        gap: 6px;
      }

      .time-row,
      .tablet-time {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .custom-seek-slider {
        width: 100%;
        min-height: 20px;
        display: grid;
        align-items: center;
        cursor: pointer;
        touch-action: none;
        outline: none;
      }

      .custom-seek-slider[aria-disabled='true'] {
        cursor: default;
        opacity: 0.7;
      }

      .custom-seek-track {
        position: relative;
        width: 100%;
        height: 24px;
      }

      .custom-seek-fill,
      .custom-seek-remaining {
        position: absolute;
        top: 50%;
        border-radius: 999px;
        transform: translateY(-50%);
      }

      .custom-seek-fill {
        left: 0;
        height: 24px;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.92);
      }

      .custom-seek-wave-svg {
        display: block;
        max-width: none;
      }

      .custom-seek-wave-path {
        fill: none;
        stroke: currentColor;
        stroke-width: ${3};
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .custom-seek-slider.is-animated .custom-seek-wave-svg {
        animation: seek-wave-slide 15s linear infinite;
      }

      .custom-seek-slider.is-dragging .custom-seek-wave-svg,
      .custom-seek-slider:not(.is-animated) .custom-seek-wave-svg {
        animation-play-state: paused;
      }

      .custom-seek-remaining {
        height: 4px;
        background: var(--mysmart-music-card-slider-remaining);
      }

      .custom-seek-handle {
        position: absolute;
        top: 50%;
        width: 4px;
        height: 22px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.92);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .custom-seek-slider:focus-visible .custom-seek-handle {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      @keyframes seek-wave-slide {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }

      .custom-volume-slider {
        width: 100%;
        min-height: 20px;
        display: grid;
        align-items: center;
        cursor: pointer;
        touch-action: none;
        outline: none;
      }

      .custom-volume-track {
        position: relative;
        width: 100%;
        height: 4px;
      }

      .custom-volume-fill,
      .custom-volume-remaining {
        position: absolute;
        top: 0;
        height: 100%;
        border-radius: 999px;
      }

      .custom-volume-fill {
        left: 0;
        background: var(--mysmart-music-card-accent);
      }

      .custom-volume-remaining {
        background: var(--mysmart-music-card-slider-remaining);
      }

      .custom-volume-handle {
        position: absolute;
        top: 50%;
        width: 4px;
        height: 22px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.92);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .custom-volume-slider:focus-visible .custom-volume-handle {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .transport-row {
        justify-content: center;
        gap: 12px;
        margin-top: 0px;
        margin-bottom: 18px;
      }

      .icon-button,
      .play-button {
        display: grid;
        place-items: center;
        border-radius: 999px;
      }

      .icon-button {
        width: 46px;
        height: 46px;
        background: var(--mysmart-music-card-player-button-background);
      }

      .play-button {
        width: 68px;
        height: 68px;
        background: var(--mysmart-music-card-play-button-background);
        color: var(--mysmart-music-card-play-button-icon-color);
      }

      .panel {
        border-radius: 28px;
      }

      .group-list,
      .favorite-list,
      .volume-list {
        display: grid;
        gap: 10px;
      }

      .favorite-list-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .group-item,
      .favorite-item,
      .volume-item,
      .volume-master {
        align-items: center;
        gap: 14px;
        padding: 14px;
        border-radius: 20px;
      }

      .group-item {
        position: relative;
        display: grid;
        grid-template-columns: auto auto 1fr auto;
      }


      .group-item-input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      .group-item-checkbox {
        width: 18px;
        height: 18px;
        border: 1px solid var(--mysmart-music-card-checkbox-border);
        border-radius: 6px;
        background: var(--mysmart-music-card-button-surface);
        display: inline-grid;
        place-items: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 12px 12px;
      }

      .group-item-input:checked + .group-item-checkbox {
        border-color: transparent;
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M6.3 11.2 3.1 8l-1.1 1.1 4.3 4.3L14 5.7l-1.1-1.1z'/%3E%3C/svg%3E");
        background-color: var(--mysmart-music-card-accent);
      }

      .group-item-input:disabled + .group-item-checkbox {
        opacity: 0.72;
      }

      .group-status.live {
        padding: 3px 8px;
        border-radius: 999px;
        font-size: 11px;
        line-height: 1.1;
        font-weight: 700;
        color: var(--mysmart-music-card-play-button-icon-color);
        background: var(--mysmart-music-card-accent);
        justify-self: end;
      }

      .group-actions {
        gap: 10px;
        flex-wrap: wrap;
      }

      .secondary-button,
      .primary-button,
      .filter-pill {
        padding: 6px 16px;
        font-size: var(--ha-font-size-m);
      }

      .view-toggle {
        width: 40px;
        height: 40px;
        display: inline-grid;
        place-items: center;
        flex: 0 0 auto;
      }

      .primary-button[disabled],
      .secondary-button[disabled] {
        opacity: 0.6;
        cursor: default;
      }

      .favorite-item {
        width: 100%;
        display: grid;
        grid-template-columns: 54px 1fr auto;
        text-align: left;
      }

      .favorite-item-grid {
        grid-template-columns: 1fr;
        padding: 0;
        background: transparent;
      }

      .favorite-item[disabled] {
        cursor: wait;
      }

      .favorite-item[disabled]:not(.is-starting) {
        opacity: 0.55;
      }

      .favorite-item.is-starting .favorite-art {
        animation: favorite-thumbnail-pulse 900ms ease-in-out infinite alternate;
      }

      .favorite-playback-error {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: var(--mysmart-music-card-button-surface);
        font-size: 14px;
        font-weight: 500;
      }

      .favorite-playback-error {
        color: var(--error-color, #db4437);
      }

      @keyframes favorite-thumbnail-pulse {
        from { filter: brightness(0.72); transform: scale(0.96); }
        to { filter: brightness(1.08); transform: scale(1); }
      }

      @keyframes favorite-loading-spin {
        to { transform: rotate(360deg); }
      }

      .favorite-art {
        position: relative;
        width: 54px;
        height: 54px;
        border-radius: 16px;
        display: grid;
        place-items: center;
        overflow: hidden;
        background: var(--mysmart-music-card-tab-background);
      }

      .favorite-art-grid {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        border-radius: 24px;
      }

      .favorite-art-image,
      .favorite-art-placeholder {
        width: 100%;
        height: 100%;
        display: block;
      }

      .favorite-art-image {
        object-fit: cover;
      }

      .favorite-loading-indicator {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.38);
        backdrop-filter: blur(2px);
      }

      .favorite-loading-indicator ha-icon {
        animation: favorite-loading-spin 850ms linear infinite;
      }

      .favorite-art-placeholder {
        display: grid;
        place-items: center;
      }

      .favorite-art ha-icon,
      .favorite-chevron {
        color: var(--mysmart-music-card-muted);
      }

      .group-item-meta,
      .favorite-meta {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .search-input {
        width: 100%;
        padding: 12px 16px;
        color: var(--mysmart-music-card-ink);
        background: var(--mysmart-music-card-button-surface);
        outline: none;
        font-size: 14px;
        font-weight: 500;
      }

      .volume-slider-row {
        gap: 12px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
      }

      .volume-value {
        min-width: 44px;
        text-align: right;
        font-size: 14px;
        font-weight: 500;
        opacity: 0.7;
      }

      .empty-state {
        display: grid;
        gap: 10px;
        padding: 28px 14px;
        place-items: center;
        text-align: center;
        color: var(--mysmart-music-card-muted);
      }

      .empty-state.small {
        padding: 18px 8px;
      }

      .empty-state ha-icon {
        font-size: 34px;
      }


      .compact-header {
        display: grid;
        gap: 12px;
      }

      .compact-header-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .compact-header-main {
        display: grid;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }

      .menu-button,
      .compact-menu-item,
      .minimal-collapsed-button {
        border: 0;
        color: inherit;
        cursor: pointer;
      }

      .menu-button {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        place-items: center;
        flex: 0 0 auto;
      }

      .compact-menu-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.18);
        z-index: 4;
        display: grid;
        align-items: start;
        justify-items: end;
        padding: 18px;
      }

      .compact-menu-panel {
        display: grid;
        gap: 8px;
        width: min(240px, 100%);
        padding: 8px;
        border-radius: 24px;
        background: color-mix(in srgb, var(--mysmart-music-card-background) 86%, white 14%);
        box-shadow: 0 12px 34px rgba(0, 0, 0, 0.18);
      }

      .compact-menu-item {
        padding: 10px 16px;
        border-radius: 16px;
        background: var(--mysmart-music-card-button-surface);
        text-align: left;
      }

      .compact-menu-item.active {
        background: var(--mysmart-music-card-accent);
        color: var(--mysmart-music-card-play-button-icon-color);
      }

      .compact-player-layout {
        display: grid;
        grid-template-columns: 102px minmax(0, 1fr);
        grid-template-areas:
          'art copy'
          'art transport';
        gap: 12px 16px;
        align-items: center;
      }

      .compact-artwork {
        grid-area: art;
        width: 102px;
        aspect-ratio: 1;
        border-radius: 20px;
        background: var(--mysmart-music-card-button-surface);
        background-size: cover;
        background-position: center;
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .compact-copy {
        grid-area: copy;
        display: grid;
        align-content: end;
        gap: 6px;
        min-width: 0;
        align-self: end;
        padding-top: 6px;
      }

      .compact-title,
      .minimal-title {
        font-size: 1.15rem;
        font-weight: 600;
        line-height: 1.15;
      }

      .compact-subtitle,
      .minimal-subtitle {
        font-size: 0.92rem;
        color: var(--mysmart-music-card-muted);
        font-weight: 500;
      }

      .compact-transport {
        grid-area: transport;
        margin: 0;
        justify-content: flex-start;
        gap: 8px;
        flex-wrap: nowrap;
      }

      .compact-transport .icon-button {
        width: 40px;
        height: 40px;
      }

      .compact-transport .play-button {
        width: 56px;
        height: 56px;
      }

      .minimal-shell {
        position: relative;
        min-height: 100px;
      }

      .minimal-surface {
        min-height: 100px;
        border-radius: 28px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 14px;
        padding: 14px;
        cursor: pointer;
        transform-origin: right bottom;
        transition: opacity 220ms ease, transform 220ms ease;
      }

      .minimal-artwork {
        width: 72px;
        height: 72px;
        border-radius: 22px;
        background: var(--mysmart-music-card-tab-background);
        background-size: cover;
        background-position: center;
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .minimal-copy {
        display: grid;
        gap: 4px;
        min-width: 0;
      }

      .minimal-controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .minimal-control {
        width: 40px;
        height: 40px;
      }

      .minimal-play {
        width: 54px;
        height: 54px;
      }

      .minimal-collapsed-button {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 60px;
        height: 60px;
        border-radius: 999px;
        background: var(--mysmart-music-card-button-surface);
        display: grid;
        place-items: center;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
        opacity: 0;
        pointer-events: none;
        transform: translate3d(0, 10px, 0) scale(0.7);
        transform-origin: right bottom;
        transition: opacity 220ms ease, transform 220ms ease;
      }

      .minimal-shell.is-collapsed {
        min-height: 60px;
      }

      .minimal-shell.is-collapsed .minimal-surface {
        opacity: 0;
        pointer-events: none;
        transform: translate3d(28px, 20px, 0) scale(0.7);
      }

      .minimal-shell.is-collapsed .minimal-collapsed-button {
        opacity: 1;
        pointer-events: auto;
        transform: translate3d(0, 0, 0) scale(1);
      }

      .compact-bars {
        width: 16px;
        height: 16px;
      }

      .content-minimal {
        padding: 0;
      }

      .shell-minimal {
        overflow: hidden;
      }

      ha-card.shell.shell-minimal.minimal-collapsed-shell {
        background: transparent;
        overflow: visible;
      }

      .shell-minimal .body-shell,
      .shell-minimal .panel {
        padding: 0;
      }

      .shell-compact .volume-master,
      .shell-compact .volume-item {
        grid-template-columns: minmax(88px, auto) minmax(0, 1fr) auto;
        gap: 12px;
        padding-block: 12px;
      }

      .shell-compact .volume-master .group-item-name,
      .shell-compact .volume-item .group-item-name {
        min-width: 0;
      }

      .shell-compact .volume-master .volume-slider-row,
      .shell-compact .volume-item .volume-slider-row {
        display: contents;
      }

      .shell-compact .volume-master .custom-volume-slider,
      .shell-compact .volume-item .custom-volume-slider {
        width: 100%;
      }

      .shell-compact .stream-pills {
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .shell-compact .stream-pills::-webkit-scrollbar {
        display: none;
      }

      .shell-compact .stream-pill {
        flex: 0 0 auto;
      }

      .shell-compact .body-shell-scroll {
        overflow-x: hidden;
        overflow-y: auto;
        padding-right: 0;
        padding-bottom: 0;
      }

      .filter-toggle {
        display: none;
        width: 40px;
        height: 40px;
        border: 0;
        border-radius: 999px;
        color: inherit;
        background: var(--mysmart-music-card-button-surface);
        place-items: center;
        cursor: pointer;
      }

      .filter-toggle.active {
        color: var(--mysmart-music-card-play-button-icon-color);
        background: var(--mysmart-music-card-accent);
      }


      .shell-compact .grouping-panel,
      .shell-compact .favorite-panel {
        position: relative;
        height: 100%;
        min-height: 0;
        gap: 8px;
        grid-template-rows: minmax(0, 1fr) auto;
      }

      .shell-compact .group-list {
        min-height: 0;
        overflow: auto;
        gap: 6px;
        padding-right: 2px;
      }

      .shell-compact .group-item {
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 10px;
        min-height: 38px;
        padding: 5px 10px;
        border-radius: 14px;
      }

      .shell-compact .group-item-copy {
        display: flex;
        align-items: baseline;
        gap: 6px;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
      }

      .shell-compact .group-item-name,
      .shell-compact .group-item-meta {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .shell-compact .group-item-name {
        flex: 0 1 auto;
      }

      .shell-compact .group-item-meta {
        flex: 0 1 auto;
        font-size: 12px;
      }

      .shell-compact .group-status.live {
        padding: 2px 6px;
        font-size: 10px;
      }

      .shell-compact .group-actions {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
        padding-top: 2px;
      }

      .shell-compact .group-actions button {
        min-width: 0;
        padding: 7px 6px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .shell-compact .favorite-list {
        grid-row: 1;
        min-height: 0;
        overflow: auto;
        gap: 6px;
        padding-right: 2px;
      }

      .shell-compact .favorite-toolbar {
        grid-row: 2;
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
        overflow: hidden;
      }

      .shell-compact .filter-toggle {
        display: inline-flex;
        width: auto;
        flex: 0 0 auto;
        gap: 7px;
        padding: 0 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .shell-compact .favorite-toolbar .search-input {
        display: none;
      }

      .shell-compact .favorite-toolbar-row {
        display: flex;
        min-width: 0;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .shell-compact .favorite-toolbar-row::-webkit-scrollbar {
        display: none;
      }

      .shell-compact .favorite-toolbar .filter-pills {
        display: none;
        flex-wrap: nowrap;
        gap: 6px;
      }

      .shell-compact .favorite-toolbar.filters-open .filter-pills {
        display: flex;
      }

      .shell-compact .favorite-toolbar .filter-pill {
        flex: 0 0 auto;
        padding: 6px 10px;
        font-size: 12px;
      }

      .shell-compact .favorite-item:not(.favorite-item-grid) {
        grid-template-columns: 38px minmax(0, 1fr) auto;
        gap: 9px;
        padding: 5px 8px;
        border-radius: 14px;
      }

      .shell-compact .favorite-art:not(.favorite-art-grid) {
        width: 38px;
        height: 38px;
        border-radius: 11px;
      }

      .shell-compact .favorite-list-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        align-content: start;
        gap: 8px;
      }

      .shell-compact .favorite-art-grid {
        border-radius: 12px;
      }

      .shell-compact .content {
        gap: 12px;
        padding: 12px;
      }

      .shell-compact .body-shell,
      .shell-compact .compact-player-layout {
        height: 100%;
        min-height: 0;
      }

      .shell-compact .compact-player-layout {
        grid-template-columns: minmax(120px, 38%) minmax(0, 1fr);
        grid-template-rows: auto auto;
        gap: 8px 12px;
        align-content: center;
        align-items: center;
        overflow: hidden;
      }

      .shell-compact .compact-artwork {
        width: 100%;
        height: auto;
        min-width: 0;
        min-height: 120px;
        max-width: 170px;
        justify-self: start;
        align-self: center;
        aspect-ratio: 1;
        border-radius: 20px;
      }

      .shell-compact .compact-copy {
        width: 100%;
        justify-items: start;
        justify-self: stretch;
        align-self: end;
        text-align: left;
        padding-top: 0;
      }

      .shell-compact .compact-transport {
        width: 100%;
        min-width: 0;
        justify-content: space-between;
        justify-self: stretch;
        align-self: start;
        gap: 2px;
        overflow: hidden;
      }

      .shell-compact .compact-transport .icon-button {
        width: 34px;
        min-width: 34px;
        height: 34px;
        flex: 0 0 34px;
      }

      .shell-compact .compact-transport .play-button {
        width: 48px;
        min-width: 48px;
        height: 48px;
        flex: 0 0 48px;
      }

      .shell-compact .top-shell {
        gap: 12px;
      }

      /* Tablet (landscape) mode: persistent artwork column on the left, header + screen body on the right. */
      .shell-tablet {
        --mysmart-music-card-tablet-artwork-size: 268px;
      }

      .shell-tablet.has-fixed-height {
        --mysmart-music-card-tablet-artwork-size: calc(var(--mysmart-music-card-height) - 44px);
      }

      .shell-tablet .content.has-fixed-height {
        grid-template-rows: minmax(0, 1fr);
      }

      .tablet-layout {
        display: grid;
        grid-template-columns: var(--mysmart-music-card-tablet-artwork-size) minmax(0, 1fr);
        gap: 30px;
        min-height: var(--mysmart-music-card-tablet-artwork-size);
      }

      .tablet-layout.no-artwork {
        grid-template-columns: minmax(0, 1fr);
        min-height: 0;
      }

      .has-fixed-height .tablet-layout {
        height: 100%;
        min-height: 0;
      }

      .tablet-artwork {
        width: var(--mysmart-music-card-tablet-artwork-size);
        aspect-ratio: 1;
        align-self: start;
        border-radius: 24px;
        background: var(--mysmart-music-card-button-surface);
        background-size: cover;
        background-position: center;
        display: grid;
        place-items: center;
        overflow: hidden;
        --mdc-icon-size: 56px;
      }

      .tablet-artwork ha-icon {
        color: var(--mysmart-music-card-muted);
      }

      .tablet-main {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        gap: 18px;
        min-width: 0;
        min-height: 0;
      }

      .tablet-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        min-width: 0;
      }

      .tablet-header-start {
        display: flex;
        align-items: center;
        gap: 18px;
        min-width: 0;
      }

      .shell-tablet .stream-pills {
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .shell-tablet .stream-pills::-webkit-scrollbar {
        display: none;
      }

      .shell-tablet .stream-pill {
        flex: 0 0 auto;
      }

      .shell-tablet .screen-tabs {
        flex: 0 0 auto;
        flex-wrap: nowrap;
        gap: 4px;
      }

      .shell-tablet .screen-tab {
        flex: 1 1 0;
        min-width: 96px;
        white-space: nowrap;
      }

      .tablet-body {
        min-height: 0;
        min-width: 0;
      }

      .has-fixed-height .tablet-body {
        overflow: auto;
      }

      .tablet-player {
        height: 100%;
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto;
        gap: 20px;
      }

      .tablet-player-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        min-width: 0;
      }

      .tablet-meta {
        display: grid;
        gap: 4px;
        min-width: 0;
      }

      .tablet-meta .track-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .tablet-meta .track-subtitle,
      .tablet-meta .track-album {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .tablet-transport {
        flex: 0 0 auto;
        margin: 0;
        gap: 12px;
      }

      .tablet-progress-row {
        display: flex;
        align-items: center;
        gap: 28px;
        min-width: 0;
      }

      .tablet-seek {
        flex: 1 1 auto;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 16px;
        min-width: 0;
      }

      .tablet-time {
        min-width: 36px;
        font-variant-numeric: tabular-nums;
      }

      .tablet-seek .tablet-time:last-child {
        text-align: right;
      }

      .tablet-volume {
        flex: 0 1 260px;
        min-width: 180px;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 12px;
      }

      .tablet-progress-row.no-seekbar .tablet-volume {
        flex: 1 1 auto;
      }

      .tablet-mute-button {
        width: 36px;
        height: 36px;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: transparent;
        display: grid;
        place-items: center;
        color: var(--mysmart-music-card-muted);
      }

      .tablet-mute-button.is-muted {
        color: var(--mysmart-music-card-accent);
      }

      .shell-tablet .grouping-panel {
        height: 100%;
        min-height: 0;
        grid-template-rows: minmax(0, 1fr) auto;
      }

      .shell-tablet .group-list {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        align-content: start;
        min-height: 0;
        overflow: auto;
      }

      .shell-tablet .volumes-panel {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        align-content: start;
        gap: 10px;
      }

      .shell-tablet .volumes-panel .volume-list {
        display: contents;
      }

      .shell-tablet .volume-master,
      .shell-tablet .volume-item {
        padding: 16px 20px;
      }

      .shell-tablet .favorite-panel {
        height: 100%;
        min-height: 0;
        align-content: start;
        gap: 12px;
      }

      .shell-tablet .search-input {
        padding-block: 7px;
      }

      /* With a fixed card height, tiles fill the height left under the toolbar and stay square,
         so the whole artwork is visible instead of being clipped at the bottom. */
      .shell-tablet.has-fixed-height .favorite-panel {
        display: flex;
        flex-direction: column;
      }

      .shell-tablet.has-fixed-height .favorite-list-tiles {
        display: flex;
        flex: 1 1 auto;
        min-height: 0;
      }

      .shell-tablet.has-fixed-height .favorite-item.favorite-item-tile {
        flex: 0 0 auto;
        width: auto;
        height: 100%;
        max-height: 180px;
      }

      .shell-tablet .favorite-toolbar {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .search-field {
        position: relative;
        display: flex;
        align-items: center;
        flex: 0 1 290px;
        min-width: 160px;
      }

      .search-field ha-icon {
        position: absolute;
        left: 14px;
        color: var(--mysmart-music-card-muted);
        pointer-events: none;
        --mdc-icon-size: 20px;
      }

      .search-field .search-input {
        padding-left: 44px;
      }

      .shell-tablet .favorite-toolbar-row {
        flex: 1 1 auto;
        min-width: 0;
        overflow-x: auto;
        scrollbar-width: none;
      }

      .shell-tablet .favorite-toolbar-row::-webkit-scrollbar {
        display: none;
      }

      .shell-tablet .filter-pills {
        flex-wrap: nowrap;
      }

      .shell-tablet .filter-pill {
        flex: 0 0 auto;
      }

      .favorite-list-tiles {
        grid-auto-flow: column;
        grid-auto-columns: 148px;
        gap: 12px;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x proximity;
        scrollbar-width: none;
      }

      .favorite-list-tiles::-webkit-scrollbar {
        display: none;
      }

      .favorite-item.favorite-item-tile {
        position: relative;
        display: block;
        aspect-ratio: 1;
        padding: 0;
        border-radius: 20px;
        overflow: hidden;
        scroll-snap-align: start;
      }

      /* Tiles with artwork show only the cover; tiles without it center the type icon and name. */
      .favorite-art.favorite-art-tile {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
        background: transparent;
        --mdc-icon-size: 32px;
      }

      .favorite-item.favorite-item-tile:not(.has-artwork) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        box-sizing: border-box;
      }

      .favorite-item-tile:not(.has-artwork) .favorite-art.favorite-art-tile {
        position: static;
        width: auto;
        height: auto;
        flex: 0 0 auto;
        overflow: visible;
      }

      .favorite-copy-tile {
        max-width: 100%;
        text-align: center;
      }

      .favorite-copy-tile .favorite-name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: anywhere;
        font-weight: 600;
      }

      .custom-seek-slider.is-flat .custom-seek-wave-path {
        transition: d 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .stream-pill-bars span,
        .custom-seek-slider.is-animated .custom-seek-wave-svg,
        .favorite-item.is-starting .favorite-art,
        .favorite-loading-indicator ha-icon {
          animation: none;
        }
      }

      @media (max-width: 640px) {
        .content {
          padding: 18px;
        }

        .content-minimal {
          padding: 0;
        }

        .compact-player-layout {
          grid-template-columns: 82px minmax(0, 1fr);
          gap: 10px 12px;
        }

        .compact-artwork {
          width: 82px;
          border-radius: 18px;
        }

        .compact-transport {
          gap: 6px;
        }

        .compact-transport .icon-button {
          width: 36px;
          height: 36px;
        }

        .compact-transport .play-button {
          width: 50px;
          height: 50px;
        }

        .minimal-surface {
          grid-template-columns: auto minmax(0, 1fr);
          gap: 12px;
        }

        .minimal-controls {
          grid-column: 1 / -1;
          justify-content: flex-start;
          padding-left: 2px;
        }

        .track-title {
          font-size: 2em;
        }

        .transport-row {
          gap: 10px;
        }

        .icon-button {
          width: 42px;
          height: 42px;
        }

        .play-button {
          width: 60px;
          height: 60px;
        }
      }
`;async function Ce(e,t,i,a){const r={type:"media_player/browse_media",entity_id:t};return null!=i&&(r.media_content_type=i),null!=a&&(r.media_content_id=a),"function"==typeof e?.callWS?e.callWS(r):e?.connection?.sendMessagePromise?e.connection.sendMessagePromise(r):null}async function Ae(e,t,i=e=>e||""){const a=await Ce(e,t),r=a?.children?.find(e=>{const t=String(e?.title||"").toLowerCase(),i=String(e?.media_content_type||"").toLowerCase(),a=String(e?.media_content_id||"").toLowerCase();return"favorites"===t||"favorites"===i||"favorites"===a});if(!r)return{browseItems:{},metadata:{}};const s=[];return await Pe(e,t,r,s,r.title||"Favorites",i,new Set,0),{browseItems:be(s,{idField:"media_content_id",titleField:"title"}),metadata:be(s,{idField:"mediaContentId",titleField:"title"})}}async function Pe(e,t,i,a,r,s,o,n){if(!i||n>12)return;const l=[i.media_content_type||"",i.media_content_id||"",i.title||""].join("|");if(o.has(l))return;o.add(l);const c=!1===i.can_expand&&Array.isArray(i.children)?i:await Ce(e,t,i.media_content_type,i.media_content_id||""),d=c?.title||r||"";for(const i of c?.children||[]){if(i.can_play){const e=i.media_content_id||"",t=i.media_content_type||"";a.push({title:i.title||"",media_content_id:e,media_content_type:t,mediaContentId:e,mediaContentType:t,image:s(i.thumbnail||i.media_image_url||i.entity_picture||i.image||i.image_url||""),rawType:t||i.media_class||"",canExpand:i.can_expand,childrenMediaClass:i.children_media_class||"",favoriteType:d})}i.can_expand&&await Pe(e,t,i,a,i.title||d,s,o,n+1)}}const Me="player",Ve="grouping",De="favorites",Ee="volumes",Ie=["off","all","one"],Te="list";customElements.define("mysmart-music-control",class extends oe{static get properties(){return{hass:{},config:{},_screen:{state:!0},_activeStreamKey:{state:!0},_activeStreamCoordinator:{state:!0},_groupDraft:{state:!0},_draftStreamKey:{state:!0},_isApplyingGroup:{state:!0},_progressNow:{state:!0},_volumePreview:{state:!0},_seekPreview:{state:!0},_favoriteMetadata:{state:!0},_favoriteBrowseItems:{state:!0},_isCompactMenuOpen:{state:!0},_isMinimalCollapsed:{state:!0},_seekWaveSpan:{state:!0}}}constructor(){super(),this._screen=Me,this._activeStreamKey="",this._activeStreamCoordinator="",this._groupDraft=[],this._draftStreamKey="",this._isApplyingGroup=!1,this._progressNow=Date.now(),this._volumePreview={},this._seekPreview={},this._favoriteMetadata={},this._favoriteBrowseItems={},this._favoriteDataKey="",this._favoriteDataRequestKey="",this._favoriteDataLoading=!1,this._favoriteDataReloadRequested=!1,this._clock=null,this._activeVolumeDrag=null,this._activeSeekDrag=null,this._volumeMoveHandler=this._handleVolumePointerMove.bind(this),this._volumeUpHandler=this._handleVolumePointerUp.bind(this),this._seekMoveHandler=this._handleSeekPointerMove.bind(this),this._seekUpHandler=this._handleSeekPointerUp.bind(this),this._isCompactMenuOpen=!1,this._isMinimalCollapsed=!1,this._hasInitializedCollapse=!1,this._seekPreviewTimers={},this._seekWaveSpan=480,this._seekWaveResizeObserver=null}connectedCallback(){super.connectedCallback(),this._syncProgressClock(),this._syncSeekWaveResizeObserver()}_syncSeekWaveResizeObserver(){this._seekWaveResizeObserver||"undefined"==typeof ResizeObserver||(this._seekWaveResizeObserver=new ResizeObserver(e=>{for(const t of e){const e=t.contentRect?.width||0;this._growSeekWaveSpan(e)}}))}_growSeekWaveSpan(e){const t=32*Math.ceil(Math.max(e,480)/32);t>this._seekWaveSpan&&(this._seekWaveSpan=t)}_observeSeekTrackWidth(){if(!this._seekWaveResizeObserver)return;const e=this.renderRoot?.querySelector(".custom-seek-track");e&&this._observedSeekTrack!==e&&(this._observedSeekTrack&&this._seekWaveResizeObserver.unobserve(this._observedSeekTrack),this._observedSeekTrack=e,this._seekWaveResizeObserver.observe(e),this._growSeekWaveSpan(e.clientWidth))}_shouldRunProgressClock(){const e=this._getActiveStream(this._getStreams()),t=e?.stateObj;return function({isConnected:e,playerVisible:t,seekbarVisible:i,mediaState:a,mediaDuration:r}){return Boolean(e&&t&&i&&"playing"===a&&(Number(r)||0)>0)}({isConnected:this.isConnected,playerVisible:[me,_e].includes(this._getDisplayMode())&&this._screen===Me,seekbarVisible:!1!==this.config?.show_seekbar,mediaState:t?.state,mediaDuration:t?.attributes?.media_duration})}_syncProgressClock(){this._shouldRunProgressClock()?this._clock||(this._progressNow=Date.now(),this._clock=window.setInterval(()=>{this._progressNow=Date.now()},1e3)):this._stopProgressClock()}_stopProgressClock(){this._clock&&(window.clearInterval(this._clock),this._clock=null)}disconnectedCallback(){super.disconnectedCallback(),this._stopProgressClock(),this._seekWaveResizeObserver&&(this._seekWaveResizeObserver.disconnect(),this._seekWaveResizeObserver=null),this._observedSeekTrack=null,this._teardownVolumePointerListeners(),this._teardownSeekPointerListeners();for(const e of Object.values(this._seekPreviewTimers))window.clearTimeout(e);this._seekPreviewTimers={}}updated(e){super.updated(e),this._syncProgressClock(),this._observeSeekTrackWidth();this._screen===De&&(e.has("hass")||e.has("config")||e.has("_screen"))&&this._maybeLoadBrowseData(),(e.has("hass")||e.has("config")||e.has("_activeStreamKey")||e.has("_activeStreamCoordinator"))&&this._reconcileActiveStreamState()}setConfig(e){const t=Array.isArray(e?.entities)?e.entities.filter(Boolean):e?.entity?[e.entity]:[];if(!t.length)throw new Error("You need to define one or more media_player entities");this.config={title:"",favorites_entity:"",card_background:"",accent_color:"",active_color:"",tab_background:"",tab_border_color:"",inactive_button_background:"",inactive_tab_button_background:"",stream_selector_active_color:"",slider_remaining:"",player_button_background:"",play_button_background:"",play_button_icon_color:"",display_mode:me,height:"",start_collapsed:!1,tap_action:{action:"none"},show_title:!0,show_artwork:!0,show_speaker_pill:!0,show_album_title:!0,show_seekbar:!0,show_volume:!0,always_show_stream_selector:!1,browse_view:Te,...e,entities:t};const i=this._getDisplayMode();i===ue?this._hasInitializedCollapse||(this._isMinimalCollapsed=!0===this.config?.start_collapsed,this._hasInitializedCollapse=!0):(this._isMinimalCollapsed=!1,this._hasInitializedCollapse=!1),i!==pe&&(this._isCompactMenuOpen=!1)}static async getConfigElement(){return document.createElement("mysmart-music-control-editor")}static getStubConfig(){return{entities:["media_player.living_room"]}}getCardSize(){return 10}render(){const e=this._getStreams(),t=this._getActiveStream(e),i=t?.stateObj||null,a=this._getFavorites(),r=a,s=a.length>0,o=this.config?.title?.trim(),n=this._getDisplayMode();return j`
      <ha-card class=${this._getShellClassNames(n)} style=${this._styleMap()}>
        <div class="content ${this._hasFixedHeight(n)?"has-fixed-height":""} ${n===ue?"content-minimal":""}">
          ${n===ue?this._renderMinimalMode(i,t):n===_e?this._renderTabletMode(e,i,t,o,r,s):j`
              <div class="top-shell ${this._hasFixedHeight(n)?"top-shell-fixed":""}">
                ${n===pe?this._renderCompactHeader(e,t,o,s):o||e.length>1||!0===this.config?.always_show_stream_selector?this._renderHeader(e,t,o):B}
                ${n===me?this._renderScreenTabs(s):B}
                ${n===pe?this._renderCompactMenu(s):B}
              </div>
              <div class="body-shell ${this._hasFixedHeight(n)?"body-shell-scroll":""}">
                ${n===pe?this._renderCompactBody(i,t,r,s):this._renderBody(i,t,r,s)}
              </div>
            `}
        </div>
      </ha-card>
    `}_styleMap(){const e=[],t=this._getDisplayMode(),i=this.config?.active_color||this.config?.accent_color,a=t!==ue?ye(this.config?.height):"";return this.config?.card_background&&e.push(`--mysmart-music-card-background:${this.config.card_background}`),i&&e.push(`--mysmart-music-card-accent:${i}`),this.config?.tab_background&&e.push(`--mysmart-music-card-tab-background:${this.config.tab_background}`),this.config?.tab_border_color&&e.push(`--mysmart-music-card-tab-border-color:${this.config.tab_border_color}`),this.config?.inactive_button_background&&(e.push(`--mysmart-music-card-button-surface:${this.config.inactive_button_background}`),e.push(`--mysmart-music-card-surface:${this.config.inactive_button_background}`)),this.config?.inactive_tab_button_background&&e.push(`--mysmart-music-card-tab-button-surface:${this.config.inactive_tab_button_background}`),this.config?.stream_selector_active_color&&e.push(`--mysmart-music-card-stream-selector-active-color:${this.config.stream_selector_active_color}`),this.config?.slider_remaining&&e.push(`--mysmart-music-card-slider-remaining:${this.config.slider_remaining}`),this.config?.player_button_background&&e.push(`--mysmart-music-card-player-button-background:${this.config.player_button_background}`),this.config?.play_button_background&&e.push(`--mysmart-music-card-play-button-background:${this.config.play_button_background}`),this.config?.play_button_icon_color&&e.push(`--mysmart-music-card-play-button-icon-color:${this.config.play_button_icon_color}`),a&&e.push(`--mysmart-music-card-height:${a}`),e.join(";")}_t(e,t={}){return ke(this.hass,e,t)}_getDisplayMode(){return function(e){const t=String(e?.display_mode||me).toLowerCase();return[me,pe,ue,_e].includes(t)?t:me}(this.config)}_hasFixedHeight(e){return e!==ue&&Boolean(ye(this.config?.height))}_getShellClassNames(e){const t=["shell",`shell-${e}`];return this._hasFixedHeight(e)&&t.push("has-fixed-height"),e===ue&&this._isMinimalCollapsed&&t.push("minimal-collapsed-shell"),t.join(" ")}_renderHeader(e,t,i){const a=e.length>1||!0===this.config?.always_show_stream_selector;return j`
      <div class="header ${i?"":"header-no-title"}">
        ${i?j`<div class="title">${i}</div>`:j`<div></div>`}
        ${a?this._renderStreamPills(e,t):B}
      </div>
    `}_renderStreamPills(e,t){return j`
      <div class="stream-pills">
        ${e.map(e=>j`
          <button
            class="stream-pill ${e.key===t?.key?"active":""} ${this._isStreamPlaying(e)?"is-playing has-indicator":""}"
            @click=${()=>this._selectStream(e.key)}
          >
            <span class="stream-pill-content">
              <span class="stream-pill-icon-slot" aria-hidden="true">
                ${this._isStreamPlaying(e)?j`
                  <span class="stream-pill-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                `:B}
              </span>
              <span class="stream-pill-label">${e.label}</span>
            </span>
          </button>
        `)}
      </div>
    `}_renderCompactHeader(e,t,i,a){const r=e.length>1||!0===this.config?.always_show_stream_selector;return j`
      <div class="compact-header">
        <div class="compact-header-row">
          <div class="compact-header-main">
            ${r?this._renderStreamPills(e,t):B}
          </div>
          <button
            class="menu-button"
            title=${this._isCompactMenuOpen?this._t("close_menu"):this._t("compact_menu")}
            aria-label=${this._isCompactMenuOpen?this._t("close_menu"):this._t("compact_menu")}
            @click=${()=>{this._isCompactMenuOpen=!this._isCompactMenuOpen}}
          >
            <ha-icon icon=${this._isCompactMenuOpen?"mdi:close":"mdi:menu"}></ha-icon>
          </button>
        </div>
      </div>
    `}_availableScreens(e){const t=[{key:Me,label:this._t("player")},{key:Ve,label:this._t("grouping")},{key:Ee,label:this._t("volumes")}];return e&&t.push({key:De,label:this._t("browse")}),t}_renderScreenTabs(e){const t=this._availableScreens(e);return j`
      <div class="screen-tabs">
        ${t.map(e=>j`
          <button
            class="screen-tab ${this._screen===e.key?"active":""}"
            @click=${()=>{this._screen=e.key}}
          >
            ${e.label}
          </button>
        `)}
      </div>
    `}_renderCompactMenu(e){return this._isCompactMenuOpen?j`
      <div class="compact-menu-backdrop" @click=${()=>{this._isCompactMenuOpen=!1}}>
        <div class="compact-menu-panel" @click=${e=>e.stopPropagation()}>
          ${this._availableScreens(e).map(e=>j`
            <button
              class="compact-menu-item ${this._screen===e.key?"active":""}"
              @click=${()=>{this._screen=e.key,this._isCompactMenuOpen=!1}}
            >
              ${e.label}
            </button>
          `)}
        </div>
      </div>
    `:B}_renderBody(e,t,i,a){return e&&t?this._screen===Ve?this._renderGrouping(t):this._screen===Ee?this._renderVolumes(t):this._screen===De&&a?this._renderFavorites(t,i):this._renderPlayer(e,t):j`
        <div class="empty-state">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t("no_speakers")}</div>
        </div>
      `}_renderCompactBody(e,t,i,a){return e&&t?this._screen===Ve?this._renderGrouping(t):this._screen===Ee?this._renderVolumes(t):this._screen===De&&a?this._renderFavorites(t,i):this._renderCompactPlayer(e,t):j`
        <div class="empty-state small">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t("no_speakers")}</div>
        </div>
      `}_renderMinimalMode(e,t){return e&&t?this._renderMinimalPlayer(e,t):j`
        <div class="empty-state small">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t("no_speakers")}</div>
        </div>
      `}_renderTabletMode(e,t,i,a,r,s){const o=e.length>1||!0===this.config?.always_show_stream_selector,n=!1!==this.config?.show_artwork,l=t?this._getArtworkUrl(t):"";return j`
      <div class="tablet-layout ${n?"":"no-artwork"}">
        ${n?j`
          <div class="tablet-artwork ${l?"has-artwork":""}" style=${l?`background-image:url("${l}")`:""}>
            ${l?B:j`<ha-icon icon="mdi:album"></ha-icon>`}
          </div>
        `:B}

        <div class="tablet-main">
          <div class="tablet-header">
            <div class="tablet-header-start">
              ${a?j`<div class="title">${a}</div>`:B}
              ${o?this._renderStreamPills(e,i):B}
            </div>
            ${this._renderScreenTabs(s)}
          </div>
          <div class="body-shell tablet-body">
            ${this._renderTabletBody(t,i,r,s)}
          </div>
        </div>
      </div>
    `}_renderTabletBody(e,t,i,a){return e&&t?this._screen===Ve?this._renderGrouping(t):this._screen===Ee?this._renderVolumes(t):this._screen===De&&a?this._renderFavorites(t,i,"tiles"):this._renderTabletPlayer(e,t):j`
        <div class="empty-state small">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <div>${this._t("no_speakers")}</div>
        </div>
      `}_renderTabletPlayer(e,t){const i=this._getPlayerViewModel(e,t),a=!1!==this.config?.show_seekbar,r=!1!==this.config?.show_volume,s=!0===e.attributes.is_volume_muted,o=`player:${t.coordinator}`,n=this._getDisplayedVolume(o,i.volume);return j`
      <div class="tablet-player">
        <div class="tablet-player-top">
          <div class="tablet-meta">
            ${!1!==this.config?.show_title?j`<div class="track-title">${i.title}</div>`:B}
            ${i.artist?j`<div class="track-subtitle">${i.artist}</div>`:B}
            ${!1!==this.config?.show_album_title&&i.album?j`<div class="track-album">${i.album}</div>`:B}
          </div>
          <div class="transport-row tablet-transport">
            ${this._renderTransportButtons(i,t)}
          </div>
        </div>

        ${a||r?j`
          <div class="tablet-progress-row ${a?"":"no-seekbar"}">
            ${a?j`
              <div class="tablet-seek">
                <span class="tablet-time">${this._formatTime(i.displayedPosition)}</span>
                ${this._renderSeekSlider({key:`seek:${t.coordinator}`,value:i.displayedPosition,duration:i.duration,label:this._t("seek_position"),descriptor:{entityId:t.coordinator,currentValue:i.currentPosition,duration:i.duration},animate:i.isPlaying&&!this._activeSeekDrag,flatten:!i.isPlaying&&!this._activeSeekDrag})}
                <span class="tablet-time">${this._formatTime(i.duration)}</span>
              </div>
            `:B}
            ${r?j`
              <div class="tablet-volume">
                <button
                  class="tablet-mute-button ${s?"is-muted":""}"
                  title=${s?this._t("unmute"):this._t("mute")}
                  aria-label=${s?this._t("unmute"):this._t("mute")}
                  aria-pressed=${s?"true":"false"}
                  @click=${()=>this._callService("media_player","volume_mute",{entity_id:t.coordinator,is_volume_muted:!s})}
                >
                  <ha-icon icon=${this._volumeIcon(n,s)}></ha-icon>
                </button>
                ${this._renderVolumeSlider({key:o,value:n,label:this._t("player_volume"),descriptor:{type:"player",entityId:t.coordinator,currentValue:i.volume}})}
                <span class="volume-value">${n}%</span>
              </div>
            `:B}
          </div>
        `:B}
      </div>
    `}_volumeIcon(e,t){return t||e<=0?"mdi:volume-off":e<34?"mdi:volume-low":e<67?"mdi:volume-medium":"mdi:volume-high"}_renderTransportButtons(e,t){return j`
      <button class="icon-button ${e.shuffle?"active":""}" @click=${()=>this._setShuffle(t.coordinator,!e.shuffle)}>
        <ha-icon icon="mdi:shuffle-variant"></ha-icon>
      </button>
      <button class="icon-button" @click=${()=>this._callService("media_player","media_previous_track",{entity_id:t.coordinator})}>
        <ha-icon icon="mdi:skip-previous"></ha-icon>
      </button>
      <button class="play-button" @click=${()=>this._callService("media_player","media_play_pause",{entity_id:t.coordinator})}>
        <ha-icon icon=${e.isPlaying?"mdi:pause":"mdi:play"}></ha-icon>
      </button>
      <button class="icon-button" @click=${()=>this._callService("media_player","media_next_track",{entity_id:t.coordinator})}>
        <ha-icon icon="mdi:skip-next"></ha-icon>
      </button>
      <button class="icon-button ${"off"!==e.repeat?"active":""}" @click=${()=>this._cycleRepeat(t.coordinator,e.repeat)}>
        <ha-icon icon=${"one"===e.repeat?"mdi:repeat-once":"mdi:repeat"}></ha-icon>
      </button>
    `}_getPlayerViewModel(e,t){const i=e.attributes.media_title||e.attributes.media_channel||e.attributes.friendly_name||this._t("nothing_playing"),a=e.attributes.media_artist||e.attributes.app_name||e.attributes.source||(e.attributes.media_channel?"":this._t("choose_something")),r=e.attributes.media_album_name||"",s=this._getArtworkUrl(e),o=Number(e.attributes.media_duration)||0,n=this._getCurrentPosition(e,o);return{title:i,artist:a,album:r,artwork:s,duration:o,currentPosition:n,displayedPosition:this._getDisplayedSeek(`seek:${t.coordinator}`,n,o),volume:Math.round(100*(Number(e.attributes.volume_level)||0)),isPlaying:["playing","buffering"].includes(e.state),shuffle:!0===e.attributes.shuffle,repeat:e.attributes.repeat||"off"}}_getSpeakerCountLabel(e){return 1===e?this._t("active_speakers_one"):this._t("active_speakers_other",{count:e})}_renderPlayer(e,t){const i=this._getPlayerViewModel(e,t);return j`
      <div class="player-layout ${this.config?.show_artwork?"":"compact-player"}">
        ${!1!==this.config?.show_artwork?j`
          <div class="artwork-shell ${i.artwork?"has-artwork":""}" style=${i.artwork?`background-image:url("${i.artwork}")`:""}>
            ${i.artwork?B:j`<ha-icon icon="mdi:music-circle-outline"></ha-icon>`}
          </div>
        `:B}

        <div class="meta">
          ${!1!==this.config?.show_speaker_pill?j`
            <div class="meta-chip">${this._getSpeakerCountLabel(t.members.length)}</div>
          `:B}
          ${!1!==this.config?.show_title?j`<div class="track-title">${i.title}</div>`:B}
          ${i.artist?j`<div class="track-subtitle">${i.artist}</div>`:B}
          ${!1!==this.config?.show_album_title&&i.album?j`<div class="track-album">${i.album}</div>`:B}
        </div>

        ${!1!==this.config?.show_seekbar?j`
          <div class="progress-block">
            ${this._renderSeekSlider({key:`seek:${t.coordinator}`,value:i.displayedPosition,duration:i.duration,label:this._t("seek_position"),descriptor:{entityId:t.coordinator,currentValue:i.currentPosition,duration:i.duration},animate:i.isPlaying&&!this._activeSeekDrag,flatten:!i.isPlaying&&!this._activeSeekDrag})}
            <div class="time-row">
              <span>${this._formatTime(i.displayedPosition)}</span>
              <span>${this._formatTime(i.duration)}</span>
            </div>
          </div>
        `:B}

        <div class="transport-row">
          ${this._renderTransportButtons(i,t)}
        </div>

        ${!1!==this.config?.show_volume?j`
          <div class="volume-block">
            ${this._renderVolumeSlider({key:`player:${t.coordinator}`,value:this._getDisplayedVolume(`player:${t.coordinator}`,i.volume),label:this._t("player_volume"),descriptor:{type:"player",entityId:t.coordinator,currentValue:i.volume}})}
          </div>
        `:B}
      </div>
    `}_renderCompactPlayer(e,t){const i=this._getPlayerViewModel(e,t);return j`
      <div class="compact-player-layout">
        ${!1!==this.config?.show_artwork?j`
          <div class="compact-artwork ${i.artwork?"has-artwork":""}" style=${i.artwork?`background-image:url("${i.artwork}")`:""}>
            ${i.artwork?B:j`<ha-icon icon="mdi:music"></ha-icon>`}
          </div>
        `:B}
        <div class="compact-copy">
          ${!1!==this.config?.show_title?j`<div class="compact-title">${i.title}</div>`:B}
          ${i.artist?j`<div class="compact-subtitle">${i.artist}</div>`:B}
        </div>
        <div class="compact-transport transport-row">
          ${this._renderTransportButtons(i,t)}
        </div>
      </div>
    `}_renderMinimalPlayer(e,t){const i=this._getPlayerViewModel(e,t),a=["playing","buffering"].includes(e?.state);return j`
      <div class="minimal-shell ${this._isMinimalCollapsed?"is-collapsed":""}">
        <div class="minimal-surface" @click=${e=>this._handleMinimalSurfaceTap(e,t.coordinator)}>
          ${!1!==this.config?.show_artwork?j`
            <div class="minimal-artwork ${i.artwork?"has-artwork":""}" style=${i.artwork?`background-image:url("${i.artwork}")`:""}>
              ${i.artwork?B:j`<ha-icon icon="mdi:music"></ha-icon>`}
            </div>
          `:B}
          <div class="minimal-copy">
            ${!1!==this.config?.show_title?j`<div class="minimal-title">${i.title}</div>`:B}
            ${i.artist?j`<div class="minimal-subtitle">${i.artist}</div>`:B}
          </div>
          <div class="minimal-controls">
            <button class="icon-button minimal-control" @click=${e=>this._handleControlClick(e,()=>this._callService("media_player","media_previous_track",{entity_id:t.coordinator}))}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button class="play-button minimal-play" @click=${e=>this._handleControlClick(e,()=>this._callService("media_player","media_play_pause",{entity_id:t.coordinator}))}>
              <ha-icon icon=${i.isPlaying?"mdi:pause":"mdi:play"}></ha-icon>
            </button>
            <button class="icon-button minimal-control" @click=${e=>this._handleControlClick(e,()=>this._callService("media_player","media_next_track",{entity_id:t.coordinator}))}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>
            <button class="icon-button minimal-control" title=${this._t("minimize")} aria-label=${this._t("minimize")} @click=${e=>this._handleControlClick(e,()=>{this._isMinimalCollapsed=!0})}>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
          </div>
        </div>
        <button
          class="minimal-collapsed-button"
          title=${this._t("expand")}
          aria-label=${this._t("expand")}
          @click=${e=>this._handleControlClick(e,()=>{this._isMinimalCollapsed=!1})}
        >
          ${a?j`
            <span class="stream-pill-bars compact-bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          `:j`<ha-icon icon="mdi:music"></ha-icon>`}
        </button>
      </div>
    `}_renderGrouping(e){const t=this._getConfiguredSpeakerStates(),i=new Set(e.members),a=new Set(this._groupDraft);return j`
      <div class="panel panel-tight grouping-panel">
        <div class="group-list">
          ${t.map(t=>j`
            <label class="group-item ${i.has(t.entity_id)?"is-member":""}">
              <input
                class="group-item-input"
                type="checkbox"
                .checked=${a.has(t.entity_id)}
                .disabled=${t.entity_id===e.coordinator}
                @change=${e=>this._toggleDraftSpeaker(t.entity_id,e.target.checked)}
              />
              <span class="group-item-checkbox" aria-hidden="true"></span>
              <div class="group-item-copy">
                <div class="group-item-name">${t.attributes.friendly_name||t.entity_id}</div>
                <div class="group-item-meta">${t.entity_id===e.coordinator?this._t("coordinator"):i.has(t.entity_id)?this._t("currently_grouped"):this._t("available")}</div>
              </div>
              ${"playing"===t.state?j`<span class="group-status live">${this._t("live")}</span>`:B}
            </label>
          `)}
        </div>

        <div class="group-actions">
          <button class="secondary-button" @click=${()=>this._resetDraft(e)}>
            ${this._t("reset")}
          </button>
          <button class="secondary-button" @click=${()=>this._ungroupAll()} ?disabled=${e.members.length<=1||this._isApplyingGroup}>
            ${this._t("ungroup_all")}
          </button>
          <button class="primary-button" @click=${()=>this._applyGrouping()} ?disabled=${this._isApplyingGroup}>
            ${this._isApplyingGroup?this._t("applying"):this._t("apply_grouping")}
          </button>
        </div>
      </div>
    `}_renderVolumes(e){const t=e.members.map(e=>this.hass?.states?.[e]).filter(Boolean),i=t.length?Math.round(t.reduce((e,t)=>e+(Number(t.attributes.volume_level)||0),0)/t.length*100):0;return j`
      <div class="panel panel-tight volumes-panel">
        <div class="volume-master">
          <div class="group-item-name">${this._t("overall")}</div>
          <div class="volume-slider-row">
            ${this._renderVolumeSlider({key:`group:${e.coordinator}`,value:this._getDisplayedVolume(`group:${e.coordinator}`,i),label:this._t("overall_volume"),descriptor:{type:"group",currentValue:i,levels:t.map(e=>({entityId:e.entity_id,currentValue:Math.round(100*(Number(e.attributes.volume_level)||0))}))}})}
            <span class="volume-value">${this._getDisplayedVolume(`group:${e.coordinator}`,i)}%</span>
          </div>
        </div>

        <div class="volume-list">
          ${t.map(e=>{const t=Math.round(100*(Number(e.attributes.volume_level)||0));return j`
              <div class="volume-item">
                <div class="group-item-name">${e.attributes.friendly_name||e.entity_id}</div>
                <div class="volume-slider-row">
                  ${this._renderVolumeSlider({key:`speaker:${e.entity_id}`,value:this._getDisplayedVolume(`speaker:${e.entity_id}`,t),label:`${e.attributes.friendly_name||e.entity_id} volume`,descriptor:{type:"speaker",entityId:e.entity_id,currentValue:t}})}
                  <span class="volume-value">${this._getDisplayedVolume(`speaker:${e.entity_id}`,t)}%</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_renderFavorites(e,t,i=this.config?.browse_view||Te){return j`
      <mysmart-music-control-favorites
        .hass=${this.hass}
        .activeStream=${e}
        .favorites=${t}
        .view=${i}
        @favorite-played=${()=>{this._screen=Me}}
      ></mysmart-music-control-favorites>
    `}_handleMinimalSurfaceTap(e,t){(e.composedPath?.()||[]).some(e=>e instanceof HTMLElement&&"true"===e.dataset?.actionStop)||this.config?.tap_action&&async function(e,t,i,a={}){const r=i?.action||"none";if("none"!==r)if("more-info"!==r){if("navigate"===r){const e=i.navigation_path;return void(e&&(history.pushState(null,"",e),xe(window,"location-changed",{replace:!1})))}if("url"===r){const e=i.url_path;if(e){const t=!0===i.new_tab?"_blank":"_self";window.open(e,t)}return}if("call-service"===r||"perform-action"===r){const e=i.service||i.perform_action;if(!e||"string"!=typeof e)return;const[r,s]=e.split(".");if(!r||!s)return;return void await t.callService(r,s,{...i.service_data||i.data||{},...a.entityId?{entity_id:a.entityId}:{}})}"toggle"===r&&a.entityId&&await t.callService("homeassistant","toggle",{entity_id:a.entityId})}else a.entityId&&xe(e,"hass-more-info",{entityId:a.entityId})}(this,this.hass,this.config.tap_action,{entityId:t})}_handleControlClick(e,t){e.stopPropagation(),e.preventDefault();const i=e.currentTarget;i?.dataset&&(i.dataset.actionStop="true",window.requestAnimationFrame(()=>{delete i.dataset.actionStop})),t()}_maybeLoadBrowseData(){this._maybeLoadFavoriteData()}_getConfiguredSpeakerStates(){return(this.config?.entities||[]).map(e=>this.hass?.states?.[e]).filter(Boolean)}_getStreams(){const e=this._getConfiguredSpeakerStates(),t=new Map;return e.forEach(e=>{const i=this._normalizeMembers(e),a=i.slice().sort().join("|")||e.entity_id,r=this._getCoordinator(e,i);t.has(a)||t.set(a,{key:a,coordinator:r,members:i,label:this._streamLabel(r,i),stateObj:this.hass.states[r]||e})}),Array.from(t.values())}_normalizeMembers(e){const t=Array.isArray(e.attributes.group_members)?e.attributes.group_members.filter(e=>(this.config?.entities||[]).includes(e)):[];return t.includes(e.entity_id)||t.push(e.entity_id),Array.from(new Set(t))}_getCoordinator(e,t){const i=(Array.isArray(e.attributes.group_members)?e.attributes.group_members.filter(e=>t.includes(e)):[])[0];return t.find(e=>this.hass?.states?.[e]?.attributes?.group_members?.[0]===e)||i||t[0]||e.entity_id}_streamLabel(e,t){const i=this.hass?.states?.[e],a=i?.attributes?.friendly_name||e?.replace("media_player.","")||"Stream";return t.length<=1?a:`${a} +${t.length-1}`}_isStreamPlaying(e){return!!e&&e.members.some(e=>["playing","buffering"].includes(this.hass?.states?.[e]?.state))}_getActiveStream(e){return e.length?e.find(e=>e.key===this._activeStreamKey)||e.find(e=>e.coordinator===this._activeStreamCoordinator)||e.find(e=>this._isStreamPlaying(e))||e[0]:null}_reconcileActiveStreamState(){const e=this._getStreams(),t=this._getActiveStream(e);if(!t)return void((this._activeStreamKey||this._activeStreamCoordinator||this._draftStreamKey||this._groupDraft.length)&&(this._activeStreamKey="",this._activeStreamCoordinator="",this._draftStreamKey="",this._groupDraft=[]));const i=this._activeStreamKey!==t.key||this._activeStreamCoordinator!==t.coordinator,a=e.some(e=>e.key===this._draftStreamKey),r=!a||this._draftStreamKey!==t.key||!this._groupDraft.length;this._activeStreamKey!==t.key&&(this._activeStreamKey=t.key),this._activeStreamCoordinator!==t.coordinator&&(this._activeStreamCoordinator=t.coordinator),i&&r?(this._groupDraft=t.members.slice(),this._draftStreamKey=t.key):!a&&this._draftStreamKey&&(this._draftStreamKey="")}_selectStream(e){this._activeStreamKey=e;const t=this._getStreams().find(t=>t.key===e);this._activeStreamCoordinator=t?.coordinator||"",t&&(this._groupDraft=t.members.slice(),this._draftStreamKey=t.key)}_toggleDraftSpeaker(e,t){const i=new Set(this._groupDraft);t?i.add(e):i.delete(e),this._groupDraft=Array.from(i)}_resetDraft(e){this._groupDraft=e.members.slice(),this._draftStreamKey=e.key}async _applyGrouping(){const e=this._getStreams(),t=this._getActiveStream(e);if(!t)return;const i=t.coordinator,a=Array.from(new Set([i,...this._groupDraft||[]])),r=t.members,s=r.filter(e=>e!==i&&!a.includes(e)),o=a.filter(e=>e!==i&&!r.includes(e));this._isApplyingGroup=!0;try{for(const e of s)await this._callService("media_player","unjoin",{entity_id:e});o.length&&await this._callService("media_player","join",{entity_id:i,group_members:o}),this._groupDraft=a.slice(),this._draftStreamKey=a.slice().sort().join("|")||i,this._activeStreamKey=this._draftStreamKey,this._activeStreamCoordinator=i}finally{this._isApplyingGroup=!1}}async _ungroupAll(){const e=this._getStreams(),t=this._getActiveStream(e);if(t){this._isApplyingGroup=!0;try{for(const e of t.members)e!==t.coordinator&&await this._callService("media_player","unjoin",{entity_id:e});this._groupDraft=[t.coordinator],this._draftStreamKey=t.coordinator,this._activeStreamKey=t.coordinator,this._activeStreamCoordinator=t.coordinator}finally{this._isApplyingGroup=!1}}}_getFavorites(){const e=this.config?.favorites_entity||this._findFavoritesEntity();if(!e)return[];const t=this.hass?.states?.[e],i=t?.attributes?.items;if(!i||"object"!=typeof i)return[];return Object.entries(i).map(([e,t])=>{const i="object"==typeof t&&null!==t?t:{},a="string"==typeof t?t:i.title||i.name||e,r=this._getFavoriteMetadata(e,a),s=this._getFavoriteBrowseItem(e,a),o=s.favoriteType||r.favoriteType||r.rawType||i.type||i.media_content_type||i.media_class||this._inferFavoriteType(e,a,r),n=this._resolveMediaUrl(s.image||r.image||i.image||i.thumbnail||i.entity_picture||i.media_image_url||i.image_url||""),l=this._normalizeFavoriteType(o,e,a,{...r,mediaContentId:s.media_content_id||r.mediaContentId,mediaContentType:s.media_content_type||r.mediaContentType,favoriteType:s.favoriteType||r.favoriteType});return{mediaId:e,name:a,image:n,type:l,typeLabel:s.favoriteType||r.favoriteType||o?this._prettifyType(s.favoriteType||r.favoriteType||o):this._favoriteTypeLabel(l),media_content_id:s.media_content_id||"",media_content_type:s.media_content_type||""}})}_findFavoritesEntity(){return function(e){const t=Object.values(e||{}).find(e=>e.entity_id.startsWith("sensor.")&&e.attributes?.items);return t?.entity_id||""}(this.hass?.states||{})}_getFavoriteMetadata(e,t){return fe(this._favoriteMetadata,e,t)}_getFavoriteBrowseItem(e,t){return fe(this._favoriteBrowseItems,e,t)}_favoriteTypeLabel(e){return function(e){return e===ce?"Album":e===de?"Playlist":e===he?"Radio":"Sonos favorite"}(e)}_prettifyType(e){return function(e){return String(e).replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}(e)}_normalizeFavoriteType(e,t="",i="",a={}){return function(e,t="",i="",a={}){const r=`${e||""} ${t||""} ${i||""} ${a.mediaContentId||""} ${a.mediaContentType||""} ${a.childrenMediaClass||""} ${a.favoriteType||""}`.toLowerCase();return r.includes("radio")||r.includes("station")||r.includes("mp3radio")||r.includes("audio broadcast")||r.includes("stream")?he:r.includes("playlist")||r.includes("playlistcontainer")||r.includes("0006206c")||r.includes("0006204c")||r.includes("spotify:playlist")||r.includes("tidal:playlist")||r.includes("applemusic:playlist")||r.includes("deezer:playlist")||r.includes("ytmusic:playlist")?de:r.includes("album")||r.includes("musicalbum")||r.includes("0004002c")||r.includes("spotify:album")||r.includes("tidal:album")||r.includes("applemusic:album")||r.includes("deezer:album")||r.includes("qobuz:album")||!1===a.canExpand&&"track"===a.childrenMediaClass?ce:!0===a.canExpand&&"track"===a.childrenMediaClass?de:le}(e,t,i,a)}_inferFavoriteType(e,t,i={}){return this._normalizeFavoriteType(i.rawType||"",e,t,i)}async _maybeLoadFavoriteData(){const e=function(e,t){const i=Array.isArray(e)?e.filter(Boolean):[];return i.length?i.find(e=>t?.[e])||i[0]:""}(this.config?.entities,this.hass?.states||{}),t=this.config?.favorites_entity||this._findFavoritesEntity(),i=t?this.hass?.states?.[t]?.attributes?.items:null;if(!e||!t||!i)return;const a=`${e}:${t}:${function(e){return JSON.stringify(Object.entries(e||{}).map(([e,t])=>{const i="object"==typeof t&&null!==t?t:{};return[e,"string"==typeof t?t:i.title||i.name||"",i.type||i.media_content_type||i.media_class||"",i.image||i.thumbnail||i.entity_picture||i.media_image_url||""]}))}(i)}`;if(a!==this._favoriteDataKey)if(this._favoriteDataLoading)a!==this._favoriteDataRequestKey&&(this._favoriteDataReloadRequested=!0);else{this._favoriteDataLoading=!0,this._favoriteDataRequestKey=a;try{const{browseItems:t,metadata:i}=await Ae(this.hass,e,e=>this._resolveMediaUrl(e));this._favoriteBrowseItems=t,this._favoriteMetadata=i,this._favoriteDataKey=a}catch(e){console.warn("[mysmart-music-control] Failed to load favorite browse data",e),this._favoriteBrowseItems={},this._favoriteMetadata={},this._favoriteDataKey=a}finally{this._favoriteDataLoading=!1,this._favoriteDataRequestKey="",this._favoriteDataReloadRequested&&(this._favoriteDataReloadRequested=!1,this._maybeLoadFavoriteData())}}}_getArtworkUrl(e){const t=e.attributes.entity_picture;return t?this._resolveMediaUrl(t):""}_resolveMediaUrl(e){if(!e)return"";const t=String(e).trim();if(!t)return"";if(t.startsWith("data:")||t.startsWith("blob:")||t.startsWith("//"))return t;if(t.startsWith("http://")||t.startsWith("https://")){try{const e=new URL(t);if(["/api/","/media/","/local/","/auth/","/hassio/","/static/"].some(t=>e.pathname.startsWith(t)))return`${e.pathname}${e.search}${e.hash}`}catch(e){return t}return t}return t.startsWith("/")?t:t.startsWith("api/")||t.startsWith("media/")||t.startsWith("local/")?`/${t}`:this.hass?.hassUrl?this.hass.hassUrl(t):t}_getCurrentPosition(e,t){const i=Number(e.attributes.media_position),a=e.attributes.media_position_updated_at;if(!Number.isFinite(i)||!a)return 0;if("playing"!==e.state)return Math.max(0,Math.min(t||i,i));const r=Math.max(0,(this._progressNow-new Date(a).getTime())/1e3);return Math.max(0,Math.min(t||i+r,i+r))}_renderSeekSlider({key:e,value:t,duration:i,label:a,descriptor:r,animate:s,flatten:o=!1}){const n=Math.max(0,Math.min(Number(i)||0,Number(t)||0)),l=i>0?Math.max(0,Math.min(100,n/i*100)):0,c=l<=0?"0px":l>=100?"calc(100% - 4px)":`calc(${l}% - 4px)`,d=l>=100?"0px":l<=0?"calc(100% - 4px)":`calc(${100-l}% - 4px)`,h=l>=100?"100%":`calc(${l}% + 4px)`;return j`
      <div
        class="custom-seek-slider ${s?"is-animated":""} ${this._activeSeekDrag?"is-dragging":""} ${o?"is-flat":""}"
        role="slider"
        tabindex=${i>0?"0":"-1"}
        aria-label=${a}
        aria-valuemin="0"
        aria-valuemax=${String(i||0)}
        aria-valuenow=${String(Math.round(n))}
        aria-valuetext=${this._formatTime(n)}
        aria-disabled=${i<=0?"true":"false"}
        @pointerdown=${t=>this._startSeekDrag(t,e,r)}
        @keydown=${t=>this._handleSeekSliderKeydown(t,e,r)}
      >
        <div class="custom-seek-track">
          <div class="custom-seek-fill" style=${`width:${c};`}>
            ${this._renderSeekWaveSvg(o)}
          </div>
          <div class="custom-seek-remaining" style=${`left:${h};width:${d};`}></div>
          <div class="custom-seek-handle" style=${`left:${l}%;`}></div>
        </div>
      </div>
    `}_renderSeekWaveSvg(e=!1){const t=this._seekWaveSpan||480,i=this._buildSeekWavePath(t,e?0:5);return j`
      <svg
        class="custom-seek-wave-svg"
        viewBox=${`0 0 ${2*t} 24`}
        style=${`width:${2*t}px;height:24px;`}
        preserveAspectRatio="xMinYMid slice"
        aria-hidden="true"
      >
        <path
          class="custom-seek-wave-path"
          d=${i}
          transform=${`translate(${t} 0)`}
        ></path>
        <path class="custom-seek-wave-path" d=${i}></path>
      </svg>
    `}_buildSeekWavePath(e,t=5){let i="M 0 12";for(let a=0;a<e;a+=32)i+=` Q ${a+8} ${12-t}, ${a+16} 12`,i+=` Q ${a+16+8} ${12+t}, ${a+32} 12`;return i}_getDisplayedSeek(e,t,i){return Math.max(0,Math.min(Number(i)||0,Number(this._seekPreview[e]??t)||0))}_setSeekPreview(e,t,i){this._seekPreview={...this._seekPreview,[e]:Math.max(0,Math.min(Number(i)||0,Number(t)||0))}}_clearSeekPreview(e){if(this._seekPreviewTimers[e]&&(window.clearTimeout(this._seekPreviewTimers[e]),delete this._seekPreviewTimers[e]),!(e in this._seekPreview))return;const t={...this._seekPreview};delete t[e],this._seekPreview=t}_holdSeekPreview(e,t,i){this._setSeekPreview(e,t,i),this._seekPreviewTimers[e]&&window.clearTimeout(this._seekPreviewTimers[e]),this._seekPreviewTimers[e]=window.setTimeout(()=>{this._clearSeekPreview(e)},1800)}_teardownSeekPointerListeners(){if(this._activeSeekDrag?.target?.releasePointerCapture&&null!=this._activeSeekDrag.pointerId)try{this._activeSeekDrag.target.hasPointerCapture?.(this._activeSeekDrag.pointerId)&&this._activeSeekDrag.target.releasePointerCapture(this._activeSeekDrag.pointerId)}catch(e){}window.removeEventListener("pointermove",this._seekMoveHandler),window.removeEventListener("pointerup",this._seekUpHandler),window.removeEventListener("pointercancel",this._seekUpHandler),this._activeSeekDrag=null}_startSeekDrag(e,t,i){if((i.duration||0)<=0)return;const a=e.currentTarget;if(a){if(e.preventDefault(),this._activeSeekDrag={key:t,descriptor:i,rect:a.getBoundingClientRect(),pointerId:e.pointerId,target:a},a.setPointerCapture&&null!=e.pointerId)try{a.setPointerCapture(e.pointerId)}catch(e){}window.addEventListener("pointermove",this._seekMoveHandler),window.addEventListener("pointerup",this._seekUpHandler),window.addEventListener("pointercancel",this._seekUpHandler),this._updateSeekDrag(e.clientX)}}_handleSeekPointerMove(e){this._activeSeekDrag&&this._updateSeekDrag(e.clientX)}async _handleSeekPointerUp(e){if(!this._activeSeekDrag)return;const t=this._activeSeekDrag,i=Number.isFinite(e.clientX)?this._updateSeekDrag(e.clientX):this._getDisplayedSeek(t.key,t.descriptor.currentValue??0,t.descriptor.duration||0);this._teardownSeekPointerListeners(),this._holdSeekPreview(t.key,i,t.descriptor.duration||0),await this._commitSeekChange(t.key,t.descriptor,i)}_updateSeekDrag(e){if(!this._activeSeekDrag)return 0;const{key:t,rect:i,descriptor:a}=this._activeSeekDrag,r=Number(a.duration)||0,s=i.width>0?(e-i.left)/i.width:0,o=r*Math.max(0,Math.min(1,Number.isFinite(s)?s:0));return this._setSeekPreview(t,o,r),o}async _handleSeekSliderKeydown(e,t,i){if(!["ArrowLeft","ArrowDown","ArrowRight","ArrowUp","Home","End"].includes(e.key)||(i.duration||0)<=0)return;e.preventDefault();const a=Number(i.duration)||0,r=this._getDisplayedSeek(t,i.currentValue??0,a),s=Math.max(5,a/50);let o=r;"ArrowLeft"===e.key||"ArrowDown"===e.key?o-=s:"ArrowRight"===e.key||"ArrowUp"===e.key?o+=s:"Home"===e.key?o=0:"End"===e.key&&(o=a);const n=Math.max(0,Math.min(a,o));this._holdSeekPreview(t,n,a),await this._commitSeekChange(t,i,n)}async _commitSeekChange(e,t,i){await this._callService("media_player","media_seek",{entity_id:t.entityId,seek_position:Math.max(0,Number(i)||0)}),this._holdSeekPreview(e,i,t.duration||0)}_renderVolumeSlider({key:e,value:t,label:i,descriptor:a}){const r=Math.max(0,Math.min(100,Number(t)||0)),s=r<=0?"0px":r>=100?"calc(100% - 4px)":`calc(${r}% - 4px)`,o=r>=100?"0px":r<=0?"calc(100% - 4px)":`calc(${100-r}% - 4px)`,n=r>=100?"100%":`calc(${r}% + 4px)`;return j`
      <div
        class="custom-volume-slider"
        role="slider"
        tabindex="0"
        aria-label=${i}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${String(r)}
        aria-valuetext=${`${r}%`}
        @pointerdown=${t=>this._startVolumeDrag(t,e,a)}
        @keydown=${t=>this._handleVolumeSliderKeydown(t,e,a)}
      >
        <div class="custom-volume-track">
          <div class="custom-volume-fill" style=${`width:${s};`}></div>
          <div class="custom-volume-remaining" style=${`left:${n};width:${o};`}></div>
          <div class="custom-volume-handle" style=${`left:${r}%;`}></div>
        </div>
      </div>
    `}_getDisplayedVolume(e,t){return Math.max(0,Math.min(100,Number(this._volumePreview[e]??t)||0))}_setVolumePreview(e,t){this._volumePreview={...this._volumePreview,[e]:Math.max(0,Math.min(100,Number(t)||0))}}_clearVolumePreview(e){if(!(e in this._volumePreview))return;const t={...this._volumePreview};delete t[e],this._volumePreview=t}_teardownVolumePointerListeners(){if(this._activeVolumeDrag?.target?.releasePointerCapture&&null!=this._activeVolumeDrag.pointerId)try{this._activeVolumeDrag.target.hasPointerCapture?.(this._activeVolumeDrag.pointerId)&&this._activeVolumeDrag.target.releasePointerCapture(this._activeVolumeDrag.pointerId)}catch(e){}window.removeEventListener("pointermove",this._volumeMoveHandler),window.removeEventListener("pointerup",this._volumeUpHandler),window.removeEventListener("pointercancel",this._volumeUpHandler),this._activeVolumeDrag=null}_startVolumeDrag(e,t,i){const a=e.currentTarget;if(a){if(e.preventDefault(),this._activeVolumeDrag={key:t,descriptor:i,rect:a.getBoundingClientRect(),pointerId:e.pointerId,target:a},a.setPointerCapture&&null!=e.pointerId)try{a.setPointerCapture(e.pointerId)}catch(e){}window.addEventListener("pointermove",this._volumeMoveHandler),window.addEventListener("pointerup",this._volumeUpHandler),window.addEventListener("pointercancel",this._volumeUpHandler),this._updateVolumeDrag(e.clientX)}}_handleVolumePointerMove(e){this._activeVolumeDrag&&this._updateVolumeDrag(e.clientX)}async _handleVolumePointerUp(e){if(!this._activeVolumeDrag)return;const t=this._activeVolumeDrag,i=Number.isFinite(e.clientX)?this._updateVolumeDrag(e.clientX):this._getDisplayedVolume(t.key,t.descriptor.currentValue??0);this._teardownVolumePointerListeners(),await this._commitVolumeChange(t.descriptor,i),this._clearVolumePreview(t.key)}_updateVolumeDrag(e){if(!this._activeVolumeDrag)return 0;const{key:t,rect:i}=this._activeVolumeDrag,a=Math.round((e-i.left)/i.width*100),r=Math.max(0,Math.min(100,Number.isFinite(a)?a:0));return this._setVolumePreview(t,r),r}async _handleVolumeSliderKeydown(e,t,i){if(!["ArrowLeft","ArrowDown","ArrowRight","ArrowUp","Home","End"].includes(e.key))return;e.preventDefault();let a=this._getDisplayedVolume(t,i.currentValue??0);"ArrowLeft"===e.key||"ArrowDown"===e.key?a-=5:"ArrowRight"===e.key||"ArrowUp"===e.key?a+=5:"Home"===e.key?a=0:"End"===e.key&&(a=100);const r=Math.max(0,Math.min(100,a));this._setVolumePreview(t,r),await this._commitVolumeChange(i,r),this._clearVolumePreview(t)}async _commitVolumeChange(e,t){const i=Math.max(0,Math.min(1,Number(t)/100));if("player"!==e.type&&"speaker"!==e.type){if("group"===e.type){const i=function(e,t){const i=(e||[]).map(e=>({entityId:e.entityId,currentValue:Math.max(0,Math.min(100,Number(e.currentValue)||0))})),a=Math.max(0,Math.min(100,Number(t)||0));if(!i.length)return[];if(0===a)return i.map(e=>({entityId:e.entityId,volumePercent:0}));const r=i.reduce((e,t)=>e+t.currentValue,0)/i.length;if(r<=0)return i.map(e=>({entityId:e.entityId,volumePercent:a}));const s=a/r;return i.map(e=>({entityId:e.entityId,volumePercent:Math.max(0,Math.min(100,Math.round(e.currentValue*s)))}))}(e.levels||[],t);for(const e of i)await this._callService("media_player","volume_set",{entity_id:e.entityId,volume_level:Math.max(0,Math.min(1,Number(e.volumePercent)/100))})}}else await this._callService("media_player","volume_set",{entity_id:e.entityId,volume_level:i})}async _setShuffle(e,t){await this._callService("media_player","shuffle_set",{entity_id:e,shuffle:t})}async _cycleRepeat(e,t){const i=Ie.indexOf(t),a=Ie[(i+1+Ie.length)%Ie.length];await this._callService("media_player","repeat_set",{entity_id:e,repeat:a})}_formatTime(e){if(!Number.isFinite(e)||e<=0)return"0:00";const t=Math.floor(e%60),i=Math.floor(e/60%60),a=Math.floor(e/3600);return a>0?`${a}:${String(i).padStart(2,"0")}:${String(t).padStart(2,"0")}`:`${i}:${String(t).padStart(2,"0")}`}_sliderStyle(e){return`--range-fill:${Math.max(0,Math.min(100,Number(e)||0))}%;`}async _callService(e,t,i){return this.hass.callService(e,t,i)}static get styles(){return Se}}),window.customCards=window.customCards||[],window.customCards.push({type:"mysmart-music-control",name:"MySmart Music Control",description:"A Sonos-focused music control card with stream tabs, grouping, volumes, and favorites."});
//# sourceMappingURL=mysmart-music-control.js.map
