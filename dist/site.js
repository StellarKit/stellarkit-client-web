(function(t){function e(e){var a=e[0]
var r=e[1]
var s=e[2]
var l,c,d=0,f=[]
for(;d<a.length;d++){c=a[d]
if(i[c]){f.push(i[c][0])}i[c]=0}for(l in r){if(Object.prototype.hasOwnProperty.call(r,l)){t[l]=r[l]}}if(u)u(e)
while(f.length){f.shift()()}o.push.apply(o,s||[])
return n()}function n(){var t
for(var e=0;e<o.length;e++){var n=o[e]
var a=true
for(var s=1;s<n.length;s++){var l=n[s]
if(i[l]!==0)a=false}if(a){o.splice(e--,1)
t=r(r.s=n[0])}}return t}var a={}
var i={0:0}
var o=[]
function r(e){if(a[e]){return a[e].exports}var n=a[e]={i:e,l:false,exports:{}}
t[e].call(n.exports,n,n.exports,r)
n.l=true
return n.exports}r.m=t
r.c=a
r.d=function(t,e,n){if(!r.o(t,e)){Object.defineProperty(t,e,{enumerable:true,get:n})}}
r.r=function(t){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(t,"__esModule",{value:true})}
r.t=function(t,e){if(e&1)t=r(t)
if(e&8)return t
if(e&4&&typeof t==="object"&&t&&t.__esModule)return t
var n=Object.create(null)
r.r(n)
Object.defineProperty(n,"default",{enumerable:true,value:t})
if(e&2&&typeof t!="string")for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a))
return n}
r.n=function(t){var e=t&&t.__esModule?function e(){return t["default"]}:function e(){return t}
r.d(e,"a",e)
return e}
r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}
r.p="/"
var s=window["webpackJsonp"]=window["webpackJsonp"]||[]
var l=s.push.bind(s)
s.push=e
s=s.slice()
for(var c=0;c<s.length;c++)e(s[c])
var u=l
o.push([475,1])
return n()})({0:function(t,e,n){"use strict"
n.d(e,"a",function(){return h})
var a=n(37)
var i=n(139)
var o=n(21)
function r(t){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){r=function t(e){return typeof e}}else{r=function t(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}}return r(t)}function s(t,e){return u(t)||c(t,e)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function c(t,e){var n=[]
var a=true
var i=false
var o=undefined
try{for(var r=t[Symbol.iterator](),s;!(a=(s=r.next()).done);a=true){n.push(s.value)
if(e&&n.length===e)break}}catch(t){i=true
o=t}finally{try{if(!a&&r["return"]!=null)r["return"]()}finally{if(i)throw o}}return n}function u(t){if(Array.isArray(t))return t}function d(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function f(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function v(t,e,n){if(e)f(t.prototype,e)
if(n)f(t,n)
return t}var p=n(35)
var h=function(){function t(){d(this,t)}v(t,null,[{key:"vue",value:function t(){if(!this.vueInstance){this.vueInstance=new a["default"]}return this.vueInstance}},{key:"emit",value:function t(e){var n
for(var a=arguments.length,i=new Array(a>1?a-1:0),o=1;o<a;o++){i[o-1]=arguments[o]}(n=this.vue()).$emit.apply(n,[e].concat(i))}},{key:"strlen",value:function t(e){if(!e){return 0}return e.length}},{key:"strOK",value:function t(e){if(!e){return false}return e.length>0}},{key:"truncString",value:function t(e,n){if(!e){return""}if(e.length<=n){return e}var a="..."
var i=a.length
var o=n-i
var r=Math.ceil(o/2)
var s=Math.floor(o/2)
return e.substr(0,r)+a+e.substr(e.length-s)}},{key:"stripZeros",value:function t(e){if(!this.strOK(e)){return"0"}var n=parseFloat(e)
var a=n.toString()
if(a.indexOf("e")!==-1){return e}return a}},{key:"stripBrackets",value:function t(e){var n=o["a"].get("condensedOutput")
if(n){var a=[]
delete e._links
var i=this.stringify(e)
var r=i.split("\n")
var l=-10
var c=-100
var u=true
var d=false
var f=undefined
try{for(var v=r.entries()[Symbol.iterator](),p;!(u=(p=v.next()).done);u=true){var h=s(p.value,2),g=h[0],m=h[1]
var b=m.trim()
if(b.length>0){var y=m.trimRight()
if(b==="}"||b==="},"||b==="]"||b==="],"){c=g}else{if(y.endsWith("{")||y.endsWith("[")||y.endsWith(",")){if(b.length>1){a.push(y.substr(0,y.length-1))}else{l=g}}else{a.push(y)}}}if(l-1===c){a.push(" ")
l=-1}}}catch(t){d=true
f=t}finally{try{if(!u&&v["return"]!=null){v["return"]()}}finally{if(d){throw f}}}if(a.length>0){var x=a.join("\n")
return x.replace(/"/g,"")}}return this.stringify(e)}},{key:"stringify",value:function t(e){function n(t,e){if(t==="data"&&Array.isArray(e)){return"removed"}return e}var a="  "
var i=JSON.stringify(e,n,a)
return i}},{key:"toast",value:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"app"
this.emit("toast",e,n,a)}},{key:"toStr",value:function e(n){var a=n
if(!a){return"null"}var i=o["a"].get("expandXDR")
if(a instanceof Error){var s=this.stringify(a)
console.log(a.stack)
var l=JSON.parse(s)
if(Object.keys(l).length>0){if(i){if(l.data&&l.data.extras&&l.data.extras.envelope_xdr){l.data.extras.envelope_xdr=p.xdr.TransactionEnvelope.fromXDR(l.data.extras.envelope_xdr,"base64")}}return this.stripBrackets(l)}return a.toString()}else if(typeof a==="string"){return a}else if(r(a)==="object"){a=JSON.parse(JSON.stringify(a))
if(i){if(a.envelope_xdr){a.envelope_xdr=p.xdr.TransactionEnvelope.fromXDR(a.envelope_xdr,"base64")}if(a.result_xdr){a.result_xdr=p.xdr.TransactionResult.fromXDR(a.result_xdr,"base64")}if(a.result_meta_xdr){a.result_meta_xdr=p.xdr.TransactionMeta.fromXDR(a.result_meta_xdr,"base64")}}if(a.data_attr){for(var c=0,u=Object.keys(a.data_attr);c<u.length;c++){var d=u[c]
t.debugLog(a.data_attr[d])
a.data_attr[d]=window.atob(a.data_attr[d])}}return this.stripBrackets(a)}return r(a)}},{key:"debugHeader",value:function e(n){t.debugLog("--------------------------------------------------"+"\n"+"-----  "+n+"\n"+"--------------------------------------------------")}},{key:"debugLog",value:function e(n){var a=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null
var i=""
if(a){i+=a+": "}var o=false
if(n&&r(n)==="object"){if(Array.isArray(n.records)){var s=true
var l=false
var c=undefined
try{for(var u=n.records[Symbol.iterator](),d;!(s=(d=u.next()).done);s=true){var f=d.value
i+="--------------------------------------\n"
i+=this.toStr(f)
i+="\n\n"
o=true}}catch(t){l=true
c=t}finally{try{if(!s&&u["return"]!=null){u["return"]()}}finally{if(l){throw c}}}}}if(!o){i+=this.toStr(n)}if(t.strOK(i)){this.emit("console",i)}}},{key:"clearLog",value:function t(){this.emit("clear-console")}},{key:"isFederation",value:function t(e){var n=/^\w+([.-]?\w+)*\*\w+([.-]?\w+)*(\.\w{2,10})+$/
if(n.test(e)){return true}return false}},{key:"openBrowser",value:function t(e){var n=i["a"].openBrowser(e)
if(!n){window.open(e,"_blank").focus()}}},{key:"applicationName",value:function t(){var e=i["a"].applicationName()
if(e){return e}return"StellarArmy"}}])
return t}()},1e3:function(t,e,n){"use strict"
var a=n(186)
var i=n.n(a)
var o=i.a},1001:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".app-wrapper[data-v-70be60b0] {\n  display: flex;\n  flex: 1 1 auto;\n}\n.main-container[data-v-70be60b0] {\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: column;\n}\n.main-container .app-content[data-v-70be60b0] {\n    display: flex;\n    width: 100%;\n    flex: 1 1 auto;\n    flex-direction: column;\n}\n.main-container .app-content .router-container[data-v-70be60b0] {\n      width: 100%;\n      overflow-y: auto;\n}\n",""])},1002:function(t,e,n){"use strict"
var a=n(187)
var i=n.n(a)
var o=i.a},1003:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons);",""])
e.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Orbitron:300,400,500,700);",""])
e.push([t.i,"body,\nhtml {\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n}\n#app {\n  height: 100%;\n}\n",""])},1004:function(t,e,n){"use strict"
var a=n(188)
var i=n.n(a)
var o=i.a},1005:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-55bf675c] {\n  user-select: none;\n}\n.button-group[data-v-55bf675c] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-55bf675c] {\n    margin: 4px;\n}\n.input-group[data-v-55bf675c] {\n  display: block;\n}\n.main-container[data-v-55bf675c] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .dialog-contents[data-v-55bf675c] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .dialog-contents .button-holder[data-v-55bf675c] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .dialog-contents .top-dialog-text[data-v-55bf675c] {\n      margin-bottom: 10px;\n}\n.main-container .dialog-contents .operations-item[data-v-55bf675c] {\n      display: flex;\n      font-size: 0.65em;\n}\n.main-container .dialog-contents .operations-item .item-name[data-v-55bf675c] {\n        text-align: right;\n        padding-right: 5px;\n        font-weight: bold;\n        flex: 1 1 10%;\n}\n.main-container .dialog-contents .operations-item .item-value[data-v-55bf675c] {\n        text-align: left;\n        flex: 2 2 90%;\n        padding-left: 5px;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        font-family: monospace;\n        width: 0;\n}\n.main-container .dialog-contents .buttons-area[data-v-55bf675c] {\n      width: 100%;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      margin-top: 20px;\n}\n",""])},1006:function(t,e,n){"use strict"
var a=n(189)
var i=n.n(a)
var o=i.a},1007:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".menu-button-main[data-v-7c745d68] {\n  display: flex;\n  align-items: center;\n  font-size: 0.95em;\n}\n.menu-button-main .custom-menu-button[data-v-7c745d68] {\n    margin: 0 0 0 6px;\n}\n",""])},1008:function(t,e,n){"use strict"
var a=n(190)
var i=n.n(a)
var o=i.a},1009:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-835df1bc] {\n  user-select: none;\n}\n.button-group[data-v-835df1bc] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-835df1bc] {\n    margin: 4px;\n}\n.input-group[data-v-835df1bc] {\n  display: block;\n}\n.main-container[data-v-835df1bc] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .asset-contents[data-v-835df1bc] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .asset-contents .button-holder[data-v-835df1bc] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .asset-contents .asset-contents-inner[data-v-835df1bc] {\n      margin: 0 30px 16px;\n}\n.main-container .asset-contents .asset-text[data-v-835df1bc] {\n      margin-bottom: 20px;\n}\n.main-container .asset-contents .asset-text div[data-v-835df1bc] {\n        margin-bottom: 10px;\n}\n.main-container .asset-contents .asset-text .sub-header[data-v-835df1bc] {\n        font-size: 0.8em;\n}\n",""])},1010:function(t,e,n){"use strict"
var a=n(191)
var i=n.n(a)
var o=i.a},1011:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".menu-button-main[data-v-0c15074c] {\n  display: flex;\n  align-items: center;\n  font-size: 0.95em;\n}\n.menu-button-main .custom-menu-button[data-v-0c15074c] {\n    margin: 0 0 0 6px;\n}\n.menu-button-main .button-issuer[data-v-0c15074c] {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 0.8em;\n    color: rgba(0, 0, 0, 0.4);\n    max-width: 200px;\n}\n.edit-assets-item[data-v-0c15074c] {\n  color: steelblue;\n}\n",""])},1015:function(t,e,n){"use strict"
var a=n(192)
var i=n.n(a)
var o=i.a},1016:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".account-choice-box[data-v-ba5ff912] {\n  padding: 8px 12px;\n  margin-bottom: 8px;\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: 4px;\n}\n.account-choice-box .accounts-small-text[data-v-ba5ff912] {\n    font-size: 0.85em;\n    color: rgba(0, 0, 0, 0.5);\n}\n.account-choice-box .price-pair[data-v-ba5ff912] {\n    display: flex;\n}\n.account-choice-box .price-pair .buy-price[data-v-ba5ff912] {\n      margin-right: 8px;\n}\n.account-choice-box .asset-pair[data-v-ba5ff912] {\n    display: flex;\n}\n.account-choice-box .asset-pair .asset-code[data-v-ba5ff912] {\n      flex: 0 0 100px;\n      margin-right: 8px;\n}\n.account-choice-box .price-header[data-v-ba5ff912] {\n    margin-top: 8px;\n}\n.account-choice-box .public-key-text[data-v-ba5ff912] {\n    width: 100%;\n    height: 120px;\n    background: white;\n    font-size: 0.8em;\n}\n",""])},1017:function(t,e,n){"use strict"
var a=n(193)
var i=n.n(a)
var o=i.a},1018:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-0e7aa3c5] {\n  user-select: none;\n}\n.button-group[data-v-0e7aa3c5] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-0e7aa3c5] {\n    margin: 4px;\n}\n.input-group[data-v-0e7aa3c5] {\n  display: block;\n}\n.main-container[data-v-0e7aa3c5] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-0e7aa3c5] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-0e7aa3c5] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .text-fields-area[data-v-0e7aa3c5] {\n      margin: 0 30px;\n}\n.main-container .help-contents .note-text[data-v-0e7aa3c5] {\n      margin-bottom: 10px;\n}\n.main-container .help-contents .start-box[data-v-0e7aa3c5] {\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n}\n.main-container .help-contents .start-box button[data-v-0e7aa3c5] {\n        min-width: 250px;\n}\n.main-container .help-contents .choice-box[data-v-0e7aa3c5] {\n      width: 100%;\n      padding: 0 20px;\n      display: flex;\n      flex-direction: column;\n}\n",""])},1019:function(t,e,n){"use strict"
var a=n(194)
var i=n.n(a)
var o=i.a},1020:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-7a95e9bf] {\n  user-select: none;\n}\n.button-group[data-v-7a95e9bf] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-7a95e9bf] {\n    margin: 4px;\n}\n.input-group[data-v-7a95e9bf] {\n  display: block;\n}\n.main-container[data-v-7a95e9bf] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .confirm-dialog-contents[data-v-7a95e9bf] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .confirm-dialog-contents .button-holder[data-v-7a95e9bf] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .confirm-dialog-contents .main-message[data-v-7a95e9bf] {\n      font-size: 0.9em;\n      margin-bottom: 10px;\n}\n",""])},1021:function(t,e,n){"use strict"
var a=n(195)
var i=n.n(a)
var o=i.a},1022:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-25673726] {\n  user-select: none;\n}\n.button-group[data-v-25673726] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-25673726] {\n    margin: 4px;\n}\n.input-group[data-v-25673726] {\n  display: block;\n}\n.main-container[data-v-25673726] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-25673726] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-25673726] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-email[data-v-25673726] {\n      margin: 0 30px;\n}\n.main-container .help-contents .status-message[data-v-25673726] {\n      font-size: 0.8em;\n}\n",""])},1023:function(t,e,n){"use strict"
var a=n(196)
var i=n.n(a)
var o=i.a},1024:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-c2932fc8] {\n  user-select: none;\n}\n.button-group[data-v-c2932fc8] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-c2932fc8] {\n    margin: 4px;\n}\n.input-group[data-v-c2932fc8] {\n  display: block;\n}\n.main-container[data-v-c2932fc8] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-c2932fc8] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-c2932fc8] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-c2932fc8] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-c2932fc8] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-c2932fc8] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-c2932fc8] {\n      margin: 0 30px 16px;\n}\n",""])},1025:function(t,e,n){"use strict"
var a=n(197)
var i=n.n(a)
var o=i.a},1026:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-15816f03] {\n  user-select: none;\n}\n.button-group[data-v-15816f03] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-15816f03] {\n    margin: 4px;\n}\n.input-group[data-v-15816f03] {\n  display: block;\n}\n.main-container[data-v-15816f03] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-15816f03] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-15816f03] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-15816f03] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-15816f03] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-15816f03] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-15816f03] {\n      margin: 0 30px 16px;\n}\n",""])},1027:function(t,e,n){"use strict"
var a=n(198)
var i=n.n(a)
var o=i.a},1028:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-25bc6ba3] {\n  user-select: none;\n}\n.button-group[data-v-25bc6ba3] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-25bc6ba3] {\n    margin: 4px;\n}\n.input-group[data-v-25bc6ba3] {\n  display: block;\n}\n.main-container[data-v-25bc6ba3] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-25bc6ba3] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-25bc6ba3] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-email[data-v-25bc6ba3] {\n      margin: 0 30px;\n}\n.main-container .help-contents .status-message[data-v-25bc6ba3] {\n      font-size: 0.8em;\n}\n",""])},1029:function(t,e,n){"use strict"
var a=n(199)
var i=n.n(a)
var o=i.a},1030:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-b7f312ba] {\n  user-select: none;\n}\n.button-group[data-v-b7f312ba] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-b7f312ba] {\n    margin: 4px;\n}\n.input-group[data-v-b7f312ba] {\n  display: block;\n}\n.main-container[data-v-b7f312ba] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-b7f312ba] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-b7f312ba] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-b7f312ba] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-b7f312ba] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-b7f312ba] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-b7f312ba] {\n      margin: 0 30px 16px;\n}\n",""])},1032:function(t,e,n){"use strict"
var a=n(200)
var i=n.n(a)
var o=i.a},1033:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".table-header[data-v-1d24cecc] {\n  display: flex;\n  align-items: center;\n  padding: 0 14px;\n}\n.table-header .table-textview[data-v-1d24cecc] {\n    max-width: 250px;\n}\n",""])},1034:function(t,e,n){"use strict"
var a=n(201)
var i=n.n(a)
var o=i.a},1035:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".image-wrapper[data-v-bb947734] {\n  border-radius: 500px;\n  height: 40px;\n  width: 40px;\n  overflow: hidden;\n  margin: 6px;\n}\n",""])},1036:function(t,e,n){"use strict"
var a=n(202)
var i=n.n(a)
var o=i.a},1037:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-42be059f] {\n  user-select: none;\n}\n.button-group[data-v-42be059f] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-42be059f] {\n    margin: 4px;\n}\n.input-group[data-v-42be059f] {\n  display: block;\n}\n.main-container[data-v-42be059f] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-42be059f] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-42be059f] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-42be059f] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-42be059f] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-42be059f] {\n        font-size: 0.8em;\n}\n",""])},1038:function(t,e,n){"use strict"
var a=n(203)
var i=n.n(a)
var o=i.a},1039:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".small-button[data-v-7d50419e] {\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n.small-button i[data-v-7d50419e] {\n    font-size: 18px;\n}\n",""])},1040:function(t,e,n){"use strict"
var a=n(204)
var i=n.n(a)
var o=i.a},1041:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".list-enter-active[data-v-752469e0],\n.list-leave-active[data-v-752469e0] {\n  transition: all 0.2s;\n}\n\n/* .list-leave-active below version 2.1.8 */\n.list-enter[data-v-752469e0],\n.list-leave-to[data-v-752469e0] {\n  opacity: 0;\n  transform: scale(0.1);\n}\n.main-container[data-v-752469e0] {\n  padding: 6px 0;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background: steelblue;\n  color: white;\n  text-align: center;\n}\n.main-container .accounts-title[data-v-752469e0] {\n    font-weight: bold;\n    font-size: 1em;\n    color: rgba(255, 255, 255, 0.7);\n}\n.main-container .add-button[data-v-752469e0] {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.main-container .add-button button[data-v-752469e0] {\n      margin: 0;\n}\n.main-container .refresh-button[data-v-752469e0] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 0;\n}\n.main-container .zero-accounts[data-v-752469e0] {\n    text-align: center;\n    padding: 12px 0;\n    font-size: 2em;\n    color: rgba(255, 255, 255, 0.2);\n    text-transform: uppercase;\n}\n.main-container .accounts[data-v-752469e0] {\n    display: flex;\n    justify-content: center;\n    flex-wrap: wrap;\n    text-align: center;\n}\n.main-container .accounts .account-item[data-v-752469e0] {\n      position: relative;\n      color: black;\n      font-size: 0.8em;\n      margin: 4px;\n      padding: 10px 12px 20px;\n      border-radius: 4px;\n      background: linear-gradient(to bottom, white, #ebebeb);\n      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);\n      line-height: 1.25;\n      cursor: pointer;\n      backface-visibility: hidden;\n}\n.main-container .accounts .account-item .account-name[data-v-752469e0] {\n        font-weight: bold;\n        margin-bottom: 2px;\n        font-size: 1.1em;\n}\n.main-container .accounts .account-item .delete-button[data-v-752469e0] {\n        color: rgba(0, 0, 0, 0.3);\n        z-index: 1;\n        position: absolute;\n        margin: 0;\n        bottom: -4px;\n        right: -4px;\n}\n.main-container .accounts .account-item .delete-button[data-v-752469e0]:hover {\n          color: rgba(255, 0, 0, 0.6);\n}\n.main-container .accounts .account-item .delete-button i[data-v-752469e0] {\n          font-size: 18px;\n}\n.main-container .accounts .account-item .action-button-holder[data-v-752469e0] {\n        z-index: 1;\n        position: absolute;\n        bottom: -4px;\n        left: -4px;\n}\n",""])},1042:function(t,e,n){"use strict"
var a=n(205)
var i=n.n(a)
var o=i.a},1043:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".instructions-header[data-v-4a623ac3] {\n  position: relative;\n  background: #4077a5;\n  display: flex;\n}\n.instructions-header button[data-v-4a623ac3] {\n    height: 30px;\n    margin: 0;\n}\n.instructions-header .centered-title[data-v-4a623ac3] {\n    pointer-events: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    color: rgba(255, 255, 255, 0.8);\n    font-weight: bold;\n    font-size: 1.1em;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n.instructions-header .experiments-button[data-v-4a623ac3] {\n    width: 30px;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    flex: 0 0 auto;\n}\n.slot-hider[data-v-4a623ac3] {\n  padding: 8px 20px;\n}\n",""])},1044:function(t,e,n){"use strict"
var a=n(206)
var i=n.n(a)
var o=i.a},1045:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-08fc0f0a] {\n  user-select: none;\n}\n.button-group[data-v-08fc0f0a] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-08fc0f0a] {\n    margin: 4px;\n}\n.input-group[data-v-08fc0f0a] {\n  display: block;\n}\n.main-container[data-v-08fc0f0a] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-08fc0f0a] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n    font-weight: normal;\n}\n.main-container .help-contents .button-holder[data-v-08fc0f0a] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .simple-header[data-v-08fc0f0a] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .simple-header div[data-v-08fc0f0a] {\n        margin-bottom: 2px;\n}\n.main-container .help-contents .simple-header .sub-header[data-v-08fc0f0a] {\n        font-size: 0.8em;\n        padding-left: 10px;\n}\n.main-container .help-contents .help-email[data-v-08fc0f0a] {\n      margin: 0 30px;\n}\n",""])},1046:function(t,e,n){"use strict"
var a=n(207)
var i=n.n(a)
var o=i.a},1047:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-72f9992e] {\n  user-select: none;\n}\n.button-group[data-v-72f9992e] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-72f9992e] {\n    margin: 4px;\n}\n.input-group[data-v-72f9992e] {\n  display: block;\n}\n.main-container[data-v-72f9992e] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-72f9992e] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-72f9992e] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-72f9992e] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-72f9992e] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-72f9992e] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-72f9992e] {\n      margin: 0 30px 16px;\n}\n",""])},1048:function(t,e,n){"use strict"
var a=n(208)
var i=n.n(a)
var o=i.a},1049:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-3090be5a] {\n  user-select: none;\n}\n.button-group[data-v-3090be5a] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-3090be5a] {\n    margin: 4px;\n}\n.input-group[data-v-3090be5a] {\n  display: block;\n}\n.main-container[data-v-3090be5a] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-3090be5a] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-3090be5a] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-3090be5a] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-3090be5a] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-3090be5a] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-3090be5a] {\n      margin: 0 30px 16px;\n}\n",""])},1050:function(t,e,n){"use strict"
var a=n(209)
var i=n.n(a)
var o=i.a},1051:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-267b84a9] {\n  user-select: none;\n}\n.button-group[data-v-267b84a9] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-267b84a9] {\n    margin: 4px;\n}\n.input-group[data-v-267b84a9] {\n  display: block;\n}\n.main-container[data-v-267b84a9] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-267b84a9] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-267b84a9] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-267b84a9] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-267b84a9] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-267b84a9] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-267b84a9] {\n      margin: 0 30px 16px;\n}\n",""])},1052:function(t,e,n){"use strict"
var a=n(210)
var i=n.n(a)
var o=i.a},1053:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-6c1811be] {\n  user-select: none;\n}\n.button-group[data-v-6c1811be] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-6c1811be] {\n    margin: 4px;\n}\n.input-group[data-v-6c1811be] {\n  display: block;\n}\n.main-container[data-v-6c1811be] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-6c1811be] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-6c1811be] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-email[data-v-6c1811be] {\n      margin: 0 30px;\n}\n.main-container .help-contents .status-message[data-v-6c1811be] {\n      font-size: 0.8em;\n}\n",""])},1054:function(t,e,n){"use strict"
var a=n(211)
var i=n.n(a)
var o=i.a},1055:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-22c22211] {\n  user-select: none;\n}\n.button-group[data-v-22c22211] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-22c22211] {\n    margin: 4px;\n}\n.input-group[data-v-22c22211] {\n  display: block;\n}\n.main-container[data-v-22c22211] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-22c22211] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-22c22211] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-email[data-v-22c22211] {\n      margin: 0 30px;\n}\n.main-container .help-contents .status-message[data-v-22c22211] {\n      font-size: 0.8em;\n}\n",""])},1056:function(t,e,n){"use strict"
var a=n(212)
var i=n.n(a)
var o=i.a},1057:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-2e15c7a6] {\n  user-select: none;\n}\n.button-group[data-v-2e15c7a6] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-2e15c7a6] {\n    margin: 4px;\n}\n.input-group[data-v-2e15c7a6] {\n  display: block;\n}\n.top-controls[data-v-2e15c7a6] {\n  padding: 6px;\n}\n",""])},1058:function(t,e,n){"use strict"
var a=n(213)
var i=n.n(a)
var o=i.a},1059:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-54249c38] {\n  user-select: none;\n}\n.button-group[data-v-54249c38] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-54249c38] {\n    margin: 4px;\n}\n.input-group[data-v-54249c38] {\n  display: block;\n}\n.main-container[data-v-54249c38] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-54249c38] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-54249c38] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents textarea[data-v-54249c38] {\n      width: 100%;\n      height: 200px;\n      resize: none;\n      outline: none;\n      font-size: 0.8em;\n      font-family: monospace;\n      background: #001400;\n      overflow: auto;\n      color: #00ff96;\n      padding: 10px;\n}\n",""])},1060:function(t,e,n){"use strict"
var a=n(214)
var i=n.n(a)
var o=i.a},1061:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-7e95a1ec] {\n  user-select: none;\n}\n.button-group[data-v-7e95a1ec] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-7e95a1ec] {\n    margin: 4px;\n}\n.input-group[data-v-7e95a1ec] {\n  display: block;\n}\n.main-container[data-v-7e95a1ec] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.main-container .bifrost-notes[data-v-7e95a1ec] {\n    margin-bottom: 20px;\n}\n.main-container .bifrost-params[data-v-7e95a1ec] {\n    display: flex;\n    justify-content: center;\n    flex-wrap: wrap;\n}\n.main-container .bifrost-params .input-group[data-v-7e95a1ec] {\n      margin-right: 12px;\n      flex: 1 0 200px;\n}\n",""])},1062:function(t,e,n){"use strict"
var a=n(215)
var i=n.n(a)
var o=i.a},1063:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-24b3a3ca] {\n  user-select: none;\n}\n.button-group[data-v-24b3a3ca] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-24b3a3ca] {\n    margin: 4px;\n}\n.input-group[data-v-24b3a3ca] {\n  display: block;\n}\n.top-controls[data-v-24b3a3ca] {\n  padding: 10px 20px;\n}\n.address-box[data-v-24b3a3ca] {\n  display: flex;\n  align-items: center;\n}\n.address-box div.input-group[data-v-24b3a3ca] {\n    margin-right: 16px;\n}\n",""])},1064:function(t,e,n){"use strict"
var a=n(216)
var i=n.n(a)
var o=i.a},1065:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-d22c403a] {\n  user-select: none;\n}\n.button-group[data-v-d22c403a] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-d22c403a] {\n    margin: 4px;\n}\n.input-group[data-v-d22c403a] {\n  display: block;\n}\n.top-controls[data-v-d22c403a] {\n  padding: 10px 20px;\n}\n.address-box[data-v-d22c403a] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n.address-box div.input-group[data-v-d22c403a] {\n    max-width: 400px;\n    margin-bottom: 8px;\n}\n.instructions div[data-v-d22c403a] {\n  margin-bottom: 12px;\n  line-height: 1;\n}\n",""])},1066:function(t,e,n){"use strict"
var a=n(217)
var i=n.n(a)
var o=i.a},1067:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-42cb686a] {\n  user-select: none;\n}\n.button-group[data-v-42cb686a] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-42cb686a] {\n    margin: 4px;\n}\n.input-group[data-v-42cb686a] {\n  display: block;\n}\n.main-container[data-v-42cb686a] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-42cb686a] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-42cb686a] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-42cb686a] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-42cb686a] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-42cb686a] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-42cb686a] {\n      margin: 0 30px;\n}\n",""])},1068:function(t,e,n){"use strict"
var a=n(218)
var i=n.n(a)
var o=i.a},1069:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-6daee72e] {\n  user-select: none;\n}\n.button-group[data-v-6daee72e] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-6daee72e] {\n    margin: 4px;\n}\n.input-group[data-v-6daee72e] {\n  display: block;\n}\n.main-container[data-v-6daee72e] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .help-contents[data-v-6daee72e] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .help-contents .button-holder[data-v-6daee72e] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .help-contents .help-text[data-v-6daee72e] {\n      margin-bottom: 20px;\n}\n.main-container .help-contents .help-text div[data-v-6daee72e] {\n        margin-bottom: 10px;\n}\n.main-container .help-contents .help-text .sub-header[data-v-6daee72e] {\n        font-size: 0.8em;\n}\n.main-container .help-contents .help-email[data-v-6daee72e] {\n      margin: 0 30px;\n}\n.main-container .help-contents .help-email .balance-fields[data-v-6daee72e] {\n        display: flex;\n        align-items: center;\n        margin-bottom: 12px;\n}\n.main-container .help-contents .help-email .balance-fields div.input-group[data-v-6daee72e] {\n          flex: 1 0 200px;\n          margin-right: 16px;\n}\n",""])},1070:function(t,e,n){"use strict"
var a=n(219)
var i=n.n(a)
var o=i.a},1071:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-09f88f96] {\n  user-select: none;\n}\n.button-group[data-v-09f88f96] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-09f88f96] {\n    margin: 4px;\n}\n.input-group[data-v-09f88f96] {\n  display: block;\n}\n.page-title[data-v-09f88f96] {\n  position: relative;\n  font-weight: bold;\n  font-size: 1.2em;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.page-title .page-subtitle[data-v-09f88f96] {\n    font-size: 0.9em;\n    font-weight: normal;\n}\n.page-contents[data-v-09f88f96] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.summary-view[data-v-09f88f96] {\n  margin: 10px;\n  display: flex;\n  flex: 0 1 auto;\n  flex-direction: column;\n}\n.summary-view .summary-header[data-v-09f88f96] {\n    display: flex;\n    font-weight: bold;\n    font-size: 1.1em;\n    text-transform: uppercase;\n    align-items: center;\n    justify-content: center;\n    margin-bottom: 10px;\n}\n.summary-view .summary-header button[data-v-09f88f96] {\n      margin: 0;\n}\n.summary-view .operations-item[data-v-09f88f96] {\n    display: flex;\n    font-size: 0.95em;\n}\n.summary-view .operations-item .item-name[data-v-09f88f96] {\n      text-align: right;\n      padding-right: 5px;\n      font-weight: bold;\n      flex: 1 1 20%;\n}\n.summary-view .operations-item .item-value[data-v-09f88f96] {\n      text-align: left;\n      flex: 2 2 80%;\n      padding-left: 5px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      font-family: monospace;\n      width: 0;\n}\n",""])},1072:function(t,e,n){"use strict"
var a=n(220)
var i=n.n(a)
var o=i.a},1073:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-0471f966] {\n  user-select: none;\n}\n.button-group[data-v-0471f966] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-0471f966] {\n    margin: 4px;\n}\n.input-group[data-v-0471f966] {\n  display: block;\n}\n.password-field[data-v-0471f966] {\n  margin: 40px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.main-container[data-v-0471f966] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow: auto;\n  max-height: 60vh;\n}\n",""])},1074:function(t,e,n){"use strict"
var a=n(221)
var i=n.n(a)
var o=i.a},1075:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-40f46012] {\n  user-select: none;\n}\n.button-group[data-v-40f46012] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-40f46012] {\n    margin: 4px;\n}\n.input-group[data-v-40f46012] {\n  display: block;\n}\n.top-controls[data-v-40f46012] {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 20px;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n.top-controls .display-index[data-v-40f46012] {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    margin: 0 10px;\n    font-size: 1em;\n}\n.top-controls div.input-group[data-v-40f46012] {\n    max-width: 350px;\n    min-width: 140px;\n    margin-bottom: 6px;\n}\n.top-controls .button-row[data-v-40f46012] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-top: 8px;\n}\n.top-controls .button-row button[data-v-40f46012] {\n      margin: 0 12px;\n}\n.address-box[data-v-40f46012] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.address-box button[data-v-40f46012] {\n    margin: 4px;\n}\n",""])},1076:function(t,e,n){"use strict"
var a=n(222)
var i=n.n(a)
var o=i.a},1077:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-488db704] {\n  user-select: none;\n}\n.button-group[data-v-488db704] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-488db704] {\n    margin: 4px;\n}\n.input-group[data-v-488db704] {\n  display: block;\n}\n.accounts-box[data-v-488db704] {\n  display: flex;\n  overflow: hidden;\n}\n.accounts-box .v-input--checkbox[data-v-488db704] {\n    flex: 0 1 auto;\n    margin-right: 20px;\n}\n.operations-content[data-v-488db704] {\n  display: flex;\n  width: 100%;\n  min-height: 300px;\n  flex-direction: column;\n  align-items: center;\n  background: #373737;\n  color: white;\n}\n.operations-content .operations-item[data-v-488db704] {\n    display: flex;\n    width: 100%;\n}\n.operations-content .operations-item[data-v-488db704]:nth-child(even) {\n      background: rgba(255, 255, 255, 0.1);\n}\n.operations-content .operations-item .item-name[data-v-488db704] {\n      text-align: right;\n      padding-right: 5px;\n      flex: 1 0 50%;\n      text-decoration: none;\n      color: white;\n      background: rgba(0, 55, 40, 0.2);\n}\n.operations-content .operations-item .item-value[data-v-488db704] {\n      text-align: left;\n      flex: 1 0 50%;\n      padding-left: 5px;\n      text-decoration: none;\n      font-weight: bold;\n      color: white;\n      background: rgba(0, 0, 200, 0.1);\n}\n.operations-content .operations-title[data-v-488db704] {\n    width: 100%;\n    text-align: center;\n    background: rgba(0, 0, 0, 0.3);\n    font-size: 1em;\n    color: rgba(255, 255, 255, 0.5);\n    font-weight: bold;\n    margin: 2px 0;\n    text-transform: uppercase;\n}\n",""])},11:function(t,e,n){"use strict"
var a=n(0)
var i=n(2)
var o=n(21)
function r(t,e){return c(t)||l(t,e)||s()}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function l(t,e){var n=[]
var a=true
var i=false
var o=undefined
try{for(var r=t[Symbol.iterator](),s;!(a=(s=r.next()).done);a=true){n.push(s.value)
if(e&&n.length===e)break}}catch(t){i=true
o=t}finally{try{if(!a&&r["return"]!=null)r["return"]()}finally{if(i)throw o}}return n}function c(t){if(Array.isArray(t))return t}function u(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function d(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function f(t,e,n){if(e)d(t.prototype,e)
if(n)d(t,n)
return t}var v=n(35)
var p=n(460)
var h=function(){function t(e){var n=this
u(this,t)
this._accounts=[]
this.network=e
this.load()
a["a"].vue().$on("settings-updated",function(t){var e=n.network+"accounts"
switch(t){case e:n.load()
a["a"].emit("stellar-accounts-updated")
break
default:break}})}f(t,[{key:"add",value:function t(e){this._accounts.push(e)
this.save()
return e}},{key:"accounts",value:function t(){return this._accounts.slice()}},{key:"delete",value:function t(e){if(e>=0&&e<this._accounts.length){this._accounts.splice(e,1)
this.save()}else{console.log("index not found")}}},{key:"replace",value:function t(e,n){if(e>=0&&e<this._accounts.length){this._accounts[e]=n
this.save()}else{console.log("index not found")}}},{key:"load",value:function t(){var e=o["a"].get(this.network+"accounts",null,true)
if(e&&e.length>0){this._accounts=e}else{this._accounts=[]}}},{key:"save",value:function t(){var e=this
if(!this._saving){this._saving=true
setTimeout(function(){e._saving=false
o["a"].set(e.network+"accounts",e._accounts,true)},100)}}}])
return t}()
var g=function(){function t(e){u(this,t)
this.network=e}f(t,[{key:"shared",value:function t(){if(!this.sharedAccounts){this.sharedAccounts=new h(this.network)}return this.sharedAccounts}},{key:"addAccount",value:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null
var i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var o=""
if(e.canSign()){o=e.secret()}var r=this._indexOfAccount(e.publicKey())
if(r===-1){var s={name:a["a"].strOK(n)?n:p(),assetBalances:[{symbol:"XLM",amount:"refreshing...",issuer:""}],secret:o,publicKey:e.publicKey(),tag:i}
this.shared().add(s)
return s}return null}},{key:"ethereumAsset",value:function t(){var e=this.accountWithName("Issuer: LMB")
if(e){return new v.Asset("ETH",e.publicKey)}return null}},{key:"bitcoinAsset",value:function t(){var e=this.accountWithName("Issuer: LMB")
if(e){return new v.Asset("BTC",e.publicKey)}return null}},{key:"lamboTokenAsset",value:function t(){var e=this.accountWithName("Issuer: LMB")
if(e){return new v.Asset("LMB",e.publicKey)}return null}},{key:"accounts",value:function t(){return this.shared().accounts()}},{key:"deleteAccount",value:function t(e){this.shared()["delete"](this._indexOfAccount(e))}},{key:"accountWithName",value:function t(e){var n=this.accounts()
var a=true
var i=false
var o=undefined
try{for(var r=n[Symbol.iterator](),s;!(a=(s=r.next()).done);a=true){var l=s.value
if(e===l.name){return l}}}catch(t){i=true
o=t}finally{try{if(!a&&r["return"]!=null){r["return"]()}}finally{if(i){throw o}}}return null}},{key:"accountWithPublicKey",value:function t(e){var n=this._indexOfAccount(e)
if(n!==-1){return this.accounts()[n]}return{}}},{key:"updateBalance",value:function t(e,n){var i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false
var o=this._indexOfAccount(e)
var r=this.accounts()
var s=r[o]
if(s){if(i){s.assetBalances=[]}var l=n
if(!l){l={symbol:"XLM",amount:"Error",issuer:""}}s.assetBalances.push({symbol:l.symbol,amount:a["a"].stripZeros(l.amount),issuer:l.issuer})
this.shared().replace(o,s)}}},{key:"_indexOfAccount",value:function t(e){var n=this.accounts()
var a=true
var i=false
var o=undefined
try{for(var s=n.entries()[Symbol.iterator](),l;!(a=(l=s.next()).done);a=true){var c=r(l.value,2),u=c[0],d=c[1]
if(e===d.publicKey){return u}}}catch(t){i=true
o=t}finally{try{if(!a&&s["return"]!=null){s["return"]()}}finally{if(i){throw o}}}return-1}}])
return t}()
var m=function(){function t(){u(this,t)}f(t,[{key:"addAccount",value:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null
var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
return this.imp().addAccount(e,n,a)}},{key:"ethereumAsset",value:function t(){return this.imp().ethereumAsset()}},{key:"bitcoinAsset",value:function t(){return this.imp().bitcoinAsset()}},{key:"lamboTokenAsset",value:function t(){return this.imp().lamboTokenAsset()}},{key:"accounts",value:function t(){return this.imp().accounts()}},{key:"deleteAccount",value:function t(e){return this.imp().deleteAccount(e)}},{key:"accountWithName",value:function t(e){return this.imp().accountWithName(e)}},{key:"accountWithPublicKey",value:function t(e){return this.imp().accountWithPublicKey(e)}},{key:"updateBalance",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false
return this.imp().updateBalance(e,n,a)}},{key:"imp",value:function t(){if(i["a"].isTestnet()){if(!this.testNet){this.testNet=new g("test")}return this.testNet}if(!this.publicNet){this.publicNet=new g("public")}return this.publicNet}}])
return t}()
var b=new m
e["a"]=b},117:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("Send a payment to the destination account.")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:true,showFunding:true,showDest:true,showAmount:true,showSigner:true,showAsset:true},on:{toast:t.displayToast,"enter-key-down":t.sendAssets}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loading},on:{click:function(e){return t.sendAssets()}},slot:"activator"},[t._v("Send Payment")]),t._v(" "),n("span",[t._v("Send the payment")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"send-assets-dialog",bottom:false,top:true}})],1)],1)])}
var i=[]
var o=n(0)
var r=n(7)
var s=n(6)
var l=n(2)
var c=n(12)
var u=n(19)
function d(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function f(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function v(t,e,n){if(e)f(t.prototype,e)
if(n)f(t,n)
return t}var p=function(){function t(e){d(this,t)
this.transactions=[]
this.callback=e}v(t,[{key:"sendAsset",value:function t(e,n,a,i,o,r,s){this.transactions.push({sourceWallet:e,fundingWallet:n,destWallet:a,amount:i,asset:o,memo:r,additionalSigners:s})}},{key:"go",value:function t(){var e=this
var n=this.transactions.shift()
if(n){return l["a"].sendAsset(n.sourceWallet,n.fundingWallet,n.destWallet,n.amount,n.asset,n.memo,n.additionalSigners).then(function(t){n.destWallet.publicKey().then(function(t){o["a"].debugLog("sent to: "+t+" "+n.amount+" "+n.memo)})
e.go()})["catch"](function(t){e.callback(t)
console.log(t)})}else{if(this.callback){this.callback()}}}}])
return t}()
function h(t){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){h=function t(e){return typeof e}}else{h=function t(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}}return h(t)}var g={props:["ping","model"],components:{"dialog-titlebar":r["DialogTitleBar"],"toast-component":c["a"],"dialog-accounts":u["a"]},data:function t(){return{visible:false,title:"Send XLM",loading:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},batchedDestWallets:function t(e,n){var a=[]
var i=[]
var o=true
var r=false
var l=undefined
try{for(var c=n[Symbol.iterator](),u;!(o=(u=c.next()).done);o=true){var d=u.value
var f=s["StellarWallet"]["public"](d)
i.push(f)
if(i.length>=e){a.push(i)
i=[]}}}catch(t){r=true
l=t}finally{try{if(!o&&c["return"]!=null){c["return"]()}}finally{if(r){throw l}}}if(i.length>0){a.push(i)}return a},sendAssets:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
var a=this.dialogAccounts().amount()
var i=this.dialogAccounts().asset()
var r=this.dialogAccounts().signerWallet()
var c=this.dialogAccounts().fundingWallet()
if(n&&a>0&&i){var u=function(){var t=null
if(r){t=[r]}var u=e.dialogAccounts().destPublicKeys()
var d=e.dialogAccounts().destKeysAndMemos()
if(u.length>0){var f=Promise.resolve()
e.loading=true
var v=e.dialogAccounts().destPaymentsBatchSize()
var h=e.batchedDestWallets(v,u)
var g=true
var m=false
var b=undefined
try{var y=function e(){var r=k.value
f=f.then(function(){return l["a"].sendAssetBatch(n,c,r,String(a),i,null,t).then(function(t){o["a"].debugLog("success: "+JSON.stringify(r))
return null})["catch"](function(t){o["a"].debugLog("failed: "+JSON.stringify(r),"Error")
o["a"].debugLog(t)})})}
for(var x=h[Symbol.iterator](),k;!(g=(k=x.next()).done);g=true){y()}}catch(t){m=true
b=t}finally{try{if(!g&&x["return"]!=null){x["return"]()}}finally{if(m){throw b}}}f.then(function(){e.displayToast("Done")
l["a"].updateBalances()
e.loading=false})}else if(d.length>0){var w=new p(function(t){e.loading=false
l["a"].updateBalances()
if(t){e.displayToast("Error: "+t,true)
o["a"].debugLog(t)}else{e.displayToast("Success!")}})
var _=true
var A=false
var S=undefined
try{for(var T=d[Symbol.iterator](),C;!(_=(C=T.next()).done);_=true){var P=C.value
var L=P.key.trim()
var D=P.memo.trim()
var O=s["StellarWallet"]["public"](L)
w.sendAsset(n,c,O,String(a),i,D,t)}}catch(t){A=true
S=t}finally{try{if(!_&&T["return"]!=null){T["return"]()}}finally{if(A){throw S}}}w.go()
e.loading=true}else{var M=e.dialogAccounts().destWallet()
if(M){o["a"].debugLog("Sending...")
e.loading=true
return{v:l["a"].sendAsset(n,c,M,String(a),i,null,t).then(function(t){o["a"].debugLog(t)
l["a"].updateBalances()
e.loading=false
e.displayToast("Success!")
return null})["catch"](function(t){o["a"].debugLog(t)
e.loading=false
e.displayToast("Error!",true)})}}}}()
if(h(u)==="object")return u.v}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"send-assets-dialog")}}}
var m=g
var b=n(1023)
var y=n(4)
var x=Object(y["a"])(m,a,i,false,null,"c2932fc8",null)
var k=e["a"]=x.exports},118:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"480"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"dialog-contents"},[n("div",{staticClass:"top-dialog-text"},[t._v("Don't loose these keys! Print or save them to a secure USB or hard disk")]),t._v(" "),n("v-select",{attrs:{items:t.accountsUI,"item-text":"name",label:"Account","return-object":"","max-height":"600"},model:{value:t.selectedSource,callback:function(e){t.selectedSource=e},expression:"selectedSource"}}),t._v(" "),t._l(Array.from(t.summaryMap.keys()),function(e){return n("div",{key:e,staticClass:"operations-item"},[n("div",{staticClass:"item-name"},[t._v(t._s(e)+":")]),t._v(" "),n("div",{staticClass:"item-value"},[t._v(t._s(t.summaryMap.get(e)))])])}),t._v(" "),n("div",{staticClass:"buttons-area"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",color:"primary",round:""},on:{click:function(e){return t.buttonClick("save-keys")}},slot:"activator"},[t._v("Save Keys...")]),t._v(" "),n("span",[t._v("Save the keys to a file on a USB or disk")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",color:"primary",round:""},on:{click:function(e){return t.buttonClick("print-keys")}},slot:"activator"},[t._v("Print Keys...")]),t._v(" "),n("span",[t._v("Print the keys for safety")])],1)],1)],2),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"save-keys-dialog",bottom:false,top:true}})],1)])}
var i=[]
var o=n(0)
var r=n(7)
var s=n(12)
var l=n(2)
var c=n(11)
var u=n(23)
var d=n(33)
var f=n.n(d)
var v=n(177)
var p={props:["ping","publicKey"],mixins:[u["a"]],components:{"dialog-titlebar":r["DialogTitleBar"],"toast-component":s["a"]},data:function t(){return{visible:false,title:"Save the Keys",summaryMap:[],selectedSource:null}},watch:{selectedSource:function t(){this.updateSummary()},ping:function t(){this.visible=true
this.setup()}},mounted:function t(){this.setup()},methods:{setup:function t(){if(this.publicKey){this.selectedSource=c["a"].accountWithPublicKey(this.publicKey)}if(!this.selectedSource&&this.accountsUI.length>0){this.selectedSource=this.accountsUI[0]}this.updateSummary()},updateSummary:function t(){this.summaryMap=new Map
if(this.selectedSource){this.summaryMap.set("Public",this.selectedSource.publicKey)
this.summaryMap.set("Secret",this.selectedSource.secret)}else{this.summaryMap.set("Public","--")
this.summaryMap.set("Secret","--")}},printFile:function t(){if(this.selectedSource){var e=f()("<iframe></iframe>")[0]
e.setAttribute("id","printkeys")
e.setAttribute("name","printkeys")
document.body.appendChild(e)
var n=window.frames["printkeys"]
n.document.head.innerHTML="<style>body{margin-top: 100px; font-size: 12px; text-align: center; font-family: Arial, Helvetica, sans-serif;}</style>"
n.document.body.innerHTML="<div>"+this.keyString(true)+"</div>"
n.print()
document.body.removeChild(e)}else{o["a"].DebugLog("Nothing to print?")}},keyString:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var n=""
if(this.selectedSource){var a=!l["a"].isTestnet()
var i=a?"(public net)":"(test net)"
var o="\n\n"
if(e){o="<br><br>"}n+=o
n+="Stellar account keys: "+i
n+=o
n+="Account name: "+this.selectedSource.name
n+=o
n+="Public: "+this.selectedSource.publicKey
n+=o
n+="Secret: "+this.selectedSource.secret}return n},saveFile:function t(){if(this.selectedSource){var e=this.keyString()
var n=new Blob([e],{type:"text/plain;charset=utf-8"})
v.saveAs(n,"stellar-account-keys.txt")}else{o["a"].debugLog("Nothing to save?")}},buttonClick:function t(e){switch(e){case"save-keys":this.saveFile()
break
case"print-keys":this.printFile()
break
default:break}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"save-keys-dialog")}}}
var h=p
var g=n(1004)
var m=n(4)
var b=Object(m["a"])(h,a,i,false,null,"55bf675c",null)
var y=e["a"]=b.exports},119:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:true},on:{"enter-key-down":t.showOffers,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"secondary",loading:t.loading},on:{click:function(e){return t.deleteOffers()}},slot:"activator"},[t._v("Delete Offers")]),t._v(" "),n("span",[t._v("Delete offers for the source account")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"primary",loading:t.loading},on:{click:function(e){return t.showOffers()}},slot:"activator"},[t._v("Show Offers")]),t._v(" "),n("span",[t._v("Show offers for the source account")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"manage-offer-dialog",bottom:false,top:true}})],1)],1)])}
var i=[]
var o=n(0)
var r=n(7)
var s=n(2)
var l=n(12)
var c=n(19)
var u={props:["ping","model"],components:{"dialog-titlebar":r["DialogTitleBar"],"toast-component":l["a"],"dialog-accounts":c["a"]},data:function t(){return{visible:false,title:"Show Offers",loading:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},showOffers:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
if(n){o["a"].debugLog("Offers...")
n.publicKey().then(function(t){s["a"].server().offers("accounts",t).call().then(function(t){t.records.forEach(function(t){o["a"].debugLog(t)})
o["a"].debugLog("Offers done")
e.visible=false
return null})})}},deleteOffers:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
if(n){s["a"].deleteOffers(n).then(function(){e.visible=false})["catch"](function(t){o["a"].debugLog(t,"Error")})}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"manage-offer-dialog")}}}
var d=u
var f=n(1021)
var v=n(4)
var p=Object(v["a"])(d,a,i,false,null,"25673726",null)
var h=e["a"]=p.exports},12:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-snackbar",{attrs:{timeout:3e3,bottom:t.bottom,top:t.top,color:t.color,absolute:t.absolute,"multi-line":t.multiline},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"toast-text",domProps:{innerHTML:t._s(t.snackbarMessage)}})])}
var i=[]
var o=n(0)
var r={props:{location:{type:String,default:"app"},absolute:{type:Boolean,default:false},bottom:{type:Boolean,default:true},top:{type:Boolean,default:false},multiline:{type:Boolean,default:false}},data:function t(){return{visible:false,snackbarMessage:"",color:"success"}},methods:{toast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
this.snackbarMessage=e
this.visible=true
if(n){this.color="error"}else{this.color="success"}},helperCallback:function t(e,n,a){if(this.location===a){this.toast(e,n)}}},created:function t(){o["a"].vue().$on("toast",this.helperCallback)}}
var s=r
var l=n(996)
var c=n(4)
var u=Object(c["a"])(s,a,i,false,null,"362e1680",null)
var d=e["a"]=u.exports},120:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showManageOffer:true,showFunding:true,showSource:true,showBuyingAsset:true,showSellingAsset:true},on:{"enter-key-down":t.manageOffer,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"primary",loading:t.loading},on:{click:function(e){return t.manageOffer()}},slot:"activator"},[t._v("Post Offer")]),t._v(" "),n("span",[t._v("Post an offer to Stellar")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"manage-offer-dialog",bottom:false,top:true}})],1)],1)])}
var i=[]
var o=n(0)
var r=n(7)
var s=n(2)
var l=n(12)
var c=n(19)
var u={props:["ping","model"],components:{"dialog-titlebar":r["DialogTitleBar"],"toast-component":l["a"],"dialog-accounts":c["a"]},data:function t(){return{visible:false,title:"Manage Offer",loading:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},manageOffer:function t(){var e=this
var n=this.dialogAccounts().fundingWallet()
var a=this.dialogAccounts().sourceWallet()
var i=this.dialogAccounts().manageOffer()
if(a){o["a"].debugLog("Managing Offer...")
if(i){var r={n:i.buyUnit,d:i.sellUnit}
var l=i.buyingAsset
var c=i.sellingAsset
this.loading=true
s["a"].manageOffer(a,n,l,c,String(i.sellingAmount),r).then(function(t){o["a"].debugLog(t,"Success")
e.displayToast("Success")
e.loading=false
s["a"].updateBalances()})["catch"](function(t){o["a"].debugLog(t,"Error")
e.loading=false
var n=t.message
if(n==="connection failed"){n="Ledger Nano not found"}e.displayToast(n,true)})}}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"manage-offer-dialog")}}}
var d=u
var f=n(1027)
var v=n(4)
var p=Object(v["a"])(d,a,i,false,null,"25bc6ba3",null)
var h=e["a"]=p.exports},139:function(t,e,n){"use strict"
n.d(e,"a",function(){return r})
function a(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function i(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function o(t,e,n){if(e)i(t.prototype,e)
if(n)i(t,n)
return t}var r=function(){function t(){a(this,t)}o(t,null,[{key:"setImplementation",value:function t(e){this.implemenation=e}},{key:"openBrowser",value:function t(e){if(this.implemenation){this.implemenation.openBrowser(e)
return true}return false}},{key:"applicationName",value:function t(){if(this.implemenation){return this.implemenation.applicationName()}return null}}])
return t}()},178:function(t,e,n){var a=n(984)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("8e60c990",a,true,{})},179:function(t,e,n){var a=n(987)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("d6b2a9a0",a,true,{})},18:function(t,e,n){"use strict"
n.d(e,"a",function(){return l})
function a(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function i(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function o(t,e,n){if(e)i(t.prototype,e)
if(n)i(t,n)
return t}var r=n(35)
var s=n(460)
var l=function(){function t(){a(this,t)
this.reset()}o(t,[{key:"reset",value:function t(){this.symbol=""
this.textValue=""
this.textValueLabel="Label"
this.textValueHint="Hint"
this.sellAmount=1e6
this.souceAccount=null
this.destAccount=null
this.fundingAccount=null
this.signerAccount=null
this.secretKey=""
this.publicKey=""
this.fundingMessage="Optional: The source account will pay the fee."
this.assetAmount=10
this.amountLabel="Amount"
this.nameValueOneLabel="Name"
this.nameValueTwoLabel="Value"
this.nameValueOneValue=""
this.nameValueOneValue=""
this.accountName=s()
this.numberValue=1e6
this.numberValueLabel="Label"
this.numberValueHint="Hint"
this.assetModel={asset:r.Asset["native"]()}
this.buyingAssetModel={asset:r.Asset["native"]()}
this.sellingAssetModel={asset:r.Asset["native"]()}}},{key:"setAsset",value:function t(e){this.assetModel={asset:e}}},{key:"setSellingAsset",value:function t(e){this.sellingAssetModel={asset:e}}},{key:"setBuyingAsset",value:function t(e){this.buyingAssetModel={asset:e}}},{key:"getAsset",value:function t(e){return this.assetModel.asset}},{key:"getSellingAsset",value:function t(e){return this.sellingAssetModel.asset}},{key:"getBuyingAsset",value:function t(e){return this.buyingAssetModel.asset}}])
return t}()},180:function(t,e,n){var a=n(989)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("63dffeee",a,true,{})},181:function(t,e,n){var a=n(991)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("2c88f7f2",a,true,{})},182:function(t,e,n){var a=n(993)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("286b5807",a,true,{})},183:function(t,e,n){var a=n(995)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("ab94c046",a,true,{})},184:function(t,e,n){var a=n(997)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("27b3f153",a,true,{})},185:function(t,e,n){var a=n(999)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("ce49a314",a,true,{})},186:function(t,e,n){var a=n(1001)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("51bafea6",a,true,{})},187:function(t,e,n){var a=n(1003)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("36417da0",a,true,{})},188:function(t,e,n){var a=n(1005)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("e628dcee",a,true,{})},189:function(t,e,n){var a=n(1007)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("f04e76bc",a,true,{})},19:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[t.showSymbol?n("div",{staticClass:"account-choice-box"},[n("v-text-field",{attrs:{label:"Symbol",hint:"Symbol can be 1-12 characters long",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.symbol,callback:function(e){t.$set(t.model,"symbol",typeof e==="string"?e.trim():e)},expression:"model.symbol"}})],1):t._e(),t._v(" "),t.showAccountName?n("div",{staticClass:"account-choice-box"},[n("v-text-field",{attrs:{"hide-details":"",spellcheck:"false",label:"Account name",hint:"A unique name helps you keep track of multiple accounts"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.accountName,callback:function(e){t.$set(t.model,"accountName",typeof e==="string"?e.trim():e)},expression:"model.accountName"}})],1):t._e(),t._v(" "),t.showSource?n("div",{staticClass:"account-choice-box"},[n("div",[n("MenuButton",{attrs:{title:"Source account",items:t.sourceMenuItems,selectedID:t.sourceType},on:{"menu-selected":t.sourceMenuSelected}})],1),t._v(" "),t.sourceType==="account"?n("div",[n("v-autocomplete",{attrs:{"hide-details":"",items:t.accountsUI,"item-text":"name","item-value":"publicKey",clearable:"",label:"Source account","return-object":"","menu-props":{maxHeight:"600"}},model:{value:t.model.sourceAccount,callback:function(e){t.$set(t.model,"sourceAccount",e)},expression:"model.sourceAccount"}})],1):t._e()]):t._e(),t._v(" "),t.showDest?n("div",{staticClass:"account-choice-box"},[n("div",[n("MenuButton",{attrs:{title:"Destination account",items:t.destMenuItems,selectedID:t.destType},on:{"menu-selected":t.destMenuSelected}})],1),t._v(" "),t.destType==="publicKey"?n("div",[n("v-text-field",{attrs:{"hide-details":"",label:"Destination public key",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.destPublicKey,callback:function(e){t.destPublicKey=typeof e==="string"?e.trim():e},expression:"destPublicKey"}})],1):t._e(),t._v(" "),t.destType==="account"?n("div",[n("v-autocomplete",{attrs:{"hide-details":"",items:t.accountsUI,"item-text":"name","item-value":"publicKey",clearable:"",label:"Destination account","return-object":"","menu-props":{maxHeight:"600"}},model:{value:t.model.destAccount,callback:function(e){t.$set(t.model,"destAccount",e)},expression:"model.destAccount"}})],1):t._e(),t._v(" "),t.destType==="publicKeyList"?n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.destPublicKeyList,expression:"destPublicKeyList"}],staticClass:"public-key-text",attrs:{placeholder:"Paste in a list of public keys separated by returns, spaces or commas."},domProps:{value:t.destPublicKeyList},on:{input:function(e){if(e.target.composing){return}t.destPublicKeyList=e.target.value}}}),t._v(" "),n("MenuButton",{attrs:{title:"Payments per transaction",items:t.destPaymentsMenuItems,selectedID:t.destPaymentsType},on:{"menu-selected":t.destPaymentsMenuSelected}})],1):t._e(),t._v(" "),t.destType==="keysAndMemosList"?n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.destKeysAndMemosList,expression:"destKeysAndMemosList"}],staticClass:"public-key-text",attrs:{placeholder:"Paste in CSV format: KEY,MEMO to send asset with memo to account with memo"},domProps:{value:t.destKeysAndMemosList},on:{input:function(e){if(e.target.composing){return}t.destKeysAndMemosList=e.target.value}}})]):t._e()]):t._e(),t._v(" "),t.showAsset?n("div",{staticClass:"account-choice-box"},[n("asset-popup",{attrs:{title:"Asset",model:t.model.assetModel}})],1):t._e(),t._v(" "),t.showBuyingAsset?n("div",{staticClass:"account-choice-box"},[n("asset-popup",{attrs:{title:"Buying asset",model:t.model.buyingAssetModel}})],1):t._e(),t._v(" "),t.showSellingAsset?n("div",{staticClass:"account-choice-box"},[n("asset-popup",{attrs:{title:"Selling asset",model:t.model.sellingAssetModel}})],1):t._e(),t._v(" "),t.showSecret?n("div",{staticClass:"account-choice-box"},[n("div",[n("MenuButton",{attrs:{title:"Enter an account key",items:t.secretMenuItems,selectedID:t.secretType},on:{"menu-selected":t.secretMenuSelected}})],1),t._v(" "),t.secretType==="secret"?n("div",[n("v-text-field",{attrs:{spellcheck:"false",autofocus:"",label:"Secret key",counter:56,hint:"Starts with an 'S'","append-icon":t.showSecretText?"visibility_off":"visibility","append-icon-cb":function(){return t.showSecretText=!t.showSecretText},type:t.showSecretText?"text":"password"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.secretKey,callback:function(e){t.$set(t.model,"secretKey",typeof e==="string"?e.trim():e)},expression:"model.secretKey"}})],1):t._e(),t._v(" "),t.secretType==="public"?n("div",[n("v-text-field",{attrs:{spellcheck:"false",autofocus:"",label:"Public key",counter:56,hint:"Starts with an 'G'"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.publicKey,callback:function(e){t.$set(t.model,"publicKey",typeof e==="string"?e.trim():e)},expression:"model.publicKey"}})],1):t._e()]):t._e(),t._v(" "),t.showAmount?n("div",{staticClass:"account-choice-box"},[n("v-text-field",{attrs:{"hide-details":"",label:t.model.amountLabel,type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.assetAmount,callback:function(e){t.$set(t.model,"assetAmount",t._n(e))},expression:"model.assetAmount"}})],1):t._e(),t._v(" "),t.showNumberValue?n("div",{staticClass:"account-choice-box"},[n("v-text-field",{attrs:{label:t.model.numberValueLabel,hint:t.model.numberValueHint,type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.numberValue,callback:function(e){t.$set(t.model,"numberValue",t._n(e))},expression:"model.numberValue"}})],1):t._e(),t._v(" "),t.showManageOffer?n("div",{staticClass:"account-choice-box"},[n("v-text-field",{attrs:{"hide-details":"",label:"Sell amount",type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.sellAmount,callback:function(e){t.$set(t.model,"sellAmount",t._n(e))},expression:"model.sellAmount"}}),t._v(" "),n("div",{staticClass:"price-header"},[t._v("Price:")]),t._v(" "),n("div",{staticClass:"accounts-small-text"},[t._v("For example, you want buy 1000 XLM for 1 MyToken.")]),t._v(" "),n("div",{staticClass:"price-pair"},[n("v-text-field",{staticClass:"buy-price",attrs:{"hide-details":"",label:"Buy unit",type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.buyUnit,callback:function(e){t.buyUnit=t._n(e)},expression:"buyUnit"}}),t._v(" "),n("v-text-field",{attrs:{"hide-details":"",label:"Sell unit",type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.sellUnit,callback:function(e){t.sellUnit=t._n(e)},expression:"sellUnit"}})],1)],1):t._e(),t._v(" "),t.showAuthFlags?n("div",{staticClass:"account-choice-box"},[n("div",{staticClass:"price-pair"},[n("v-checkbox",{staticClass:"buy-price",attrs:{"hide-details":"",small:"",label:"Auth required"},model:{value:t.authRequired,callback:function(e){t.authRequired=e},expression:"authRequired"}}),t._v(" "),n("v-checkbox",{attrs:{"hide-details":"",small:"",label:"Auth revocable"},model:{value:t.authRevocable,callback:function(e){t.authRevocable=e},expression:"authRevocable"}}),t._v(" "),n("v-checkbox",{attrs:{"hide-details":"",small:"",label:"Trust BTC/ETH (for Bifrost)"},model:{value:t.trustBtcEthFlag,callback:function(e){t.trustBtcEthFlag=e},expression:"trustBtcEthFlag"}})],1)]):t._e(),t._v(" "),t.showBuyOffer?n("div",{staticClass:"account-choice-box"},[n("div",{staticClass:"price-pair"},[n("v-text-field",{staticClass:"buy-price",attrs:{"hide-details":"",label:"Buy amount",type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.buyAmount,callback:function(e){t.buyAmount=t._n(e)},expression:"buyAmount"}}),t._v(" "),n("v-text-field",{attrs:{"hide-details":"",label:"Send maximum selling asset",type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.buySendMax,callback:function(e){t.buySendMax=t._n(e)},expression:"buySendMax"}})],1)]):t._e(),t._v(" "),t.showTextValue?n("div",{staticClass:"account-choice-box"},[n("v-text-field",{attrs:{label:t.model.textValueLabel,hint:t.model.textValueHint,autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.textValue,callback:function(e){t.$set(t.model,"textValue",typeof e==="string"?e.trim():e)},expression:"model.textValue"}})],1):t._e(),t._v(" "),t.showNameValue?n("div",{staticClass:"account-choice-box"},[n("v-text-field",{attrs:{"hide-details":"",label:t.model.nameValueOneLabel,autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.nameValueOneValue,callback:function(e){t.$set(t.model,"nameValueOneValue",typeof e==="string"?e.trim():e)},expression:"model.nameValueOneValue"}}),t._v(" "),n("v-text-field",{attrs:{"hide-details":"",label:t.model.nameValueTwoLabel},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.enterKeyDown(e)}},model:{value:t.model.nameValueTwoValue,callback:function(e){t.$set(t.model,"nameValueTwoValue",typeof e==="string"?e.trim():e)},expression:"model.nameValueTwoValue"}})],1):t._e(),t._v(" "),t.showTimeLock?n("div",{staticClass:"account-choice-box"},[n("v-checkbox",{attrs:{"hide-details":"",small:"",label:"Time lock access to this account"},model:{value:t.timeLockEnabled,callback:function(e){t.timeLockEnabled=e},expression:"timeLockEnabled"}}),t._v(" "),t.timeLockEnabled?n("div",[n("v-dialog",{ref:"dialog",attrs:{persistent:"",lazy:"","full-width":"",width:"290px","return-value":t.timeLockDate},on:{"update:returnValue":function(e){t.timeLockDate=e},"update:return-value":function(e){t.timeLockDate=e}},model:{value:t.timeLockModal,callback:function(e){t.timeLockModal=e},expression:"timeLockModal"}},[n("v-text-field",{attrs:{slot:"activator","hide-details":"",label:"Time Lock Expiration Date","prepend-icon":"event",readonly:""},slot:"activator",model:{value:t.timeLockDate,callback:function(e){t.timeLockDate=e},expression:"timeLockDate"}}),t._v(" "),n("v-date-picker",{attrs:{scrollable:"",actions:""},model:{value:t.timeLockDate,callback:function(e){t.timeLockDate=e},expression:"timeLockDate"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.timeLockModal=false}}},[t._v("Cancel")]),t._v(" "),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){return t.$refs.dialog.save(t.timeLockDate)}}},[t._v("OK")])],1)],1)],1):t._e()],1):t._e(),t._v(" "),t.showFunding?n("div",{staticClass:"account-choice-box"},[n("div",[n("MenuButton",{attrs:{title:"Funding account",items:t.fundingMenuItems,selectedID:t.fundingType},on:{"menu-selected":t.fundingMenuSelected}})],1),t._v(" "),t.fundingType==="account"?n("div",[n("v-autocomplete",{attrs:{"hide-details":"",items:t.accountsUI,"item-text":"name","item-value":"publicKey",clearable:"",label:"Funding account","return-object":"","menu-props":{maxHeight:"600"}},model:{value:t.model.fundingAccount,callback:function(e){t.$set(t.model,"fundingAccount",e)},expression:"model.fundingAccount"}})],1):t._e(),t._v(" "),t.fundingType==="none"?n("div",[n("div",{staticClass:"accounts-small-text"},[t._v(t._s(this.model.fundingMessage))])]):t._e()]):t._e(),t._v(" "),t.showSigner?n("div",{staticClass:"account-choice-box"},[n("div",[n("MenuButton",{attrs:{title:"Add Signer account",items:t.signerMenuItems,selectedID:t.signerType},on:{"menu-selected":t.signerMenuSelected}})],1),t._v(" "),t.signerType==="account"?n("div",[n("v-autocomplete",{attrs:{"hide-details":"",items:t.accountsUI,"item-text":"name","item-value":"publicKey",clearable:"",label:"Signing account","return-object":"","menu-props":{maxHeight:"600"}},model:{value:t.model.signerAccount,callback:function(e){t.$set(t.model,"signerAccount",e)},expression:"model.signerAccount"}})],1):t._e()]):t._e()])}
var i=[]
var o=n(0)
var r=n(23)
var s=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"menu-button-main"},[n("div",[t._v("\n    "+t._s(t.title)+":\n  ")]),t._v(" "),n("v-menu",{attrs:{"offset-y":""}},[n("v-btn",{staticClass:"custom-menu-button",attrs:{slot:"activator",flat:"",color:"primary"},slot:"activator"},[t._v("\n      "+t._s(t.getTitle())+"\n      "),n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},t._l(t.items,function(e,a){return n("v-list-tile",{key:e.title,on:{click:function(n){return t.menuClick(e,a)}}},[n("div",[t._v(t._s(e.title))])])}),1)],1)],1)}
var l=[]
function c(t,e){return f(t)||d(t,e)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function d(t,e){var n=[]
var a=true
var i=false
var o=undefined
try{for(var r=t[Symbol.iterator](),s;!(a=(s=r.next()).done);a=true){n.push(s.value)
if(e&&n.length===e)break}}catch(t){i=true
o=t}finally{try{if(!a&&r["return"]!=null)r["return"]()}finally{if(i)throw o}}return n}function f(t){if(Array.isArray(t))return t}var v={props:["title","items","selectedID"],data:function t(){return{index:0}},watch:{selectedID:function t(){this.selectItemWithID(this.selectedID)}},mounted:function t(){this.selectItemWithID(this.selectedID)},methods:{getTitle:function t(){return this.getSelectedItem().title},menuClick:function t(e,n){this.$emit("menu-selected",e)},selectItemWithID:function t(e){var n=true
var a=false
var i=undefined
try{for(var o=this.items.entries()[Symbol.iterator](),r;!(n=(r=o.next()).done);n=true){var s=c(r.value,2),l=s[0],u=s[1]
if(e===u.id){this.index=l
break}}}catch(t){a=true
i=t}finally{try{if(!n&&o["return"]!=null){o["return"]()}}finally{if(a){throw i}}}},getSelectedItem:function t(){if(this.items&&this.items.length>0){return this.items[this.index]}return{title:"--",id:""}}}}
var p=v
var h=n(1006)
var g=n(4)
var m=Object(g["a"])(p,s,l,false,null,"7c745d68",null)
var b=m.exports
var y=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"menu-button-main"},[n("div",[t._v("\n    "+t._s(t.title)+":\n  ")]),t._v(" "),n("v-menu",{attrs:{"offset-y":""}},[n("v-btn",{staticClass:"custom-menu-button",attrs:{slot:"activator",flat:"",color:"primary"},slot:"activator"},[n("div",[t._v(t._s(t.getTitle()))]),t._v(" "),n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},[t._l(t.assets,function(e){return n("v-list-tile",{key:e.symbol+e.issuer,on:{click:function(n){return t.menuClick(e)}}},[n("div",[t._v(t._s(e.symbol))])])}),t._v(" "),n("v-list-tile",{staticClass:"edit-assets-item",on:{click:function(e){t.assetDialogPing=!t.assetDialogPing}}},[n("div",[t._v("Edit Assets...")])])],2)],1),t._v(" "),n("div",{staticClass:"button-issuer"},[t._v(t._s(t.getIssuer()))]),t._v(" "),n("assets-dialog",{attrs:{ping:t.assetDialogPing}})],1)}
var x=[]
var k=n(44)
var w=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"asset-contents"},[n("div",{staticClass:"asset-text"},[n("div",[t._v("Edit assets so they are available in the popup menu.")])]),t._v(" "),n("div",{staticClass:"asset-contents-inner"},[n("v-combobox",{attrs:{"hide-details":"",items:t.assets,"item-value":"symbol","item-text":"symbol","return-object":"",clearable:"",label:"Symbol",autocomplete:"","max-height":"600"},on:{input:t.typingSymbol},model:{value:t.selectedAssetModel,callback:function(e){t.selectedAssetModel=e},expression:"selectedAssetModel"}}),t._v(" "),n("v-text-field",{attrs:{"hide-details":"",label:"Issuer"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.addAsset()}},model:{value:t.issuer,callback:function(e){t.issuer=typeof e==="string"?e.trim():e},expression:"issuer"}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-btn",{attrs:{slot:"activator",round:"",color:"secondary"},on:{click:function(e){return t.deleteAsset()}},slot:"activator"},[t._v("Delete Asset")]),t._v(" "),n("v-btn",{attrs:{slot:"activator",round:"",color:"primary"},on:{click:function(e){return t.addAsset()}},slot:"activator"},[t._v("Add Asset")])],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"data-dialog",bottom:false,top:true}})],1)],1)])}
var _=[]
var A=n(12)
var S=n(7)
function T(t){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){T=function t(e){return typeof e}}else{T=function t(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}}return T(t)}var C={props:["ping"],components:{"dialog-titlebar":S["DialogTitleBar"],"toast-component":A["a"]},data:function t(){return{visible:false,title:"Edit Assets",issuer:"",symbol:"",assets:[],selectedAssetModel:null}},watch:{ping:function t(){this.visible=true
this.clearValues()}},mounted:function t(){var e=this
this.assets=k["a"].assets()
o["a"].vue().$on("assets-updated",function(){e.assets=k["a"].assets()})},methods:{clearValues:function t(){this.issuer=""
this.symbol=""
this.selectedAssetModel=null},typingSymbol:function t(e){if(e&&T(e)==="object"){this.symbol=e.symbol
this.issuer=e.issuer}else{this.symbol=e}},deleteAsset:function t(){var e=k["a"].deleteAsset({symbol:this.symbol,issuer:this.issuer})
if(e){this.displayToast("Deleted")
this.clearValues()}else{this.displayToast("Failed",true)}},addAsset:function t(){var e=k["a"].addAsset({symbol:this.symbol,issuer:this.issuer})
if(e){this.displayToast("Added")
this.clearValues()}else{this.displayToast("Failed",true)}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"data-dialog")}}}
var P=C
var L=n(1008)
var D=Object(g["a"])(P,w,_,false,null,"835df1bc",null)
var O=D.exports
var M=n(35)
var E={symbol:"XLM",issuer:""}
var K={props:["title","model"],data:function t(){return{selectedItem:E,assetDialogPing:false,assets:[]}},components:{"assets-dialog":O},mounted:function t(){var e=this
this.refreshAssets()
o["a"].vue().$on("assets-updated",function(){e.refreshAssets()})},methods:{refreshAssets:function t(){this.assets=k["a"].assets()
this.assets.unshift(E)},getTitle:function t(){if(this.model.asset){return this.model.asset.getCode()}return""},getIssuer:function t(){if(this.model.asset){return this.model.asset.getIssuer()}return""},menuClick:function t(e){if(o["a"].strOK(e.issuer)){this.model.asset=new M.Asset(e.symbol,e.issuer)}else{this.model.asset=M.Asset["native"]()}}}}
var I=K
var j=n(1010)
var B=Object(g["a"])(I,y,x,false,null,"0c15074c",null)
var F=B.exports
var W=n(6)
var z=n(35)
var N=n(1012)
var V={props:["model","showSource","showDest","showSigner","showAmount","showNumberValue","showAsset","showAccountName","showSecret","showNameValue","showManageOffer","showBuyingAsset","showSellingAsset","showBuyOffer","showTextValue","showAuthFlags","showTimeLock","showFunding","showSymbol"],mixins:[r["a"]],components:{MenuButton:b,AssetPopup:F},data:function t(){return{destType:"account",destPublicKey:"",sourceType:"account",signerType:"none",fundingType:"none",secretType:"secret",showSecretText:false,ledgerAPI:null,buySendMax:0,buyAmount:0,buyUnit:100,sellUnit:1,destPublicKeyList:"",destPaymentsType:"10",destKeysAndMemosList:"",authRequired:false,authRevocable:false,trustBtcEthFlag:true,timeLockEnabled:false,timeLockModal:false,timeLockDate:"",destPaymentsMenuItems:[{id:"1",title:"1"},{id:"2",title:"2"},{id:"3",title:"3"},{id:"10",title:"10"},{id:"50",title:"50"}],destMenuItems:[{id:"publicKey",title:"Public key"},{id:"account",title:"Account"},{id:"ledger",title:"Ledger Nano"},{id:"publicKeyList",title:"Public key list"},{id:"keysAndMemosList",title:"Keys and Memos CSV"}],sourceMenuItems:[{id:"account",title:"Account"},{id:"ledger",title:"Ledger Nano"}],secretMenuItems:[{id:"secret",title:"Secret key"},{id:"public",title:"Public key"}],signerMenuItems:[{id:"none",title:"None"},{id:"account",title:"Account"},{id:"ledger",title:"Ledger Nano"}],fundingMenuItems:[{id:"none",title:"None"},{id:"account",title:"Account"},{id:"ledger",title:"Ledger Nano"}]}},methods:{adjustSetting:function t(e){switch(e){case"destType":if(this.destType==="ledger"){this.sourceType="account"
this.fundingType="none"
this.signerType="none"}break
case"sourceType":if(this.sourceType==="ledger"){this.destType="publicKey"
this.fundingType="none"
this.signerType="none"}break
case"fundingType":if(this.fundingType==="ledger"){this.destType="publicKey"
this.sourceType="account"
this.signerType="none"}break
case"signerType":if(this.signerType==="ledger"){this.fundingType="none"}break
default:break}},enterKeyDown:function t(){this.$emit("enter-key-down")},destMenuSelected:function t(e){this.destType=e.id
this.adjustSetting("destType")},destPaymentsMenuSelected:function t(e){this.destPaymentsType=e.id},sourceMenuSelected:function t(e){this.sourceType=e.id
this.adjustSetting("sourceType")},signerMenuSelected:function t(e){this.signerType=e.id
this.adjustSetting("signerType")},secretMenuSelected:function t(e){this.secretType=e.id},fundingMenuSelected:function t(e){this.fundingType=e.id
this.adjustSetting("fundingType")},sharedLegerAPI:function t(){if(!this.ledgerAPI){this.ledgerAPI=new W["LedgerAPI"]}return this.ledgerAPI},accountName:function t(){if(o["a"].strOK(this.model.accountName)){return this.model.accountName}this._displayToast("Please enter an account name.",true)
o["a"].debugLog("Please enter an account name","Error")
return""},sourceWallet:function t(){var e=this
var n=null
switch(this.sourceType){case"ledger":n=W["StellarWallet"].ledger(this.sharedLegerAPI(),function(){e._displayToast("Confirm on your Ledger Nano")})
break
case"account":if(this._sourceValid()){n=W["StellarWallet"].secret(this.model.sourceAccount.secret)}else if(this._sourceValid(false)){n=W["StellarWallet"]["public"](this.model.sourceAccount.publicKey)}break
default:break}if(!n){this._displayToast("Please select a source account",true)
o["a"].debugLog("Please select a source account","Error")}return n},destWallet:function t(){var e=this
var n=null
switch(this.destType){case"ledger":n=W["StellarWallet"].ledger(this.sharedLegerAPI(),function(){e._displayToast("Confirm on your Ledger Nano")})
break
case"publicKey":if(o["a"].strOK(this.destPublicKey)){n=W["StellarWallet"]["public"](this.destPublicKey)}else{this._displayToast("Please paste in a destination public key",true)}break
case"account":if(this._destValid()){n=W["StellarWallet"].secret(this.model.destAccount.secret)}else if(this._destValid(false)){n=W["StellarWallet"]["public"](this.model.destAccount.publicKey)}break
case"keysAndMemosList":{var a=this.parseKeysAndMemos()
if(a.length>0){var i=a[0].key
if(o["a"].strOK(i)){n=W["StellarWallet"]["public"](i)}}}break
case"publicKeyList":{var r=this.parseDestKeys()
if(r.length>0){var s=r[0]
if(o["a"].strOK(s)){n=W["StellarWallet"]["public"](s)}}}break
default:break}if(!n){this._displayToast("Please select a destination account",true)
o["a"].debugLog("Please select a destination account","Error")}return n},destPaymentsBatchSize:function t(){return parseInt(this.destPaymentsType)},parseDestKeys:function t(){if(o["a"].strOK(this.destPublicKeyList)){var e=this.destPublicKeyList.split(/\s*[\s,]\s*/).filter(function(t){return t.trim().length>0})
return e}return[]},parseKeysAndMemos:function t(){var e=[]
if(o["a"].strOK(this.destKeysAndMemosList)){var n=N(this.destKeysAndMemosList,{columns:["key","memo"],skip_empty_lines:true})
if(n&&n.length>0){e=e.concat(n)}}return e},destPublicKeys:function t(){if(this.destType==="publicKeyList"){if(o["a"].strOK(this.destPublicKeyList)){var e=this.parseDestKeys()
return e}}return[]},destKeysAndMemos:function t(){if(this.destType==="keysAndMemosList"){var e=this.parseKeysAndMemos()
return e}return[]},signerWallet:function t(){var e=this
var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var a=null
switch(this.signerType){case"ledger":a=W["StellarWallet"].ledger(this.sharedLegerAPI(),function(){e._displayToast("Confirm on your Ledger Nano")})
break
case"account":if(this._signerValid()){a=W["StellarWallet"].secret(this.model.signerAccount.secret)}break
default:break}if(!a&&n){this._displayToast("Please select a signing account",true)
o["a"].debugLog("Please select a signing account","Error")}return a},fundingWallet:function t(){var e=this
var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var a=null
switch(this.fundingType){case"ledger":a=W["StellarWallet"].ledger(this.sharedLegerAPI(),function(){e._displayToast("Confirm on your Ledger Nano")})
break
case"account":if(this._fundingValid()){a=W["StellarWallet"].secret(this.model.fundingAccount.secret)}break
default:break}if(!a&&n){this._displayToast("Please select a funding account",true)
o["a"].debugLog("Please select a funding account","Error")}return a},textValue:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var n=this.model.textValue
if(!o["a"].strOK(n)&&e){this._displayToast("Please fill out all fields",true)
o["a"].debugLog("Please fill out all fields","Error")}return n},numberValue:function t(){var e=this.model.numberValue
return e},symbol:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var n=this.model.symbol
if(e&&!o["a"].strOK(n)){this._displayToast("Please type a symbol",true)
o["a"].debugLog("Please type a symbol","Error")}return n},nameValue:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var n=this.model.nameValueOneValue
var a=this.model.nameValueTwoValue
if(e&&!o["a"].strOK(n)){this._displayToast("Please fill out all fields",true)
o["a"].debugLog("Please fill out all fields","Error")}return{name:n,value:a}},amount:function t(){return this.model.assetAmount},timeLock:function t(){if(this.timeLockEnabled){return new Date(this.timeLockDate)}return null},authFlags:function t(){var e=0
if(this.authRequired){e|=z.AuthRequiredFlag}if(this.authRevocable){e|=z.AuthRevocableFlag}return e},trustBtcEth:function t(){return this.trustBtcEthFlag},secretKey:function t(){if(this.secretType==="secret"){if(o["a"].strOK(this.model.secretKey)){return this.model.secretKey}this._displayToast("Please enter a secret key",true)
o["a"].debugLog("Please enter a secret key","Error")}return""},publicKey:function t(){if(this.secretType==="public"){if(o["a"].strOK(this.model.publicKey)){return this.model.publicKey}this._displayToast("Please enter a public key",true)
o["a"].debugLog("Please enter a public key","Error")}return""},asset:function t(){return this.model.getAsset()},manageOffer:function t(){var e=false
if(this.model.sellAmount>0&&this.buyUnit>0&&this.sellUnit>0){e=true}if(e){return{buyingAsset:this.model.getBuyingAsset(),sellingAsset:this.model.getSellingAsset(),sellingAmount:this.model.sellAmount,buyUnit:this.buyUnit,sellUnit:this.sellUnit}}this._displayToast("Please fill in all the fields",true)
o["a"].debugLog("Please fill in all the fields","Error")
return null},buyOffer:function t(){var e=false
if(this.buySendMax>0&&this.buyAmount>0){e=true}if(e){return{buyingAsset:this.model.getBuyingAsset(),sellingAsset:this.model.getSellingAsset(),buySendMax:this.buySendMax,buyAmount:this.buyAmount}}this._displayToast("Please fill in all the fields",true)
o["a"].debugLog("Please fill in all the fields","Error")
return null},_destValid:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true
var n=null
if(e){n=this.model.destAccount?this.model.destAccount.secret:null}else{n=this.model.destAccount?this.model.destAccount.publicKey:null}if(o["a"].strOK(n)){return true}return false},_signerValid:function t(){var e=this.model.signerAccount?this.model.signerAccount.secret:null
if(o["a"].strOK(e)){return true}return false},_sourceValid:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true
var n=null
if(e){n=this.model.sourceAccount?this.model.sourceAccount.secret:null}else{n=this.model.sourceAccount?this.model.sourceAccount.publicKey:null}if(o["a"].strOK(n)){return true}return false},_fundingValid:function t(){var e=this.model.fundingAccount?this.model.fundingAccount.secret:null
if(o["a"].strOK(e)){return true}return false},_displayToast:function t(e,n){this.$emit("toast",e,n)}}}
var $=V
var R=n(1015)
var H=Object(g["a"])($,a,i,false,null,"ba5ff912",null)
var U=e["a"]=H.exports},190:function(t,e,n){var a=n(1009)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("fd37f0f4",a,true,{})},191:function(t,e,n){var a=n(1011)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("7cef2605",a,true,{})},192:function(t,e,n){var a=n(1016)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("765d707e",a,true,{})},193:function(t,e,n){var a=n(1018)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("1951536d",a,true,{})},194:function(t,e,n){var a=n(1020)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("05001318",a,true,{})},195:function(t,e,n){var a=n(1022)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("d997ae5c",a,true,{})},196:function(t,e,n){var a=n(1024)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("1f5a093a",a,true,{})},197:function(t,e,n){var a=n(1026)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("8f8b9870",a,true,{})},198:function(t,e,n){var a=n(1028)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("d7b89dd0",a,true,{})},199:function(t,e,n){var a=n(1030)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("05f14a32",a,true,{})},2:function(t,e,n){"use strict"
var a=n(11)
var i=n(223)
var o=n(0)
var r=n(6)
var s=n.n(r)
var l=n(80)
var c=n.n(l)
function u(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function d(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function f(t,e,n){if(e)d(t.prototype,e)
if(n)d(t,n)
return t}var v=n(35)
var p=function(){function t(){var e=this
u(this,t)
this.s=new i["a"]
o["a"].vue().$on("settings-updated",function(t){if(t==="server"){e.updateBalances()}})
setTimeout(function(){e.updateBalances()},500)
this.vars={}}f(t,[{key:"server",value:function t(){return this.s.server()}},{key:"isTestnet",value:function t(){return this.s.isTestnet()}},{key:"lumins",value:function t(){return v.Asset["native"]()}},{key:"assetFromObject",value:function t(e){if(!e.asset_issuer){return v.Asset["native"]()}return new v.Asset(e.asset_code,e.asset_issuer)}},{key:"api",value:function t(){return this.s.serverAPI()}},{key:"horizonMetrics",value:function t(){return this.api().horizonMetrics()}},{key:"accountInfo",value:function t(e){return this.api().accountInfo(e)}},{key:"paths",value:function t(e,n,a,i){return this.api().paths(e,n,a,i).call()}},{key:"balances",value:function t(e){return this.api().balances(e)}},{key:"manageData",value:function t(e,n,a,i){var o=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null
return this.api().manageData(e,n,a,i,o)}},{key:"mergeAccount",value:function t(e,n){return this.api().mergeAccount(e,n)}},{key:"manageOffer",value:function t(e,n,a,i,o,r){var s=arguments.length>6&&arguments[6]!==undefined?arguments[6]:0
return this.api().manageOffer(e,n,a,i,o,r,s)}},{key:"changeTrust",value:function t(e,n,a,i){return this.api().changeTrust(e,n,a,i)}},{key:"allowTrust",value:function t(e,n,a,i){var o=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null
return this.api().allowTrust(e,n,a,i,o)}},{key:"setDomain",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var i=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null
return this.api().setDomain(e,n,a,i)}},{key:"makeMultiSig",value:function t(e,n,a,i){return this.api().makeMultiSig(e,n,a,i)}},{key:"removeMultiSig",value:function t(e,n,a){return this.api().removeMultiSig(e,n,a)}},{key:"removeMultiSigTransaction",value:function t(e,n,a){return this.api().removeMultiSigTransaction(e,n,a)}},{key:"submitTransaction",value:function t(e){return this.api().submitTransaction(e)}},{key:"sendAsset",value:function t(e,n,a,i){var o=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null
var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:null
var s=arguments.length>6&&arguments[6]!==undefined?arguments[6]:null
return this.api().sendAsset(e,n,a,i,o,r,s)}},{key:"sendAssetBatch",value:function t(e,n,a,i){var o=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null
var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:null
var s=arguments.length>6&&arguments[6]!==undefined?arguments[6]:null
return this.api().sendAssetBatch(e,n,a,i,o,r,s)}},{key:"buyTokens",value:function t(e,n,a,i,o){var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:null
var s=arguments.length>6&&arguments[6]!==undefined?arguments[6]:null
return this.api().buyTokens(e,n,a,i,o,r,s)}},{key:"lockAccount",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var i=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null
return this.api().lockAccount(e,n,a,i)}},{key:"createAccount",value:function t(e,n,a){return this.api().createAccount(e,n,a)}},{key:"setOptions",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var i=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null
return this.api().setOptions(e,n,a,i)}},{key:"setFlags",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var i=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null
return this.api().setFlags(e,n,a,i)}},{key:"clearFlags",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var i=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null
return this.api().clearFlags(e,n,a,i)}},{key:"setInflationDestination",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var i=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null
return this.api().setInflationDestination(e,n,a,i)}},{key:"newAccount",value:function t(e,n){var i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null
var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null
var l=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null
var c
if(o["a"].strOK(l)){c=v.Keypair.fromSecret(l)}else{c=v.Keypair.random()}o["a"].debugLog("creating account...")
o["a"].debugLog(c.publicKey())
o["a"].debugLog(c.secret())
var u=a["a"].addAccount(c,i,s)
return this.createAccount(e,r["StellarWallet"].secret(c.secret()),n).then(function(t){return{account:t,keypair:c,accountRec:u}})["catch"](function(t){a["a"].deleteAccount(c.publicKey())
throw t})}},{key:"deleteOffers",value:function t(e){var n=this
if(e){o["a"].debugLog("Deleting Offers...")
return e.publicKey().then(function(t){n.server().offers("accounts",t).call().then(function(t){var a=Promise.resolve()
var i=true
var o=false
var r=undefined
try{var s=function t(){var i=c.value
a=a.then(function(){var t=n.assetFromObject(i.buying)
var a=n.assetFromObject(i.selling)
return n.manageOffer(e,null,t,a,"0",i.price_r,i.id)})}
for(var l=t.records[Symbol.iterator](),c;!(i=(c=l.next()).done);i=true){s()}}catch(t){o=true
r=t}finally{try{if(!i&&l["return"]!=null){l["return"]()}}finally{if(o){throw r}}}return a}).then(function(t){o["a"].debugLog("Deleted all offers","Success")
n.updateBalances()
return null})})}else{return Promise.reject()}}},{key:"newAccountWithTokens",value:function t(e,n,a,i,s){var l=this
var c=arguments.length>5&&arguments[5]!==undefined?arguments[5]:null
var u=arguments.length>6&&arguments[6]!==undefined?arguments[6]:null
var d=arguments.length>7&&arguments[7]!==undefined?arguments[7]:null
var f=null
var v=null
var p=n
if(e){p=e}return this.newAccount(p,a,c,u).then(function(t){f=t
v=r["StellarWallet"].secret(f.keypair.secret())
var n=1e11
o["a"].debugLog("setting trust...")
return l.changeTrust(v,e,i,String(n)).then(function(){if(d){o["a"].debugLog("Allow trust...")
return l.allowTrust(d,v,i,true,e).then(function(){return null})["catch"](function(){o["a"].debugLog("Allow trust was not necessary, continuing...")
return null})}return null})}).then(function(){o["a"].debugLog("sending tokens...")
return l.sendAsset(n,e,v,s,i)}).then(function(t){l.updateBalances()
return f})}},{key:"displayLedgerInfo",value:function t(){var e=this
var n=r["StellarWallet"].ledger(new r["LedgerAPI"])
n.publicKey().then(function(t){return e.api().accountInfo(t)}).then(function(t){o["a"].debugLog(t)})["catch"](function(t){o["a"].debugLog(t,"Error")
o["a"].toast("Error",true)})}},{key:"sendTestnetXLMToLedger",value:function t(){var e=this
o["a"].debugLog("refilling ledger...")
var n=r["StellarWallet"].ledger(new r["LedgerAPI"],function(){o["a"].toast("Confirm transaction on Ledger Nano")})
var a
n.publicKey().then(function(t){a=t
return e.accountInfo(t)}).then(function(t){var a=v.Keypair.random()
var i="https://friendbot.stellar.org"+"?addr="+encodeURIComponent(a.publicKey())
return c.a.get(i).then(function(t){o["a"].debugLog(t,"Success")
return e.mergeAccount(r["StellarWallet"].secret(a.secret()),n)}).then(function(){o["a"].toast("Testnet XLM added to your Ledger!")})["catch"](function(t){o["a"].debugLog(t,"Error")
o["a"].toast("Error!",true)})})["catch"](function(){o["a"].debugLog("Account doesn't exist, asking friendbot for help.")
var t="https://friendbot.stellar.org"+"?addr="+a
return c.a.get(t)}).then(function(t){o["a"].debugLog(t)
o["a"].toast("Testnet XLM added to your Ledger!")})}},{key:"createTestAccount",value:function t(){var e=this
var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null
if(!this.vars.syncPromise){this.vars.syncPromise=Promise.resolve()}var a=this.vars.syncPromise.then(function(){return e.createTestAccountFriendBot(n)})
this.vars.syncPromise=a
return a}},{key:"createTestAccountFriendBot",value:function t(){var e=this
var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null
var i=v.Keypair.random()
var r=a["a"].addAccount(i,n)
var s="https://horizon-testnet.stellar.org/friendbot"
var l=s+"?addr="+i.publicKey()
return c.a.get(l).then(function(t){o["a"].debugLog(t,"Success")
e.updateBalances()
return r})["catch"](function(t){o["a"].debugLog(t,"Error")
o["a"].toast("Friendbot must be down again!",true)
a["a"].deleteAccount(r.publicKey)
throw t})}},{key:"updateBalances",value:function t(){var e=this
var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var i=true
var s=false
var l=undefined
try{var c=function t(){var i=d.value
var s=i.publicKey
e.balances(r["StellarWallet"]["public"](s)).then(function(t){var e=true
var i=true
var r=false
var l=undefined
try{for(var c=t[Symbol.iterator](),u;!(i=(u=c.next()).done);i=true){var d=u.value
a["a"].updateBalance(s,d,e)
e=false}}catch(t){r=true
l=t}finally{try{if(!i&&c["return"]!=null){c["return"]()}}finally{if(r){throw l}}}if(n){o["a"].debugLog(s,"Success")}return null})["catch"](function(t){a["a"].updateBalance(s,null,true)
o["a"].debugLog(t,"Error")})}
for(var u=a["a"].accounts()[Symbol.iterator](),d;!(i=(d=u.next()).done);i=true){c()}}catch(t){s=true
l=t}finally{try{if(!i&&u["return"]!=null){u["return"]()}}finally{if(s){throw l}}}}},{key:"operationsForWallet",value:function t(e){var n=this
var a=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"desc"
e.publicKey().then(function(t){n.server().operations().forAccount(t).order(a).call().then(function(t){o["a"].debugLog(t)})})["catch"](function(t){o["a"].debugLog(t,"Error")
o["a"].toast("Error",true)})}},{key:"paymentsForWallet",value:function t(e){var n=this
var a=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"desc"
e.publicKey().then(function(t){n.server().payments().forAccount(t).order(a).call().then(function(t){o["a"].debugLog(t)})})["catch"](function(t){o["a"].debugLog(t,"Error")
o["a"].toast("Error",true)})}},{key:"transactionsForWallet",value:function t(e){var n=this
var a=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"desc"
e.publicKey().then(function(t){n.server().transactions().forAccount(t).order(a).call().then(function(t){o["a"].debugLog(t)})})["catch"](function(t){o["a"].debugLog(t,"Error")
o["a"].toast("Error",true)})}},{key:"effectsForWallet",value:function t(e){var n=this
var a=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"desc"
e.publicKey().then(function(t){n.server().effects().forAccount(t).order(a).call().then(function(t){o["a"].debugLog(t)})})["catch"](function(t){o["a"].debugLog(t,"Error")
o["a"].toast("Error",true)})}}])
return t}()
var h=new p
Object.freeze(h)
e["a"]=h},200:function(t,e,n){var a=n(1033)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("1b618fee",a,true,{})},201:function(t,e,n){var a=n(1035)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("4e7b381e",a,true,{})},202:function(t,e,n){var a=n(1037)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("538007a9",a,true,{})},203:function(t,e,n){var a=n(1039)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("2c929043",a,true,{})},204:function(t,e,n){var a=n(1041)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("28c65800",a,true,{})},205:function(t,e,n){var a=n(1043)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("46bc9b52",a,true,{})},206:function(t,e,n){var a=n(1045)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("f1ea853c",a,true,{})},207:function(t,e,n){var a=n(1047)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("fa62cc12",a,true,{})},208:function(t,e,n){var a=n(1049)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("116cdcce",a,true,{})},209:function(t,e,n){var a=n(1051)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("c88c495e",a,true,{})},21:function(t,e,n){"use strict"
var a=n(0)
function i(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function o(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function r(t,e,n){if(e)o(t.prototype,e)
if(n)o(t,n)
return t}var s=n(909)
var l=function(){function t(){i(this,t)}r(t,null,[{key:"init",value:function t(){var e=this
this.memoryStore={}
this.ready=false
return new Promise(function(t,n){var a=[]
s.iterate(function(t,n){e.memoryStore[n]=t
a.push(e.normalizeKey(n))}).then(function(){e.ready=true
f.notify(a)
t()})["catch"](function(t){n(t)})})}},{key:"get",value:function t(e){var n
if(!this.ready){console.log("called get before ready: "+e)}else{n=this.memoryStore[this.keyForKey(e)]
if(n instanceof Array){n=n.slice()}else if(n instanceof Object){n=Object.assign({},n)}}return n}},{key:"keyForKey",value:function t(e){return"pref-"+e}},{key:"normalizeKey",value:function t(e){if(e.startsWith("pref-")){return e.substr("pref-".length)}return e}},{key:"set",value:function t(e,n){if(!this.ready){console.log("called set before ready: "+e)}else{if(!this.isEqual(this.memoryStore[this.keyForKey(e)],n)){var a=n
if(a instanceof Array){a=a.slice()}else if(a instanceof Object){a=Object.assign({},a)}this.memoryStore[this.keyForKey(e)]=a
f.notify([e])
s.setItem(this.keyForKey(e),a)["catch"](function(t){console.log(JSON.stringify(t))})}}}},{key:"isEqual",value:function t(e,n){if(e instanceof Array&&n instanceof Array){return e.length===n.length&&e.every(function(t,e){return JSON.stringify(t)===JSON.stringify(n[e])})}return e===n}}])
return t}()
n.d(e,"a",function(){return f})
function c(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function u(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function d(t,e,n){if(e)u(t.prototype,e)
if(n)u(t,n)
return t}var f=function(){function t(){c(this,t)}d(t,null,[{key:"setup",value:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null
this.storage=e
return l.init()}},{key:"get",value:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined
var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false
var i
if(a&&this.storage){i=this.storage.get(e,n)}else{i=l.get(e)}if(i===undefined&&n!==undefined){i=n}return i}},{key:"set",value:function t(e,n){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false
if(a&&this.storage){this.storage.set(e,n)}else{l.set(e,n)}}},{key:"notify",value:function t(e){var n=true
var i=false
var o=undefined
try{for(var r=e[Symbol.iterator](),s;!(n=(s=r.next()).done);n=true){var l=s.value
a["a"].emit("settings-updated",l)}}catch(t){i=true
o=t}finally{try{if(!n&&r["return"]!=null){r["return"]()}}finally{if(i){throw o}}}}}])
return t}()},210:function(t,e,n){var a=n(1053)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("8a6da966",a,true,{})},211:function(t,e,n){var a=n(1055)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("bec72a8a",a,true,{})},212:function(t,e,n){var a=n(1057)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("190e81fa",a,true,{})},213:function(t,e,n){var a=n(1059)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("fa10b9b4",a,true,{})},214:function(t,e,n){var a=n(1061)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("29b97872",a,true,{})},215:function(t,e,n){var a=n(1063)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("7915e6c6",a,true,{})},216:function(t,e,n){var a=n(1065)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("1b623923",a,true,{})},217:function(t,e,n){var a=n(1067)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("e281f980",a,true,{})},218:function(t,e,n){var a=n(1069)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("70b0cced",a,true,{})},219:function(t,e,n){var a=n(1071)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("db963400",a,true,{})},220:function(t,e,n){var a=n(1073)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("2a1fdff4",a,true,{})},221:function(t,e,n){var a=n(1075)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("50a7a7fe",a,true,{})},222:function(t,e,n){var a=n(1077)
if(typeof a==="string")a=[[t.i,a,""]]
if(a.locals)t.exports=a.locals
var i=n(10).default
var o=i("fb4856fa",a,true,{})},223:function(t,e,n){"use strict"
n.d(e,"a",function(){return u})
var a=n(0)
var i=n(21)
var o=n(6)
var r=n.n(o)
function s(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function l(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function c(t,e,n){if(e)l(t.prototype,e)
if(n)l(t,n)
return t}var u=function(){function t(){var e=this
s(this,t)
this.serverChanged=true
a["a"].vue().$on("settings-updated",function(t){if(t==="server"){e.serverChanged=true}})}c(t,[{key:"server",value:function t(){this._setupServer()
return this._horizon.server()}},{key:"isTestnet",value:function t(){this._setupServer()
return this._horizon.isTestnet()}},{key:"serverAPI",value:function t(){this._setupServer()
return this._serverAPI}},{key:"serverURL",value:function t(){this._setupServer()
return this._horizon.serverURL()}},{key:"_setupServer",value:function t(){if(this.serverChanged){this.serverChanged=false
var e=i["a"].get("server","testnet")
if(this._serverKey!==e){this._horizon=this._createHorizonServer(e)
this._serverKey=e
this._serverAPI=new o["StellarAPI"](this._horizon)}}}},{key:"_createHorizonServer",value:function t(e){var n
switch(e){case"testnet":n=new o["HorizonServer"]("https://horizon-testnet.stellar.org",true)
break
case"mainnet":n=new o["HorizonServer"]("https://horizon.stellar.org",false)
break
case"local":n=new o["HorizonServer"]("http://localhost:8000",true,{allowHttp:true})
break
case"stellarkit":n=new o["HorizonServer"]("https://stellarkit.io:8000",true)
break
default:console.log("ERROR: switch failed")
break}return n}}])
return t}()},224:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",persistent:"",scrollable:"","max-width":"400"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"confirm-dialog-contents"},[n("div",{staticClass:"main-message"},[t._v("\n        "+t._s(t.message)+"\n      ")]),t._v(" "),n("v-checkbox",{attrs:{label:"I understand"},model:{value:t.confirmed,callback:function(e){t.confirmed=e},expression:"confirmed"}}),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:""},on:{click:function(e){t.visible=false}},slot:"activator"},[t._v("Cancel")]),t._v(" "),n("span",[t._v("Cancel")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"error",disabled:!t.confirmed},on:{click:function(e){return t.buttonClick("ok")}},slot:"activator"},[t._v(t._s(t.okTitle))]),t._v(" "),n("span",[t._v("Confirm")])],1)],1)],1)],1)])}
var i=[]
var o=n(7)
var r={props:["ping","title","message","okTitle"],components:{"dialog-titlebar":o["DialogTitleBar"]},data:function t(){return{visible:false,confirmed:false}},watch:{ping:function t(){this.visible=true
this.confirmed=false}},methods:{buttonClick:function t(e){switch(e){case"ok":this.visible=false
this.$emit("confirm-dialog-ok")
break
case"cancel":this.visible=false
break
default:break}}}}
var s=r
var l=n(1019)
var c=n(4)
var u=Object(c["a"])(s,a,i,false,null,"7a95e9bf",null)
var d=e["a"]=u.exports},225:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("You need to trust an asset before you can accept it.")]),t._v(" "),n("div",{staticClass:"sub-header"},[t._v("You'll need the assets symbol and issuing account address. This can be found normally at the https://tokens-home-page/.well-known/stellar.toml")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showNumberValue:true,showSource:true,showFunding:true,showAsset:true},on:{"enter-key-down":t.trustToken,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loading},on:{click:function(e){return t.trustToken()}},slot:"activator"},[t._v("Set Trust")]),t._v(" "),n("span",[t._v("Change's the trust link to the issuer's account")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"trust-token-dialog",bottom:false,top:true}})],1)],1)])}
var i=[]
var o=n(0)
var r=n(7)
var s=n(2)
var l=n(12)
var c=n(19)
var u={props:["ping","model"],components:{"dialog-titlebar":r["DialogTitleBar"],"toast-component":l["a"],"dialog-accounts":c["a"]},data:function t(){return{visible:false,title:"Trust Token",loading:false}},watch:{ping:function t(){this.visible=true
this.model.numberValue=1e6
this.model.numberValueLabel="Trust limit"
this.model.numberValueHint="Set Trust Limit to zero to remove the trust line."}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},trustToken:function t(){var e=this
var n=this.dialogAccounts().asset()
var a=this.dialogAccounts().numberValue()
if(n&&!n.isNative()){var i=this.dialogAccounts().sourceWallet()
var r=this.dialogAccounts().fundingWallet()
if(i){o["a"].debugLog("Setting trust...")
this.loading=true
s["a"].changeTrust(i,r,n,String(a)).then(function(t){o["a"].debugLog(t)
e.loading=false
s["a"].updateBalances()
e.displayToast("Success!")})["catch"](function(t){o["a"].debugLog(t,"Error")
e.loading=false
e.displayToast("Error!",true)})}}else{this.displayToast("Choose another asset. XLM doesn't need trust",true)}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"trust-token-dialog")}}}
var d=u
var f=n(1025)
var v=n(4)
var p=Object(v["a"])(d,a,i,false,null,"15816f03",null)
var h=e["a"]=p.exports},226:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("Enable the destination to hold an asset if auth required is set on the issuer's account.")]),t._v(" "),n("div",{staticClass:"sub-header"},[t._v("\n          Source account is the asset issuer. Destination is the account you would like to enable authorization to hold the issuer's asset.")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:true,showDest:true,showAsset:true,showFunding:true},on:{"enter-key-down":t.allowTrust,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"secondary",loading:t.loadingRevoke},on:{click:function(e){return t.allowTrust(false)}},slot:"activator"},[t._v("Revoke Trust")]),t._v(" "),n("span",[t._v("Allow destination to hold the asset")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loadingTrust},on:{click:function(e){return t.allowTrust(true)}},slot:"activator"},[t._v("Allow Trust")]),t._v(" "),n("span",[t._v("Allow destination to hold the asset")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"trust-token-dialog",bottom:false,top:true}})],1)],1)])}
var i=[]
var o=n(0)
var r=n(7)
var s=n(2)
var l=n(12)
var c=n(19)
var u={props:["ping","model"],components:{"dialog-titlebar":r["DialogTitleBar"],"toast-component":l["a"],"dialog-accounts":c["a"]},data:function t(){return{visible:false,title:"Allow Trust",loadingRevoke:false,loadingTrust:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},allowTrust:function t(e){var n=this
var a=this.dialogAccounts().sourceWallet()
var i=this.dialogAccounts().destWallet()
var r=this.dialogAccounts().fundingWallet()
var l=this.dialogAccounts().asset()
if(a&&i&&l){if(e){o["a"].debugLog("Authorizing trust...")
this.loadingTrust=true}else{o["a"].debugLog("Revoking trust...")
this.loadingRevoke=true}s["a"].allowTrust(a,i,l,e,r).then(function(t){o["a"].debugLog(t)
n.displayToast("Success!")
return null})["catch"](function(t){o["a"].debugLog(t,"Error")
n.displayToast("Error!",true)})["finally"](function(){n.loadingTrust=false
n.loadingRevoke=false})}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"trust-token-dialog")}}}
var d=u
var f=n(1029)
var v=n(4)
var p=Object(v["a"])(d,a,i,false,null,"b7f312ba",null)
var h=e["a"]=p.exports},227:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.editableTransaction,expression:"editableTransaction"}],domProps:{value:t.editableTransaction},on:{input:function(e){if(e.target.composing){return}t.editableTransaction=e.target.value}}}),t._v(" "),n("div",[t._v(t._s(t.statusMessage))]),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"primary",loading:t.loadingTransaction},on:{click:function(e){return t.submitTransaction()}},slot:"activator"},[t._v("Submit")])],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"transaction-dialog",bottom:false,top:true}})],1)],1)])}
var i=[]
var o=n(0)
var r=n(7)
var s=n(23)
var l=n(2)
var c=n(12)
var u=n(35)
var d={props:["ping","transaction"],mixins:[s["a"]],components:{"dialog-titlebar":r["DialogTitleBar"],"toast-component":c["a"]},watch:{transaction:function t(){this.editableTransaction=this.transaction},ping:function t(){this.visible=true
this.statusMessage=""}},data:function t(){return{visible:false,title:"Submit Transaction",loadingTransaction:false,statusMessage:"",editableTransaction:""}},methods:{submitTransaction:function t(){var e=this
if(o["a"].strlen(this.editableTransaction)>0){var n=u.xdr.TransactionEnvelope.fromXDR(this.editableTransaction,"base64")
var a=new u.Transaction(n)
this.loadingTransaction=true
this.statusMessage=""
l["a"].submitTransaction(a).then(function(t){o["a"].debugLog(t)
o["a"].toast("Success",false,"transaction-dialog")
e.loadingTransaction=false
e.statusMessage="Success"
return null})["catch"](function(t){o["a"].debugLog(t)
if(t.data&&t.data.extras&&t.data.extras.result_codes){e.statusMessage="Error: "+t.data.extras.result_codes.transaction}else{e.statusMessage="Error: unknown"}o["a"].toast("Failed: see console",true,"transaction-dialog")
e.loadingTransaction=false})}},displayErrorMessage:function t(e){o["a"].toast(e,true,"transaction-dialog")}}}
var f=d
var v=n(1058)
var p=n(4)
var h=Object(p["a"])(f,a,i,false,null,"54249c38",null)
var g=e["a"]=h.exports},23:function(t,e,n){"use strict"
var a=n(11)
var i=n(0)
e["a"]={data:function t(){return{accountsUI:[],accountsTag:null}},mounted:function t(){var e=this
this.updateAccountsUI()
i["a"].vue().$on("stellar-accounts-updated",this.updateAccountsUI)
i["a"].vue().$on("settings-updated",function(t){if(t==="server"){e.updateAccountsUI()}})},methods:{distributor:function t(){var e=a["a"].accountWithName("Distributor: LMB")
if(e){return e}i["a"].debugLog("Go to the Tokens tab and create a token first.","Error")
return null},issuer:function t(){var e=a["a"].accountWithName("Issuer: LMB")
if(e){return e}i["a"].debugLog("Go to the Tokens tab and create a token first.","Error")
return null},tokenBuyer:function t(){var e=a["a"].accountWithName("Buyer: LMB")
if(e){return e}i["a"].debugLog("Go to the Tokens tab and create a token first.","Error")
return null},setAccountsTag:function t(e){this.accountsTag=e
this.updateAccountsUI()},updateAccountsUI:function t(){var e=this
this.accountsUI=a["a"].accounts()
if(this.accountsTag){this.accountsUI=this.accountsUI.filter(function(t){return t.tag===e.accountsTag})}}}}},36:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("div",{staticClass:"instructions-header"},[n("v-btn",{staticClass:"tiny-button",attrs:{dark:"",flat:""},on:{click:function(e){t.slotVisible=!t.slotVisible}}},[t._v("Help\n      "),n("v-icon",[t._v("")])],1),t._v(" "),n("div",{staticClass:"centered-title"},[t._v("\n      "+t._s(t.pageTitle)+"\n    ")]),t._v(" "),n("div",{staticClass:"experiments-button",on:{click:t.showExperiments}})],1),t._v(" "),t.slotVisible?n("div",{staticClass:"slot-hider"},[t._t("default")],2):t._e()])}
var i=[]
var o=n(0)
var r={data:function t(){return{slotVisible:false}},computed:{pageTitle:function t(){return this.$route.name}},methods:{showExperiments:function t(){o["a"].emit("enable-experiments")}}}
var s=r
var l=n(1042)
var c=n(4)
var u=Object(c["a"])(s,a,i,false,null,"4a623ac3",null)
var d=e["a"]=u.exports},44:function(t,e,n){"use strict"
var a=n(0)
var i=n(21)
var o=n(2)
function r(t,e){return c(t)||l(t,e)||s()}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function l(t,e){var n=[]
var a=true
var i=false
var o=undefined
try{for(var r=t[Symbol.iterator](),s;!(a=(s=r.next()).done);a=true){n.push(s.value)
if(e&&n.length===e)break}}catch(t){i=true
o=t}finally{try{if(!a&&r["return"]!=null)r["return"]()}finally{if(i)throw o}}return n}function c(t){if(Array.isArray(t))return t}function u(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function d(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function f(t,e,n){if(e)d(t.prototype,e)
if(n)d(t,n)
return t}var v=function(){function t(e){u(this,t)
this.prefKey=e}f(t,[{key:"assets",value:function t(){return this._lazyAssets().slice()}},{key:"addAsset",value:function t(e){if(e&&a["a"].strOK(e.symbol)&&a["a"].strOK(e.issuer)){var n=this._indexOfAsset(e)
if(n===-1){this._lazyAssets().push(e)
this._save()
return true}}return false}},{key:"deleteAsset",value:function t(e){var n=this._indexOfAsset(e)
if(n!==-1){this._lazyAssets().splice(n,1)
this._save()
return true}return false}},{key:"_indexOfAsset",value:function t(e){var n=true
var a=false
var i=undefined
try{for(var o=this._lazyAssets().entries()[Symbol.iterator](),s;!(n=(s=o.next()).done);n=true){var l=r(s.value,2),c=l[0],u=l[1]
if(e.issuer===u.issuer&&e.symbol===u.symbol){return c}}}catch(t){a=true
i=t}finally{try{if(!n&&o["return"]!=null){o["return"]()}}finally{if(a){throw i}}}return-1}},{key:"_lazyAssets",value:function t(){if(!this._assets){this._assets=this._load()}return this._assets}},{key:"_load",value:function t(){var e=i["a"].get(this.prefKey)
if(!e){return[]}return e}},{key:"_save",value:function t(){var e=this
a["a"].emit("assets-updated")
if(!this._saving){this._saving=true
setTimeout(function(){e._saving=false
i["a"].set(e.prefKey,e._lazyAssets())},500)}}}])
return t}()
var p=function(){function t(){u(this,t)
this.publicNet=new v("public")
this.testNet=new v("test")
a["a"].vue().$on("settings-updated",function(t){if(t==="server"){a["a"].emit("assets-updated")}})}f(t,[{key:"assets",value:function t(){if(o["a"].isTestnet()){return this.testNet.assets()}return this.publicNet.assets()}},{key:"addAsset",value:function t(e){if(o["a"].isTestnet()){return this.testNet.addAsset(e)}return this.publicNet.addAsset(e)}},{key:"deleteAsset",value:function t(e){if(o["a"].isTestnet()){return this.testNet.deleteAsset(e)}return this.publicNet.deleteAsset(e)}}])
return t}()
var h=new p
e["a"]=h},461:function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return k})
var a=n(37)
var i=n(465)
var o=n(466)
var r=n(469)
var s=n(470)
var l=n(471)
var c=n(467)
var u=n(472)
var d=n(468)
var f=n(473)
var v=n(33)
var p=n.n(v)
var h=n(139)
var g=n(6)
var m=n.n(g)
var b=n(464)
var y=n(306)
a["default"].config.productionTip=false
a["default"].use(y["a"])
var x=new y["a"]({base:t,scrollBehavior:function t(){return{y:0}},routes:[{path:"/",component:o["a"],name:"Home"},{path:"/buytoken",component:r["a"],name:"Buy Token"},{path:"/trades",component:f["a"],name:"Live Stream"},{path:"/ico",component:c["a"],name:"ICO Manager"},{path:"/trust",component:s["a"],name:"Allow Trust"},{path:"/locked",component:l["a"],name:"Locked Tokens"},{path:"/history",component:d["a"],name:"History Viewer"},{path:"/experiments",component:u["a"],name:"Experiments"},{path:"*",redirect:"/"}]})
var k=function t(){if(p()("#app").length>0){new a["default"]({vuetify:b["a"],router:x,render:function t(e){return e(i["a"])}}).$mount("#app")}}}).call(this,"/")},464:function(t,e,n){"use strict"
var a=n(37)
var i=n(474)
a["default"].use(i["a"])
e["a"]=new i["a"]({icons:{iconfont:"mdi"}})},465:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-app",[!t.initializing?n("app-main",{staticClass:"app-wrapper"}):t._e()],1)}
var i=[]
var o=n(21)
var r=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"app-wrapper"},[n("navivation-drawer",{attrs:{ping:t.showNavigation}}),t._v(" "),n("div",{staticClass:"main-container"},[n("header-bar",{attrs:{tabs:t.tabs,networkIndicator:false,homeTitle:"Home"},on:{"show-drawer":t.showDrawer,"show-github":t.showGitHub}}),t._v(" "),n("network-menu"),t._v(" "),n("div",{staticClass:"app-content"},[n("div",{staticClass:"router-container "},[n("keep-alive",[n("router-view")],1)],1),t._v(" "),n("console")],1)],1),t._v(" "),n("toast-component"),t._v(" "),n("disclaimer-dialog",{attrs:{ping:t.disclaimerDialogPing}})],1)}
var s=[]
var l=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-navigation-drawer",{staticClass:"navigation-drawer",attrs:{absolute:"",clipped:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("div",[n("div",{staticClass:"list-header-item",on:{click:function(e){return t.clickItem()}}},[n("div",{staticClass:"title"},[t._v(t._s(t.applicationName))])])]),t._v(" "),n("v-divider"),t._v(" "),n("v-list",t._l(t.items,function(e){return n("v-list-tile",{key:e.title,on:{click:function(n){return t.clickItem(e)}}},[n("div",{staticClass:"list-item-icon"},[n("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),n("v-list-tile-content",[n("div",{staticClass:"list-item-text"},[t._v(t._s(e.title))])])],1)}),1),t._v(" "),n("donate-dialog",{attrs:{ping:t.showDonatePing,donationPublicKey:t.donationPublicKey}}),t._v(" "),n("help-dialog",{attrs:{ping:t.showHelpPing,title:"Help"}}),t._v(" "),n("about-dialog",{attrs:{ping:t.showAboutPing,title:"About"}})],1)}
var c=[]
var u=n(7)
var d=n(0)
var f=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"expansion-contents"},[n("v-expansion-panel",{staticClass:"custom-expansion-panel"},t._l(t.items,function(e,a){return n("v-expansion-panel-content",{key:a,attrs:{value:a===0}},[n("div",{staticClass:"expansion-title",attrs:{slot:"header"},domProps:{innerHTML:t._s(e.title)},slot:"header"}),t._v(" "),n("div",{staticClass:"expansion-message",domProps:{innerHTML:t._s(e.content)}})])}),1)],1)],1)])}
var v=[]
var p={props:["ping","title"],components:{"dialog-titlebar":u["DialogTitleBar"]},data:function t(){return{errorMessage:"",visible:false,items:[]}},watch:{ping:function t(){this.visible=true}},created:function t(){this.items=[{title:"How do I create a Token?",content:"Click the Create Token tab and follow the instructions"},{title:"How do I distribute a time locked token?",content:"Click the Locked Token tab and follow the instructions"}]},methods:{}}
var h=p
var g=n(983)
var m=n(4)
var b=Object(m["a"])(h,f,v,false,null,"78d653e6",null)
var y=b.exports
var x=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"500"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),t.visible?n("div",{staticClass:"main-content"},[n("div",{attrs:{id:"rainbow"}}),t._v(" "),n("div",{staticClass:"contact-info"},[n("a",{attrs:{href:"mailto:steve@distantfutu.re"}},[t._v("steve@distantfutu.re")]),t._v("San Francisco, CA\n      ")]),t._v(" "),n("div",{staticClass:"initials-text"},[n("a",{attrs:{href:"https://tripping.tech",target:"_blank"}},[t._v("LSD")])])]):t._e()],1)])}
var k=[]
var w=n(73)
var _=n(33)
var A=n.n(_)
var S={props:["ping","title"],components:{"dialog-titlebar":u["DialogTitleBar"]},data:function t(){return{errorMessage:"",visible:false,items:[],rainbowTimeline:null,flasher:null}},watch:{ping:function t(){var e=this
this.visible=true
this.$nextTick(function(){e.animate()})}},methods:{byte2Hex:function t(e){var n="0123456789ABCDEF"
return String(n.substr(e>>4&15,1))+n.substr(e&15,1)},rainbowColor:function t(){var e=[]
var n=.2
for(var a=0;a<32;++a){var i=Math.sin(n*a+0)*127+128
var o=Math.sin(n*a+2)*127+128
var r=Math.sin(n*a+4)*127+128
i*=.4
o*=.4
r*=.8
e.push("#"+this.byte2Hex(i)+this.byte2Hex(o)+this.byte2Hex(r))}return e},shadowString:function t(e){var n=this.rainbowColor()
var t=""
for(var a=0;a<n.length;a++){var i=a+e
if(i<0){i+=n.length}if(i>=n.length){i-=n.length}var o=(a+1)*8
t+=t.length>0?", ":""
t+="0 0 0 "+o+"px "+n[i]}return t},animate:function t(){var e=A()("#rainbow")
var n=.5
w["d"].set(e,{boxShadow:this.shadowString(0)})
this.rainbowTimeline=new w["c"]({repeat:-1,repeatdelay:0,yoyo:false})
var a=this.rainbowColor()
for(var i=1;i<=a.length;i++){this.rainbowTimeline.to(e,n,{boxShadow:this.shadowString(-i),ease:w["a"].easeNone},"+=0")}this.flasher=new w["c"]({repeat:-1,repeatdelay:0,yoyo:false}).set(e,{backgroundColor:"rgb(255,255,255)"}).to(e,3,{backgroundColor:"rgb(0,0,0)"},"+=0")}}}
var T=S
var C=n(986)
var P=Object(m["a"])(T,x,k,false,null,"02dc1e38",null)
var L=P.exports
var D={props:["ping"],components:{"donate-dialog":u["PaymentDialog"],"help-dialog":y,"about-dialog":L},watch:{ping:function t(){this.drawer=true}},computed:{applicationName:function t(){return d["a"].applicationName()}},data:function t(){return{showHelpPing:false,showAboutPing:false,showDonatePing:false,drawer:false,donationPublicKey:"GBJC6AF4I5FUTYMG4CXC3V2NYMIQANBRB4UQYY3M2RRZCXCNLFR7TN7J",items:[{id:"about",title:"About",icon:"person"},{id:"donate",title:"Donate",icon:"local_atm"},{id:"help",title:"Help",icon:"help"},{id:"github",title:"Source on Github",icon:"fab fa-github"}]}},methods:{clickItem:function t(e){if(e){switch(e.id){case"donate":this.showDonatePing=!this.showDonatePing
break
case"help":this.showHelpPing=!this.showHelpPing
break
case"about":this.showAboutPing=!this.showAboutPing
break
case"github":d["a"].openBrowser("https://github.com/StellarKit/stellarkit-client-web")
break
default:break}}this.drawer=false}}}
var O=D
var M=n(988)
var E=Object(m["a"])(O,l,c,false,null,"981cd51e",null)
var K=E.exports
var I=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"header-bar"},[n("div",{staticClass:"left-header-bar"},[n("v-btn",{attrs:{icon:"",small:""},on:{click:function(e){return t.clickButton("menu")}}},[n("v-icon",[t._v("")])],1),t._v(" "),n("div",{staticClass:"tab-indicator"},[t._v("\n      "+t._s(t.pageTitle)+"\n    ")])],1),t._v(" "),n("div",{staticClass:"right-header-bar"},[t.networkIndicator?n("div",{staticClass:"network-indicator"},[t.isTestnet?n("v-tooltip",{attrs:{left:""}},[n("div",{staticClass:"testnet",attrs:{slot:"activator"},slot:"activator"}),t._v(" "),n("span",[t._v("Test Network")])]):n("v-tooltip",{attrs:{left:""}},[n("div",{staticClass:"publicnet",attrs:{slot:"activator"},slot:"activator"}),t._v(" "),n("span",[t._v("Public Network")])])],1):n("v-btn",{attrs:{icon:"",small:""},on:{click:function(e){return t.clickButton("github")}}},[n("v-icon",[t._v("fab fa-github")])],1)],1),t._v(" "),n("div",{staticClass:"header-tab-bar"},[n("div",{staticClass:"header-tab-bar-inner"},t._l(t.tabs,function(e){return!e.disabled?n("v-btn",{key:e.path,staticClass:"bar-item",attrs:{icon:"",small:"",to:e.path,exact:"","active-class":"header-active-tab"}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},domProps:{innerHTML:t._s(e.icon)},slot:"activator"}),t._v(" "),n("span",[t._v(t._s(e.tooltip))])],1)],1):t._e()}),1)])])}
var j=[]
var B=n(2)
var F={props:["items","tabs","networkIndicator","homeTitle"],computed:{pageTitle:function t(){if(this.$route.path==="/"){return this.homeTitle}return this.$route.name}},data:function t(){return{isTestnet:true}},mounted:function t(){var e=this
this.isTestnet=B["a"].isTestnet()
d["a"].vue().$on("settings-updated",function(t){if(t==="server"){e.isTestnet=B["a"].isTestnet()}})
d["a"].vue().$on("enable-experiments",function(){var t=true
var n=false
var a=undefined
try{for(var i=e.tabs[Symbol.iterator](),o;!(t=(o=i.next()).done);t=true){var r=o.value
if(r.disabled===true){r.disabled=false}}}catch(t){n=true
a=t}finally{try{if(!t&&i["return"]!=null){i["return"]()}}finally{if(n){throw a}}}})},methods:{clickButton:function t(e){switch(e){case"menu":this.$emit("show-drawer")
break
case"github":this.$emit("show-github")
break
default:break}}}}
var W=F
var z=n(990)
var N=Object(m["a"])(W,I,j,false,null,"01f01eb8",null)
var V=N.exports
function $(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function R(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function H(t,e,n){if(e)R(t.prototype,e)
if(n)R(t,n)
return t}var U=function(){function t(){$(this,t)
this._tabs=this._defaultTabs()}H(t,[{key:"_defaultTabs",value:function t(){return[{icon:String.fromCharCode("0xE88A"),tooltip:"Common Actions",path:"/"},{icon:String.fromCharCode("0xE3E7"),tooltip:"ICO Manager",path:"/ico"},{icon:String.fromCharCode("0xE889"),tooltip:"History Viewer",path:"/history"},{icon:String.fromCharCode("0xE8C9"),tooltip:"Live Trades",path:"/trades"}]}},{key:"getTabs",value:function t(){return this._tabs}},{key:"setTabs",value:function t(e){this._tabs=e}}])
return t}()
var X=new U
var q=X
var J=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"app-console"},[n("div",{staticClass:"console-bar"},[n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){e.stopPropagation()
return t.fullscreenConsole()}}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[t.fullscreenMode?n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]):n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Full Screen")])],1)],1),t._v(" "),n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){e.stopPropagation()
return t.clearLog()}}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Clear console")])],1)],1),t._v(" "),n("div",[n("v-menu",{attrs:{"offset-x":"","close-on-content-click":false,"nudge-width":200},model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[n("v-btn",{attrs:{slot:"activator",icon:"",dark:""},slot:"activator"},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Console settings")])],1)],1),t._v(" "),n("v-card",[n("v-list",{attrs:{dense:""}},[n("v-list-tile",{attrs:{avatar:""}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("Console Settings")])],1)],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-list",{attrs:{dense:""}},[n("v-list-tile",[n("v-list-tile-action",[n("v-switch",{attrs:{color:"primary"},model:{value:t.condensedOutput,callback:function(e){t.condensedOutput=e},expression:"condensedOutput"}})],1),t._v(" "),n("v-list-tile-title",[t._v("Condensed output")])],1),t._v(" "),n("v-list-tile",[n("v-list-tile-action",[n("v-switch",{attrs:{color:"primary"},model:{value:t.expandXDR,callback:function(e){t.expandXDR=e},expression:"expandXDR"}})],1),t._v(" "),n("v-list-tile-title",[t._v("Expand XDR")])],1)],1)],1)],1)],1),t._v(" "),n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){e.stopPropagation()
return t.saveConsoleToFile()}}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Save console output to file")])],1)],1)],1),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.consoleOutput,expression:"consoleOutput"}],staticClass:"output-container",attrs:{readonly:"readonly",wrap:"off"},domProps:{value:t.consoleOutput},on:{input:function(e){if(e.target.composing){return}t.consoleOutput=e.target.value}}})])}
var Y=[]
var G=n(177)
var Z={props:["publicKey"],watch:{condensedOutput:function t(){o["a"].set("condensedOutput",this.condensedOutput)},expandXDR:function t(){o["a"].set("expandXDR",this.expandXDR)}},data:function t(){return{consoleOutput:"",menu:false,condensedOutput:o["a"].get("condensedOutput"),expandXDR:o["a"].get("expandXDR"),fullscreenMode:false}},mounted:function t(){d["a"].vue().$on("console",this.log)
d["a"].vue().$on("clear-console",this.clearLog)},methods:{fullscreenConsole:function t(){var e=A()(this.$el).closest(".app-console")
e.toggleClass("fullscreen-console")
this.fullscreenMode=e.hasClass("fullscreen-console")},saveConsoleToFile:function t(){var e=this.consoleOutput
var n=new Blob([e],{type:"text/plain;charset=utf-8"})
G.saveAs(n,"console-output.txt")},log:function t(e){this.consoleOutput+=e+"\n\n"
this.scrollToEnd()},scrollToEnd:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:250
this.$nextTick(function(){if(A()(".output-container")[0]){A()(".output-container").animate({scrollTop:A()(".output-container")[0].scrollHeight,scrollLeft:0},e)}})},clearLog:function t(){this.consoleOutput=""}}}
var Q=Z
var tt=n(992)
var et=Object(m["a"])(Q,J,Y,false,null,"db450c8e",null)
var nt=et.exports
var at=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"menu-button-container"},[n("v-menu",{attrs:{"offset-y":""}},[n("v-btn",{staticClass:"tiny-button",attrs:{slot:"activator",small:"",outline:"",color:"primary"},slot:"activator"},[t._v("\n      "+t._s(t.buttonTitle())+"\n      "),n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},t._l(t.items,function(e){return n("v-list-tile",{key:e.title+(e.main?"main":"test"),on:{click:function(n){return t.menuSelected(e)}}},[n("div",{staticClass:"network-menu-item"},[n("div",{staticClass:"menu-tile-title"},[t._v(t._s(e.title))]),t._v(" "),e.main?n("div",{staticClass:"network-main"},[t._v("PUBLIC")]):n("div",{staticClass:"network-test"},[t._v("TEST")])])])}),1)],1),t._v(" "),n("div",{staticClass:"network-string"},[t._v(t._s(t.serverURL()))]),t._v(" "),t.signOut?n("v-btn",{staticClass:"tiny-button",attrs:{small:"",outline:"",color:"primary"},on:{click:function(e){return t.sendSignOut()}}},[t._v("Sign Out")]):n("v-btn",{staticClass:"tiny-button",attrs:{small:"",outline:"",color:"primary"},on:{click:function(e){return t.horizonMetrics()}}},[t._v("Horizon Metrics")])],1)}
var it=[]
var ot=n(223)
var rt={props:["signOut"],data:function t(){return{server:null,items:[{id:"testnet",main:false,title:"Stellar.org"},{id:"mainnet",main:true,title:"Stellar.org"},{id:"local",main:false,title:"localhost:8000"}]}},created:function t(){this.server=new ot["a"]},methods:{buttonTitle:function t(){if(B["a"].isTestnet()){return"Test"}return"Public"},sendSignOut:function t(){d["a"].emit("sign-out")},horizonMetrics:function t(){d["a"].debugLog("horizon metrics...")
B["a"].horizonMetrics().then(function(t){d["a"].debugLog(t,"Success")})["catch"](function(t){d["a"].debugLog(t,"Error")})},serverURL:function t(){return this.server.serverURL()},menuSelected:function t(e){o["a"].set("server",e.id)
this.$forceUpdate()}}}
var st=rt
var lt=n(994)
var ct=Object(m["a"])(st,at,it,false,null,"76280ac4",null)
var ut=ct.exports
var dt=n(12)
var ft=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"asset-contents"},[n("div",{staticClass:"welcome-text"},[t._v("\n        We developed this site to make it simple to interact with the Stellar network. Have fun, but be safe and always test any operations on the test network first before using real XLM on the public network.\n      ")]),t._v(" "),n("div",{staticClass:"disclaimer"},[n("div",{staticClass:"welcome-title"},[t._v("\n          Disclaimer\n        ")]),t._v(" "),n("div",{staticClass:"welcome-text"},[t._v("\n          We are big fans of the Stellar network, but to avoid confusion we should mention that "),n("strong",[t._v("we are not affiliated with, or sponsored or endorsed by the ")]),n("a",{attrs:{href:"https://stellar.org",target:"_blank"}},[t._v("Stellar Development Foundation")]),t._v(".\n        ")]),t._v(" "),n("div",{staticClass:"welcome-text"},[t._v("\n          If you would like to use the official Stellar network tools, try the "),n("a",{attrs:{href:"https://www.stellar.org/laboratory/",target:"_blank"}},[t._v("Stellar Laboratory")]),t._v(" or the "),n("a",{attrs:{href:"https://www.stellar.org/account-viewer",target:"_blank"}},[t._v("Stellar Account Viewer")]),t._v(".\n        ")])]),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-btn",{attrs:{round:"",color:"primary"},on:{click:function(e){t.visible=false}}},[t._v("Close")])],1)])],1)])}
var vt=[]
var pt={props:["ping"],components:{"dialog-titlebar":u["DialogTitleBar"]},data:function t(){return{visible:false,title:"Welcome to stellar.army"}},watch:{ping:function t(){this.visible=true}}}
var ht=pt
var gt=n(998)
var mt=Object(m["a"])(ht,ft,vt,false,null,"6b4cea10",null)
var bt=mt.exports
var yt={components:{"navivation-drawer":K,"network-menu":ut,"toast-component":dt["a"],console:nt,"header-bar":V,"disclaimer-dialog":bt},data:function t(){return{showNavigation:false,disclaimerDialogPing:false,tabs:[]}},mounted:function t(){this.tabs=q.getTabs()},methods:{showGitHub:function t(){d["a"].openBrowser("https://github.com/StellarKit/stellarkit-client-web")},showDrawer:function t(){this.showNavigation=!this.showNavigation},pageTitle:function t(){return this.$router.currentRoute.name}}}
var xt=yt
var kt=n(1e3)
var wt=Object(m["a"])(xt,r,s,false,null,"70be60b0",null)
var _t=wt.exports
var At=n(462)
var St=n(463)
var Tt=n(305)
Tt["b"].add(At["a"],St["a"])
Tt["a"].watch()
var Ct={components:{"app-main":_t},data:function t(){return{initializing:true}},created:function t(){var e=this
o["a"].setup().then(function(){e.initializing=false})["catch"](function(t){console.log(t)})}}
var Pt=Ct
var Lt=n(1002)
var Dt=Object(m["a"])(Pt,a,i,false,null,null,null)
var Ot=e["a"]=Dt.exports},466:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("account-list",{attrs:{items:t.accountsUI}}),t._v(" "),n("instructions-header",[n("div",[t._v("Content coming soon...")])]),t._v(" "),n("div",{staticClass:"top-controls"},[n("div",{staticClass:"button-group"},[n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.sendAssetsDialogPing=!t.sendAssetsDialogPing}}},[t._v("Send Asset")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.addRemoveSignerDialogPing=!t.addRemoveSignerDialogPing}}},[t._v("Add/Remove Signer")]),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-btn",{attrs:{slot:"activator",outline:"",small:""},on:{click:function(e){t.mergeDialogPing=!t.mergeDialogPing}},slot:"activator"},[t._v("Merge Accounts")]),t._v(" "),n("span",[t._v("Merges source into destination")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-btn",{attrs:{slot:"activator",outline:"",small:""},on:{click:function(e){t.trustDialogPing=!t.trustDialogPing}},slot:"activator"},[t._v("Trust Token")]),t._v(" "),n("span",[t._v("Account must trust token before it can receive")])],1),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.manageOfferDialogPing=!t.manageOfferDialogPing}}},[t._v("Manage Offer")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.buyAssetDialogPing=!t.buyAssetDialogPing}}},[t._v("Buy Asset")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.showOffersDialogPing=!t.showOffersDialogPing}}},[t._v("Show Offers")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.allowTrustDialogPing=!t.allowTrustDialogPing}}},[t._v("Allow Trust")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.setDomainPing=!t.setDomainPing}}},[t._v("Set Domain")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.setInflationPing=!t.setInflationPing}}},[t._v("Set Inflation Destination")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.lookupFederationPing=!t.lookupFederationPing}}},[t._v("Federation Lookup")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.manageDataPing=!t.manageDataPing}}},[t._v("Manage Data")]),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.lockAccountDialogPing=!t.lockAccountDialogPing}}},[t._v("Lock Account")]),t._v(" "),n("v-menu",{attrs:{"offset-y":"",transition:false}},[n("v-btn",{attrs:{slot:"activator",outline:"",small:"",ripple:false},slot:"activator"},[t._v("\n          Ledger Nano\n          "),n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},[n("v-list-tile",{on:{click:function(e){return t.ledgerMenu("info")}}},[n("v-list-tile-title",[t._v("Display Ledger Info")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.ledgerMenu("refill")}}},[n("v-list-tile-title",[t._v("Boost Testnet Balance")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.ledgerMenu("payments")}}},[n("v-list-tile-title",[t._v("View Payments")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.ledgerMenu("operations")}}},[n("v-list-tile-title",[t._v("View Operations")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.ledgerMenu("transactions")}}},[n("v-list-tile-title",[t._v("View Transactions")])],1)],1)],1),t._v(" "),n("v-btn",{attrs:{outline:"",small:""},on:{click:function(e){t.saveSecretDialogPing=!t.saveSecretDialogPing}}},[t._v("Save/Print Keys")])],1)]),t._v(" "),n("SavePrintSecretDialog",{attrs:{ping:t.saveSecretDialogPing}}),t._v(" "),n("manage-data-dialog",{attrs:{ping:t.manageDataPing,model:t.manageDataModel}}),t._v(" "),n("merge-dialog",{attrs:{ping:t.mergeDialogPing,model:t.mergeDialogModel}}),t._v(" "),n("SimpleOperationDialog",{attrs:{ping:t.setDomainPing,operation:"domain",model:t.setDomainModel}}),t._v(" "),n("SimpleOperationDialog",{attrs:{ping:t.setInflationPing,operation:"inflation",model:t.setInflationModel}}),t._v(" "),n("SimpleOperationDialog",{attrs:{ping:t.lookupFederationPing,operation:"federation",model:t.lookupFederationModel}}),t._v(" "),n("trust-token-dialog",{attrs:{ping:t.trustDialogPing,model:t.trustDialogModel}}),t._v(" "),n("AddRemoveSignerDialog",{attrs:{ping:t.addRemoveSignerDialogPing,model:t.addRemoveSignerDialogModel}}),t._v(" "),n("send-assets-dialog",{attrs:{ping:t.sendAssetsDialogPing,model:t.sendAssetsDialogModel}}),t._v(" "),n("manage-offer-dialog",{attrs:{ping:t.manageOfferDialogPing,model:t.manageOfferDialogModel}}),t._v(" "),n("buy-asset-dialog",{attrs:{ping:t.buyAssetDialogPing,model:t.buyAssetDialogModel}}),t._v(" "),n("show-offers-dialog",{attrs:{ping:t.showOffersDialogPing,model:t.showOffersDialogModel}}),t._v(" "),n("allow-trust-dialog",{attrs:{ping:t.allowTrustDialogPing,model:t.allowTrustDialogModel}}),t._v(" "),n("LockAccountDialog",{attrs:{ping:t.lockAccountDialogPing,model:t.lockAccountDialogModel}})],1)}
var i=[]
var o=n(23)
var r=n(52)
var s=n(36)
var l=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"simple-header"},[n("div",[t._v(" "+t._s(t.header)+" ")]),t._v(" "),n("div",{staticClass:"sub-header"},[t._v(" "+t._s(t.subHeader)+" ")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:t.showSource,showFunding:t.showFunding,showSigner:t.showSigner,showTextValue:true},on:{"enter-key-down":t.doOperation,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"primary",loading:t.loading},on:{click:function(e){return t.doOperation()}},slot:"activator"},[t._v(t._s(t.buttonTitle))]),t._v(" "),n("span",[t._v(t._s(t.tooltip))])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"attribute-dialog",bottom:false,top:true}})],1)],1)])}
var c=[]
var u=n(0)
var d=n(7)
var f=n(19)
var v=n(2)
var p=n(12)
var h=n(35)
var g={props:["ping","operation","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":p["a"],"dialog-accounts":f["a"]},data:function t(){return{visible:false,title:"",tooltip:"",buttonTitle:"",header:"",hint:"",subHeader:"",loading:false,showSource:false,showSigner:false,showFunding:false}},watch:{ping:function t(){this.visible=true
this.updateForOperation()}},methods:{updateForOperation:function t(){switch(this.operation){case"domain":this.showSource=true
this.showFunding=true
this.showSigner=true
this.title="Set Home Domain"
this.tooltip="Set the home domain"
this.buttonTitle="Set Domain"
this.model.textValueLabel="Home domain"
this.model.textValueHint="www.example-domain.com"
this.header="Adds a domain name to the source account. Leave blank to remove. Funding account is optional."
break
case"inflation":this.showSource=true
this.showFunding=true
this.showSigner=true
this.title="Set Inflation Destination"
this.tooltip="Set the inflation destination"
this.buttonTitle="Set Inflation Destination"
this.model.textValueLabel="Inflation destination"
this.header="Adds the inflation destination to the source account. Funding account is optional."
this.subHeader="ex: GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT"
this.model.textValueHint="visit: https://lumenaut.net/"
break
case"federation":this.title="Lookup Federation Address"
this.tooltip="Lookup Federation Address"
this.buttonTitle="Lookup"
this.model.textValueLabel="Federation address"
this.header="Enter the federation address"
this.model.textValueHint="example*domain.com"
break
default:console.log("switch case not handled")
break}},doOperation:function t(){switch(this.operation){case"domain":this.setDomain()
break
case"inflation":this.setInflationDestination()
break
case"federation":this.federationLookup()
break
default:console.log("switch case not handled")
break}},dialogAccounts:function t(){return this.$refs.dialogAccounts},setDomain:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
var a=this.dialogAccounts().fundingWallet()
var i=this.dialogAccounts().textValue()
var o=this.dialogAccounts().signerWallet()
var r=null
if(o){r=[o]}if(n){this.loading=true
u["a"].debugLog("Setting home domain...")
v["a"].setDomain(n,i,a,r).then(function(t){u["a"].debugLog(t)
e.loading=false
v["a"].updateBalances()
e.displayToast("Success")})["catch"](function(t){u["a"].debugLog(t)
e.displayToast("Failed: see console",true)
e.loading=false})}},setInflationDestination:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
var a=this.dialogAccounts().fundingWallet()
var i=this.dialogAccounts().textValue(true)
var o=this.dialogAccounts().signerWallet()
var r=null
if(o){r=[o]}if(n&&u["a"].strOK(i)){this.loading=true
u["a"].debugLog("Setting inflation destination...")
v["a"].setInflationDestination(n,i,a,r).then(function(t){u["a"].debugLog(t)
e.loading=false
v["a"].updateBalances()
e.displayToast("Success")})["catch"](function(t){u["a"].debugLog(t,"Error")
e.displayToast("Failed: see console",true)
e.loading=false})}},federationLookup:function t(){var e=this
var n=this.dialogAccounts().textValue(true)
if(u["a"].strOK(n)){if(!u["a"].isFederation(n)){this.displayToast('The address "'+n+'" appears to be invalid.',true)}else{this.loadingFederation=true
u["a"].debugLog("Talking to federation server: "+n)
h.FederationServer.resolve(n).then(function(t){e.loadingFederation=false
u["a"].debugLog(t.account_id)
e.displayToast("Success")})["catch"](function(t){e.loadingFederation=false
e.displayToast("Failed: see console",true)
u["a"].debugLog(t)})}}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
u["a"].toast(e,n,"attribute-dialog")}}}
var m=g
var b=n(1044)
var y=n(4)
var x=Object(y["a"])(m,l,c,false,null,"08fc0f0a",null)
var k=x.exports
var w=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("You can create a 'multi-sig' account by adding an additional signer.")]),t._v(" "),n("div",{staticClass:"sub-header"},[t._v("You'll need the assets symbol and issuing account address. This can be found normally at the https://tokens-home-page/.well-known/stellar.toml")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:true,showSigner:true},on:{"enter-key-down":t.addSigner,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",loading:t.removing},on:{click:function(e){return t.addSigner(true)}},slot:"activator"},[t._v("Remove Signer")]),t._v(" "),n("span",[t._v("Remove a signer from account")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.adding},on:{click:function(e){return t.addSigner()}},slot:"activator"},[t._v("Add Signer")]),t._v(" "),n("span",[t._v("Add a signer to account")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"trust-token-dialog",bottom:false,top:true}})],1)],1)])}
var _=[]
var A={props:["ping","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":p["a"],"dialog-accounts":f["a"]},data:function t(){return{visible:false,title:"Add/Remove Signer",removing:false,adding:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},addSigner:function t(){var e=this
var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var a=this.dialogAccounts().sourceWallet()
var i=this.dialogAccounts().signerWallet()
if(a&&i){u["a"].debugLog(n?"Removing signer...":"Adding signer...")
if(n){this.removing=true
v["a"].removeMultiSig(a,i).then(function(t){u["a"].debugLog(t)
e.removing=false
e.displayToast("Success!")
return null})["catch"](function(t){u["a"].debugLog(t,"Error")
e.removing=false
e.displayToast("Error!",true)})}else{this.adding=true
v["a"].makeMultiSig(a,i).then(function(t){u["a"].debugLog(t)
e.adding=false
e.displayToast("Success!")
return null})["catch"](function(t){u["a"].debugLog(t,"Error")
e.adding=false
e.displayToast("Error!",true)})}}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
u["a"].toast(e,n,"trust-token-dialog")}}}
var S=A
var T=n(1046)
var C=Object(y["a"])(S,w,_,false,null,"72f9992e",null)
var P=C.exports
var L=n(117)
var D=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("Merging an account destroys the source account.")]),t._v(" "),n("div",{staticClass:"sub-header"},[t._v("\n          Great if you have some XLM in another account and you want to extract the balance into another account. If the source has any other assets, the destination must first trust that asset.")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:true,showDest:true},on:{"enter-key-down":t.mergeAccounts,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loading},on:{click:function(e){return t.mergeAccounts()}},slot:"activator"},[t._v("Merge into Destination")]),t._v(" "),n("span",[t._v("Merge source assets into destination")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"trust-token-dialog",bottom:false,top:true}})],1)],1)])}
var O=[]
var M={props:["ping","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":p["a"],"dialog-accounts":f["a"]},data:function t(){return{visible:false,title:"Merge Source into Destination",loading:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},mergeAccounts:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
var a=this.dialogAccounts().destWallet()
if(n&&a){u["a"].debugLog("Merging...")
this.loading=true
v["a"].mergeAccount(n,a).then(function(t){u["a"].debugLog(t)
e.loading=false
v["a"].updateBalances()
e.displayToast("Success!")
return null})["catch"](function(t){u["a"].debugLog(t,"Error")
e.loading=false
e.displayToast("Error!",true)})}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
u["a"].toast(e,n,"trust-token-dialog")}}}
var E=M
var K=n(1048)
var I=Object(y["a"])(E,D,O,false,null,"3090be5a",null)
var j=I.exports
var B=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("Add data to your account")]),t._v(" "),n("div",{staticClass:"sub-header"},[t._v("Data is limited to 64 bytes")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:true,showNameValue:true,showFunding:true,showSigner:true},on:{"enter-key-down":t.addData,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loading},on:{click:function(e){return t.addData()}},slot:"activator"},[t._v("Add Data")]),t._v(" "),n("span",[t._v("Add data to an account")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"data-dialog",bottom:false,top:true}})],1)],1)])}
var F=[]
var W={props:["ping","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":p["a"],"dialog-accounts":f["a"]},data:function t(){return{visible:false,title:"Edit Account Data",loading:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},addData:function t(){var e=this
var n=this.dialogAccounts().nameValue(true)
if(u["a"].strOK(n.name)){var a=this.dialogAccounts().sourceWallet()
var i=this.dialogAccounts().fundingWallet()
var o=this.dialogAccounts().signerWallet()
var r=null
if(o){r=[o]}if(a){u["a"].debugLog("Setting key value data...")
this.loading=true
v["a"].manageData(a,i,n.name,n.value,r).then(function(t){u["a"].debugLog(t)
e.loading=false
v["a"].updateBalances()
e.displayToast("Success!")})["catch"](function(t){u["a"].debugLog(t)
e.loading=false
e.displayToast("Error!",true)})}}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
u["a"].toast(e,n,"data-dialog")}}}
var z=W
var N=n(1050)
var V=Object(y["a"])(z,B,F,false,null,"267b84a9",null)
var $=V.exports
var R=n(225)
var H=n(120)
var U=n(119)
var X=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSource:true,showFunding:true},on:{"enter-key-down":t.lockAccount,toast:t.displayToast}}),t._v(" "),n("div",{staticClass:"status-message"},[t._v("By default the account is locked to still allow low threshold operations like Allow Trust. This is normally what you would want for an issuer account if require trust is set. Check 'Lock Completely' if you don't need low threshold operations")]),t._v(" "),n("v-checkbox",{attrs:{label:"Lock Completely"},model:{value:t.lockCompletely,callback:function(e){t.lockCompletely=e},expression:"lockCompletely"}}),t._v(" "),n("div",{staticClass:"status-message"},[t._v('\n          Any tokens or currency on this account will be locked forever. This feature is great to ensure no more tokens can ever be created in the case of an issuer.\n          Make sure everything on this account is set, for example the home domain. Be ABSOLUTELY CERTAIN you know what your are doing. This is NOT REVERSABLE EVER."\n        ')]),t._v(" "),n("v-checkbox",{attrs:{label:"I understand"},model:{value:t.confirmed,callback:function(e){t.confirmed=e},expression:"confirmed"}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",disabled:!t.confirmed,color:"primary",loading:t.loading},on:{click:t.lockAccount},slot:"activator"},[t._v("Lock Account")]),t._v(" "),n("span",[t._v("Lock account so it can never be accessed by anyone")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"manage-offer-dialog",bottom:false,top:true}})],1)],1)])}
var q=[]
var J={props:["ping","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":p["a"],"dialog-accounts":f["a"]},data:function t(){return{visible:false,title:"Lock Account",confirmed:false,loading:false,lockCompletely:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},lockAccount:function t(){var e=this
if(!this.confirmed){this.displayToast('You must click "I understand" to continue',true)}else{var n=this.dialogAccounts().sourceWallet()
this.loading=true
if(n){u["a"].debugLog("Locking account...")
v["a"].lockAccount(n,this.lockCompletely?"lock":"low").then(function(t){u["a"].debugLog("locked!")
u["a"].debugLog(t)
e.displayToast("Account is now locked")
v["a"].updateBalances()
return null})["catch"](function(t){e.displayToast("Lock failed",true)
u["a"].debugLog(t)})["finally"](function(){e.loading=false})}}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
u["a"].toast(e,n,"manage-offer-dialog")}}}
var Y=J
var G=n(1052)
var Z=Object(y["a"])(Y,X,q,false,null,"6c1811be",null)
var Q=Z.exports
var tt=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showBuyOffer:true,showFunding:true,showSigner:true,showSource:true,showBuyingAsset:true,showSellingAsset:true},on:{"enter-key-down":t.buyAsset,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"primary",loading:t.loading},on:{click:function(e){return t.buyAsset()}},slot:"activator"},[t._v("Buy Asset")]),t._v(" "),n("span",[t._v("Buy an asset")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"manage-offer-dialog",bottom:false,top:true}})],1)],1)])}
var et=[]
var nt={props:["ping","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":p["a"],"dialog-accounts":f["a"]},data:function t(){return{visible:false,title:"Buy Asset",loading:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},buyAsset:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
var a=this.dialogAccounts().signerWallet()
var i=this.dialogAccounts().buyOffer()
var o=this.dialogAccounts().fundingWallet()
var r=null
if(a){r=[a]}u["a"].debugLog("Buying asset...")
if(i){var t=i.buyingAsset
var s=i.sellingAsset
this.loading=true
v["a"].buyTokens(n,s,t,String(i.buySendMax),String(i.buyAmount),o,r).then(function(t){u["a"].debugLog(t,"Success")
e.displayToast("Success")
e.loading=false
v["a"].updateBalances()})["catch"](function(t){u["a"].debugLog(t,"Error")
e.loading=false
var n=t.message
if(n==="connection failed"){n="Ledger Nano not found"}e.displayToast(n,true)})}},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
u["a"].toast(e,n,"manage-offer-dialog")}}}
var at=nt
var it=n(1054)
var ot=Object(y["a"])(at,tt,et,false,null,"22c22211",null)
var rt=ot.exports
var st=n(226)
var lt=n(118)
var ct=n(6)
var ut=n(18)
var dt={mixins:[o["a"]],components:{AccountList:r["a"],SimpleOperationDialog:k,ManageDataDialog:$,InstructionsHeader:s["a"],SavePrintSecretDialog:lt["a"],TrustTokenDialog:R["a"],MergeDialog:j,AddRemoveSignerDialog:P,SendAssetsDialog:L["a"],ManageOfferDialog:H["a"],BuyAssetDialog:rt,ShowOffersDialog:U["a"],AllowTrustDialog:st["a"],LockAccountDialog:Q},data:function t(){return{manageDataModel:new ut["a"],mergeDialogModel:new ut["a"],setDomainModel:new ut["a"],setInflationModel:new ut["a"],lookupFederationModel:new ut["a"],trustDialogModel:new ut["a"],addRemoveSignerDialogModel:new ut["a"],sendAssetsDialogModel:new ut["a"],manageOfferDialogModel:new ut["a"],buyAssetDialogModel:new ut["a"],showOffersDialogModel:new ut["a"],allowTrustDialogModel:new ut["a"],lockAccountDialogModel:new ut["a"],lookupFederationPing:false,setDomainPing:false,setInflationPing:false,manageDataPing:false,saveSecretDialogPing:false,addRemoveSignerDialogPing:false,sendAssetsDialogPing:false,mergeDialogPing:false,trustDialogPing:false,manageOfferDialogPing:false,buyAssetDialogPing:false,showOffersDialogPing:false,allowTrustDialogPing:false,lockAccountDialogPing:false}},methods:{ledgerMenu:function t(e){switch(e){case"info":v["a"].displayLedgerInfo()
break
case"refill":v["a"].sendTestnetXLMToLedger()
break
case"operations":v["a"].operationsForWallet(ct["StellarWallet"].ledger(new ct["LedgerAPI"]))
break
case"payments":v["a"].paymentsForWallet(ct["StellarWallet"].ledger(new ct["LedgerAPI"]))
break
case"transactions":v["a"].transactionsForWallet(ct["StellarWallet"].ledger(new ct["LedgerAPI"]))
break
default:break}}}}
var ft=dt
var vt=n(1056)
var pt=Object(y["a"])(ft,a,i,false,null,"2e15c7a6",null)
var ht=e["a"]=pt.exports},467:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("account-list",{attrs:{items:t.accountsUI}}),t._v(" "),n("instructions-header",[n("div",[t._v("Content coming soon....")])]),t._v(" "),n("div",{staticClass:"page-contents"},[n("v-menu",{attrs:{"offset-y":"",transition:false}},[n("v-btn",{attrs:{slot:"activator",small:"",color:"primary",ripple:false},slot:"activator"},[t._v("\n        "+t._s(t.menuButtonName)+"\n        "),n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},t._l(t.tokenMenuItems,function(e,a){return n("v-list-tile",{key:e.title,on:{click:function(n){return t.projectsMenuClick(a,e.action)}}},[n("v-list-tile-title",[t._v(t._s(e.title))])],1)}),1)],1),t._v(" "),t.showSummary?n("div",{staticClass:"summary-view"},[n("div",{staticClass:"summary-header"},[t._v("\n        Token Information\n        "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{small:"",icon:""},on:{click:t.deleteTokenProject}},[n("v-icon",[t._v("close")])],1),t._v(" "),n("v-btn",{attrs:{small:"",icon:""},on:{click:t.saveToFile}},[n("v-icon",[t._v("")])],1),t._v(" "),n("v-btn",{attrs:{small:"",icon:""},on:{click:t.printInfo}},[n("v-icon",[t._v("")])],1)],1),t._v(" "),n("div",{staticClass:"summary-list"},t._l(t.summaryMap,function(e){return n("div",{key:e.content,staticClass:"operations-item"},[n("div",{staticClass:"item-name"},[t._v(t._s(e.title)+":")]),t._v(" "),e.secret&&!t.printing?n("div",{staticClass:"item-value",on:{click:function(t){e.secret=false}}},[t._v("Click to reveal")]):n("div",{staticClass:"item-value"},[t._v(t._s(e.content))])])}),0),t._v(" "),n("div",{staticClass:"button-group"},[n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.createUserAccount()}}},[t._v("Create Account")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.sendTokens()}}},[t._v("Send Tokens")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.manageOffer()}}},[t._v("Manage Offer")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.showOffers()}}},[t._v("Show Offers")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.lockIssuer()}}},[t._v("Lock Issuer")])],1)]):t._e()],1),t._v(" "),n("show-offers-dialog",{attrs:{ping:t.showOffersDialogPing,model:t.model}}),t._v(" "),n("manage-offer-dialog",{attrs:{ping:t.offerDialogPing,model:t.model}}),t._v(" "),n("send-assets-dialog",{attrs:{ping:t.sendAssetsDialogPing,model:t.model}}),t._v(" "),n("create-holder-account-dialog",{attrs:{ping:t.accountDialogPing,model:t.model}}),t._v(" "),n("create-token-dialog",{attrs:{model:t.model,ping:t.createDialogPing},on:{"token-created":t.createDialogResult}}),t._v(" "),n("confirm-dialog",{attrs:{ping:t.confirmDialogPing,title:"Delete Token Project?",message:"Do you want to delete this token project? Tokens will remain on the network, but make sure you have your keys.",okTitle:"Delete Project"},on:{"confirm-dialog-ok":t.deleteTokenProjectConfirmed}}),t._v(" "),n("confirm-dialog",{attrs:{ping:t.confirmLockDialogPing,title:"Lock Issuer?",message:"Any tokens or currency on this account will be locked forever. This feature is great to ensure no more tokens can ever be created, but make sure everything on this account is set, for example the home domain. Be ABSOLUTELY CERTAIN you know what your are doing. This is not reversible.",okTitle:"Lock Issuer"},on:{"confirm-dialog-ok":t.lockIssuerConfirmed}})],1)}
var i=[]
var o=n(23)
var r=n(0)
var s=n(11)
var l=n(52)
var c=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("Give your asset a symbol and create the tokens.")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showSymbol:true,showAmount:true,showFunding:true,showTextValue:true,showAuthFlags:true},on:{"enter-key-down":t.createToken,toast:t.displayToast}}),t._v(" "),n("v-checkbox",{attrs:{"hide-details":"",small:"",label:"Create token burn account"},model:{value:t.createBurnAccount,callback:function(e){t.createBurnAccount=e},expression:"createBurnAccount"}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"primary",loading:t.loading},on:{click:function(e){return t.createToken()}},slot:"activator"},[t._v("Create Token")]),t._v(" "),n("span",[t._v("Create Token")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"create-token-dialog",bottom:false,top:true}})],1)],1)])}
var u=[]
var d=n(7)
var f=n(6)
var v=n(2)
var p=n(44)
var h=n(12)
var g=n(19)
var m=n(35)
var b={props:["ping","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":h["a"],"dialog-accounts":g["a"]},data:function t(){return{visible:false,title:"Create Token",loading:false,createBurnAccount:false}},watch:{ping:function t(){this.visible=true}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},createToken:function t(){var e=this
var n=this.dialogAccounts().amount()
var a=this.dialogAccounts().fundingWallet(true)
var i=this.dialogAccounts().symbol(true)
if(r["a"].strOK(i)){if(n<1){this.displayToast("Create token amount must be greater than 0",true)
return}if(a){this.loading=true
var o=null
var s=null
var l=null
var c=null
var u=null
var d=this.dialogAccounts().textValue()
var h=this.dialogAccounts().authFlags()
var g=this.dialogAccounts().trustBtcEth()
v["a"].newAccount(a,"1.5","Issuer: "+i,i).then(function(t){o=t.keypair
c=f["StellarWallet"].secret(o.secret())
l=new m.Asset(i,o.publicKey())
return v["a"].newAccountWithTokens(a,c,"4",l,String(n),"Distributor: "+i,i)}).then(function(t){s=t.keypair
u=f["StellarWallet"].secret(s.secret())
if(r["a"].strOK(d)){return v["a"].setDomain(c,d,a)}return null}).then(function(){if(g){return c.publicKey().then(function(t){var e=new m.Asset("ETH",t)
var n=new m.Asset("BTC",t)
return v["a"].changeTrust(u,null,e,"100000000").then(function(){p["a"].addAsset({symbol:e.getCode(),issuer:e.getIssuer()})
return v["a"].changeTrust(u,null,n,"100000000").then(function(){p["a"].addAsset({symbol:n.getCode(),issuer:n.getIssuer()})})})})}return null}).then(function(){if(h!==0){return v["a"].setFlags(c,h)}return null}).then(function(){return e.makeBurnAccount(a,l,c)}).then(function(t){e.$emit("token-created",o,s,l,t)
e.visible=false
e.displayToast("Success!")
r["a"].debugLog("Create token successful")
v["a"].updateBalances()
p["a"].addAsset({symbol:l.getCode(),issuer:l.getIssuer()})
return null})["catch"](function(t){e.displayToast("Error: "+t.message,true)
r["a"].debugLog(t)})["finally"](function(){e.loading=false})}}},makeBurnAccount:function t(e,n,a){if(this.createBurnAccount){r["a"].debugLog("Create burn account")
return v["a"].newAccount(e,"2","Burn: "+n.getCode(),n.getCode()).then(function(t){var i=t.keypair
var o=f["StellarWallet"].secret(i.secret())
var s=1e11
return v["a"].changeTrust(o,e,n,String(s)).then(function(){return v["a"].allowTrust(a,o,n,true,e)})["catch"](function(){r["a"].debugLog("Allow trust was not necessary, continuing...")
return null}).then(function(){return v["a"].lockAccount(o,"lock").then(function(t){r["a"].debugLog("locked burn account!")
return i})})})["catch"](function(t){console.log("make burn failed",t)
throw t})}return Promise.resolve()},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
r["a"].toast(e,n,"create-token-dialog")}}}
var y=b
var x=n(1066)
var k=n(4)
var w=Object(k["a"])(y,c,u,false,null,"42cb686a",null)
var _=w.exports
var A=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[n("div",{staticClass:"help-text"},[n("div",[t._v("Create a wallet for a user.")])]),t._v(" "),n("div",{staticClass:"help-email"},[n("div",{staticClass:"balance-fields"},[n("v-text-field",{ref:"input",attrs:{"hide-details":"",label:"Asset starting balance"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.createAccount()}},model:{value:t.tokenBalance,callback:function(e){t.tokenBalance=typeof e==="string"?e.trim():e},expression:"tokenBalance"}}),t._v(" "),n("v-text-field",{attrs:{"hide-details":"",label:"XLM starting balance",type:"number"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.createAccount()}},model:{value:t.xlmBalance,callback:function(e){t.xlmBalance=t._n(e)},expression:"xlmBalance"}})],1),t._v(" "),n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showAsset:true,showSource:true,showFunding:true,showAccountName:true,showTimeLock:true},on:{"enter-key-down":t.createAccount,toast:t.displayToast}})],1),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",small:"",color:"primary",loading:t.loading},on:{click:function(e){return t.createAccount()}},slot:"activator"},[t._v("Create Account")]),t._v(" "),n("span",[t._v("Create Token")])],1)],1),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"create-account-dialog",bottom:false,top:true}})],1)],1)])}
var S=[]
var T={props:["ping","model"],components:{"dialog-titlebar":d["DialogTitleBar"],"toast-component":h["a"],"dialog-accounts":g["a"]},data:function t(){return{visible:false,title:"Create Account",loading:false,tokenBalance:10,xlmBalance:2,unlockTransaction:null}},watch:{ping:function t(){var e=this
this.visible=true
this.$nextTick(function(){e.$refs.input.focus()})}},methods:{dialogAccounts:function t(){return this.$refs.dialogAccounts},createAccount:function t(){var e=this
var n=this.dialogAccounts().sourceWallet()
var a=this.dialogAccounts().fundingWallet()
var i=this.dialogAccounts().accountName()
var o=this.dialogAccounts().asset()
var l=this.dialogAccounts().timeLock()
if(n&&o&&!o.isNative()){var c=null
var u=s["a"].accountWithPublicKey(o.getIssuer())
if(u){c=f["StellarWallet"].secret(u.secret)}this.loading=true
v["a"].newAccountWithTokens(a,n,String(this.xlmBalance),o,String(this.tokenBalance),i,o.getCode(),c).then(function(t){r["a"].debugLog(t.account)
if(l){r["a"].debugLog("adding funding account as signer...")
var i=f["StellarWallet"].secret(t.keypair.secret())
return v["a"].makeMultiSig(i,n,a).then(function(){return e.createUnlockTransaction(i,n,l)})}return null}).then(function(){r["a"].debugLog("Account is ready","Success")
e.displayToast("Success!")
return null})["catch"](function(t){r["a"].debugLog(t,"Error")
e.displayToast("Error!",true)})["finally"](function(){e.loading=false})}},timeFromNow:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0
return e+Math.round((new Date).getTime()/1e3)},createUnlockTransaction:function t(e,n,a){var i=this
var o=a.getSeconds()
var s={timebounds:{minTime:String(o),maxTime:"0"}}
return v["a"].removeMultiSigTransaction(e,n,s).then(function(t){i.unlockTransaction=t.toEnvelope().toXDR("base64")
r["a"].debugLog(i.unlockTransaction,"Save this transaction to submit later")
r["a"].toast("Transaction output to console.  Save this!")
return t})["catch"](function(t){r["a"].debugLog(t,"Error")})},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
r["a"].toast(e,n,"create-account-dialog")}}}
var C=T
var P=n(1068)
var L=Object(k["a"])(C,A,S,false,null,"6daee72e",null)
var D=L.exports
var O=n(120)
var M=n(117)
var E=n(224)
var K=n(119)
var I=n(33)
var j={data:function t(){return{}},methods:{printTokenInfo:function t(e){var n=I("<iframe></iframe>")[0]
n.setAttribute("id","printf")
n.setAttribute("name","printf")
document.body.appendChild(n)
var a=window.frames["printf"]
a.document.head.innerHTML="<style>body{font-family: Arial, Helvetica, sans-serif;}</style>"
a.document.body.innerHTML=this.styledElementForPrinting(e[0])
a.print()
document.body.removeChild(n)},styledElementForPrinting:function t(e){var n=document.createElement("div")
n.setAttribute("class","print-wrapper")
var a=e.cloneNode(true)
n.appendChild(a)
var i=document.createElement("div")
i.setAttribute("style","display:none;")
i.appendChild(n)
var o=e.parentNode.appendChild(i)
this.loopNodesCollectStyles([o])
e.parentNode.removeChild(o)
return o.innerHTML},condenseStyle:function t(e,n){if(e[n+"-top"]==="0px"&&e[n+"-right"]==="0px"&&e[n+"-bottom"]==="0px"&&e[n+"-left"]==="0px"){e[n+"-top"]=""
e[n+"-right"]=""
e[n+"-bottom"]=""
e[n+"-left"]=""
e[n]="0px"}return e},condenseBorder:function t(e){if(e["border-top-left-radius"]==="0px"&&e["border-top-right-radius"]==="0px"&&e["border-bottom-left-radius"]==="0px"&&e["border-bottom-left-radius"]==="0px"){e["border-top-left-radius"]=""
e["border-top-right-radius"]=""
e["border-bottom-left-radius"]=""
e["border-bottom-right-radius"]=""}if(e["border-top-style"]==="none"&&e["border-left-style"]==="none"&&e["border-bottom-style"]==="none"&&e["border-right-style"]==="none"){e["border-top-style"]=""
e["border-left-style"]=""
e["border-bottom-style"]=""
e["border-right-style"]=""
e["border-top-width"]=""
e["border-top-color"]=""
e["border-right-width"]=""
e["border-right-color"]=""
e["border-bottom-width"]=""
e["border-bottom-color"]=""
e["border-left-width"]=""
e["border-left-color"]=""}if(e["text-decoration-line"]==="none"){e["text-decoration-line"]=""
e["text-decoration-style"]=""
e["text-decoration-color"]=""
e["text-decoration"]="none"}return e},collectStyles:function t(e,n){var a=""
var i=window.getComputedStyle(e,null)
var o=["justify","font","box","font","text-align","align","border","text-decoration","margin","padding","color","display","width","min","height","flex","left","right","top","bottom","position","max","background","overflow"]
var s=["background-blend-mode","background-clip","background-attachment","background-origin","border-image-outset","border-image-repeat","border-image-slice","border-image-width","font-kerning","font-stretch","font-variant","overflow-anchor","overflow-wrap","text-align-last","font-variant-ligatures","color-interpolation","color-interpolation-filters","color-rendering","text-decoration-skip"]
var l={}
for(var c=0;c<i.length;c++){var u=i[c]
if(s.indexOf(u)!==-1){continue}for(var d=0;d<o.length;d++){if(u.indexOf(o[d])===0){var f=i.getPropertyValue(u)
l[u]=f
if(f==="none"){if(u==="background-image"||u==="border-image-source"||u==="max-height"||u==="max-width"||u==="box-shadow"){l[u]=""}}else if(f==="auto"){if(u==="top"||u==="bottom"||u==="left"||u==="right"||u==="width"||u==="height"||u==="background-size"||u==="alignment-baseline"){l[u]=""}}else if(f==="normal"){if(u==="justify-items"||u==="justify-self"||u==="align-content"||u==="align-items"||u==="align-self"||u==="height"||u==="background-size"){l[u]=""}}else if(f==="0px"){if(u==="min-height"||u==="min-width"){l[u]=""}}}else{}}}l=this.condenseStyle(l,"margin")
l=this.condenseStyle(l,"padding")
l=this.condenseBorder(l)
for(var v in l){var p=l[v]
if(r["a"].strlen(p)>0){a+=v+":"+p+";"}}return a},loopNodesCollectStyles:function t(e){for(var n=0;n<e.length;n++){var a=e[n]
a.setAttribute("style",this.collectStyles(a))
var i=a.children
if(i&&i.length){this.loopNodesCollectStyles(i)}}}}}
var B=n(18)
var F=n(36)
var W=n(21)
var z=n(35)
var N=n(33)
var V=n(177)
var $={mixins:[o["a"],j],components:{AccountList:l["a"],CreateTokenDialog:_,ManageOfferDialog:O["a"],CreateHolderAccountDialog:D,SendAssetsDialog:M["a"],InstructionsHeader:F["a"],ConfirmDialog:E["a"],ShowOffersDialog:K["a"]},computed:{menuButtonName:function t(){var e=this.currentProject()
if(e){return"Token: "+e.symbol}return"Create Token"},tokenMenuItems:function t(){var e=[]
var n=true
var a=false
var i=undefined
try{for(var o=this.tokenProjects[Symbol.iterator](),r;!(n=(r=o.next()).done);n=true){var s=r.value
e.push({title:"Token: "+s.symbol,symbol:s.symbol})}}catch(t){a=true
i=t}finally{try{if(!n&&o["return"]!=null){o["return"]()}}finally{if(a){throw i}}}e.push({title:"Create Token...",action:"create"})
return e}},data:function t(){return{model:new B["a"],tokenProjects:[],summaryMap:[],projectIndex:0,createDialogPing:false,offerDialogPing:false,sendAssetsDialogPing:false,accountDialogPing:false,showSummary:false,confirmDialogPing:false,confirmLockDialogPing:false,showOffersDialogPing:false,printing:false}},mounted:function t(){this.tokenProjects=this.loadProjects()
if(!this.tokenProjects){this.tokenProjects=[]}this.updateProjectIndex(0)},methods:{lockIssuerConfirmed:function t(){r["a"].debugLog("Locking issuer...")
var e=this.currentProject()
if(e){v["a"].lockAccount(f["StellarWallet"].secret(e.issuerSecret),"low").then(function(t){r["a"].debugLog("locked!")
r["a"].debugLog(t)
return null})["catch"](function(t){r["a"].debugLog(t)})}},deleteTokenProjectConfirmed:function t(){this.tokenProjects.splice(this.projectIndex,1)
this.saveProjects()
this.updateProjectIndex(0)},deleteTokenProject:function t(){this.confirmDialogPing=!this.confirmDialogPing},updateProjectIndex:function t(e){this.projectIndex=e
this.summaryMap=[]
var n=this.currentProject()
if(n){this.setAccountsTag(n.symbol)
this.showSummary=true
this.summaryMap.push({title:"Symbol",content:n.symbol},{title:"Issuer",content:n.issuer},{title:"Issuer Secret",content:n.issuerSecret,secret:true},{title:"Distributor",content:n.distributor},{title:"Distributor Secret",content:n.distributorSecret,secret:true},{title:"Burn",content:n.burn})}else{this.setAccountsTag(null)
this.showSummary=false}},currentProject:function t(){if(this.tokenProjects.length>0){if(this.projectIndex>=this.tokenProjects.length){this.updateProjectIndex(0)}return this.tokenProjects[this.projectIndex]}return null},keyString:function t(){var e=""
var n=!v["a"].isTestnet()
var a=this.currentProject()
var i=n?"(mainnet)":"(testnet)"
var o="\n\n"
e+="Stellar token keys: "+i
for(var r in a){e+=o
e+=r+": "+a[r]}return e},saveToFile:function t(){var e=this.keyString()
var n=new Blob([e],{type:"text/plain;charset=utf-8"})
V.saveAs(n,"stellar-token-keys.txt")},printInfo:function t(){var e=this
this.printing=true
this.$nextTick(function(){e.printTokenInfo(N(".summary-list"))
e.printing=false})},createToken:function t(){this.model=new B["a"]
this.model.fundingMessage="Choose an account to pay the transaction fee"
this.model.textValueLabel="Home domain (optional)"
this.model.textValueHint="www.example-site.com"
this.createDialogPing=!this.createDialogPing},createDialogResult:function t(e,n,a,i){this.tokenProjects.push({symbol:a.getCode(),issuer:e.publicKey(),issuerSecret:e.secret(),distributor:n.publicKey(),distributorSecret:n.secret(),burn:i?i.publicKey():""})
this.updateProjectIndex(this.tokenProjects.length-1)
this.saveProjects()},saveProjects:function t(){W["a"].set("token-projects",this.tokenProjects)},loadProjects:function t(){return W["a"].get("token-projects")},displayToken:function t(e){this.updateProjectIndex(e)},manageOffer:function t(){this.model=new B["a"]
this.model.sourceAccount=s["a"].accountWithPublicKey(this.currentProject().distributor)
this.model.setSellingAsset(new z.Asset(this.currentProject().symbol,this.currentProject().issuer))
this.offerDialogPing=!this.offerDialogPing},sendTokens:function t(){this.model=new B["a"]
this.model.sourceAccount=s["a"].accountWithPublicKey(this.currentProject().distributor)
this.model.setAsset(new z.Asset(this.currentProject().symbol,this.currentProject().issuer))
this.sendAssetsDialogPing=!this.sendAssetsDialogPing},createUserAccount:function t(){this.model=new B["a"]
this.model.sourceAccount=s["a"].accountWithPublicKey(this.currentProject().distributor)
this.model.fundingMessage="Choose an account to pay the transaction fee"
this.model.setAsset(new z.Asset(this.currentProject().symbol,this.currentProject().issuer))
this.accountDialogPing=!this.accountDialogPing},showOffers:function t(){this.model=new B["a"]
this.model.sourceAccount=s["a"].accountWithPublicKey(this.currentProject().distributor)
this.showOffersDialogPing=!this.showOffersDialogPing},lockIssuer:function t(){this.confirmLockDialogPing=!this.confirmLockDialogPing},projectsMenuClick:function t(e,n){switch(n){case"create":this.createToken()
break
default:this.displayToken(e)
break}}}}
var R=$
var H=n(1070)
var U=Object(k["a"])(R,a,i,false,null,"09f88f96",null)
var X=e["a"]=U.exports},468:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("instructions-header",[n("div",[t._v("Content coming soon...")])]),t._v(" "),n("div",{staticClass:"top-controls"},[n("v-autocomplete",{attrs:{"hide-details":"",items:t.accountsUI,"item-text":"name",clearable:"",label:"Source account","return-object":"","menu-props":{maxHeight:"600"}},model:{value:t.selectedSource,callback:function(e){t.selectedSource=e},expression:"selectedSource"}}),t._v(" "),n("div",{staticClass:"address-box"},[n("v-menu",{attrs:{"offset-y":"",transition:false}},[n("v-btn",{attrs:{slot:"activator",small:"",ripple:false},slot:"activator"},[t._v("\n          "+t._s(t.buttonTitle)+"\n          "),n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},t._l(t.items,function(e){return n("v-list-tile",{key:e.title,on:{click:function(n){return t.menuClick(e.menuID)}}},[n("v-list-tile-title",[t._v(t._s(e.title))])],1)}),1)],1),t._v(" "),n("v-menu",{attrs:{"offset-y":"",transition:false}},[n("v-btn",{attrs:{slot:"activator",small:"",ripple:false},slot:"activator"},[t._v("\n          "+t._s(t.orderButtonTitle)+"\n          "),n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},t._l(t.orderItems,function(e){return n("v-list-tile",{key:e.title,on:{click:function(n){return t.orderMenuClick(e.menuID)}}},[n("v-list-tile-title",[t._v(t._s(e.title))])],1)}),1)],1),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.transactionsForSelectedSource()}}},[t._v("Transactions")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.paymentsForSelectedSource()}}},[t._v("Payments")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.operationsForSelectedSource()}}},[t._v("Operations")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.effectsForSelectedSource()}}},[t._v("Effects")])],1),t._v(" "),n("div",{staticClass:"button-row"},[n("v-btn",{attrs:{icon:"",small:"",color:"secondary"},on:{click:function(e){return t.previous()}}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Previous")])],1)],1),t._v(" "),n("v-btn",{attrs:{icon:"",small:"",color:"secondary"},on:{click:function(e){return t.next()}}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Next")])],1)],1),t._v(" "),t.displayIndex>=0?n("div",{staticClass:"display-index"},[t._v("Index "+t._s(t.displayIndex))]):t._e()],1)],1)],1)}
var i=[]
var o=n(23)
var r=n(2)
var s=n(0)
function l(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function c(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function u(t,e,n){if(e)c(t.prototype,e)
if(n)c(t,n)
return t}var d=function(){function t(e,n,a){l(this,t)
this.type=e
this.order=a
this.records=[]
this.index=-1
this.pagingToken=0
this.publicKey=n
this.reachedEnd=false
this.loading=false}u(t,[{key:"recordForIndex",value:function t(e){if(e>=0&&e<this.records.length){this.index=e}else{if(e>0){this.index=this.records.length-1}else{this.index=0}}if(this.records.length>0){var n=this.records[this.index]
var a={index:this.index,record:n}
return a}return{}}},{key:"getCurrentPage",value:function t(e){var n=this
return new Promise(function(t,a){if(e){var i=n.index+1
if(i>=n.records.length){if(n.reachedEnd){t(n.recordForIndex(i))}else{return n.loadNextPage().then(function(){t(n.recordForIndex(i))})}}else{t(n.recordForIndex(i))}}else{var o=n.index-1
t(n.recordForIndex(o))}})}},{key:"next",value:function t(){return this.getCurrentPage(true)}},{key:"previous",value:function t(){return this.getCurrentPage(false)}},{key:"loadNextPage",value:function t(){var e=this
return new Promise(function(t,n){if(e.loading){console.log("loading")
t(null)}else{e.loading=true
var a
switch(e.type){case"payments":a=r["a"].server().payments()
break
case"transactions":a=r["a"].server().transactions()
break
case"operations":a=r["a"].server().operations()
break
case"effects":a=r["a"].server().effects()
break
default:break}a.limit(4).order(e.order)
if(e.pagingToken!==0){a.cursor(e.pagingToken)}a.forAccount(e.publicKey)
return a.call().then(function(n){if(n.records.length>0){e.records=e.records.concat(n.records)
var a=n.records.length-1
e.pagingToken=n.records[a].paging_token}else{s["a"].debugLog("reached end")
e.reachedEnd=true}e.loading=false
t(null)})["catch"](function(t){e.loading=false
s["a"].debugLog(t,"Error")
n(null)})}})}}])
return t}()
var f=n(36)
var v=n(6)
var p={mixins:[o["a"]],components:{"instructions-header":f["a"]},data:function t(){return{selectedSource:null,mode:"transactions",cache:null,displayIndex:-1,order:"desc",items:[{title:"Transactions",menuID:"transactions"},{title:"Operations",menuID:"operations"},{title:"Payments",menuID:"payments"},{title:"Effects",menuID:"effects"}],orderItems:[{title:"Ascending Order",menuID:"asc"},{title:"Decending Order",menuID:"desc"}]}},watch:{selectedSource:function t(){this.clearUI()
s["a"].clearLog()}},computed:{buttonTitle:function t(){var e="Unknown"
switch(this.mode){case"transactions":e="Transactions"
break
case"payments":e="Payments"
break
case"operations":e="Operations"
break
case"effects":e="Effects"
break
default:break}return e},orderButtonTitle:function t(){var e="Unknown"
switch(this.order){case"asc":e="Ascending Order"
break
case"desc":e="Descending Order"
break
default:break}return e}},methods:{operationsForSelectedSource:function t(){var e=this.sourceWallet()
if(e){r["a"].operationsForWallet(e,this.order)}},paymentsForSelectedSource:function t(){var e=this.sourceWallet()
if(e){r["a"].paymentsForWallet(e,this.order)}},transactionsForSelectedSource:function t(){var e=this.sourceWallet()
if(e){r["a"].transactionsForWallet(e,this.order)}},effectsForSelectedSource:function t(){var e=this.sourceWallet()
if(e){r["a"].effectsForWallet(e,this.order)}},clearUI:function t(){this.cache=null
this.displayIndex=-1
s["a"].clearLog()},menuClick:function t(e){this.mode=e
this.clearUI()},orderMenuClick:function t(e){this.order=e
this.clearUI()},sourceWallet:function t(){if(this.sourceValid()){return v["StellarWallet"]["public"](this.selectedSource.publicKey)}return null},sourceValid:function t(){var e=this.selectedSource?this.selectedSource.publicKey:null
if(s["a"].strlen(e)>0){return true}s["a"].debugLog("please select a source account","Error")
s["a"].toast("Please select a source account",true)
return false},streamingCache:function t(){if(this.sourceValid()){if(!this.cache){this.cache=new d(this.mode,this.selectedSource.publicKey,this.order)}return this.cache}return null},displayResult:function t(e){if(e){s["a"].clearLog()
this.displayIndex=e.index
s["a"].debugLog(e.record)}},next:function t(){var e=this
var n=this.streamingCache()
if(n){return n.next().then(function(t){e.displayResult(t)})["catch"](function(t){s["a"].debugLog(t)})}},previous:function t(){var e=this
var n=this.streamingCache()
if(n){return n.previous().then(function(t){e.displayResult(t)})["catch"](function(t){s["a"].debugLog(t)})}}}}
var h=p
var g=n(1074)
var m=n(4)
var b=Object(m["a"])(h,a,i,false,null,"40f46012",null)
var y=e["a"]=b.exports},469:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("account-list",{attrs:{items:t.accountsUI}}),t._v(" "),n("instructions-header",[n("div",[t._v("Content coming soon...")])]),t._v(" "),n("div",{staticClass:"main-container"},[t._m(0),t._v(" "),n("div",{staticClass:"bifrost-params"},[n("v-text-field",{attrs:{"hide-details":"",label:"Horizon IP Address"},model:{value:t.horizonIP,callback:function(e){t.horizonIP=typeof e==="string"?e.trim():e},expression:"horizonIP"}}),t._v(" "),n("v-text-field",{attrs:{"hide-details":"",label:"Bifrost IP Address"},model:{value:t.biforstIP,callback:function(e){t.biforstIP=typeof e==="string"?e.trim():e},expression:"biforstIP"}}),t._v(" "),n("v-text-field",{attrs:{"hide-details":"",label:"Network"},model:{value:t.network,callback:function(e){t.network=typeof e==="string"?e.trim():e},expression:"network"}})],1),t._v(" "),n("div",{staticClass:"button-group",staticStyle:{"margin-top":"20px"}},[n("v-btn",{attrs:{round:"",small:"",color:"primary"},on:{click:t.showDialog}},[t._v("Buy Token")]),t._v(" "),n("v-btn",{attrs:{round:"",small:"",color:"primary"},on:{click:function(e){t.transactionDialogPing=!t.transactionDialogPing}}},[t._v("Submit Transaction")])],1)]),t._v(" "),n("buy-token-dialog",{attrs:{ping:t.showDialogPing,params:t.params},on:{"new-account":t.newAccount}}),t._v(" "),n("transaction-dialog",{attrs:{ping:t.transactionDialogPing}})],1)}
var i=[function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"bifrost-notes"},[n("div",[t._v("This is only going to work if you have setup a local server with Bifrost, BTC and ETH servers configured.")]),t._v(" "),n("div",[t._v("\n        See\n        "),n("a",{attrs:{href:"https://github.com/StellarKit",target:"_blank"}},[t._v("https://github.com/StellarKit")]),t._v(" for docker images to test on testnet.\n      ")])])}]
var o=n(7)
var r=n(23)
var s=n(36)
var l=n(227)
var c=n(52)
var u=n(11)
var d=n(35)
var f=n.n(d)
var v={mixins:[r["a"]],data:function t(){return{showDialogPing:false,transactionDialogPing:false,params:null,horizonIP:"192.168.1.82:8000",biforstIP:"192.168.1.82:8800",network:"test"}},components:{BuyTokenDialog:o["BuyTokenDialog"],InstructionsHeader:s["a"],TransactionDialog:l["a"],AccountList:c["a"]},methods:{newAccount:function t(e){var n=f.a.Keypair.fromSecret(e)
u["a"].addAccount(n)},showDialog:function t(){var e=window.location.protocol
this.params={network:this.network,horizonURL:e+"//"+this.horizonIP,bifrostURL:e+"//"+this.biforstIP,horizonAllowHttp:e!=="https:"}
this.showDialogPing=!this.showDialogPing}}}
var p=v
var h=n(1060)
var g=n(4)
var m=Object(g["a"])(p,a,i,false,null,"7e95a1ec",null)
var b=e["a"]=m.exports},470:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("account-list",{attrs:{items:t.accountsUI}}),t._v(" "),n("instructions-header",[n("div",[t._v("Content coming soon...")])]),t._v(" "),n("div",{staticClass:"top-controls"},[n("div",{staticClass:"address-box"},[n("v-select",{attrs:{items:t.accountsUI,"item-text":"name",clearable:"",label:"Source account",autocomplete:"","return-object":"","max-height":"600"},model:{value:t.selectedSource,callback:function(e){t.selectedSource=e},expression:"selectedSource"}})],1),t._v(" "),n("div",[t._v("1. First setup a Token on the Create Token Tutorial tab")]),t._v(" "),n("div",[t._v("2. Set Source account to Issuer, then set or clear flags to test AuthRequiredFlag")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.setAuthRequiredFlag()}}},[t._v("Set AuthRequiredFlag")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.setAuthRevocableFlag()}}},[t._v("Set AuthRevocableFlag")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.clearFlags()}}},[t._v("Clear Flags")]),t._v(" "),n("div",[t._v("Set Source account to a new account, Click Set Trust, and try to buy Token. It will fail if AuthRequiredFlag set unless you allow trust.")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.allowTrust(true)}}},[t._v("Enable Trust For Account")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.allowTrust(false)}}},[t._v("Disable Trust For Account")]),t._v(" "),n("div",[t._v("Set Source account, trust asset, try to buy.")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.changeTrust()}}},[t._v("Trust Asset")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.buyToken()}}},[t._v("Buy Token")])],1)],1)}
var i=[]
var o=n(23)
var r=n(52)
var s=n(0)
var l=n(11)
var c=n(2)
var u=n(6)
var d=n(36)
var f=n(35)
var v={mixins:[o["a"]],components:{"account-list":r["a"],"instructions-header":d["a"]},data:function t(){return{selectedSource:null}},mounted:function t(){c["a"].updateBalances()},methods:{sourceValid:function t(){var e=this.selectedSource?this.selectedSource.publicKey:null
if(s["a"].strlen(e)>0){return true}return false},allowTrust:function t(e){if(this.sourceValid()){var n=this.issuer()
if(n){c["a"].allowTrust(u["StellarWallet"].secret(n.secret),u["StellarWallet"]["public"](this.selectedSource.publicKey),l["a"].lamboTokenAsset(),e).then(function(t){s["a"].debugLog(t,"Success")})["catch"](function(t){s["a"].debugLog(t,"Error")})}else{s["a"].debugLog("Error: no issuer account")}}else{s["a"].debugLog("Error: no source account selected")}},changeTrust:function t(){if(this.sourceValid()){c["a"].changeTrust(u["StellarWallet"].secret(this.selectedSource.secret),null,l["a"].lamboTokenAsset(),"10000").then(function(t){s["a"].debugLog(t,"Success")
c["a"].updateBalances()})["catch"](function(t){s["a"].debugLog(t,"Error")})}else{s["a"].debugLog("Error: no source account selected")}},setAuthRequiredFlag:function t(){s["a"].debugLog("setAuthRequiredFlag...")
if(this.sourceValid()){c["a"].setFlags(u["StellarWallet"].secret(this.selectedSource.secret),f.AuthRequiredFlag).then(function(t){s["a"].debugLog(t,"Success")})["catch"](function(t){s["a"].debugLog(t,"Error")})}else{s["a"].debugLog("Error: no source account selected")}},setAuthRevocableFlag:function t(){s["a"].debugLog("setAuthRevocableFlag...")
if(this.sourceValid()){c["a"].setFlags(u["StellarWallet"].secret(this.selectedSource.secret),f.AuthRevocableFlag).then(function(t){s["a"].debugLog(t,"Success")})["catch"](function(t){s["a"].debugLog(t,"Error")})}else{s["a"].debugLog("Error: no source account selected")}},clearFlags:function t(){s["a"].debugLog("clearing flags...")
if(this.sourceValid()){c["a"].clearFlags(u["StellarWallet"].secret(this.selectedSource.secret),f.AuthRequiredFlag|f.AuthRevocableFlag).then(function(t){s["a"].debugLog(t,"Success")})["catch"](function(t){s["a"].debugLog(t,"Error")})}else{s["a"].debugLog("Error: no source account selected")}},buyToken:function t(){s["a"].debugLog("Buying tokens...")
if(this.sourceValid()){c["a"].buyTokens(u["StellarWallet"].secret(this.selectedSource.secret),c["a"].lumins(),l["a"].lamboTokenAsset(),"1000","2.22").then(function(t){s["a"].debugLog(t)
c["a"].updateBalances()})["catch"](function(t){s["a"].debugLog(t)})}else{s["a"].debugLog("Error: no source account selected")}}}}
var p=v
var h=n(1062)
var g=n(4)
var m=Object(g["a"])(p,a,i,false,null,"24b3a3ca",null)
var b=e["a"]=m.exports},471:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("account-list",{attrs:{items:t.accountsUI}}),t._v(" "),n("instructions-header",[n("div",{staticClass:"instructions"},[n("div",[t._v("\n        Many ICOs require a lock-up period for assets after they are sold, even if just for the duration of the public sale. While there are various ways to achieve this in Stellar, we recommend using a multisig escrow account.\n      ")]),t._v(" "),n("div",[t._v("\n        We recommend using a multisig escrow account. To implement this, rather than directly sending sold assets to the buyer, they are placed in an account with two signees: the buyer and the issuer. Together, they sign a time-locked transaction to remove the\n        issuer as a signer at a predetermined time. Both the buyer and the issuer will retain a copy of this transaction, which can be submitted to the network by any party after the lockup period.\n      ")]),t._v(" "),n("div",[t._v("\n        This mechanism provides assurance to the buyer that the tokens will indeed be unlocked after the unlock period.\n      ")]),t._v(" "),n("div",[n("strong",[t._v("Note:")]),t._v(" The AUTH REVOCABLE flag is a "),n("strong",[t._v("problematic")]),t._v(" mechanism because it does not provide the user any guarantees with regard to when or if the assets will be unlocked.\n      ")])])]),t._v(" "),n("div",{staticClass:"top-controls"},[n("div",[t._v("First setup a Token on the Create Token Tutorial tab")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.createAccountWithLockedTokens()}}},[t._v("Create Account with Locked Tokens")]),t._v(" "),n("div",{staticClass:"address-box"},[n("v-select",{attrs:{"hide-details":"",items:t.accountsUI,"item-text":"name",clearable:"",label:"Source account",autocomplete:"","return-object":"","max-height":"600"},model:{value:t.selectedSource,callback:function(e){t.selectedSource=e},expression:"selectedSource"}})],1),t._v(" "),n("div",{staticClass:"button-group"},[n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.createUnlockTransaction()}}},[t._v("Create Unlock Transaction")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.viewTransaction()}}},[t._v("View Transaction")]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.submitTransaction()}}},[t._v("Submit Transaction")])],1)],1),t._v(" "),n("transaction-dialog",{attrs:{ping:t.dialogPing,transaction:t.signedTransaction}})],1)}
var i=[]
var o=n(23)
var r=n(52)
var s=n(227)
var l=n(0)
var c=n(11)
var u=n(2)
var d=n(6)
var f=n(36)
var v=n(35)
var p={mixins:[o["a"]],components:{"account-list":r["a"],"transaction-dialog":s["a"],"instructions-header":f["a"]},data:function t(){return{selectedSource:null,signedTransaction:null,dialogPing:false}},mounted:function t(){u["a"].updateBalances()},methods:{sourceValid:function t(){var e=this.selectedSource?this.selectedSource.publicKey:null
if(l["a"].strlen(e)>0){return true}l["a"].debugLog("please select a source account","Error")
return false},submitTransaction:function t(){if(this.signedTransaction){var e=v.xdr.TransactionEnvelope.fromXDR(this.signedTransaction,"base64")
var n=new v.Transaction(e)
u["a"].submitTransaction(n).then(function(t){l["a"].debugLog(t)
u["a"].updateBalances()
l["a"].toast("Success!")
return null})["catch"](function(t){l["a"].debugLog(t)})}else{l["a"].debugLog("No transactions available")}},viewTransaction:function t(){if(this.signedTransaction){this.dialogPing=!this.dialogPing
l["a"].debugLog(this.signedTransaction)}else{l["a"].debugLog("No transactions available")}},timeFromNow:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0
return e+Math.round((new Date).getTime()/1e3)},printTimeStamp:function t(){function e(t){var e=new Date(t*1e3)
return e.toGMTString()+"\n"+e.toLocaleTimeString()}l["a"].debugLog(e(this.timeFromNow()))},createUnlockTransaction:function t(){var e=this
var n=this.distributor()
if(n&&this.sourceValid()){var a=10
var i={timebounds:{minTime:this.timeFromNow(a).toString(),maxTime:"0"}}
u["a"].removeMultiSigTransaction(d["StellarWallet"].secret(this.selectedSource.secret),d["StellarWallet"].secret(n.secret),i).then(function(t){e.signedTransaction=t.toEnvelope().toXDR("base64")
l["a"].debugLog(e.signedTransaction,"Success")
l["a"].debugLog("You can submit the transaction in "+a+" seconds")
l["a"].toast("Transaction valid in "+a+" seconds")
u["a"].updateBalances()
return t})["catch"](function(t){l["a"].debugLog(t,"Error")})}},createAccountWithLockedTokens:function t(){var e=this.distributor()
if(e){var n=d["StellarWallet"].secret(e.secret)
u["a"].newAccountWithTokens(null,n,"3",c["a"].lamboTokenAsset(),"12").then(function(t){l["a"].debugLog(t.account)
l["a"].debugLog("adding distributor as signer...")
return u["a"].makeMultiSig(d["StellarWallet"].secret(t.keypair.secret()),d["StellarWallet"].secret(e.secret))}).then(function(t){l["a"].debugLog("Account is ready","Success")
l["a"].toast("Account is ready")
u["a"].updateBalances()
return t})["catch"](function(t){l["a"].debugLog(t,"Error")})}}}}
var h=p
var g=n(1064)
var m=n(4)
var b=Object(m["a"])(h,a,i,false,null,"d22c403a",null)
var y=e["a"]=b.exports},472:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[t.password==="secret"?n("div",[n("account-list",{attrs:{items:t.accountsUI}}),t._v(" "),n("instructions-header",[n("div",[t._v("Content coming soon...")])]),t._v(" "),n("div",{staticClass:"main-container"})],1):n("div",{staticClass:"password-field"},[n("v-text-field",{attrs:{label:"Password",placeholder:"Password",hint:"Password"},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")){return null}return t.checkPassword(e)}},model:{value:t.enteredPassword,callback:function(e){t.enteredPassword=typeof e==="string"?e.trim():e},expression:"enteredPassword"}})],1)])}
var i=[]
var o=n(23)
var r=n(36)
var s=n(52)
var l=n(21)
var c={mixins:[o["a"]],data:function t(){return{password:"",enteredPassword:""}},components:{"account-list":s["a"],"instructions-header":r["a"]},mounted:function t(){this.password=l["a"].get("experiments-password")},methods:{checkPassword:function t(){this.password=this.enteredPassword
l["a"].set("experiments-password",this.password)}}}
var u=c
var d=n(1072)
var f=n(4)
var v=Object(f["a"])(u,a,i,false,null,"0471f966",null)
var p=e["a"]=v.exports},473:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("instructions-header",[n("div",[t._v("Content coming soon...")])]),t._v(" "),n("div",{staticClass:"accounts-box"},[n("v-checkbox",{attrs:{label:"Stream All Accounts","hide-details":""},model:{value:t.everyAccount,callback:function(e){t.everyAccount=e},expression:"everyAccount"}}),t._v(" "),!t.everyAccount?n("v-select",{attrs:{"hide-details":"",items:t.accountsUI,"item-text":"name",label:"Source account","return-object":"","menu-props":{maxHeight:"600"}},model:{value:t.selectedSource,callback:function(e){t.selectedSource=e},expression:"selectedSource"}}):t._e()],1),t._v(" "),n("div",{staticClass:"button-group"},[n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.streamPayments()}}},[t._v(t._s(t.paymentsButtonName))]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.streamOperations()}}},[t._v(t._s(t.operationsButtonName))]),t._v(" "),n("v-btn",{attrs:{round:"",small:""},on:{click:function(e){return t.streamTrades()}}},[t._v(t._s(t.tradesButtonName))])],1),t._v(" "),n("div",{staticClass:"operations-content"},[n("div",{staticClass:"operations-title"},[t._v("Live Stream")]),t._v(" "),t._l(t.operations,function(e){return n("div",{key:e.id+e.name,staticClass:"operations-item"},[n("a",{staticClass:"item-name",attrs:{href:e.link,target:"_blank"}},[t._v(t._s(e.name)+":")]),t._v(" "),n("a",{staticClass:"item-value",attrs:{href:e.link,target:"_blank"}},[t._v(t._s(e.value))])])})],2)],1)}
var i=[]
var o=n(23)
var r=n(0)
var s=n(2)
var l=n(36)
var c=n(6)
var u={mixins:[o["a"]],data:function t(){return{paymentStopper:null,operationStopper:null,tradeStopper:null,operations:[],selectedSource:null,everyAccount:true}},components:{"instructions-header":l["a"]},watch:{selectedSource:function t(){this.clearUI()
r["a"].clearLog()},everyAccount:function t(){this.clearUI()
r["a"].clearLog()
this.restartStreams()}},computed:{paymentsButtonName:function t(){if(this.paymentStopper){return"Stop Payments"}return"Payments"},operationsButtonName:function t(){if(this.operationStopper){return"Stop Operations"}return"Operations"},tradesButtonName:function t(){if(this.tradeStopper){return"Stop Trades"}return"Trades"}},methods:{restartStreams:function t(){if(this.paymentStopper!==null){this.paymentStopper()
this.paymentStopper=null
this.streamPayments()}if(this.tradeStopper!==null){this.tradeStopper()
this.tradeStopper=null
this.streamTrades()}if(this.operationStopper!==null){this.operationStopper()
this.operationStopper=null
this.streamOperations()}},clearUI:function t(){this.operations=[]},publicKey:function t(){if(!this.everyAccount){if(this.sourceValid()){return this.selectedSource.publicKey}}return null},sourceWallet:function t(){if(this.sourceValid()){return c["StellarWallet"]["public"](this.selectedSource.publicKey)}return null},sourceValid:function t(){var e=this.selectedSource?this.selectedSource.publicKey:null
if(r["a"].strlen(e)>0){return true}r["a"].debugLog("please select a source account","Error")
r["a"].toast("Please select a source account",true)
return false},addOperation:function t(e,n){e.link=n._links.self.href
this.operations.unshift(e)
this.operations=this.operations.slice(0,12)},displayTransaction:function t(e){if(e.type==="payment"){var n="XLM"
if(e.asset_type!=="native"){n=e.asset_code}this.addOperation({id:e.id,name:"Payment "+n,value:r["a"].stripZeros(e.amount)},e)}else if(e.type==="payment_path"){var a="XLM"
if(e.asset_type!=="native"){a=e.asset_code}this.addOperation({id:e.id,name:"Payment path"+a+"/"+e.source_asset_code,value:r["a"].stripZeros(e.amount)},e)}else if(e.type==="create_account"){this.addOperation({id:e.id,name:"Create Account",value:r["a"].stripZeros(e.starting_balance)},e)}else if(e.type==="account_merge"){this.addOperation({id:e.id,name:"Account Merge",value:"merging"},e)}else if(e.type==="manage_offer"){var i="XLM"
var o="XLM"
if(e.buying_asset_type!=="native"){i=e.buying_asset_code}if(e.selling_asset_type!=="native"){o=e.selling_asset_code}this.addOperation({id:e.id,name:"Manage Offer",value:"Selling: "+o+" Buying: "+i},e)}else if(e.type==="change_trust"){var s="XLM"
if(e.asset_type!=="native"){s=e.asset_code}this.addOperation({id:e.id,name:"Change Trust",value:s},e)}else if(e.type==="set_options"){var l="unknown"
if(e.inflation_dest){l="Inflation dest = "+e.inflation_dest}this.addOperation({id:e.id,name:"Set Options",value:l},e)}else if(e.type==="allow_trust"){var c="XLM"
if(e.asset_type!=="native"){c=e.asset_code}this.addOperation({id:e.id,name:"Allow Trust",value:c},e)}else if(e.type==="manage_data"){this.addOperation({id:e.id,name:"Manage Data",value:"Name = "+e.name+" Value = "+e.value},e)}else{r["a"].debugLog(e)}},streamPayments:function t(){var e=this
if(this.paymentStopper!==null){r["a"].debugLog("stopping payment stream")
this.paymentStopper()
this.paymentStopper=null}else{r["a"].debugLog("listening for payments")
this.operations=[]
var n=s["a"].server().payments().cursor("now")
var a=this.publicKey()
if(a){n.forAccount(a)}this.paymentStopper=n.stream({onmessage:function t(n){e.displayTransaction(n)},onerror:function t(e){if(e["isTrusted"]===true){}else{r["a"].debugLog(e,"onerror")}}})}},streamOperations:function t(){var e=this
if(this.operationStopper!==null){r["a"].debugLog("stopping operation stream")
this.operationStopper()
this.operationStopper=null}else{r["a"].debugLog("listening for operations")
this.operations=[]
var n=s["a"].server().operations().cursor("now")
var a=this.publicKey()
if(a){n.forAccount(a)}this.operationStopper=n.stream({onmessage:function t(n){e.displayTransaction(n)},onerror:function t(e){if(e["isTrusted"]===true){}else{r["a"].debugLog(e,"onerror")}}})}},streamTrades:function t(){var e=this
if(this.tradeStopper!==null){r["a"].debugLog("stopping trade stream")
this.tradeStopper()
this.tradeStopper=null}else{r["a"].debugLog("listening for trades")
this.operations=[]
var n=s["a"].server().trades().cursor("now")
var a=this.publicKey()
if(a){n.forAccount(a)}this.tradeStopper=n.stream({onmessage:function t(n){e.displayTransaction(n)},onerror:function t(e){if(e["isTrusted"]===true){}else{r["a"].debugLog(e,"onerror")}}})}},nextAssetPage:function t(e){var n=this
e.next().then(function(t){var e=true
var a=false
var i=undefined
try{for(var o=t.records[Symbol.iterator](),s;!(e=(s=o.next()).done);e=true){var l=s.value
if(parseFloat(l.amount)>0){r["a"].debugLog(l.asset_code+" "+l.amount)}}}catch(t){a=true
i=t}finally{try{if(!e&&o["return"]!=null){o["return"]()}}finally{if(a){throw i}}}n.nextAssetPage(t)})},assets:function t(){var e=this
if(this.assetStopper){r["a"].debugLog("stopping assets")
this.assetStopper()
this.assetStopper=null}else{r["a"].debugLog("Assets")
var n=s["a"].server().assets().order("desc")
var a=this.publicKey()
if(a){n.forAccount(a)}n.call().then(function(t){var n=true
var a=false
var i=undefined
try{for(var o=t.records[Symbol.iterator](),s;!(n=(s=o.next()).done);n=true){var l=s.value
if(parseFloat(l.amount)>0){r["a"].debugLog(l.asset_code+" "+l.amount)}}}catch(t){a=true
i=t}finally{try{if(!n&&o["return"]!=null){o["return"]()}}finally{if(a){throw i}}}e.nextAssetPage(t)})}}}}
var d=u
var f=n(1076)
var v=n(4)
var p=Object(v["a"])(d,a,i,false,null,"488db704",null)
var h=e["a"]=p.exports},475:function(t,e,n){n(476)
t.exports=n(654)},52:function(t,e,n){"use strict"
var a=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"main-container"},[n("div",{staticClass:"add-button"},[t.isTestnet()?n("v-menu",{attrs:{"offset-y":"",transition:false}},[n("v-btn",{attrs:{slot:"activator",icon:"",dark:""},slot:"activator"},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Create new account")])],1)],1),t._v(" "),n("v-list",{attrs:{dense:""}},[n("v-list-tile",{on:{click:function(e){return t.accountMenu("test")}}},[n("v-list-tile-title",[t._v("Create New Testnet Account")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.accountMenu("other")}}},[n("v-list-tile-title",[t._v("More Options...")])],1)],1)],1):n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){return t.accountMenu("other")}}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Create new account")])],1)],1)],1),t._v(" "),n("v-btn",{staticClass:"refresh-button",attrs:{icon:"",dark:""},on:{click:function(e){return t.refresh()}}},[n("v-tooltip",{attrs:{"open-delay":"800",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Refresh account balances")])],1)],1),t._v(" "),n("div",{staticClass:"accounts-title"},[t._v("Accounts - Click for Info")]),t._v(" "),t.items.length===0?n("div",{staticClass:"zero-accounts"},[t._v("\n    Create an account\n  ")]):n("transition-group",{staticClass:"accounts",attrs:{name:"list",tag:"div"}},t._l(t.items,function(e){return n("div",{key:e.publicKey,staticClass:"account-item",on:{click:function(n){n.stopPropagation()
return t.clickItem(e)}}},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("div",{attrs:{slot:"activator"},slot:"activator"},[n("div",{staticClass:"account-name"},[t._v(t._s(e.name))]),t._v(" "),t._l(t.balancesForItem(e),function(e){return n("div",{key:e.issuer+e.symbol},[t._v("\n            "+t._s(e.symbol)+": "+t._s(e.amount)+"\n          ")])})],2),t._v(" "),n("span",[t._v(t._s(e.publicKey))])]),t._v(" "),n("div",{staticClass:"action-button-holder"},[n("actions-menu",{attrs:{small:true,publicKey:e.publicKey}})],1),t._v(" "),n("v-btn",{staticClass:"delete-button",attrs:{icon:"",small:""},on:{click:function(n){n.stopPropagation()
return t.deleteItem(e)}}},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("")]),t._v(" "),n("span",[t._v("Remove account")])],1)],1)],1)}),0),t._v(" "),n("new-account-dialog",{attrs:{model:t.model,ping:t.newAccountDialogPing}}),t._v(" "),n("confirm-dialog",{attrs:{ping:t.confirmRemoveDialogPing,title:"Remove Account?",message:"Make sure you saved the secret key! You can later add this account back using the secret key.",okTitle:"Remove Account"},on:{"confirm-dialog-ok":t.removeAccountConfirmed}})],1)}
var i=[]
var o=n(0)
var r=n(2)
var s=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"600"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-titlebar",{attrs:{title:t.title,showBack:t.showBack},on:{close:function(e){t.visible=false},back:function(e){t.mode="start"}}}),t._v(" "),n("div",{staticClass:"help-contents"},[t.mode==="start"?n("div",{staticClass:"start-box"},[t.isTestnet()?n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",color:"primary"},on:{click:function(e){return t.buttonClick("testnet-account")}},slot:"activator"},[t._v("Free Testnet Account")]),t._v(" "),n("span",[t._v("Add a free testnet account")])],1):t._e(),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",color:"primary"},on:{click:function(e){return t.buttonClick("add-account")}},slot:"activator"},[t._v("Add Existing Account")]),t._v(" "),n("span",[t._v("Add existing account with a secret key")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",color:"primary"},on:{click:function(e){return t.buttonClick("create-account")}},slot:"activator"},[t._v("Create New Account")]),t._v(" "),n("span",[t._v("Create a new account with a source account's secret key")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",outline:""},on:{click:function(e){return t.buttonClick("import")}},slot:"activator"},[t._v("Import Accounts...")]),t._v(" "),n("span",[t._v("Import a .json file of account keys")])],1),t._v(" "),n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",outline:""},on:{click:function(e){return t.buttonClick("export")}},slot:"activator"},[t._v("Export Accounts...")]),t._v(" "),n("span",[t._v("Create a new account with a source account's secret key")])],1)],1):n("div",[t.mode==="add"?n("div",{staticClass:"choice-box"},[n("div",{staticClass:"note-text"},[t._v("Paste in the secret or public key of an existing account.")]),t._v(" "),n("dialog-accounts",{ref:"dialogAccountsAdd",attrs:{model:t.model,showSecret:true,showAccountName:true},on:{"enter-key-down":t.addExistingAccount,toast:t.displayToast}}),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loading},on:{click:t.addExistingAccount},slot:"activator"},[t._v("Add Account")]),t._v(" "),n("span",[t._v("Add account with key")])],1)],1)],1):t._e(),t._v(" "),t.mode==="secret"?n("div",{staticClass:"choice-box"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showFunding:true,showTextValue:true,showAccountName:true,showAmount:true},on:{"enter-key-down":t.createAccount,toast:t.displayToast}}),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loading},on:{click:t.createAccount},slot:"activator"},[t._v("Create Account")]),t._v(" "),n("span",[t._v("Add account with secret key")])],1)],1)],1):t._e(),t._v(" "),t.mode==="testnet"?n("div",{staticClass:"choice-box"},[n("dialog-accounts",{ref:"dialogAccounts",attrs:{model:t.model,showAccountName:true},on:{"enter-key-down":t.createTestnetAccount,toast:t.displayToast}}),t._v(" "),n("div",{staticClass:"button-holder"},[n("v-tooltip",{attrs:{"open-delay":"200",bottom:""}},[n("v-btn",{attrs:{slot:"activator",round:"",color:"primary",loading:t.loading},on:{click:t.createTestnetAccount},slot:"activator"},[t._v("Create Account")]),t._v(" "),n("span",[t._v("Add account with secret key")])],1)],1)],1):t._e()]),t._v(" "),n("save-secret-dialog",{attrs:{ping:t.saveSecretDialogPing,publicKey:t.newAccountPublicKey}}),t._v(" "),n("toast-component",{attrs:{absolute:true,location:"create-account-dialog",bottom:false,top:true}})],1)],1)])}
var l=[]
var c=n(7)
var u=n(11)
var d=n(12)
var f=n(23)
var v=n(118)
var p=n(19)
var h=n(33)
var g=n.n(h)
var m=n(35)
var b=n(177)
var y={mixins:[f["a"]],props:["ping","model"],components:{"dialog-titlebar":c["DialogTitleBar"],"toast-component":d["a"],"save-secret-dialog":v["a"],"dialog-accounts":p["a"]},data:function t(){return{visible:false,title:"Add/Create Account",loading:false,mode:"start",newAccountPublicKey:"",saveSecretDialogPing:false}},computed:{showBack:function t(){return this.mode!=="start"}},watch:{ping:function t(){this.visible=true
this.model.amountLabel="Starting balance in XLM"
this.mode="start"}},methods:{isTestnet:function t(){return r["a"].isTestnet()},dialogAccounts:function t(){return this.$refs.dialogAccounts},dialogAccountsAdd:function t(){return this.$refs.dialogAccountsAdd},buttonClick:function t(e){switch(e){case"add-account":this.mode="add"
break
case"create-account":this.mode="secret"
break
case"testnet-account":this.mode="testnet"
break
case"import":{var n=this
var a=g()('<input type="file">')
var i=a[0]
a.on("change",function(){n.importAccounts(i.files)}).click()}break
case"export":this.exportAccounts()
break
default:break}},exportAccounts:function t(){var e={accounts:[]}
var n=true
var a=false
var i=undefined
try{for(var o=u["a"].accounts()[Symbol.iterator](),r;!(n=(r=o.next()).done);n=true){var s=r.value
var l={}
l.name=s.name
l.secret=s.secret
l.publicKey=s.publicKey
e.accounts.push(l)}}catch(t){a=true
i=t}finally{try{if(!n&&o["return"]!=null){o["return"]()}}finally{if(a){throw i}}}var c=JSON.stringify(e,null,"  ")
var d=new Blob([c],{type:"text/plain;charset=utf-8"})
b.saveAs(d,"accounts.json")},importAccounts:function t(e){if(e.length===1){var n=e[0]
var a=new FileReader
a.addEventListener("load",function(t){var e=JSON.parse(t.target.result)
var n=true
var a=false
var i=undefined
try{for(var s=e.accounts[Symbol.iterator](),l;!(n=(l=s.next()).done);n=true){var c=l.value
var d=void 0
if(o["a"].strOK(c.secret)){d=m.Keypair.fromSecret(c.secret)}else if(o["a"].strOK(c.publicKey)){d=m.Keypair.fromPublicKey(c.publicKey)}u["a"].addAccount(d,c.name)}}catch(t){a=true
i=t}finally{try{if(!n&&s["return"]!=null){s["return"]()}}finally{if(a){throw i}}}r["a"].updateBalances()})
a.readAsBinaryString(n)}},addExistingAccount:function t(){var e=this.dialogAccountsAdd().accountName()
var n=this.dialogAccountsAdd().secretKey()
var a=this.dialogAccountsAdd().publicKey()
if(o["a"].strOK(e)){var i=null
if(o["a"].strOK(n)){try{i=m.Keypair.fromSecret(n)}catch(t){o["a"].debugLog(t)
o["a"].toast("Key is invalid!",true)}}if(o["a"].strOK(a)){try{i=m.Keypair.fromPublicKey(a)}catch(t){o["a"].debugLog(t)
o["a"].toast("Key is invalid!",true)}}if(i){var s=u["a"].addAccount(i,e)
if(s){this.displayToast("Account Added!")
r["a"].updateBalances()}else{this.displayToast("Account already exists!",true)}}}},createTestnetAccount:function t(){var e=this
var n=this.dialogAccounts().accountName()
this.loading=true
r["a"].createTestAccount(n).then(function(t){o["a"].debugLog(t)
e.visible=false})["catch"](function(t){o["a"].debugLog(t,"Error")})["finally"](function(){e.loading=false})},createAccount:function t(){var e=this
var n=this.dialogAccounts().fundingWallet(true)
var a=this.dialogAccounts().accountName()
var i=this.dialogAccounts().amount()
var s=this.dialogAccounts().textValue()
if(n){this.loading=true
r["a"].newAccount(n,String(i),a,null,s).then(function(t){e.accountCreated(t)})["catch"](function(t){o["a"].debugLog(t)
e.displayToast("Error",true)})["finally"](function(){e.loading=false})}},accountCreated:function t(e){var n=this
this.displayToast("Account Created! Save the secret key!")
r["a"].updateBalances()
o["a"].debugLog("New Account")
o["a"].debugLog(e.keypair.publicKey())
o["a"].debugLog(e.keypair.secret())
setTimeout(function(){n.newAccountPublicKey=e.keypair.publicKey()
n.saveSecretDialogPing=!n.saveSecretDialogPing},1e3)},displayToast:function t(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
o["a"].toast(e,n,"create-account-dialog")}}}
var x=y
var k=n(1017)
var w=n(4)
var _=Object(w["a"])(x,s,l,false,null,"0e7aa3c5",null)
var A=_.exports
var S=n(73)
var T=n(224)
var C=n(44)
var P=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",[n("v-menu",{attrs:{"offset-y":""},nativeOn:{click:function(t){t.stopPropagation()}}},[n("v-btn",{class:{"small-button":t.small},attrs:{slot:"activator",icon:"",small:t.small},slot:"activator"},[n("v-icon",[t._v("")])],1),t._v(" "),n("v-list",{attrs:{dense:""}},[n("v-list-tile",{on:{click:function(e){return t.actionMenu("show-offers")}}},[n("v-list-tile-title",[t._v("Show Offers")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.actionMenu("post-offer")}}},[n("v-list-tile-title",[t._v("Post Offer")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.actionMenu("send-asset")}}},[n("v-list-tile-title",[t._v("Send Asset")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.actionMenu("save-keys")}}},[n("v-list-tile-title",[t._v("Save/Print Keys")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.actionMenu("trust-asset")}}},[n("v-list-tile-title",[t._v("Trust Asset")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.actionMenu("allow-trust")}}},[n("v-list-tile-title",[t._v("Allow Trust")])],1),t._v(" "),n("v-list-tile",{on:{click:function(e){return t.actionMenu("history")}}},[n("v-list-tile-title",[t._v("Show History")])],1)],1)],1),t._v(" "),n("history-dialog",{attrs:{ping:t.historyDialogPing,publicKey:t.publicKey}}),t._v(" "),n("show-offers-dialog",{attrs:{ping:t.showOffersDialogPing,model:t.showOffersDialogModel}}),t._v(" "),n("save-print-secret-dialog",{attrs:{ping:t.saveSecretDialogPing,publicKey:t.publicKey}}),t._v(" "),n("trust-token-dialog",{attrs:{ping:t.trustDialogPing,model:t.trustDialogModel}}),t._v(" "),n("send-assets-dialog",{attrs:{ping:t.sendAssetsDialogPing,model:t.sendAssetsDialogModel}}),t._v(" "),n("manage-offer-dialog",{attrs:{ping:t.manageOfferDialogPing,model:t.manageOfferDialogModel}}),t._v(" "),n("allow-trust-dialog",{attrs:{ping:t.allowTrustDialogPing,model:t.allowTrustDialogModel}})],1)}
var L=[]
var D=n(119)
var O=n(18)
var M=n(117)
var E=n(225)
var K=n(120)
var I=n(226)
var j=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-dialog",{attrs:{lazy:"",scrollable:"","max-width":"640"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])){return null}t.visible=false}},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{staticClass:"main-container"},[n("dialog-title-bar",{attrs:{title:t.title},on:{close:function(e){t.visible=false}}}),t._v(" "),n("div",{staticClass:"help-contents"},[t.publicKey?n("history-table",{attrs:{publicKey:t.publicKey}}):t._e()],1)],1)])}
var B=[]
var F=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("v-card",[n("table-header",{attrs:{vars:t.headerVars}}),t._v(" "),n("v-data-table",{attrs:{headers:t.headers,items:t.history,loading:t.loading,"sort-icon":"keyboard_arrow_down",search:t.headerVars.search,"item-key":"id","rows-per-page-items":[15,30,100,{text:"All",value:-1}]},scopedSlots:t._u([{key:"items",fn:function(e){return[n("tr",{on:{click:function(t){e.expanded=!e.expanded}}},[n("td",[t._v(t._s(e.item.name))]),t._v(" "),n("td",[t._v(t._s(e.item.value))]),t._v(" "),n("td",[n("v-btn",{staticClass:"mx-0",attrs:{small:"",flat:""},on:{click:function(n){n.stopPropagation()
return t.clickLink(e.item.link)}}},[t._v("link")])],1)])]}}])},[n("v-progress-linear",{attrs:{slot:"progress",color:"blue",indeterminate:""},slot:"progress"}),t._v(" "),t._v(" "),n("template",{slot:"expand"},[n("v-card",{attrs:{flat:""}},[t._v("nothing yet")])],1),t._v(" "),n("v-alert",{attrs:{slot:"no-data",value:true,color:"success",icon:"info"},slot:"no-data"},[t._v("Sorry, nothing to display here :(")]),t._v(" "),n("v-alert",{attrs:{slot:"no-results",value:true,color:"error",icon:"warning"},slot:"no-results"},[t._v('Your search for "'+t._s(t.headerVars.search)+'" found no results.')])],2)],1)}
var W=[]
function z(t){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){z=function t(e){return typeof e}}else{z=function t(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}}return z(t)}function N(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function V(t,e){for(var n=0;n<e.length;n++){var a=e[n]
a.enumerable=a.enumerable||false
a.configurable=true
if("value"in a)a.writable=true
Object.defineProperty(t,a.key,a)}}function $(t,e,n){if(e)V(t.prototype,e)
if(n)V(t,n)
return t}function R(t,e){if(e&&(z(e)==="object"||typeof e==="function")){return e}return H(t)}function H(t){if(t===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t}function U(t){U=Object.setPrototypeOf?Object.getPrototypeOf:function t(e){return e.__proto__||Object.getPrototypeOf(e)}
return U(t)}function X(t,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function")}t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:true,configurable:true}})
if(e)q(t,e)}function q(t,e){q=Object.setPrototypeOf||function t(e,n){e.__proto__=n
return e}
return q(t,e)}var J=n(77)
var Y=n(1031)
var G=function(t){X(e,t)
function e(t){var n
var a=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"payments"
var i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:200
N(this,e)
n=R(this,U(e).call(this))
n.limit=i
n.type=a
n.publicKey=t
n.paymentStopper=null
n.operationStopper=null
n.tradeStopper=null
n.transactionStopper=null
n.itemsMap={}
n.startFromNow=false
n.notifyUpdated=Y(function(){n.emit("updated")},200)
n.start()
return n}$(e,[{key:"stop",value:function t(){if(this.paymentStopper!==null){this.paymentStopper()
this.paymentStopper=null}if(this.tradeStopper!==null){this.tradeStopper()
this.tradeStopper=null}if(this.operationStopper!==null){this.operationStopper()
this.operationStopper=null}if(this.transactionStopper!==null){this.transactionStopper()
this.transactionStopper=null}}},{key:"getItems",value:function t(){return Object.values(this.itemsMap)}},{key:"addItem",value:function t(e,n){e.link=n._links.self.href
e.date=n.created_at
e.id=n.id
this.itemsMap[e.id]=e
this.notifyUpdated()}},{key:"displayTransaction",value:function t(e){if(e.type==="payment"){var n="XLM"
if(e.asset_type!=="native"){n=e.asset_code}this.addItem({id:e.id,name:"Payment "+n,from:e.from,assetCode:e.asset_code,value:o["a"].stripZeros(e.amount)},e)}else if(e.type==="payment_path"){var a="XLM"
if(e.asset_type!=="native"){a=e.asset_code}this.addItem({id:e.id,name:"Payment path"+a+"/"+e.source_asset_code,value:o["a"].stripZeros(e.amount)},e)}else if(e.type==="create_account"){this.addItem({id:e.id,name:"Create Account",value:o["a"].stripZeros(e.starting_balance)},e)}else if(e.type==="account_merge"){this.addItem({id:e.id,name:"Account Merge",value:"merging"},e)}else if(e.type==="manage_offer"){var i="XLM"
var r="XLM"
if(e.buying_asset_type!=="native"){i=e.buying_asset_code}if(e.selling_asset_type!=="native"){r=e.selling_asset_code}this.addItem({id:e.id,name:"Manage Offer",value:"Selling: "+r+" Buying: "+i},e)}else if(e.type==="change_trust"){var s="XLM"
if(e.asset_type!=="native"){s=e.asset_code}this.addItem({id:e.id,name:"Change Trust",value:s},e)}else if(e.type==="set_options"){var l="unknown"
if(e.inflation_dest){l="Inflation dest = "+e.inflation_dest}this.addItem({id:e.id,name:"Set Options",value:l},e)}else if(e.type==="allow_trust"){var c="XLM"
if(e.asset_type!=="native"){c=e.asset_code}this.addItem({id:e.id,name:"Allow Trust",value:c},e)}else if(e.type==="manage_data"){this.addItem({id:e.id,name:"Manage Data",value:"Name = "+e.name+" Value = "+e.value},e)}else{o["a"].debugLog(e)}}},{key:"start",value:function t(){var e=this
var n
switch(this.type){case"payments":n=r["a"].server().payments()
break
case"transactions":n=r["a"].server().transactions()
break
case"operations":n=r["a"].server().operations()
break
case"trades":n=r["a"].server().trades()
break
default:o["a"].debugLog("wallet stream, type invalid")
break}if(this.limit>0){n.limit(this.limit)}if(this.startFromNow){n.cursor("now")}n.forAccount(this.publicKey)
var a=n.stream({onmessage:function t(n){e.displayTransaction(n)},onerror:function t(e){if(e["isTrusted"]===true){}else{o["a"].debugLog(e,"onerror")}}})
switch(this.type){case"payments":this.paymentStopper=a
break
case"transactions":this.transactionStopper=a
break
case"operations":this.operationStopper=a
break
case"trades":this.tradeStopper=a
break
default:o["a"].debugLog("wallet stream, type invalid")
break}}}])
return e}(J)
var Z=function(){var t=this
var e=t.$createElement
var n=t._self._c||e
return n("div",{staticClass:"table-header"},[t._v("\n  "+t._s(t.vars.title)+"\n  "),t.vars.showAdd?n("v-btn",{attrs:{small:"",icon:""},on:{click:t.addData}},[n("v-icon",[t._v("add_circle")])],1):t._e(),t._v(" "),t.vars.showRefresh?n("v-btn",{attrs:{small:"",icon:""},on:{click:t.refreshData}},[n("v-icon",[t._v("refresh")])],1):t._e(),t._v(" "),n("v-spacer"),t._v(" "),n("v-text-field",{staticClass:"table-textview",attrs:{"append-icon":"search",label:"Search","hide-details":""},model:{value:t.vars.search,callback:function(e){t.$set(t.vars,"search",e)},expression:"vars.search"}})],1)}
var Q=[]
var tt={props:["vars"],data:function t(){return{xx:false}},methods:{refreshData:function t(){this.$emit("refresh-data")},addData:function t(){this.$emit("add-data")}}}
var et=tt
var nt=n(1032)
var at=Object(w["a"])(et,Z,Q,false,null,"1d24cecc",null)
var it=at.exports
var ot={props:["publicKey"],components:{TableHeader:it},data:function t(){return{loading:false,walletStream:null,cache:null,headerVars:{title:"History",search:""},history:[],headers:[{text:"Name",align:"left",value:"name"},{text:"XLM",align:"left",value:"value"},{text:"Link",align:"right",sortable:false,value:"link"}]}},watch:{publicKey:function t(){this.setup()}},mounted:function t(){this.setup()},methods:{clickLink:function t(e){o["a"].openBrowser(e)},setup:function t(){var e=this
if(!this.publicKey){console.log("publicKey null")}else{if(this.walletStream){this.walletStream.stop()
this.walletStream=null}this.walletStream=new G(this.publicKey)
this.history=[]
this.walletStream.on("updated",function(){e.history=e.walletStream.getItems()})}}}}
var rt=ot
var st=n(1034)
var lt=Object(w["a"])(rt,F,W,false,null,"bb947734",null)
var ct=lt.exports
var ut={props:["ping","publicKey"],components:{DialogTitleBar:c["DialogTitleBar"],HistoryTable:ct},data:function t(){return{visible:false,title:"History",users:[]}},watch:{ping:function t(){this.visible=true}},methods:{allowTrust:function t(e){}}}
var dt=ut
var ft=n(1036)
var vt=Object(w["a"])(dt,j,B,false,null,"42be059f",null)
var pt=vt.exports
var ht={props:["publicKey","small"],components:{ShowOffersDialog:D["a"],SavePrintSecretDialog:v["a"],TrustTokenDialog:E["a"],SendAssetsDialog:M["a"],ManageOfferDialog:K["a"],AllowTrustDialog:I["a"],HistoryDialog:pt},data:function t(){return{showOffersDialogPing:false,historyDialogPing:false,saveSecretDialogPing:false,trustDialogPing:false,sendAssetsDialogPing:false,manageOfferDialogPing:false,allowTrustDialogPing:false,showOffersDialogModel:new O["a"],trustDialogModel:new O["a"],sendAssetsDialogModel:new O["a"],manageOfferDialogModel:new O["a"],allowTrustDialogModel:new O["a"]}},methods:{actionMenu:function t(e){switch(e){case"show-offers":this.showOffersDialogModel.sourceAccount=u["a"].accountWithPublicKey(this.publicKey)
this.showOffersDialogPing=!this.showOffersDialogPing
break
case"save-keys":this.saveSecretDialogPing=!this.saveSecretDialogPing
break
case"trust-asset":this.trustDialogModel.sourceAccount=u["a"].accountWithPublicKey(this.publicKey)
this.trustDialogPing=!this.trustDialogPing
break
case"send-asset":this.sendAssetsDialogModel.sourceAccount=u["a"].accountWithPublicKey(this.publicKey)
this.sendAssetsDialogPing=!this.sendAssetsDialogPing
break
case"post-offer":this.manageOfferDialogModel.sourceAccount=u["a"].accountWithPublicKey(this.publicKey)
this.manageOfferDialogPing=!this.manageOfferDialogPing
break
case"allow-trust":this.allowTrustDialogModel.sourceAccount=u["a"].accountWithPublicKey(this.publicKey)
this.allowTrustDialogPing=!this.allowTrustDialogPing
break
case"history":this.historyDialogPing=!this.historyDialogPing
break
default:break}}}}
var gt=ht
var mt=n(1038)
var bt=Object(w["a"])(gt,P,L,false,null,"7d50419e",null)
var yt=bt.exports
var xt={props:["items"],data:function t(){return{model:new O["a"],timeline:null,newAccountDialogPing:false,confirmRemoveDialogPing:false,itemToRemove:null}},components:{NewAccountDialog:A,ConfirmDialog:T["a"],ActionsMenu:yt},mounted:function t(){var e=this
setInterval(function(){if(e.items.length===0){e.animateCreateButton()}else{if(e.timeline){e.timeline.kill()
e.timeline=null}}},2e3)},methods:{isTestnet:function t(){return r["a"].isTestnet()},balancesForItem:function t(e){var n=5
var a=function t(e,n){var a=0
if(e.symbol===n.symbol){a=0}else if(e.symbol.toUpperCase()==="XLM"){a=-1}else if(n.symbol.toUpperCase()==="XLM"){a=1}else if(e.symbol<n.symbol){a=-1}else if(e.symbol>n.symbol){a=1}if(e.amount==="0"&&n.amount!=="0"){a=1}else if(n.amount==="0"&&e.amount!=="0"){a=-1}return a}
if(e.assetBalances){var i=e.assetBalances.slice()
i.sort(a)
return i.slice(0,n)}return[]},animateCreateButton:function t(){if(!this.timeline){var e=g()(this.$el).find(".add-button i")
this.timeline=new S["c"]({repeat:-1,yoyo:false,repeatDelay:1}).to(e,.2,{ease:S["b"].easeIn,scale:1.5}).to(e,.4,{ease:S["b"].easeOut,scale:1})}},accountMenu:function t(e){switch(e){case"test":r["a"].createTestAccount().then(function(t){o["a"].debugLog(t)})["catch"](function(t){o["a"].debugLog(t,"Error")})
break
case"other":this.model=new O["a"]
this.model.fundingMessage="Choose an account to pay the transaction fee"
this.model.textValueLabel="Secret key (optional)"
this.model.textValueHint="Leave blank for random key pair. Used for creating an account on a personalized/vanity address"
this.newAccountDialogPing=!this.newAccountDialogPing
break
default:break}},clickItem:function t(e){var n=this
r["a"].accountInfo(e.publicKey).then(function(t){var a="========================================="
var i="===="
var r=a+"\n"+i+"  "+e.name+"\n"+a
o["a"].debugLog(r)
o["a"].debugLog("Secret: "+e.secret)
o["a"].debugLog(t)
n.extractAssets(t)})["catch"](function(t){o["a"].debugLog(t)})},extractAssets:function t(e){if(e&&e.balances){var n=true
var a=false
var i=undefined
try{for(var o=e.balances[Symbol.iterator](),r;!(n=(r=o.next()).done);n=true){var s=r.value
C["a"].addAsset({symbol:s.asset_code,issuer:s.asset_issuer})}}catch(t){a=true
i=t}finally{try{if(!n&&o["return"]!=null){o["return"]()}}finally{if(a){throw i}}}}},removeAccountConfirmed:function t(){if(this.itemToRemove){u["a"].deleteAccount(this.itemToRemove.publicKey)}},deleteItem:function t(e){this.itemToRemove=null
if(!r["a"].isTestnet()){this.itemToRemove=e
this.confirmRemoveDialogPing=!this.confirmRemoveDialogPing}else{u["a"].deleteAccount(e.publicKey)}},refresh:function t(){o["a"].debugLog("refreshing...")
r["a"].updateBalances(true)}}}
var kt=xt
var wt=n(1040)
var _t=Object(w["a"])(kt,a,i,false,null,"752469e0",null)
var At=e["a"]=_t.exports},654:function(t,e,n){"use strict"
n.r(e)
var a=n(461)
Object(a["a"])()},672:function(t,e){},673:function(t,e){},882:function(t,e){},884:function(t,e){},911:function(t,e){},913:function(t,e){},940:function(t,e){},941:function(t,e){},983:function(t,e,n){"use strict"
var a=n(178)
var i=n.n(a)
var o=i.a},984:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-78d653e6] {\n  user-select: none;\n}\n.button-group[data-v-78d653e6] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-78d653e6] {\n    margin: 4px;\n}\n.input-group[data-v-78d653e6] {\n  display: block;\n}\n.main-container[data-v-78d653e6] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .expansion-contents[data-v-78d653e6] {\n    padding: 10px 20px;\n    text-align: left;\n    flex: 1 1 auto;\n    overflow-y: auto;\n    font-size: 1.3em;\n}\n.main-container .expansion-contents .custom-expansion-panel[data-v-78d653e6] {\n      box-shadow: none;\n}\n.main-container .expansion-contents .custom-expansion-panel .expansion-title[data-v-78d653e6] {\n        text-align: left;\n        font-weight: 600;\n        width: 100%;\n}\n.main-container .expansion-contents .custom-expansion-panel .expansion-message[data-v-78d653e6] {\n        font-size: 0.9em;\n        padding: 0 26px 10px;\n}\n",""])},986:function(t,e,n){"use strict"
var a=n(179)
var i=n.n(a)
var o=i.a},987:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,'button[data-v-02dc1e38] {\n  user-select: none;\n}\n.button-group[data-v-02dc1e38] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-02dc1e38] {\n    margin: 4px;\n}\n.input-group[data-v-02dc1e38] {\n  display: block;\n}\n#rainbow[data-v-02dc1e38] {\n  position: absolute;\n  left: 283px;\n  top: 82px;\n  width: 80px;\n  height: 80px;\n  background: white;\n  border-radius: 50%;\n}\n.main-container[data-v-02dc1e38] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .main-content[data-v-02dc1e38] {\n    position: relative;\n    height: 220px;\n    overflow: hidden;\n    display: flex;\n    justify-content: center;\n    color: white;\n    text-align: right;\n    font-size: 1em;\n    background: black;\n}\n.main-container .main-content .initials-text[data-v-02dc1e38] {\n      position: absolute;\n      bottom: 62px;\n      left: 310px;\n      z-index: 1;\n}\n.main-container .main-content .initials-text a[data-v-02dc1e38] {\n        color: rgba(0, 0, 0, 0.07);\n        text-decoration: none;\n}\n.main-container .main-content .contact-info[data-v-02dc1e38] {\n      z-index: 1;\n      display: flex;\n      justify-content: center;\n      flex-direction: column;\n      font-family: "Orbitron", "sans-serif";\n      text-shadow: 0 0 5px black;\n      font-weight: bold;\n}\n.main-container .main-content .contact-info a[data-v-02dc1e38] {\n        text-decoration: none;\n        color: white;\n        font-size: 1.78em;\n        text-shadow: 0 0 5px black;\n}\n',""])},988:function(t,e,n){"use strict"
var a=n(180)
var i=n.n(a)
var o=i.a},989:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".list-header-item[data-v-981cd51e] {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  color: white;\n  background: steelblue;\n}\n.navigation-drawer[data-v-981cd51e] {\n  background: whitesmoke;\n}\n.list-item-text[data-v-981cd51e] {\n  font-size: 1.3em;\n  color: rgba(0, 0, 0, 0.6);\n}\n.list-item-icon[data-v-981cd51e] {\n  margin-right: 16px;\n}\n",""])},990:function(t,e,n){"use strict"
var a=n(181)
var i=n.n(a)
var o=i.a},991:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".header-bar[data-v-01f01eb8] {\n  position: relative;\n  display: flex;\n  background: steelblue;\n  align-items: center;\n}\n.header-bar .left-header-bar[data-v-01f01eb8] {\n    display: flex;\n    align-items: center;\n    flex: 1 1 auto;\n}\n.header-bar .left-header-bar .tab-indicator[data-v-01f01eb8] {\n      font-size: 1.2em;\n      color: rgba(255, 255, 255, 0.4);\n      font-weight: bold;\n}\n@media all and (max-width: 600px) {\n.header-bar .left-header-bar .tab-indicator[data-v-01f01eb8] {\n        visibility: hidden;\n}\n}\n.header-bar .network-indicator[data-v-01f01eb8] {\n    margin-right: 13px;\n}\n.header-bar .network-indicator .publicnet[data-v-01f01eb8],\n    .header-bar .network-indicator .testnet[data-v-01f01eb8] {\n      width: 12px;\n      height: 12px;\n      border-radius: 500px;\n}\n.header-bar .network-indicator .publicnet[data-v-01f01eb8] {\n      background: #00ff46;\n}\n.header-bar .network-indicator .testnet[data-v-01f01eb8] {\n      background: #00c2ff;\n      box-shadow: 0 0 1px white;\n}\n.header-bar .right-header-bar[data-v-01f01eb8] {\n    display: flex;\n    align-items: center;\n    flex: 0 0 auto;\n}\n.header-bar .header-tab-bar[data-v-01f01eb8] {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    flex: 1 1 auto;\n    pointer-events: none;\n}\n.header-bar .header-tab-bar .header-tab-bar-inner[data-v-01f01eb8] {\n      pointer-events: all;\n}\n.header-bar .header-tab-bar .header-tab-bar-inner a[data-v-01f01eb8]:hover {\n        background: rgba(255, 255, 255, 0.3);\n}\n.header-bar .header-tab-bar .header-tab-bar-inner .header-active-tab[data-v-01f01eb8] {\n        color: white;\n}\n.header-bar .header-tab-bar .header-tab-bar-inner a[data-v-01f01eb8] {\n        margin: 1px 2px;\n        padding: 0;\n}\n",""])},992:function(t,e,n){"use strict"
var a=n(182)
var i=n.n(a)
var o=i.a},993:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".app-console[data-v-db450c8e] {\n  position: relative;\n  display: flex;\n  flex: 1 1 80px;\n  background: #001400;\n}\n.app-console .console-bar[data-v-db450c8e] {\n    display: flex;\n    flex-direction: column;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.app-console .console-bar button[data-v-db450c8e] {\n      margin: 0;\n      color: rgba(255, 255, 255, 0.4);\n}\n.app-console .console-bar button[data-v-db450c8e]:hover {\n        color: white;\n}\n.app-console .output-container[data-v-db450c8e] {\n    width: 100%;\n    resize: none;\n    outline: none;\n    font-size: 0.8em;\n    font-family: monospace;\n    overflow: auto;\n    color: #00ff96;\n    margin: 4px 0 0 30px;\n}\n.app-console .output-container[data-v-db450c8e]::-webkit-scrollbar {\n      width: 8px;\n      height: 8px;\n}\n.app-console .output-container[data-v-db450c8e]::-webkit-scrollbar-track {\n      background: black;\n}\n.app-console .output-container[data-v-db450c8e]::-webkit-scrollbar-thumb {\n      background-color: darkgreen;\n}\n.app-console .output-container[data-v-db450c8e]::-webkit-scrollbar-corner {\n      background: black;\n}\n.fullscreen-console[data-v-db450c8e] {\n  position: fixed !important;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n",""])},994:function(t,e,n){"use strict"
var a=n(183)
var i=n.n(a)
var o=i.a},995:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".menu-button-container[data-v-76280ac4] {\n  background: rgba(0, 0, 0, 0.02);\n  padding-bottom: 1px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  align-content: flex-start;\n}\n.menu-button-container .network-string[data-v-76280ac4] {\n    margin-left: 2px;\n    color: rgba(0, 0, 0, 0.6);\n    font-weight: bold;\n    font-size: 1em;\n    flex: 1 1 auto;\n    white-space: nowrap;\n    overflow: hidden;\n    width: 0;\n    text-overflow: ellipsis;\n}\n.menu-button-container .tiny-button[data-v-76280ac4] {\n    margin: 3px 4px;\n}\n.network-menu-item[data-v-76280ac4] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  font-size: 1.3em;\n}\n.network-menu-item .menu-tile-title[data-v-76280ac4] {\n    flex: 1 0 auto;\n    margin-right: 16px;\n}\n.network-menu-item .network-main[data-v-76280ac4],\n  .network-menu-item .network-test[data-v-76280ac4] {\n    flex: 0 0 auto;\n    padding: 1px 8px;\n    text-align: center;\n    min-width: 50px;\n    color: white;\n    font-size: 0.8em;\n    border-radius: 3px;\n    font-weight: bold;\n}\n.network-menu-item .network-test[data-v-76280ac4] {\n    background: rgba(8, 128, 200, 0.6);\n}\n.network-menu-item .network-main[data-v-76280ac4] {\n    background: rgba(28, 180, 28, 0.6);\n}\n",""])},996:function(t,e,n){"use strict"
var a=n(184)
var i=n.n(a)
var o=i.a},997:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,".toast-text[data-v-362e1680] {\n  width: 100%;\n  text-align: center;\n}\n",""])},998:function(t,e,n){"use strict"
var a=n(185)
var i=n.n(a)
var o=i.a},999:function(t,e,n){e=t.exports=n(9)(false)
e.push([t.i,"button[data-v-6b4cea10] {\n  user-select: none;\n}\n.button-group[data-v-6b4cea10] {\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n.button-group button[data-v-6b4cea10] {\n    margin: 4px;\n}\n.input-group[data-v-6b4cea10] {\n  display: block;\n}\n.main-container[data-v-6b4cea10] {\n  width: 100%;\n  flex: 0 1 auto;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);\n  background: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.main-container .asset-contents[data-v-6b4cea10] {\n    position: relative;\n    overflow: auto;\n    padding: 12px;\n    flex: 1 1 auto;\n    font-size: 1.2em;\n}\n.main-container .asset-contents .button-holder[data-v-6b4cea10] {\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n}\n.main-container .asset-contents .welcome-title[data-v-6b4cea10] {\n      margin-bottom: 6px;\n      text-align: center;\n      font-weight: bold;\n      text-transform: uppercase;\n      color: rgba(0, 0, 0, 0.7);\n}\n.main-container .asset-contents .welcome-text[data-v-6b4cea10] {\n      margin-bottom: 10px;\n}\n.main-container .asset-contents .disclaimer[data-v-6b4cea10] {\n      font-size: 0.9em;\n}\n",""])}})
