parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"JZPE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createEndpoint=void 0,exports.expose=c,exports.proxy=h,exports.releaseProxy=exports.proxyMarker=void 0,exports.transfer=y,exports.transferHandlers=void 0,exports.windowEndpoint=v,exports.wrap=l;const e=Symbol("Comlink.proxy");exports.proxyMarker=e;const t=Symbol("Comlink.endpoint");exports.createEndpoint=t;const n=Symbol("Comlink.releaseProxy");exports.releaseProxy=n;const r=Symbol("Comlink.thrown"),a=e=>"object"==typeof e&&null!==e||"function"==typeof e,s={canHandle:t=>a(t)&&t[e],serialize(e){const{port1:t,port2:n}=new MessageChannel;return c(e,t),[n,[n]]},deserialize:e=>(e.start(),l(e))},o={canHandle:e=>a(e)&&r in e,serialize({value:e}){let t;return[t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}},i=new Map([["proxy",s],["throw",o]]);function c(e,t=self){t.addEventListener("message",function n(a){if(!a||!a.data)return;const{id:s,type:o,path:i}=Object.assign({path:[]},a.data),u=(a.data.argumentList||[]).map(x);let l;try{const t=i.slice(0,-1).reduce((e,t)=>e[t],e),n=i.reduce((e,t)=>e[t],e);switch(o){case"GET":l=n;break;case"SET":t[i.slice(-1)[0]]=x(a.data.value),l=!0;break;case"APPLY":l=n.apply(t,u);break;case"CONSTRUCT":l=h(new n(...u));break;case"ENDPOINT":{const{port1:t,port2:n}=new MessageChannel;c(e,n),l=y(t,[t])}break;case"RELEASE":l=void 0;break;default:return}}catch(d){l={value:d,[r]:0}}Promise.resolve(l).catch(e=>({value:e,[r]:0})).then(e=>{const[r,a]=b(e);t.postMessage(Object.assign(Object.assign({},r),{id:s}),a),"RELEASE"===o&&(t.removeEventListener("message",n),p(t))})}),t.start&&t.start()}function u(e){return"MessagePort"===e.constructor.name}function p(e){u(e)&&e.close()}function l(e,t){return f(e,[],t)}function d(e){if(e)throw new Error("Proxy has been released and is not useable")}function f(e,r=[],a=function(){}){let s=!1;const o=new Proxy(a,{get(t,a){if(d(s),a===n)return()=>w(e,{type:"RELEASE",path:r.map(e=>e.toString())}).then(()=>{p(e),s=!0});if("then"===a){if(0===r.length)return{then:()=>o};const t=w(e,{type:"GET",path:r.map(e=>e.toString())}).then(x);return t.then.bind(t)}return f(e,[...r,a])},set(t,n,a){d(s);const[o,i]=b(a);return w(e,{type:"SET",path:[...r,n].map(e=>e.toString()),value:o},i).then(x)},apply(n,a,o){d(s);const i=r[r.length-1];if(i===t)return w(e,{type:"ENDPOINT"}).then(x);if("bind"===i)return f(e,r.slice(0,-1));const[c,u]=E(o);return w(e,{type:"APPLY",path:r.map(e=>e.toString()),argumentList:c},u).then(x)},construct(t,n){d(s);const[a,o]=E(n);return w(e,{type:"CONSTRUCT",path:r.map(e=>e.toString()),argumentList:a},o).then(x)}});return o}function m(e){return Array.prototype.concat.apply([],e)}function E(e){const t=e.map(b);return[t.map(e=>e[0]),m(t.map(e=>e[1]))]}exports.transferHandlers=i;const g=new WeakMap;function y(e,t){return g.set(e,t),e}function h(t){return Object.assign(t,{[e]:!0})}function v(e,t=self,n="*"){return{postMessage:(t,r)=>e.postMessage(t,n,r),addEventListener:t.addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t)}}function b(e){for(const[t,n]of i)if(n.canHandle(e)){const[r,a]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},a]}return[{type:"RAW",value:e},g.get(e)||[]]}function x(e){switch(e.type){case"HANDLER":return i.get(e.name).deserialize(e.value);case"RAW":return e.value}}function w(e,t,n){return new Promise(r=>{const a=L();e.addEventListener("message",function t(n){n.data&&n.data.id&&n.data.id===a&&(e.removeEventListener("message",t),r(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:a},t),n)})}function L(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}
},{}],"x0cg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.calculate_tid=exports.calculate_pokemon_bdsp_underground=exports.calculate_pokemon_bdsp_stationary=exports.calculate_pokemon_bdsp=exports.calculate_pokemon=exports.__wbindgen_throw=exports.__wbindgen_string_new=exports.__wbindgen_string_get=exports.__wbindgen_object_drop_ref=exports.__wbindgen_json_parse=exports.__wbg_shinyresult_new=exports.__wbg_push_284486ca27c6aa8b=exports.__wbg_new_949bbc1147195c4e=exports.Xorshift=exports.Xoroshiro=exports.UndergroundResults=exports.TIDResult=exports.ShinyResultBdspStationary=exports.ShinyResultBdsp=exports.ShinyResult=exports.ShinyFilterEnum=exports.ShinyEnum=exports.NatureFilterEnum=exports.NatureEnum=exports.LeadFilterEnum=exports.GenderRatioEnum=exports.GenderFilterEnum=exports.GenderEnum=exports.EncounterSlotFilterEnum=exports.EncounterSlotEnum=exports.EncounterFilterEnum=exports.AbilityFilterEnum=exports.AbilityEnum=void 0;var e=t(require("./pkg/wasm_bg.wasm"));function t(e){return e&&e.__esModule?e:{default:e}}var r=e.default;exports.default=r;var n=e.default.calculate_pokemon;exports.calculate_pokemon=n;var o=e.default.calculate_pokemon_bdsp;exports.calculate_pokemon_bdsp=o;var u=e.default.calculate_pokemon_bdsp_stationary;exports.calculate_pokemon_bdsp_stationary=u;var a=e.default.calculate_pokemon_bdsp_underground;exports.calculate_pokemon_bdsp_underground=a;var s=e.default.calculate_tid;exports.calculate_tid=s;var _=e.default.__wbindgen_string_new;exports.__wbindgen_string_new=_;var l=e.default.__wbindgen_json_parse;exports.__wbindgen_json_parse=l;var p=e.default.__wbg_shinyresult_new;exports.__wbg_shinyresult_new=p;var d=e.default.__wbindgen_object_drop_ref;exports.__wbindgen_object_drop_ref=d;var i=e.default.__wbindgen_string_get;exports.__wbindgen_string_get=i;var x=e.default.__wbg_new_949bbc1147195c4e;exports.__wbg_new_949bbc1147195c4e=x;var c=e.default.__wbg_push_284486ca27c6aa8b;exports.__wbg_push_284486ca27c6aa8b=c;var b=e.default.__wbindgen_throw;exports.__wbindgen_throw=b;var m=e.default.LeadFilterEnum;exports.LeadFilterEnum=m;var E=e.default.AbilityFilterEnum;exports.AbilityFilterEnum=E;var f=e.default.AbilityEnum;exports.AbilityEnum=f;var g=e.default.NatureFilterEnum;exports.NatureFilterEnum=g;var w=e.default.NatureEnum;exports.NatureEnum=w;var v=e.default.ShinyFilterEnum;exports.ShinyFilterEnum=v;var y=e.default.EncounterFilterEnum;exports.EncounterFilterEnum=y;var h=e.default.ShinyEnum;exports.ShinyEnum=h;var S=e.default.EncounterSlotFilterEnum;exports.EncounterSlotFilterEnum=S;var F=e.default.EncounterSlotEnum;exports.EncounterSlotEnum=F;var R=e.default.GenderRatioEnum;exports.GenderRatioEnum=R;var k=e.default.GenderEnum;exports.GenderEnum=k;var G=e.default.GenderFilterEnum;exports.GenderFilterEnum=G;var j=e.default.ShinyResult;exports.ShinyResult=j;var A=e.default.ShinyResultBdsp;exports.ShinyResultBdsp=A;var B=e.default.ShinyResultBdspStationary;exports.ShinyResultBdspStationary=B;var N=e.default.TIDResult;exports.TIDResult=N;var X=e.default.UndergroundResults;exports.UndergroundResults=X;var D=e.default.Xoroshiro;exports.Xoroshiro=D;var I=e.default.Xorshift;exports.Xorshift=I;
},{"./pkg/wasm_bg.wasm":"lGJG"}],"MTfO":[function(require,module,exports) {
"use strict";var e=require("comlink"),r=require("../../../../wasm/Cargo.toml");(0,e.expose)(r.calculate_pokemon_bdsp_underground);
},{"comlink":"JZPE","../../../../wasm/Cargo.toml":"x0cg"}],"FheM":[function(require,module,exports) {
var t=null;function e(){return t||(t=n()),t}function n(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(t)return r(t[0])}return"/"}function r(t){return(""+t).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/,"$1")+"/"}exports.getBundleURL=e,exports.getBaseURL=r;
},{}],"TUK3":[function(require,module,exports) {
var r=require("./bundle-url").getBundleURL;function e(r){Array.isArray(r)||(r=[r]);var e=r[r.length-1];try{return Promise.resolve(require(e))}catch(n){if("MODULE_NOT_FOUND"===n.code)return new s(function(n,i){t(r.slice(0,-1)).then(function(){return require(e)}).then(n,i)});throw n}}function t(r){return Promise.all(r.map(u))}var n={};function i(r,e){n[r]=e}module.exports=exports=e,exports.load=t,exports.register=i;var o={};function u(e){var t;if(Array.isArray(e)&&(t=e[1],e=e[0]),o[e])return o[e];var i=(e.substring(e.lastIndexOf(".")+1,e.length)||e).toLowerCase(),u=n[i];return u?o[e]=u(r()+e).then(function(r){return r&&module.bundle.register(t,r),r}).catch(function(r){throw delete o[e],r}):void 0}function s(r){this.executor=r,this.promise=null}s.prototype.then=function(r,e){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.then(r,e)},s.prototype.catch=function(r){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.catch(r)};
},{"./bundle-url":"FheM"}],"rDCW":[function(require,module,exports) {

},{}],"fISM":[function(require,module,exports) {
var __dirname = "/home/runner/work/PokemonRNGTools/PokemonRNGTools/node_modules/parcel-plugin-wasm.rs";
var t,e="/home/runner/work/PokemonRNGTools/PokemonRNGTools/node_modules/parcel-plugin-wasm.rs";const s={},_="undefined"==typeof TextDecoder?(0,module.require)("util").TextDecoder:TextDecoder;let r=new _("utf-8",{ignoreBOM:!0,fatal:!0});r.decode();let n=null;function i(){return null!==n&&n.buffer===t.memory.buffer||(n=new Uint8Array(t.memory.buffer)),n}function l(t,e){return r.decode(i().subarray(t,t+e))}const u=new Array(32).fill(void 0);u.push(void 0,null,!0,!1);let a=u.length;function o(t){a===u.length&&u.push(u.length+1);const e=a;return a=u[e],u[e]=t,e}function d(t){return u[t]}function g(t){t<36||(u[t]=a,a=t)}function b(t){const e=d(t);return g(t),e}let h=0;const p="undefined"==typeof TextEncoder?(0,module.require)("util").TextEncoder:TextEncoder;let y=new p("utf-8");const c="function"==typeof y.encodeInto?function(t,e){return y.encodeInto(t,e)}:function(t,e){const s=y.encode(t);return e.set(s),{read:t.length,written:s.length}};function w(t,e,s){if(void 0===s){const s=y.encode(t),_=e(s.length);return i().subarray(_,_+s.length).set(s),h=s.length,_}let _=t.length,r=e(_);const n=i();let l=0;for(;l<_;l++){const e=t.charCodeAt(l);if(e>127)break;n[r+l]=e}if(l!==_){0!==l&&(t=t.slice(l)),r=s(r,_,_=l+3*t.length);const e=i().subarray(r+l,r+_);l+=c(t,e).written}return h=l,r}function f(t){return null==t}let m=null;function S(){return null!==m&&m.buffer===t.memory.buffer||(m=new Int32Array(t.memory.buffer)),m}const v=new Uint32Array(2),A=new BigUint64Array(v.buffer);let k=null;function M(){return null!==k&&k.buffer===t.memory.buffer||(k=new Uint32Array(t.memory.buffer)),k}function F(t,e){return M().subarray(t/4,t/4+e)}function B(t,e){const s=e(4*t.length);return M().set(t,s/4),h=t.length,s}s.calculate_pokemon=function(e,s,_,r,n,i,l,u,a,o,d){A[0]=e;const g=v[0],h=v[1];A[0]=s;const p=v[0],y=v[1];return b(t.calculate_pokemon(g,h,p,y,_,r,n,i,l,u,a,o,d))},s.calculate_pokemon_bdsp=function(e,s,_,r,n,i,l,u,a,o,d,g,p,y,c,w){var f=B(a,t.__wbindgen_malloc),m=h,S=B(d,t.__wbindgen_malloc),v=h,A=B(y,t.__wbindgen_malloc),k=h,M=B(c,t.__wbindgen_malloc),F=h;return b(t.calculate_pokemon_bdsp(e,s,_,r,n,i,l,u,f,m,o,S,v,g,p,A,k,M,F,w))},s.calculate_pokemon_bdsp_stationary=function(e,s,_,r,n,i,l,u,a,o,d,g,p,y,c){var w=B(a,t.__wbindgen_malloc),f=h,m=B(y,t.__wbindgen_malloc),S=h,v=B(c,t.__wbindgen_malloc),A=h;return b(t.calculate_pokemon_bdsp_stationary(e,s,_,r,n,i,l,u,w,f,o,d,g,p,m,S,v,A))},s.calculate_pokemon_bdsp_underground=function(e,s,_,r,n,i,l,u,a,o,d,g,p,y,c,w,f,m){var S=B(a,t.__wbindgen_malloc),v=h,A=B(f,t.__wbindgen_malloc),k=h,M=B(m,t.__wbindgen_malloc),F=h;return b(t.calculate_pokemon_bdsp_underground(e,s,_,r,n,i,l,u,S,v,o,d,g,p,y,c,w,A,k,M,F))},s.calculate_tid=function(e,s,_,r,n,i,l,u){var a=B(l,t.__wbindgen_malloc),d=h;return b(t.calculate_tid(e,s,_,r,n,i,a,d,o(u)))},s.LeadFilterEnum=Object.freeze({None:0,0:"None",Synchronize:1,1:"Synchronize"}),s.AbilityFilterEnum=Object.freeze({Any:3,3:"Any",Ability0:0,0:"Ability0",Ability1:1,1:"Ability1"}),s.AbilityEnum=Object.freeze({Ability0:0,0:"Ability0",Ability1:1,1:"Ability1"}),s.NatureFilterEnum=Object.freeze({Hardy:0,0:"Hardy",Lonely:1,1:"Lonely",Brave:2,2:"Brave",Adamant:3,3:"Adamant",Naughty:4,4:"Naughty",Bold:5,5:"Bold",Docile:6,6:"Docile",Relaxed:7,7:"Relaxed",Impish:8,8:"Impish",Lax:9,9:"Lax",Timid:10,10:"Timid",Hasty:11,11:"Hasty",Serious:12,12:"Serious",Jolly:13,13:"Jolly",Naive:14,14:"Naive",Modest:15,15:"Modest",Mild:16,16:"Mild",Quiet:17,17:"Quiet",Bashful:18,18:"Bashful",Rash:19,19:"Rash",Calm:20,20:"Calm",Gentle:21,21:"Gentle",Sassy:22,22:"Sassy",Careful:23,23:"Careful",Quirky:24,24:"Quirky",Any:25,25:"Any"}),s.NatureEnum=Object.freeze({Hardy:0,0:"Hardy",Lonely:1,1:"Lonely",Brave:2,2:"Brave",Adamant:3,3:"Adamant",Naughty:4,4:"Naughty",Bold:5,5:"Bold",Docile:6,6:"Docile",Relaxed:7,7:"Relaxed",Impish:8,8:"Impish",Lax:9,9:"Lax",Timid:10,10:"Timid",Hasty:11,11:"Hasty",Serious:12,12:"Serious",Jolly:13,13:"Jolly",Naive:14,14:"Naive",Modest:15,15:"Modest",Mild:16,16:"Mild",Quiet:17,17:"Quiet",Bashful:18,18:"Bashful",Rash:19,19:"Rash",Calm:20,20:"Calm",Gentle:21,21:"Gentle",Sassy:22,22:"Sassy",Careful:23,23:"Careful",Quirky:24,24:"Quirky",Synchronize:25,25:"Synchronize"}),s.ShinyFilterEnum=Object.freeze({None:0,0:"None",Star:1,1:"Star",Square:2,2:"Square",Both:3,3:"Both",Any:4,4:"Any"}),s.EncounterFilterEnum=Object.freeze({Static:0,0:"Static",Dynamic:1,1:"Dynamic"}),s.ShinyEnum=Object.freeze({None:0,0:"None",Star:1,1:"Star",Square:2,2:"Square",Both:3,3:"Both",All:4,4:"All"}),s.EncounterSlotFilterEnum=Object.freeze({Any:12,12:"Any",Slot0:0,0:"Slot0",Slot1:1,1:"Slot1",Slot2:2,2:"Slot2",Slot3:3,3:"Slot3",Slot4:4,4:"Slot4",Slot5:5,5:"Slot5",Slot6:6,6:"Slot6",Slot7:7,7:"Slot7",Slot8:8,8:"Slot8",Slot9:9,9:"Slot9",Slot10:10,10:"Slot10",Slot11:11,11:"Slot11"}),s.EncounterSlotEnum=Object.freeze({Slot0:0,0:"Slot0",Slot1:1,1:"Slot1",Slot2:2,2:"Slot2",Slot3:3,3:"Slot3",Slot4:4,4:"Slot4",Slot5:5,5:"Slot5",Slot6:6,6:"Slot6",Slot7:7,7:"Slot7",Slot8:8,8:"Slot8",Slot9:9,9:"Slot9",Slot10:10,10:"Slot10",Slot11:11,11:"Slot11"}),s.GenderRatioEnum=Object.freeze({NoSetGender:256,256:"NoSetGender",Genderless:255,255:"Genderless",Male50Female50:127,127:"Male50Female50",Male25Female75:191,191:"Male25Female75",Male75Female25:63,63:"Male75Female25",Male875Female125:31,31:"Male875Female125",Male:0,0:"Male",Female:254,254:"Female"}),s.GenderEnum=Object.freeze({Genderless:255,255:"Genderless",Male:0,0:"Male",Female:254,254:"Female"}),s.GenderFilterEnum=Object.freeze({Any:256,256:"Any",Male:0,0:"Male",Female:254,254:"Female"});class N{static __wrap(t){const e=Object.create(N.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const e=this.__destroy_into_raw();t.__wbg_shinyresult_free(e)}get state0(){try{const _=t.__wbindgen_add_to_stack_pointer(-16);t.__wbg_get_shinyresult_state0(_,this.ptr);var e=S()[_/4+0],s=S()[_/4+1];return v[0]=e,v[1]=s,A[0]}finally{t.__wbindgen_add_to_stack_pointer(16)}}set state0(e){A[0]=e;const s=v[0],_=v[1];t.__wbg_set_shinyresult_state0(this.ptr,s,_)}get state1(){try{const _=t.__wbindgen_add_to_stack_pointer(-16);t.__wbg_get_shinyresult_state1(_,this.ptr);var e=S()[_/4+0],s=S()[_/4+1];return v[0]=e,v[1]=s,A[0]}finally{t.__wbindgen_add_to_stack_pointer(16)}}set state1(e){A[0]=e;const s=v[0],_=v[1];t.__wbg_set_shinyresult_state1(this.ptr,s,_)}get advances(){return t.__wbg_get_shinyresult_advances(this.ptr)>>>0}set advances(e){t.__wbg_set_shinyresult_advances(this.ptr,e)}get shiny_value(){return t.__wbg_get_shinyresult_shiny_value(this.ptr)>>>0}set shiny_value(e){t.__wbg_set_shinyresult_shiny_value(this.ptr,e)}get ec(){return t.__wbg_get_shinyresult_ec(this.ptr)>>>0}set ec(e){t.__wbg_set_shinyresult_ec(this.ptr,e)}get pid(){return t.__wbg_get_shinyresult_pid(this.ptr)>>>0}set pid(e){t.__wbg_set_shinyresult_pid(this.ptr,e)}get nature(){return t.__wbg_get_shinyresult_nature(this.ptr)>>>0}set nature(e){t.__wbg_set_shinyresult_nature(this.ptr,e)}get ability(){return t.__wbg_get_shinyresult_ability(this.ptr)>>>0}set ability(e){t.__wbg_set_shinyresult_ability(this.ptr,e)}}class E{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const e=this.__destroy_into_raw();t.__wbg_shinyresultbdsp_free(e)}get state0(){return t.__wbg_get_shinyresultbdsp_state0(this.ptr)>>>0}set state0(e){t.__wbg_set_shinyresultbdsp_state0(this.ptr,e)}get state1(){return t.__wbg_get_shinyresultbdsp_state1(this.ptr)>>>0}set state1(e){t.__wbg_set_shinyresultbdsp_state1(this.ptr,e)}get state2(){return t.__wbg_get_shinyresultbdsp_state2(this.ptr)>>>0}set state2(e){t.__wbg_set_shinyresultbdsp_state2(this.ptr,e)}get state3(){return t.__wbg_get_shinyresultbdsp_state3(this.ptr)>>>0}set state3(e){t.__wbg_set_shinyresultbdsp_state3(this.ptr,e)}get advances(){return t.__wbg_get_shinyresultbdsp_advances(this.ptr)>>>0}set advances(e){t.__wbg_set_shinyresultbdsp_advances(this.ptr,e)}get shiny_value(){return t.__wbg_get_shinyresultbdsp_shiny_value(this.ptr)>>>0}set shiny_value(e){t.__wbg_set_shinyresultbdsp_shiny_value(this.ptr,e)}get pid(){return t.__wbg_get_shinyresultbdsp_pid(this.ptr)>>>0}set pid(e){t.__wbg_set_shinyresultbdsp_pid(this.ptr,e)}get ec(){return t.__wbg_get_shinyresultbdsp_ec(this.ptr)>>>0}set ec(e){t.__wbg_set_shinyresultbdsp_ec(this.ptr,e)}get nature(){return t.__wbg_get_shinyresultbdsp_nature(this.ptr)>>>0}set nature(e){t.__wbg_set_shinyresultbdsp_nature(this.ptr,e)}get ivs(){try{const r=t.__wbindgen_add_to_stack_pointer(-16);t.__wbg_get_shinyresultbdsp_ivs(r,this.ptr);var e=S()[r/4+0],s=S()[r/4+1],_=F(e,s).slice();return t.__wbindgen_free(e,4*s),_}finally{t.__wbindgen_add_to_stack_pointer(16)}}set ivs(e){var s=B(e,t.__wbindgen_malloc),_=h;t.__wbg_set_shinyresultbdsp_ivs(this.ptr,s,_)}get ability(){return t.__wbg_get_shinyresultbdsp_ability(this.ptr)>>>0}set ability(e){t.__wbg_set_shinyresultbdsp_ability(this.ptr,e)}get gender(){return t.__wbg_get_shinyresultbdsp_gender(this.ptr)>>>0}set gender(e){t.__wbg_set_shinyresultbdsp_gender(this.ptr,e)}get encounter(){return t.__wbg_get_shinyresultbdsp_encounter(this.ptr)}set encounter(e){t.__wbg_set_shinyresultbdsp_encounter(this.ptr,e)}}class j{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const e=this.__destroy_into_raw();t.__wbg_shinyresultbdspstationary_free(e)}get state0(){return t.__wbg_get_shinyresultbdsp_state0(this.ptr)>>>0}set state0(e){t.__wbg_set_shinyresultbdsp_state0(this.ptr,e)}get state1(){return t.__wbg_get_shinyresultbdsp_state1(this.ptr)>>>0}set state1(e){t.__wbg_set_shinyresultbdsp_state1(this.ptr,e)}get state2(){return t.__wbg_get_shinyresultbdsp_state2(this.ptr)>>>0}set state2(e){t.__wbg_set_shinyresultbdsp_state2(this.ptr,e)}get state3(){return t.__wbg_get_shinyresultbdsp_state3(this.ptr)>>>0}set state3(e){t.__wbg_set_shinyresultbdsp_state3(this.ptr,e)}get advances(){return t.__wbg_get_shinyresultbdsp_advances(this.ptr)>>>0}set advances(e){t.__wbg_set_shinyresultbdsp_advances(this.ptr,e)}get shiny_value(){return t.__wbg_get_shinyresultbdsp_shiny_value(this.ptr)>>>0}set shiny_value(e){t.__wbg_set_shinyresultbdsp_shiny_value(this.ptr,e)}get pid(){return t.__wbg_get_shinyresultbdsp_pid(this.ptr)>>>0}set pid(e){t.__wbg_set_shinyresultbdsp_pid(this.ptr,e)}get ec(){return t.__wbg_get_shinyresultbdsp_ec(this.ptr)>>>0}set ec(e){t.__wbg_set_shinyresultbdsp_ec(this.ptr,e)}get nature(){return t.__wbg_get_shinyresultbdsp_nature(this.ptr)>>>0}set nature(e){t.__wbg_set_shinyresultbdsp_nature(this.ptr,e)}get ivs(){try{const r=t.__wbindgen_add_to_stack_pointer(-16);t.__wbg_get_shinyresultbdsp_ivs(r,this.ptr);var e=S()[r/4+0],s=S()[r/4+1],_=F(e,s).slice();return t.__wbindgen_free(e,4*s),_}finally{t.__wbindgen_add_to_stack_pointer(16)}}set ivs(e){var s=B(e,t.__wbindgen_malloc),_=h;t.__wbg_set_shinyresultbdsp_ivs(this.ptr,s,_)}get ability(){return t.__wbg_get_shinyresultbdsp_ability(this.ptr)>>>0}set ability(e){t.__wbg_set_shinyresultbdsp_ability(this.ptr,e)}get gender(){return t.__wbg_get_shinyresultbdsp_gender(this.ptr)>>>0}set gender(e){t.__wbg_set_shinyresultbdsp_gender(this.ptr,e)}}class x{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const e=this.__destroy_into_raw();t.__wbg_tidresult_free(e)}get state0(){return t.__wbg_get_shinyresultbdsp_state0(this.ptr)>>>0}set state0(e){t.__wbg_set_shinyresultbdsp_state0(this.ptr,e)}get state1(){return t.__wbg_get_shinyresultbdsp_state1(this.ptr)>>>0}set state1(e){t.__wbg_set_shinyresultbdsp_state1(this.ptr,e)}get state2(){return t.__wbg_get_shinyresultbdsp_state2(this.ptr)>>>0}set state2(e){t.__wbg_set_shinyresultbdsp_state2(this.ptr,e)}get state3(){return t.__wbg_get_shinyresultbdsp_state3(this.ptr)>>>0}set state3(e){t.__wbg_set_shinyresultbdsp_state3(this.ptr,e)}get advances(){return t.__wbg_get_shinyresultbdsp_advances(this.ptr)>>>0}set advances(e){t.__wbg_set_shinyresultbdsp_advances(this.ptr,e)}get tid(){return t.__wbg_get_tidresult_tid(this.ptr)}set tid(e){t.__wbg_set_tidresult_tid(this.ptr,e)}get tsv(){return t.__wbg_get_tidresult_tsv(this.ptr)}set tsv(e){t.__wbg_set_tidresult_tsv(this.ptr,e)}get g8tid(){return t.__wbg_get_shinyresultbdsp_pid(this.ptr)>>>0}set g8tid(e){t.__wbg_set_shinyresultbdsp_pid(this.ptr,e)}get sid(){return t.__wbg_get_tidresult_sid(this.ptr)}set sid(e){t.__wbg_set_tidresult_sid(this.ptr,e)}get filter_type(){return b(t.__wbg_get_tidresult_filter_type(this.ptr))}set filter_type(e){t.__wbg_set_tidresult_filter_type(this.ptr,o(e))}}class z{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const e=this.__destroy_into_raw();t.__wbg_undergroundresults_free(e)}get shiny_value(){return t.__wbg_get_undergroundresults_shiny_value(this.ptr)>>>0}set shiny_value(e){t.__wbg_set_undergroundresults_shiny_value(this.ptr,e)}get pid(){return t.__wbg_get_undergroundresults_pid(this.ptr)>>>0}set pid(e){t.__wbg_set_undergroundresults_pid(this.ptr,e)}get ec(){return t.__wbg_get_undergroundresults_ec(this.ptr)>>>0}set ec(e){t.__wbg_set_undergroundresults_ec(this.ptr,e)}get nature(){return t.__wbg_get_undergroundresults_nature(this.ptr)>>>0}set nature(e){t.__wbg_set_undergroundresults_nature(this.ptr,e)}get ivs(){try{const r=t.__wbindgen_add_to_stack_pointer(-16);t.__wbg_get_undergroundresults_ivs(r,this.ptr);var e=S()[r/4+0],s=S()[r/4+1],_=F(e,s).slice();return t.__wbindgen_free(e,4*s),_}finally{t.__wbindgen_add_to_stack_pointer(16)}}set ivs(e){var s=B(e,t.__wbindgen_malloc),_=h;t.__wbg_set_undergroundresults_ivs(this.ptr,s,_)}get ability(){return t.__wbg_get_undergroundresults_ability(this.ptr)>>>0}set ability(e){t.__wbg_set_undergroundresults_ability(this.ptr,e)}get gender(){return t.__wbg_get_undergroundresults_gender(this.ptr)>>>0}set gender(e){t.__wbg_set_undergroundresults_gender(this.ptr,e)}get encounter(){return t.__wbg_get_undergroundresults_encounter(this.ptr)}set encounter(e){t.__wbg_set_undergroundresults_encounter(this.ptr,e)}get advances(){return t.__wbg_get_undergroundresults_advances(this.ptr)>>>0}set advances(e){t.__wbg_set_undergroundresults_advances(this.ptr,e)}get is_rare(){return 0!==t.__wbg_get_undergroundresults_is_rare(this.ptr)}set is_rare(e){t.__wbg_set_undergroundresults_is_rare(this.ptr,e)}}class O{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const e=this.__destroy_into_raw();t.__wbg_xoroshiro_free(e)}}class R{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const e=this.__destroy_into_raw();t.__wbg_xorshift_free(e)}}function G(e){const _=fetch(e);let r;return(r="function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(_,{"./wasm_bg.js":s}):_.then(t=>t.arrayBuffer()).then(t=>WebAssembly.instantiate(t,{"./wasm_bg.js":s}))).then(({instance:e})=>{t=G.wasm=e.exports,s.wasm=t})}function T(_){const r=require("fs");return new Promise(function(t,s){r.readFile(e+_,function(e,_){e?s(e):t(_.buffer)})}).then(t=>WebAssembly.instantiate(t,{"./wasm_bg":s})).then(({instance:e})=>{t=G.wasm=e.exports,s.wasm=t})}s.__wbindgen_string_new=function(t,e){return o(l(t,e))},s.__wbindgen_json_parse=function(t,e){return o(JSON.parse(l(t,e)))},s.__wbg_shinyresult_new=function(t){return o(N.__wrap(t))},s.__wbindgen_object_drop_ref=function(t){b(t)},s.__wbindgen_string_get=function(e,s){const _=d(s);var r="string"==typeof _?_:void 0,n=f(r)?0:w(r,t.__wbindgen_malloc,t.__wbindgen_realloc),i=h;S()[e/4+1]=i,S()[e/4+0]=n},s.__wbg_new_949bbc1147195c4e=function(){return o(new Array)},s.__wbg_push_284486ca27c6aa8b=function(t,e){return d(t).push(d(e))},s.__wbindgen_throw=function(t,e){throw new Error(l(t,e))},s.ShinyResult=N,s.ShinyResultBdsp=E,s.ShinyResultBdspStationary=j,s.TIDResult=x,s.UndergroundResults=z,s.Xoroshiro=O,s.Xorshift=R;const D=Object.assign(G,s);module.exports=function(t){return D(t).then(()=>s)};
},{"fs":"rDCW"}],0:[function(require,module,exports) {
var b=require("TUK3");b.register("wasm",require("fISM"));b.load([["wasm_bg.c6ac75d1.wasm","lGJG"]]).then(function(){require("MTfO");});
},{}]},{},[0], null)
//# sourceMappingURL=/getResults.67f2457f.js.map