(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@firestitch/datepicker", [], factory);
	else if(typeof exports === 'object')
		exports["@firestitch/datepicker"] = factory();
	else
		root["@firestitch/datepicker"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickercalendar/fsdatepickercalendar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"fsdatepickercalendar.component.scss","sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickerpresets/fsdatepickerpresets.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ":host .presets {\n  display: block;\n  float: left;\n  margin: 8px 0 0;\n  color: #a9acae;\n}\n\n:host .presets a {\n  font-size: 13px;\n  margin: 0 5px;\n}\n\n:host .presets a:first-child {\n  margin-left: 0;\n}\n\n:host .presets a:last-child {\n  margin-right: 0;\n}\n\n@media only screen and (max-width: 499px) {\n  :host .presets {\n    float: left !important;\n  }\n}\n\n", "", {"version":3,"sources":["/Users/mendor/work/fs-datepicker/src/components/fsdatepickerpresets/src/components/fsdatepickerpresets/fsdatepickerpresets.component.scss","/Users/mendor/work/fs-datepicker/fsdatepickerpresets.component.scss"],"names":[],"mappings":"AACE;EACE,eAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;CCAH;;ADLD;EAOM,gBAAA;EACA,cAAA;CCEL;;ADJG;EAII,eAAA;CCIP;;ADdD;EAaQ,gBAAA;CCKP;;ADCD;EACE;IAEI,uBAAA;GCCH;CACF","file":"fsdatepickerpresets.component.scss","sourcesContent":[":host {\n  .presets {\n    display: block;\n    float: left;\n    margin: 8px 0 0;\n    color: #a9acae;\n    a {\n      font-size: 13px;\n      margin: 0 5px;\n      &:first-child {\n        margin-left: 0;\n      }\n      &:last-child {\n        margin-right: 0;\n      }\n    }\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  :host {\n    .presets {\n      float: left !important;\n    }\n  }\n}\n",":host .presets {\n  display: block;\n  float: left;\n  margin: 8px 0 0;\n  color: #a9acae;\n}\n\n:host .presets a {\n  font-size: 13px;\n  margin: 0 5px;\n}\n\n:host .presets a:first-child {\n  margin-left: 0;\n}\n\n:host .presets a:last-child {\n  margin-right: 0;\n}\n\n@media only screen and (max-width: 499px) {\n  :host .presets {\n    float: left !important;\n  }\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickersummary/fsdatepickersummary.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ":host .summary {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  font-size: 16px;\n  width: 100%;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 40px;\n  border-bottom: 1px solid #efefef;\n}\n\n:host .summary.summary-time {\n  font-size: 15px;\n}\n\n:host .summary > div {\n  cursor: pointer;\n  display: inline-block;\n  padding: 5px;\n}\n\n:host .summary > div:hover,\n:host .summary > div.active {\n  background: rgba(70, 120, 174, .15);\n}\n\n", "", {"version":3,"sources":["/Users/mendor/work/fs-datepicker/src/components/fsdatepickersummary/src/components/fsdatepickersummary/fsdatepickersummary.component.scss","/Users/mendor/work/fs-datepicker/fsdatepickersummary.component.scss"],"names":[],"mappings":"AAAA;EAEI,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,+BAAA;EAAA,8BAAA;MAAA,wBAAA;UAAA,oBAAA;EACA,gBAAA;EACA,YAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,aAAA;EACA,iCAAA;CCAH;;ADTD;EAWM,gBAAA;CCEL;;ADbD;EAcM,gBAAA;EACA,sBAAA;EACA,aAAA;CCGL;;ADnBD;;EAmBQ,oCAAA;CCKP","file":"fsdatepickersummary.component.scss","sourcesContent":[":host {\n  .summary {\n    display: flex;\n    flex-direction: row;\n    font-size: 16px;\n    width: 100%;\n    align-items: center;\n    justify-content: center;\n    height: 40px;\n    border-bottom: 1px solid #efefef;\n    &.summary-time {\n      font-size: 15px;\n    }\n    > div {\n      cursor: pointer;\n      display: inline-block;\n      padding: 5px;\n\n      &:hover, &.active {\n        background: rgba(70,120,174,.15);\n      }\n    }\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  .summary {\n    // font-size: 13px !important;\n  }\n}\n",":host .summary {\n  display: flex;\n  flex-direction: row;\n  font-size: 16px;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n  height: 40px;\n  border-bottom: 1px solid #efefef;\n}\n\n:host .summary.summary-time {\n  font-size: 15px;\n}\n\n:host .summary > div {\n  cursor: pointer;\n  display: inline-block;\n  padding: 5px;\n}\n\n:host .summary > div:hover,\n:host .summary > div.active {\n  background: rgba(70, 120, 174, 0.15);\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickertime/fsdatepickertime.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".time {\n  padding: 12px 15px;\n}\n\n.time .wraper {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: start;\n}\n\n.time .hours-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.time .hours-group .hours {\n  margin-bottom: 10px;\n}\n\n.time .hours {\n  height: 100%;\n}\n\n.time .hours table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.time .hour .number.textual {\n  font-size: 11px;\n}\n\n.time .hour .am-pm {\n  font-size: 9px;\n  margin-left: 1px;\n}\n\n.time .minutes {\n  height: 100%;\n  margin-left: 35px;\n}\n\n.time .minutes table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.time .minutes .button-expand {\n  display: block;\n  text-align: center;\n  color: #4678AE;\n  margin-top: 5px;\n}\n\n.time .lbl {\n  margin-bottom: 2px;\n  font-size: 12px;\n}\n\n.time .hour,\n.time .minute {\n  width: 50px;\n  height: 50px;\n  text-align: center;\n  border: 1px\tsolid #efefef;\n  padding: 0;\n  cursor: pointer;\n}\n\n.time .hour .number,\n.time .minute .number {\n  border: 1px solid transparent;\n  border-radius: 50%;\n  line-height: 28px;\n  height: 28px;\n}\n\n@media only screen and (min-width: 500px) {\n  .time {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  .time {\n    margin: 0 auto;\n  }\n}\n\n", "", {"version":3,"sources":["/Users/mendor/work/fs-datepicker/src/components/fsdatepickertime/src/components/fsdatepickertime/fsdatepickertime.component.scss","/Users/mendor/work/fs-datepicker/fsdatepickertime.component.scss"],"names":[],"mappings":"AAAA;EACE,mBAAA;CCCD;;ADCC;EACE,+BAAA;EAAA,8BAAA;MAAA,wBAAA;UAAA,oBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,mBAAA;CCEH;;ADRD;EAUI,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;CCEH;;ADDG;EACE,oBAAA;CCIL;;ADAC;EACE,aAAA;CCGH;;ADFG;EACE,0BAAA;EACA,YAAA;CCKL;;AD1BD;EA6BQ,gBAAA;CCCP;;ADGG;EACE,eAAA;EACA,iBAAA;CCAL;;ADnCD;EAwCI,aAAA;EACA,kBAAA;CCDH;;ADxCD;EA4CM,0BAAA;EACA,YAAA;CCAL;;AD7CD;EAiDM,eAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;CCAL;;ADpDD;EAyDI,mBAAA;EACA,gBAAA;CCDH;;ADIC;;EAGE,YAAA;EACA,aAAA;EACA,mBAAA;EACA,0BAAA;EACA,WAAA;EACA,gBAAA;CCFH;;ADnED;;EAuEM,8BAAA;EACA,mBAAA;EACA,kBAAA;EACA,aAAA;CCCL;;ADID;EACE;IACE,gCAAA;IAAA,gCAAA;IAAA,yBAAA;GCDD;CACF;;ADID;EACE;IACE,eAAA;GCDD;CACF","file":"fsdatepickertime.component.scss","sourcesContent":[".time {\n  padding: 12px 15px;\n\n  .wraper {\n    flex-direction: row;\n    display: flex;\n    align-items: start;\n  }\n\n  .hours-group {\n    display: flex;\n    flex-direction: column;\n    .hours {\n      margin-bottom: 10px;\n    }\n  }\n\n  .hours {\n    height: 100%;\n    table {\n      border-collapse: collapse;\n      width: 100%;\n    }\n  }\n\n  .hour {\n    .number {\n      // font-size: 12px;\n      &.textual {\n        font-size: 11px;\n      }\n    }\n\n    .am-pm {\n      font-size: 9px;\n      margin-left: 1px;\n    }\n  }\n\n  .minutes {\n    height: 100%;\n    margin-left: 35px;\n\n    table {\n      border-collapse: collapse;\n      width: 100%;\n    }\n\n    .button-expand {\n      display: block;\n      text-align: center;\n      color: #4678AE;\n      margin-top: 5px;\n    }\n  }\n\n  .lbl {\n    margin-bottom: 2px;\n    font-size: 12px;\n  }\n\n  .hour, .minute {\n    // width: 31px;\n    // height: 31px;\n    width: 50px;\n    height: 50px;\n    text-align: center;\n    border: 1px\tsolid #efefef;\n    padding: 0;\n    cursor: pointer;\n    .number {\n      border: 1px solid transparent;\n      border-radius: 50%;\n      line-height: 28px;\n      height: 28px;\n    }\n  }\n}\n\n@media only screen and (min-width: 500px) {\n  .time {\n    display: flex !important;\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  .time {\n    margin: 0 auto;\n  }\n}\n",".time {\n  padding: 12px 15px;\n}\n\n.time .wraper {\n  flex-direction: row;\n  display: flex;\n  align-items: start;\n}\n\n.time .hours-group {\n  display: flex;\n  flex-direction: column;\n}\n\n.time .hours-group .hours {\n  margin-bottom: 10px;\n}\n\n.time .hours {\n  height: 100%;\n}\n\n.time .hours table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.time .hour .number.textual {\n  font-size: 11px;\n}\n\n.time .hour .am-pm {\n  font-size: 9px;\n  margin-left: 1px;\n}\n\n.time .minutes {\n  height: 100%;\n  margin-left: 35px;\n}\n\n.time .minutes table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.time .minutes .button-expand {\n  display: block;\n  text-align: center;\n  color: #4678AE;\n  margin-top: 5px;\n}\n\n.time .lbl {\n  margin-bottom: 2px;\n  font-size: 12px;\n}\n\n.time .hour,\n.time .minute {\n  width: 50px;\n  height: 50px;\n  text-align: center;\n  border: 1px\tsolid #efefef;\n  padding: 0;\n  cursor: pointer;\n}\n\n.time .hour .number,\n.time .minute .number {\n  border: 1px solid transparent;\n  border-radius: 50%;\n  line-height: 28px;\n  height: 28px;\n}\n\n@media only screen and (min-width: 500px) {\n  .time {\n    display: flex !important;\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  .time {\n    margin: 0 auto;\n  }\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./styles.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".fs-datetime-backdrop {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 50;\n  outline: none;\n  overflow: visible;\n  background: none !important;\n}\n\n.fs-datetime-backdrop[hidden] {\n  display: none !important;\n}\n\n.fs-datetime-dialog {\n  position: fixed;\n  z-index: 80;\n  display: none;\n  visibility: hidden;\n  display: block;\n  /* triangle above dialog */\n  /*\n  &:not(.vertical-reposition) {\n    &:not(.horizontal-reposition) {\n      .wrap {\n        &:after, &:before {\n          border-left: 20px solid transparent;\n          border-right: 20px solid transparent;\n          border-top: 19px solid #fff;\n          top: -19px;\n          content: '';\n          left: 50%;\n          position: absolute;\n          transform: rotate(180deg);\n          left: 23px;\n        }\n        &:before {\n          border-left: 23px solid transparent;\n          border-right: 23px solid transparent;\n          border-top: 21px solid transparent;\n          border-top-color: #efefef;\n          top: -21px;\n          left: 20px;\n        }\n      }\n    }\n  }\n  */\n}\n\n.fs-datetime-dialog a {\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.fs-datetime-dialog.opened {\n  visibility: visible;\n}\n\n.fs-datetime-dialog * {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.fs-datetime-dialog:focus {\n  outline: none;\n}\n\n.fs-datetime-dialog:active {\n  outline: none;\n}\n\n.fs-datetime-dialog fsDatePickerCalendar {\n  /* Need for year view */\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1 1 0%;\n}\n\n.fs-datetime-dialog .wrap {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background: #fff;\n  -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12);\n          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12);\n  width: 373px;\n  padding: 0 !important;\n  /*\n    @TODO in scope of presets\n    .header {\n      padding: 0 15px;\n      // Don't use flex. Strange behaviour of scroll\n      display: table;\n      width: 100%;\n      box-sizing: border-box;\n    }\n    */\n}\n\n.fs-datetime-dialog .wrap:focus {\n  outline: none;\n}\n\n.fs-datetime-dialog .wrap:active {\n  outline: none;\n}\n\n.fs-datetime-dialog.has-time {\n  height: 100%;\n  max-height: 472px;\n}\n\n.fs-datetime-dialog.has-time .wrap .date-time {\n  overflow-y: auto;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap {\n  width: 744px;\n  /*\n        @TODO in scope of presets\n        .header {\n          fsdatepickerpresets .presets {\n            float: right;\n          }\n        }\n        */\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1 1 0%;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range fsdatepickercalendar:first-child {\n  margin-right: 5px;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range td.day:not(.disabled):not(.mute).min-date::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 0.5em;\n  border-left-color: #fff;\n  border-top-color: #fff;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range td.day:not(.disabled):not(.mute).max-date::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 0.5em;\n  border-left-color: #fff;\n  border-top-color: #fff;\n  -webkit-transform: scale(-1, -1);\n  transform: scale(-1, -1);\n}\n\n.fs-datetime-dialog.fs-datetime-range:not(.has-date) .date-range {\n  display: none;\n}\n\n.fs-datetime-dialog .date::-webkit-scrollbar,\n.fs-datetime-dialog .years::-webkit-scrollbar {\n  display: none;\n}\n\n.fs-datetime-dialog .inline-date {\n  padding: 10px;\n  width: 100%;\n}\n\n.fs-datetime-dialog .gap {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1 1 0%;\n}\n\n.fs-datetime-dialog .month-year {\n  height: 60px;\n  padding: 0 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.fs-datetime-dialog .month-year .actions {\n  text-align: right;\n}\n\n.fs-datetime-dialog .month-year .actions a {\n  padding: 6px;\n  color: #757575;\n}\n\n.fs-datetime-dialog .month-year .more {\n  padding: 1px;\n}\n\n.fs-datetime-dialog .year-name,\n.fs-datetime-dialog .month-name {\n  color: inherit;\n  padding: 5px;\n  border-radius: 3px;\n  float: left;\n}\n\n.fs-datetime-dialog .day {\n  position: relative;\n  text-align: center;\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n  border: 1px solid #efefef;\n  outline: none;\n}\n\n.fs-datetime-dialog .day:not(.blank) {\n  cursor: pointer;\n}\n\n.fs-datetime-dialog .day .today {\n  color: #555555;\n  font-size: 8px;\n  position: absolute;\n  bottom: 3px;\n  left: 0;\n  width: 100%;\n  height: auto;\n  line-height: normal;\n}\n\n.fs-datetime-dialog .day.selected .today {\n  color: #fff;\n}\n\n.fs-datetime-dialog .day.mute {\n  color: #d7d7d7;\n}\n\n.fs-datetime-dialog .day span {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.fs-datetime-dialog table {\n  border-collapse: collapse;\n}\n\n.fs-datetime-dialog table thead th {\n  width: 50px;\n  vertical-align: top;\n  padding-bottom: 20px;\n  text-align: center;\n  border: 1px solid transparent;\n  background: #fff;\n  border-bottom: 1px solid #efefef;\n  border-top: 1px solid #fff;\n  font-weight: normal;\n  font-size: 12px;\n  color: #4d4d4d;\n}\n\n.fs-datetime-dialog fs-datetime .lbl {\n  font-weight: normal;\n  font-size: 12px;\n  color: #4d4d4d;\n}\n\n.fs-datetime-dialog fsdatepickercalendar {\n  min-height: 350px;\n}\n\n.fs-datetime-dialog .date {\n  width: 100%;\n  position: relative;\n  min-height: 350px;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 45%;\n          flex: 1 1 45%;\n}\n\n.fs-datetime-dialog .day.selected,\n.fs-datetime-dialog .years .year.selected,\n.fs-datetime-dialog .months .month.selected,\n.fs-datetime-dialog .time .hour.selected,\n.fs-datetime-dialog .time .minute.selected {\n  background: #4678AE;\n  color: #fff;\n}\n\n.fs-datetime-dialog .time .hour.disabled,\n.fs-datetime-dialog .time .minute.disabled,\n.fs-datetime-dialog .day.disabled {\n  color: #a6a5a5;\n  cursor: auto;\n  cursor: initial;\n  background: #efefef;\n}\n\n.fs-datetime-dialog .years {\n  position: absolute;\n  width: 100%;\n  max-height: 100%;\n  height: 100vh;\n  overflow: hidden;\n}\n\n.fs-datetime-dialog .years .year {\n  float: left;\n  width: 25%;\n  text-align: center;\n  height: 65px;\n  border-left: 1px solid #efefef;\n  border-bottom: 1px solid #efefef;\n  line-height: 65px;\n  outline: none;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /*\n      &.today {\n        border: 1px solid #4678AE;\n        border-style: double;\n      }\n      */\n}\n\n.fs-datetime-dialog .years .year.row {\n  clear: both;\n}\n\n.fs-datetime-dialog .years .year:nth-last-child(-n+4) {\n  border-bottom: 1px solid #efefef;\n}\n\n.fs-datetime-dialog .years .year:nth-child(4n+0) {\n  border-right: 1px solid #efefef;\n}\n\n.fs-datetime-dialog .date-time {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.fs-datetime-dialog .months {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n\n.fs-datetime-dialog .months .month {\n  height: 25%;\n  width: 33.33%;\n  float: left;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  border-left: 1px solid #efefef;\n  border-top: 1px solid #efefef;\n  cursor: pointer;\n  outline: none;\n  border-bottom: 0;\n  border-right: 0;\n  min-height: 80px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /*\n      &.today {\n        border: 1px solid #4678AE;\n        border-style: double;\n      }\n      */\n}\n\n.fs-datetime-dialog .months .month:nth-child(-n+3) {\n  border-top: 0;\n}\n\n.fs-datetime-dialog .months .month:nth-child(3n+0) {\n  border-right: 1px solid #efefef;\n}\n\n.fs-datetime-dialog .iscroll-scroller {\n  position: absolute;\n  width: 100%;\n}\n\n.fs-datetime-dialog .clear {\n  clear: both;\n}\n\n.fs-datetime-dialog .close {\n  padding: 5px;\n  display: none;\n}\n\n.fs-datetime-dialog fs-tabnav {\n  display: none;\n}\n\n.fs-datetime-dialog fs-tabnav .md-tabs a {\n  width: 50%;\n}\n\n.fs-datetime-dialog .done {\n  background: #fff;\n  width: 100%;\n  border-top: 1px solid #E1E1E1;\n  margin-top: auto;\n}\n\n.fs-datetime-dialog .done button {\n  padding-left: 10px;\n  padding-right: 10px;\n  padding: 0 6px;\n  margin: 6px 8px;\n}\n\n@media only screen and (min-width: 500px) {\n  .fs-datetime-dialog .date {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n\n  .fs-datetime-dialog .time .hour:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .time .minute:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .day:hover:not(.disabled):not(.selected):not(.blank),\n  .fs-datetime-dialog .years .year:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .months .month:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .year-name:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .month-name:hover:not(.disabled):not(.selected) {\n    background: rgba(70, 120, 174, .15);\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  .fs-datetime-dialog {\n    left: 0 !important;\n    right: 0 !important;\n    top: 0 !important;\n    bottom: 0px !important;\n    margin: 0px;\n    height: 100vh;\n    max-height: none !important;\n    max-height: initial !important;\n  }\n\n  .fs-datetime-dialog.fs-datetime-range.has-date .date-range {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    height: 100%;\n  }\n\n  .fs-datetime-dialog.fs-datetime-range.has-date .date-range fsdatepickercalendar:first-child {\n    margin-right: 0 !important;\n  }\n\n  .fs-datetime-dialog.fs-datetime-range.has-date .date-time {\n    overflow-y: auto;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-date .wrap {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-date .wrap .date-time {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-datetime:not(.date-mode-date) .wrap {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-datetime:not(.date-mode-date) .wrap .date-time {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog .wrap {\n    margin: 0px;\n    width: 100% !important;\n    height: calc(100vh - 50px);\n  }\n\n  .fs-datetime-dialog .wrap .date-time {\n    height: calc(100% - 50px);\n  }\n\n  .fs-datetime-dialog .day {\n    width: 14.28%;\n    height: 40px;\n    line-height: 40px;\n  }\n\n  .fs-datetime-dialog table {\n    width: 100%;\n  }\n\n  .fs-datetime-dialog .close {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  .fs-datetime-dialog .done {\n    position: fixed;\n    bottom: 0;\n  }\n\n  .fs-datetime-dialog fs-tabnav {\n    display: block;\n  }\n}\n\n", "", {"version":3,"sources":["/Users/mendor/work/fs-datepicker/src/src/styles.scss","/Users/mendor/work/fs-datepicker/styles.scss"],"names":[],"mappings":"AAAA;EACE,gBAAA;EACA,OAAA;EACA,UAAA;EACA,QAAA;EACA,SAAA;EACA,YAAA;EACA,cAAA;EACA,kBAAA;EACA,4BAAA;CCCD;;ADVD;EAWc,yBAAA;CCGb;;ADAD;EACC,gBAAA;EACC,YAAA;EACA,cAAA;EACA,mBAAA;EACA,eAAA;EA+HA,2BAAA;EACA;;;;;;;;;;;;;;;;;;;;;;;;;;IClGE;CACH;;AD5BC;EACE,sBAAA;EACA,gBAAA;CC+BH;;ADzCD;EAcI,oBAAA;CC+BH;;AD7CD;EAkBI,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;CC+BH;;ADjDD;EAsBI,cAAA;CC+BH;;AD7BC;EACE,cAAA;CCgCH;;ADzDD;EA6BI,wBAAA;EAEA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,oBAAA;MAAA,YAAA;UAAA,aAAA;CC+BH;;AD5BC;EACE,aAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;EACA,iBAAA;EACA,gIAAA;UAAA,wHAAA;EACA,aAAA;EACA,sBAAA;EAOA;;;;;;;;;MCiCE;CACL;;ADnFD;EA4CM,cAAA;CC2CL;;ADpDC;EAYI,cAAA;CC4CL;;AD3FD;EA8DI,aAAA;EACA,kBAAA;CCiCH;;AD/BK;EACE,iBAAA;CCkCP;;AD3BK;EACE,aAAA;EACA;;;;;;;UCoCE;CACT;;ADhHD;EAoFU,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,oBAAA;MAAA,YAAA;UAAA,aAAA;CCgCT;;ADrHD;EAuFY,kBAAA;CCkCX;;ADhCS;EAGM,YAAA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,0BAAA;EACA,oBAAA;EACA,oBAAA;EACA,wBAAA;EACA,uBAAA;CCiCf;;ADrID;EAyGgB,YAAA;EACA,mBAAA;EACA,UAAA;EACA,SAAA;EACA,0BAAA;EACA,oBAAA;EACA,oBAAA;EACA,wBAAA;EACA,uBAAA;EAEA,iCAAA;EAGA,yBAAA;CCgCf;;ADtJD;EA+HQ,cAAA;CC2BP;;ADOC;;EAEE,cAAA;CCJH;;AD/JD;EAuKI,cAAA;EACA,YAAA;CCJH;;ADOC;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,oBAAA;MAAA,YAAA;UAAA,aAAA;CCJH;;ADzKD;EAiLI,aAAA;EACD,gBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACC,+BAAA;EAAA,8BAAA;MAAA,wBAAA;UAAA,oBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;CCJH;;ADjLD;EAwLM,kBAAA;CCHL;;ADIK;EACE,aAAA;EACA,eAAA;CCDP;;AD1LD;EAgMM,aAAA;CCFL;;AD9LD;;EAqMI,eAAA;EACA,aAAA;EACA,mBAAA;EACA,YAAA;CCFH;;ADKC;EACE,mBAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,0BAAA;EACA,cAAA;CCFH;;ADhND;EAqNM,gBAAA;CCDL;;ADpND;EAyNM,eAAA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;EACA,QAAA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;CCDL;;AD/ND;EAqOQ,YAAA;CCFP;;ADxBC;EA+BI,eAAA;CCHL;;ADvOD;EA8OM,YAAA;EACA,aAAA;EACA,eAAA;CCHL;;ADOC;EACE,0BAAA;CCJH;;ADMK;EACE,YAAA;EACA,oBAAA;EACA,qBAAA;EACA,mBAAA;EACA,8BAAA;EACA,iBAAA;EACA,iCAAA;EACA,2BAAA;EAEA,oBAAA;EACA,gBAAA;EACA,eAAA;CCJP;;ADUG;EACE,oBAAA;EACA,gBAAA;EACA,eAAA;CCPL;;ADrQD;EAiRI,kBAAA;CCRH;;ADzQD;EAsRI,YAAA;EACA,mBAAA;EACD,kBAAA;EACA,oBAAA;MAAA,kBAAA;UAAA,cAAA;CCTF;;ADhRD;;;;;EAiSI,oBAAA;EACD,YAAA;CCTF;;ADYO;;;EAGJ,eAAA;EACA,aAAA;EAAA,gBAAA;EACA,oBAAA;CCTH;;ADjSD;EA8SI,mBAAA;EACA,YAAA;EACA,iBAAA;EACA,cAAA;EACA,iBAAA;CCTH;;ADUG;EACE,YAAA;EACA,WAAA;EACA,mBAAA;EACA,aAAA;EACA,+BAAA;EACA,iCAAA;EACA,kBAAA;EACA,cAAA;EACA,gBAAA;EACA,+BAAA;UAAA,uBAAA;EAIA;;;;;QCNE;CACP;;AD5TD;EA+TQ,YAAA;CCCP;;ADbG;EAqBI,iCAAA;CCJP;;ADpUD;EA2UQ,gCAAA;CCHP;;ADxUD;EAiVI,+BAAA;EAAA,8BAAA;MAAA,wBAAA;UAAA,oBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;CCLH;;ADQC;EACE,YAAA;EACA,aAAA;EACA,mBAAA;CCLH;;ADMG;EACE,YAAA;EACA,cAAA;EACA,YAAA;EACA,mBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;EACA,+BAAA;EACA,8BAAA;EACA,gBAAA;EACA,cAAA;EACA,iBAAA;EACA,gBAAA;EACA,iBAAA;EACA,+BAAA;UAAA,uBAAA;EAOA;;;;;QCLE;CACP;;ADlBG;EAiBI,cAAA;CCKP;;ADtBG;EAoBI,gCAAA;CCMP;;ADKC;EACE,mBAAA;EACA,YAAA;CCFH;;ADxXD;EA8XI,YAAA;CCFH;;AD5XD;EAkYI,aAAA;EACA,cAAA;CCFH;;ADjYD;EAuYI,cAAA;CCFH;;ADGY;EACP,WAAA;CCAL;;ADIC;EACE,iBAAA;EACA,YAAA;EACA,8BAAA;EACA,iBAAA;CCDH;;ADhZD;EAmZM,mBAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;CCCL;;ADID;EAEE;IAEI,gCAAA;IAAA,gCAAA;IAAA,yBAAA;GCHH;;EDCD;;;;;;;IAYI,oCAAA;GCHH;CACF;;ADOD;EACE;IACE,mBAAA;IACA,oBAAA;IACA,kBAAA;IACA,uBAAA;IACA,YAAA;IACA,cAAA;IACA,4BAAA;IAAA,+BAAA;GCJD;;EDHD;IAWQ,6BAAA;IAAA,8BAAA;QAAA,2BAAA;YAAA,uBAAA;IACA,aAAA;GCJP;;EDKO;IACE,2BAAA;GCFT;;EDKK;IACE,iBAAA;GCFP;;EDhBD;IA2BQ,wBAAA;GCPP;;EDQO;IACE,wBAAA;GCLT;;EDWO;IACE,wBAAA;GCRT;;EDSS;IACE,wBAAA;GCNX;;EDaC;IACC,YAAA;IACA,uBAAA;IACC,2BAAA;GCVH;;EDtCD;IAkDM,0BAAA;GCRL;;EDYC;IACE,cAAA;IACA,aAAA;IACD,kBAAA;GCTF;;EDhDD;IA4DG,YAAA;GCRF;;EDpDD;IA+DI,qBAAA;IAAA,qBAAA;IAAA,cAAA;GCPH;;EDxDD;IAkEI,gBAAA;IACA,UAAA;GCNH;;EDQC;IACE,eAAA;GCLH;CACF","file":"styles.scss","sourcesContent":[".fs-datetime-backdrop {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 50;\n  outline: none;\n  overflow: visible;\n  background: none !important;\n\n  &[hidden] { display: none !important; }\n}\n\n.fs-datetime-dialog {\n\tposition: fixed;\n  z-index: 80;\n  display: none;\n  visibility: hidden;\n  display: block;\n  // margin-top: 20px;\n\n  a {\n    text-decoration: none;\n    cursor: pointer;\n  }\n\n  &.opened {\n    visibility: visible;\n  }\n\n  * {\n    user-select: none;\n  }\n\n  &:focus {\n    outline: none;\n  }\n  &:active {\n    outline: none;\n  }\n\n  fsDatePickerCalendar {\n    /* Need for year view */\n    // width: 100%;\n    display: flex;\n    flex: 1;\n  }\n\n  .wrap {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    background: #fff;\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n    width: 373px;\n    padding: 0 !important;\n    &:focus {\n      outline: none;\n    }\n    &:active {\n      outline: none;\n    }\n    /*\n    @TODO in scope of presets\n    .header {\n      padding: 0 15px;\n      // Don't use flex. Strange behaviour of scroll\n      display: table;\n      width: 100%;\n      box-sizing: border-box;\n    }\n    */\n  }\n\n  &.has-time {\n    height: 100%;\n    max-height: 472px;\n    .wrap {\n      .date-time {\n        overflow-y: auto;\n      }\n    }\n  }\n\n  &.fs-datetime-range {\n    &.has-date {\n      .wrap {\n        width: 744px;\n        /*\n        @TODO in scope of presets\n        .header {\n          fsdatepickerpresets .presets {\n            float: right;\n          }\n        }\n        */\n        .date-range {\n          display: flex;\n          flex: 1;\n          fsdatepickercalendar:first-child {\n            margin-right: 5px;\n          }\n          td.day:not(.disabled):not(.mute) {\n            &.min-date {\n              &::before {\n                content: '';\n                position: absolute;\n                top: 0;\n                left: 0;\n                border-color: transparent;\n                border-style: solid;\n                border-width: 0.5em;\n                border-left-color: #fff;\n                border-top-color: #fff;\n              }\n            }\n            &.max-date {\n              &::after {\n                content: '';\n                position: absolute;\n                bottom: 0;\n                right: 0;\n                border-color: transparent;\n                border-style: solid;\n                border-width: 0.5em;\n                border-left-color: #fff;\n                border-top-color: #fff;\n                -moz-transform: scale(-1, -1);\n                -webkit-transform: scale(-1, -1);\n                -o-transform: scale(-1, -1);\n                -ms-transform: scale(-1, -1);\n                transform: scale(-1, -1);\n              }\n            }\n          }\n        }\n      }\n    }\n    &:not(.has-date) {\n      .date-range {\n        display: none;\n      }\n    }\n  }\n\n  /* triangle above dialog */\n  /*\n  &:not(.vertical-reposition) {\n    &:not(.horizontal-reposition) {\n      .wrap {\n        &:after, &:before {\n          border-left: 20px solid transparent;\n          border-right: 20px solid transparent;\n          border-top: 19px solid #fff;\n          top: -19px;\n          content: '';\n          left: 50%;\n          position: absolute;\n          transform: rotate(180deg);\n          left: 23px;\n        }\n        &:before {\n          border-left: 23px solid transparent;\n          border-right: 23px solid transparent;\n          border-top: 21px solid transparent;\n          border-top-color: #efefef;\n          top: -21px;\n          left: 20px;\n        }\n      }\n    }\n  }\n  */\n\n  .date::-webkit-scrollbar,\n  .years::-webkit-scrollbar {\n    display: none;\n  }\n\n  .inline-date {\n    padding: 10px;\n    width: 100%;\n  }\n\n  .gap {\n    display: flex;\n    flex: 1;\n  }\n\n  .month-year {\n    height: 60px;\n\t  padding: 0 10px;\n\t  display: flex;\n    flex-direction: row;\n    align-items: center;\n\n    .actions {\n      text-align: right;\n      a {\n        padding: 6px;\n        color: #757575;\n      }\n    }\n\n    .more {\n      padding: 1px;\n    }\n  }\n\n  .year-name, .month-name {\n    color: inherit;\n    padding: 5px;\n    border-radius: 3px;\n    float: left;\n  }\n\n  .day {\n    position: relative;\n    text-align: center;\n    width: 50px;\n    height: 50px;\n    line-height: 50px;\n    border: 1px solid #efefef;\n    outline: none;\n\n    &:not(.blank) {\n      cursor: pointer;\n    }\n\n    .today {\n      color: #555555;\n      font-size: 8px;\n      position: absolute;\n      bottom: 3px;\n      left: 0;\n      width: 100%;\n      height: auto;\n      line-height: normal;\n    }\n\n    &.selected {\n      .today {\n        color: #fff;\n      }\n    }\n\n    &.mute {\n      color: #d7d7d7;\n    }\n\n    span {\n      width: 100%;\n      height: 100%;\n      display: block;\n    }\n  }\n\n  table {\n    border-collapse: collapse;\n    thead {\n      th {\n        width: 50px;\n        vertical-align: top;\n        padding-bottom: 20px;\n        text-align: center;\n        border: 1px solid transparent;\n        background: #fff;\n        border-bottom: 1px solid #efefef;\n        border-top: 1px solid #fff;\n\n        font-weight: normal;\n        font-size: 12px;\n        color: #4d4d4d;\n      }\n    }\n  }\n\n  fs-datetime {\n    .lbl {\n      font-weight: normal;\n      font-size: 12px;\n      color: #4d4d4d;\n    }\n  }\n\n  fsdatepickercalendar {\n    min-height: 350px;\n  }\n  .date {\n    // overflow-y: auto;\n    // overflow-x: hidden;\n    width: 100%;\n    position: relative;\n\t  min-height: 350px;\n\t  flex: 1 1 45%;\n  }\n\n  .day.selected,\n  .years .year.selected,\n  .months .month.selected,\n  .time .hour.selected,\n  .time .minute.selected {\n    background: #4678AE;\n\t  color: #fff;\n  }\n\n  .time .hour.disabled,\n  .time .minute.disabled,\n  .day.disabled {\n    color: #a6a5a5;\n    cursor: initial;\n    background: #efefef;\n  }\n\n  .years {\n    position: absolute;\n    width: 100%;\n    max-height: 100%;\n    height: 100vh;\n    overflow: hidden;\n    .year {\n      float: left;\n      width: 25%;\n      text-align: center;\n      height: 65px;\n      border-left: 1px solid #efefef;\n      border-bottom: 1px solid #efefef;\n      line-height: 65px;\n      outline: none;\n      cursor: pointer;\n      box-sizing: border-box;\n      &.row {\n        clear: both;\n      }\n      /*\n      &.today {\n        border: 1px solid #4678AE;\n        border-style: double;\n      }\n      */\n      &:nth-last-child(-n+4) {\n        border-bottom: 1px solid #efefef;\n      }\n      &:nth-child(4n+0) {\n        border-right: 1px solid #efefef;\n      }\n    }\n  }\n\n  .date-time {\n    flex-direction: row;\n    display: flex;\n  }\n\n  .months {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    .month {\n      height: 25%;\n      width: 33.33%;\n      float: left;\n      text-align: center;\n      display: flex;\n      justify-content: center;\n      flex-direction: column;\n      border-left: 1px solid #efefef;\n      border-top: 1px solid #efefef;\n      cursor: pointer;\n      outline: none;\n      border-bottom: 0;\n      border-right: 0;\n      min-height: 80px;\n      box-sizing: border-box;\n      &:nth-child(-n+3) {\n        border-top: 0;\n      }\n      &:nth-child(3n+0) {\n        border-right: 1px solid #efefef;\n      }\n      /*\n      &.today {\n        border: 1px solid #4678AE;\n        border-style: double;\n      }\n      */\n    }\n  }\n\n  .iscroll-scroller {\n    position: absolute;\n    width: 100%;\n  }\n\n  .clear {\n    clear: both;\n  }\n\n  .close {\n    padding: 5px;\n    display: none;\n  }\n\n  fs-tabnav {\n    display: none;\n    .md-tabs a {\n      width: 50%;\n    }\n  }\n\n  .done {\n    background: #fff;\n    width: 100%;\n    border-top: 1px solid #E1E1E1;\n    margin-top: auto;\n    button {\n      padding-left: 10px;\n      padding-right: 10px;\n      padding: 0 6px;\n      margin: 6px 8px;\n    }\n  }\n}\n\n@media only screen and (min-width: 500px) {\n\n  .fs-datetime-dialog {\n    .date {\n      display: flex !important;\n    }\n\n    .time .hour:hover:not(.disabled):not(.selected),\n    .time .minute:hover:not(.disabled):not(.selected),\n    .day:hover:not(.disabled):not(.selected):not(.blank),\n    .years .year:hover:not(.disabled):not(.selected),\n    .months .month:hover:not(.disabled):not(.selected),\n    .year-name:hover:not(.disabled):not(.selected),\n    .month-name:hover:not(.disabled):not(.selected) {\n      background: rgba(70,120,174,.15);\n    }\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  .fs-datetime-dialog {\n    left: 0 !important;\n    right: 0 !important;\n    top: 0 !important;\n    bottom: 0px !important;\n    margin: 0px;\n    height: 100vh;\n    max-height: initial !important;\n    &.fs-datetime-range {\n      &.has-date {\n        .date-range {\n          flex-direction: column;\n          height: 100%;\n          fsdatepickercalendar:first-child {\n            margin-right: 0 !important;\n          }\n        }\n        .date-time {\n          overflow-y: auto;\n        }\n      }\n    }\n\n    // 2 cases when Done button is hidden and dialog height increasing\n    &:not(.fs-datetime-range) {\n      &.dialog-view-date {\n        .wrap {\n          height: 100% !important;\n          .date-time {\n            height: 100% !important;\n          }\n        }\n      }\n      &.dialog-view-datetime {\n        &:not(.date-mode-date) {\n          .wrap {\n            height: 100% !important;\n            .date-time {\n              height: 100% !important;\n            }\n          }\n        }\n      }\n    }\n\n    .wrap {\n    \tmargin: 0px;\n    \twidth: 100% !important;\n      height: calc(100vh - 50px);\n      .date-time {\n        height: calc(100% - 50px);\n      }\n    }\n\n    .day {\n      width: 14.28%;\n      height: 40px;\n    \tline-height: 40px;\n    }\n    table {\n\t    width: 100%;\n    }\n    .close {\n      display: flex;\n    }\n    .done {\n      position: fixed;\n      bottom: 0;\n    }\n    fs-tabnav {\n      display: block;\n    }\n  }\n}\n\n",".fs-datetime-backdrop {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 50;\n  outline: none;\n  overflow: visible;\n  background: none !important;\n}\n\n.fs-datetime-backdrop[hidden] {\n  display: none !important;\n}\n\n.fs-datetime-dialog {\n  position: fixed;\n  z-index: 80;\n  display: none;\n  visibility: hidden;\n  display: block;\n  /* triangle above dialog */\n  /*\n  &:not(.vertical-reposition) {\n    &:not(.horizontal-reposition) {\n      .wrap {\n        &:after, &:before {\n          border-left: 20px solid transparent;\n          border-right: 20px solid transparent;\n          border-top: 19px solid #fff;\n          top: -19px;\n          content: '';\n          left: 50%;\n          position: absolute;\n          transform: rotate(180deg);\n          left: 23px;\n        }\n        &:before {\n          border-left: 23px solid transparent;\n          border-right: 23px solid transparent;\n          border-top: 21px solid transparent;\n          border-top-color: #efefef;\n          top: -21px;\n          left: 20px;\n        }\n      }\n    }\n  }\n  */\n}\n\n.fs-datetime-dialog a {\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.fs-datetime-dialog.opened {\n  visibility: visible;\n}\n\n.fs-datetime-dialog * {\n  user-select: none;\n}\n\n.fs-datetime-dialog:focus {\n  outline: none;\n}\n\n.fs-datetime-dialog:active {\n  outline: none;\n}\n\n.fs-datetime-dialog fsDatePickerCalendar {\n  /* Need for year view */\n  display: flex;\n  flex: 1;\n}\n\n.fs-datetime-dialog .wrap {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  width: 373px;\n  padding: 0 !important;\n  /*\n    @TODO in scope of presets\n    .header {\n      padding: 0 15px;\n      // Don't use flex. Strange behaviour of scroll\n      display: table;\n      width: 100%;\n      box-sizing: border-box;\n    }\n    */\n}\n\n.fs-datetime-dialog .wrap:focus {\n  outline: none;\n}\n\n.fs-datetime-dialog .wrap:active {\n  outline: none;\n}\n\n.fs-datetime-dialog.has-time {\n  height: 100%;\n  max-height: 472px;\n}\n\n.fs-datetime-dialog.has-time .wrap .date-time {\n  overflow-y: auto;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap {\n  width: 744px;\n  /*\n        @TODO in scope of presets\n        .header {\n          fsdatepickerpresets .presets {\n            float: right;\n          }\n        }\n        */\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range {\n  display: flex;\n  flex: 1;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range fsdatepickercalendar:first-child {\n  margin-right: 5px;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range td.day:not(.disabled):not(.mute).min-date::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 0.5em;\n  border-left-color: #fff;\n  border-top-color: #fff;\n}\n\n.fs-datetime-dialog.fs-datetime-range.has-date .wrap .date-range td.day:not(.disabled):not(.mute).max-date::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 0.5em;\n  border-left-color: #fff;\n  border-top-color: #fff;\n  -moz-transform: scale(-1, -1);\n  -webkit-transform: scale(-1, -1);\n  -o-transform: scale(-1, -1);\n  -ms-transform: scale(-1, -1);\n  transform: scale(-1, -1);\n}\n\n.fs-datetime-dialog.fs-datetime-range:not(.has-date) .date-range {\n  display: none;\n}\n\n.fs-datetime-dialog .date::-webkit-scrollbar,\n.fs-datetime-dialog .years::-webkit-scrollbar {\n  display: none;\n}\n\n.fs-datetime-dialog .inline-date {\n  padding: 10px;\n  width: 100%;\n}\n\n.fs-datetime-dialog .gap {\n  display: flex;\n  flex: 1;\n}\n\n.fs-datetime-dialog .month-year {\n  height: 60px;\n  padding: 0 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.fs-datetime-dialog .month-year .actions {\n  text-align: right;\n}\n\n.fs-datetime-dialog .month-year .actions a {\n  padding: 6px;\n  color: #757575;\n}\n\n.fs-datetime-dialog .month-year .more {\n  padding: 1px;\n}\n\n.fs-datetime-dialog .year-name,\n.fs-datetime-dialog .month-name {\n  color: inherit;\n  padding: 5px;\n  border-radius: 3px;\n  float: left;\n}\n\n.fs-datetime-dialog .day {\n  position: relative;\n  text-align: center;\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n  border: 1px solid #efefef;\n  outline: none;\n}\n\n.fs-datetime-dialog .day:not(.blank) {\n  cursor: pointer;\n}\n\n.fs-datetime-dialog .day .today {\n  color: #555555;\n  font-size: 8px;\n  position: absolute;\n  bottom: 3px;\n  left: 0;\n  width: 100%;\n  height: auto;\n  line-height: normal;\n}\n\n.fs-datetime-dialog .day.selected .today {\n  color: #fff;\n}\n\n.fs-datetime-dialog .day.mute {\n  color: #d7d7d7;\n}\n\n.fs-datetime-dialog .day span {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.fs-datetime-dialog table {\n  border-collapse: collapse;\n}\n\n.fs-datetime-dialog table thead th {\n  width: 50px;\n  vertical-align: top;\n  padding-bottom: 20px;\n  text-align: center;\n  border: 1px solid transparent;\n  background: #fff;\n  border-bottom: 1px solid #efefef;\n  border-top: 1px solid #fff;\n  font-weight: normal;\n  font-size: 12px;\n  color: #4d4d4d;\n}\n\n.fs-datetime-dialog fs-datetime .lbl {\n  font-weight: normal;\n  font-size: 12px;\n  color: #4d4d4d;\n}\n\n.fs-datetime-dialog fsdatepickercalendar {\n  min-height: 350px;\n}\n\n.fs-datetime-dialog .date {\n  width: 100%;\n  position: relative;\n  min-height: 350px;\n  flex: 1 1 45%;\n}\n\n.fs-datetime-dialog .day.selected,\n.fs-datetime-dialog .years .year.selected,\n.fs-datetime-dialog .months .month.selected,\n.fs-datetime-dialog .time .hour.selected,\n.fs-datetime-dialog .time .minute.selected {\n  background: #4678AE;\n  color: #fff;\n}\n\n.fs-datetime-dialog .time .hour.disabled,\n.fs-datetime-dialog .time .minute.disabled,\n.fs-datetime-dialog .day.disabled {\n  color: #a6a5a5;\n  cursor: initial;\n  background: #efefef;\n}\n\n.fs-datetime-dialog .years {\n  position: absolute;\n  width: 100%;\n  max-height: 100%;\n  height: 100vh;\n  overflow: hidden;\n}\n\n.fs-datetime-dialog .years .year {\n  float: left;\n  width: 25%;\n  text-align: center;\n  height: 65px;\n  border-left: 1px solid #efefef;\n  border-bottom: 1px solid #efefef;\n  line-height: 65px;\n  outline: none;\n  cursor: pointer;\n  box-sizing: border-box;\n  /*\n      &.today {\n        border: 1px solid #4678AE;\n        border-style: double;\n      }\n      */\n}\n\n.fs-datetime-dialog .years .year.row {\n  clear: both;\n}\n\n.fs-datetime-dialog .years .year:nth-last-child(-n+4) {\n  border-bottom: 1px solid #efefef;\n}\n\n.fs-datetime-dialog .years .year:nth-child(4n+0) {\n  border-right: 1px solid #efefef;\n}\n\n.fs-datetime-dialog .date-time {\n  flex-direction: row;\n  display: flex;\n}\n\n.fs-datetime-dialog .months {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n\n.fs-datetime-dialog .months .month {\n  height: 25%;\n  width: 33.33%;\n  float: left;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  border-left: 1px solid #efefef;\n  border-top: 1px solid #efefef;\n  cursor: pointer;\n  outline: none;\n  border-bottom: 0;\n  border-right: 0;\n  min-height: 80px;\n  box-sizing: border-box;\n  /*\n      &.today {\n        border: 1px solid #4678AE;\n        border-style: double;\n      }\n      */\n}\n\n.fs-datetime-dialog .months .month:nth-child(-n+3) {\n  border-top: 0;\n}\n\n.fs-datetime-dialog .months .month:nth-child(3n+0) {\n  border-right: 1px solid #efefef;\n}\n\n.fs-datetime-dialog .iscroll-scroller {\n  position: absolute;\n  width: 100%;\n}\n\n.fs-datetime-dialog .clear {\n  clear: both;\n}\n\n.fs-datetime-dialog .close {\n  padding: 5px;\n  display: none;\n}\n\n.fs-datetime-dialog fs-tabnav {\n  display: none;\n}\n\n.fs-datetime-dialog fs-tabnav .md-tabs a {\n  width: 50%;\n}\n\n.fs-datetime-dialog .done {\n  background: #fff;\n  width: 100%;\n  border-top: 1px solid #E1E1E1;\n  margin-top: auto;\n}\n\n.fs-datetime-dialog .done button {\n  padding-left: 10px;\n  padding-right: 10px;\n  padding: 0 6px;\n  margin: 6px 8px;\n}\n\n@media only screen and (min-width: 500px) {\n  .fs-datetime-dialog .date {\n    display: flex !important;\n  }\n\n  .fs-datetime-dialog .time .hour:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .time .minute:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .day:hover:not(.disabled):not(.selected):not(.blank),\n  .fs-datetime-dialog .years .year:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .months .month:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .year-name:hover:not(.disabled):not(.selected),\n  .fs-datetime-dialog .month-name:hover:not(.disabled):not(.selected) {\n    background: rgba(70, 120, 174, 0.15);\n  }\n}\n\n@media only screen and (max-width: 499px) {\n  .fs-datetime-dialog {\n    left: 0 !important;\n    right: 0 !important;\n    top: 0 !important;\n    bottom: 0px !important;\n    margin: 0px;\n    height: 100vh;\n    max-height: initial !important;\n  }\n\n  .fs-datetime-dialog.fs-datetime-range.has-date .date-range {\n    flex-direction: column;\n    height: 100%;\n  }\n\n  .fs-datetime-dialog.fs-datetime-range.has-date .date-range fsdatepickercalendar:first-child {\n    margin-right: 0 !important;\n  }\n\n  .fs-datetime-dialog.fs-datetime-range.has-date .date-time {\n    overflow-y: auto;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-date .wrap {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-date .wrap .date-time {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-datetime:not(.date-mode-date) .wrap {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog:not(.fs-datetime-range).dialog-view-datetime:not(.date-mode-date) .wrap .date-time {\n    height: 100% !important;\n  }\n\n  .fs-datetime-dialog .wrap {\n    margin: 0px;\n    width: 100% !important;\n    height: calc(100vh - 50px);\n  }\n\n  .fs-datetime-dialog .wrap .date-time {\n    height: calc(100% - 50px);\n  }\n\n  .fs-datetime-dialog .day {\n    width: 14.28%;\n    height: 40px;\n    line-height: 40px;\n  }\n\n  .fs-datetime-dialog table {\n    width: 100%;\n  }\n\n  .fs-datetime-dialog .close {\n    display: flex;\n  }\n\n  .fs-datetime-dialog .done {\n    position: fixed;\n    bottom: 0;\n  }\n\n  .fs-datetime-dialog fs-tabnav {\n    display: block;\n  }\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./components/fsdatepicker/fsdatepicker.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fs-datetime-backdrop\" [hidden]=\"!parentInstance.opened\" (click)=\"close($event)\"></div>\n\n<div class=\"fs-datetime-dialog {{ 'dialog-view-' + fsDatePickerModel.view }}\" tabindex=\"0\"\n[ngClass]=\"{ opened: parentInstance.opened,\n  'has-date': fsDatePickerModel.components.calendarStart,\n  'has-time': fsDatePickerModel.components.timeStart,\n  'date-mode-date': fsDatePickerModel.dateMode === 'date',\n  'date-mode-month': fsDatePickerModel.dateMode === 'month',\n  'date-mode-year': fsDatePickerModel.dateMode === 'year'\n }\">\n  <div class=\"wrap\">\n\n    <div *ngIf=\"fsDatePickerModel.dateMode === 'date'\" class=\"header\">\n      <fsDatePickerSummary\n      [startDate]=\"model\"\n      (componentsChange)=\"setComponents($event)\"\n      ></fsDatePickerSummary>\n\n      <!--\n      <fsDatePickerPresets\n      *ngIf=\"!fsDatePickerModel.components.timeStart\"\n      (datesChange)=\"setDate($event)\"\n      ></fsDatePickerPresets>\n      -->\n    </div>\n\n    <div class=\"date-time\">\n      <fsDatePickerCalendar\n        *ngIf=\"fsDatePickerModel.components.calendarStart\"\n        [date]=\"model\"\n        [drawMonth]=\"calendarMonth\"\n        [dateMode]=\"fsDatePickerModel.dateMode\"\n        (onChange)=\"setDate($event)\"\n        (onDateModeChange)=\"setDateMode($event)\"\n        (onDrawMonth)=\"calendarDrawMonth($event)\"\n      ></fsDatePickerCalendar>\n\n      <fsDatePickerTime\n        *ngIf=\"fsDatePickerModel.components.timeStart\"\n        [date]=\"model\"\n        (onChange)=\"setDate($event)\"\n      ></fsDatePickerTime>\n\n    </div>\n\n    <!-- Done button showing on Time Picker or Date Time picker on calendar mode -->\n    <div class=\"done\"\n    *ngIf=\"fsDatePickerModel.view === 'time' ||\n          (fsDatePickerModel.view === 'datetime' && fsDatePickerModel.dateMode === 'date')\">\n      <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"close($event)\">Done</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./components/fsdatepicker/fsdatepicker.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepickermodel_service_1 = __webpack_require__("./services/fsdatepickermodel.service.ts");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var FsDatepickerComponent = (function () {
    function FsDatepickerComponent(fsDatePickerModel, fsDatePickerCommon, element) {
        this.fsDatePickerModel = fsDatePickerModel;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.element = element;
        this.parentInstance = null;
        this.model = null;
        this.calendarMonth = null;
    }
    FsDatepickerComponent.prototype.ngOnInit = function () {
        this.model = this.parentInstance.getValue();
        this.calendarDrawMonth(this.model);
    };
    FsDatepickerComponent.prototype.setDate = function (date) {
        this.model = date;
        this.parentInstance.writeValue(date);
        this.calendarDrawMonth(this.model);
        if (this.fsDatePickerModel.view === 'date') {
            this.close();
        }
    };
    FsDatepickerComponent.prototype.setDateMode = function (mode) {
        this.fsDatePickerModel.dateMode = mode;
    };
    FsDatepickerComponent.prototype.setComponents = function (data) {
        this.fsDatePickerModel.components = data;
    };
    FsDatepickerComponent.prototype.calendarDrawMonth = function (date) {
        this.calendarMonth = this.fsDatePickerCommon.getMomentSafe(date);
    };
    FsDatepickerComponent.prototype.close = function ($event) {
        this.parentInstance.opened = false;
    };
    FsDatepickerComponent.prototype.documentKeydown = function (e) {
        if (e.keyCode === 27) {
            // Be careful with preventing default events. Breaking page refresh functional
            e.preventDefault();
            this.close(e);
        }
    };
    __decorate([
        core_1.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatepickerComponent.prototype, "documentKeydown", null);
    FsDatepickerComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePicker',
            template: __webpack_require__("./components/fsdatepicker/fsdatepicker.component.html"),
            styles: [__webpack_require__("./styles.scss")],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [fsdatepickermodel_service_1.FsDatePickerModel]
        }),
        __metadata("design:paramtypes", [fsdatepickermodel_service_1.FsDatePickerModel,
            fsdatepickercommon_service_1.FsDatePickerCommon,
            core_1.ElementRef])
    ], FsDatepickerComponent);
    return FsDatepickerComponent;
}());
exports.FsDatepickerComponent = FsDatepickerComponent;


/***/ }),

/***/ "./components/fsdatepickercalendar/fsdatepickercalendar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"date\" (swipeleft)=\"swipe($event.type)\" (swiperight)=\"swipe($event.type)\" (mouseleave)=\"onMouseLeaveCalendar()\">\n  <div class=\"months\" *ngIf=\"dateMode == 'month'\">\n    <div *ngFor=\"let month of monthList\" (click)=\"monthViewChange(month.value)\" class=\"month\" [ngClass]=\"{ today: today.month == month.value, selected: selected.month == month.value }\">{{ month.abr }}</div>\n  </div>\n  <div class=\"years\" *ngIf=\"dateMode == 'year'\" fsIscroll [fsOptions]=\"iscrollOptions\" fsInstance=\"iscrollInstance\">\n    <div class=\"iscroll-scroller\">\n      <div *ngFor=\"let year of years\" class=\"year data-year-{{ year }}\" [ngClass]=\"{ today: today.year==year, row : ($index % 4 == 0), selected: selected.year==year }\" (click)=\"yearViewChange(year)\">\n          {{ year }}\n      </div>\n      <div class=\"clear\"></div>\n    </div>\n  </div>\n  <div *ngIf=\"dateMode == 'date' && month\" class=\"calendar\">\n    <div class=\"month-year\">\n      <a class=\"month-name\" (click)=\"monthView(month)\">{{month.name}}</a>\n      <a class=\"year-name\" (click)=\"yearView(month.year)\">{{month.year}}</a>\n      <!-- <a (click)=\"yearView(month.year)\" class=\"more\"><mat-icon>arrow_drop_down</mat-icon></a> -->\n      <div class=\"gap\"></div>\n      <div class=\"actions\">\n        <a (click)=\"previousMonth(month)\"><mat-icon>navigate_before</mat-icon></a>\n        <a (click)=\"nextMonth(month)\"><mat-icon>navigate_next</mat-icon></a>\n      </div>\n    </div>\n    <table>\n      <thead>\n        <tr>\n          <th>Sun</th>\n          <th>Mon</th>\n          <th>Tues</th>\n          <th>Wed</th>\n          <th>Thurs</th>\n          <th>Fri</th>\n          <th>Sat</th>\n        </tr>\n      </thead>\n      <tbody class=\"calendar calendar-{{ month.date }}\">\n        <tr class=\"week\" *ngFor=\"let week of month.weeks\">\n          <td *ngFor=\"let day of week\" class=\"day\" [ngClass]=\"{\n            today: today.date==day.date,\n            mute: day.mute,\n            selected: (day.date==selected.date || highlightedRangeDays.data[day.date]) && !day.mute,\n            'min-date': day.date === highlightedRangeDays.min,\n            'max-date': day.date === highlightedRangeDays.max,\n            disabled: day.disabled }\" (click)=\"dayClick(day)\" (mouseenter)=\"onMouseEnterDay(day)\">\n            <span>\n              {{ day.number }}\n              <span class=\"today\" *ngIf=\"today.date==day.date\">TODAY</span>\n            </span>\n          </td>\n        </tr>\n        <tr *ngIf=\"month.weeks.length < 6\" class=\"week\">\n          <td class=\"day blank\" colspan=\"7\"></td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./components/fsdatepickercalendar/fsdatepickercalendar.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickercalendar/fsdatepickercalendar.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./components/fsdatepickercalendar/fsdatepickercalendar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var platform_browser_1 = __webpack_require__("@angular/platform-browser");
__webpack_require__("hammerjs");
var fshammer_config_1 = __webpack_require__("./configs/fshammer.config.ts");
var moment = __webpack_require__("moment-timezone");
var moment_range_1 = __webpack_require__("moment-range");
var util_1 = __webpack_require__("@firestitch/common/util");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var fsdatepickermodel_service_1 = __webpack_require__("./services/fsdatepickermodel.service.ts");
var FsDatePickerCalendarComponent = (function () {
    function FsDatePickerCalendarComponent(element, fsDatePickerCommon, fsDatePickerModel, _iterableDiffers) {
        var _this = this;
        this.element = element;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatePickerModel = fsDatePickerModel;
        this._iterableDiffers = _iterableDiffers;
        this.date = null;
        this.highlightStartDate = null;
        this.highlightEndDate = null;
        this.dateMode = null;
        this.disabledDays = null;
        this.drawMonth = null;
        this.onChange = new core_1.EventEmitter();
        this.onDateModeChange = new core_1.EventEmitter();
        this.onDrawMonth = new core_1.EventEmitter();
        this.hoverDay = new core_1.EventEmitter();
        this.mouseLeaveCalendar = new core_1.EventEmitter();
        this.selected = {};
        this.iscrollOptions = null;
        this.iscrollInstance = null;
        this.month = null;
        this.years = [];
        this.dateDays = [];
        this.highlightedRangeDays = null;
        this.disabledDaysDiffer = null;
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this.monthList = [{ value: 1, name: 'January', abr: 'Jan' },
            { value: 2, name: 'February', abr: 'Feb' },
            { value: 3, name: 'March', abr: 'Mar' },
            { value: 4, name: 'April', abr: 'Apr' },
            { value: 5, name: 'May', abr: 'May' },
            { value: 6, name: 'June', abr: 'June' },
            { value: 7, name: 'July', abr: 'July' },
            { value: 8, name: 'August', abr: 'Aug' },
            { value: 9, name: 'September', abr: 'Sept' },
            { value: 10, name: 'October', abr: 'Oct' },
            { value: 11, name: 'November', abr: 'Nov' },
            { value: 12, name: 'December', abr: 'Dec' }];
        this.today = {
            date: moment().format('YYYY-MM-DD'),
            month: moment().format('M'),
            year: parseInt(moment().format('YYYY'))
        };
        this.dateScroll = util_1.throttle(function (e) {
            // @TODO need better way to detect mobile devices
            if (window.innerWidth <= 499) {
                return;
            }
            if (e.wheelDelta > 0) {
                _this.nextMonth(_this.month);
            }
            else {
                _this.previousMonth(_this.month);
            }
        }, 50);
        this.disabledDaysDiffer = this._iterableDiffers.find([]).create(null);
        moment_range_1.extendMoment(moment);
    }
    FsDatePickerCalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        for (var y = this.fsDatePickerModel.minYear; y < this.fsDatePickerModel.maxYear; y++) {
            this.years.push(y);
        }
        if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
            setTimeout(function () {
                var $date = _this.element.nativeElement.querySelector('.date');
                $date.addEventListener('mousewheel', _this.dateScroll);
            });
        }
    };
    FsDatePickerCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            if (changes.date) {
                // this.onDrawMonth.emit(this.fsDatePickerCommon.getMomentSafe(this.date));
                this.selected = this.fsDatePickerCommon.getSelected(this.date);
                this.updateDaysHighlighted();
            }
            else if (changes.highlightStartDate || changes.highlightEndDate) {
                this.updateDaysHighlighted();
            }
            if (changes.drawMonth) {
                if (changes.drawMonth.currentValue) {
                    this.drawMonths(changes.drawMonth.currentValue);
                }
                else {
                    this.onDrawMonth.emit(this.fsDatePickerCommon.createMoment());
                }
            }
        }
    };
    FsDatePickerCalendarComponent.prototype.onMouseEnterDay = function (day) {
        this.hoverDay.emit(day);
    };
    FsDatePickerCalendarComponent.prototype.onMouseLeaveCalendar = function () {
        this.mouseLeaveCalendar.emit();
    };
    FsDatePickerCalendarComponent.prototype.updateDaysHighlighted = function () {
        this.highlightedRangeDays = {
            data: {},
            min: null,
            max: null
        };
        var start = null;
        var end = null;
        if (this.highlightStartDate) {
            this.highlightEndDate = this.highlightEndDate || this.highlightStartDate;
            if (moment(this.highlightStartDate).isAfter(this.highlightEndDate)) {
                start = this.highlightEndDate;
                end = this.highlightStartDate;
            }
            else {
                start = this.highlightStartDate;
                end = this.highlightEndDate;
            }
            start = moment(start).startOf('day');
            end = moment(end).startOf('day');
            var range = Array.from(moment.range(start, end).by('days'));
            if (!range.length) {
                return;
            }
            for (var _i = 0, range_1 = range; _i < range_1.length; _i++) {
                var day = range_1[_i];
                this.highlightedRangeDays.data[moment(day).format('YYYY-MM-DD')] = true;
            }
            this.highlightedRangeDays.min = moment(range[0]).format('YYYY-MM-DD');
            this.highlightedRangeDays.max = moment(range[range.length - 1]).format('YYYY-MM-DD');
        }
    };
    FsDatePickerCalendarComponent.prototype.ngDoCheck = function () {
        if (this.disabledDays && this.disabledDaysDiffer.diff(this.disabledDays)) {
            if (this.disabledDays !== undefined && this.month) {
                for (var _i = 0, _a = this.month.weeks; _i < _a.length; _i++) {
                    var week = _a[_i];
                    for (var _b = 0, week_1 = week; _b < week_1.length; _b++) {
                        var day = week_1[_b];
                        day.disabled = this.isDayDisabled(moment(day.date));
                    }
                }
            }
        }
    };
    FsDatePickerCalendarComponent.prototype.isDayDisabled = function (md) {
        if (!this.disabledDays) {
            return false;
        }
        var len;
        for (var i = 0, len_1 = this.disabledDays.length; i < len_1; i++) {
            var value = this.disabledDays[i];
            if (moment.isMoment(value)) {
                if (value.format('YYYY-MM-DD') == md.format('YYYY-MM-DD')) {
                    return true;
                }
            }
            else {
                if (md.isBetween(value[0].startOf('day'), value[1].startOf('day')) || md.format('YYYY-MM-DD') == value[0].format('YYYY-MM-DD')) {
                    return true;
                }
            }
        }
        return false;
    };
    FsDatePickerCalendarComponent.prototype.monthClick = function (month) {
        Object.assign(month.months, this.monthList);
    };
    FsDatePickerCalendarComponent.prototype.monthViewChange = function (month) {
        // Changing date
        // this.monthChange(month);
        // Changing calendar view
        this.setMonth(month);
        this.calendarView();
    };
    FsDatePickerCalendarComponent.prototype.monthChange = function (month) {
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().month(month - 1));
    };
    FsDatePickerCalendarComponent.prototype.createModel = function () {
        if (!this.date) {
            this.date = this.fsDatePickerCommon.createMoment();
        }
    };
    FsDatePickerCalendarComponent.prototype.setDate = function (date) {
        this.date = date;
        this.onChange.emit(date);
    };
    FsDatePickerCalendarComponent.prototype.calendarView = function () {
        this.onDateModeChange.emit('date');
    };
    FsDatePickerCalendarComponent.prototype.monthView = function (month) {
        this.onDateModeChange.emit('month');
    };
    FsDatePickerCalendarComponent.prototype.yearView = function (year) {
        this.iscrollOptions = { scrollToElement: ".years .data-year-" + year };
        this.onDateModeChange.emit('year');
    };
    FsDatePickerCalendarComponent.prototype.dayClick = function (day) {
        if (day.disabled) {
            return;
        }
        if (!this.date) {
            this.createModel();
        }
        var date = this.date
            .clone()
            .year(day.year)
            .month(day.month - 1)
            .date(day.number);
        this.setDate(date);
    };
    FsDatePickerCalendarComponent.prototype.yearViewChange = function (year) {
        var _this = this;
        // For some reason for mobile devices click event fired for both year/day modes. setTimeout fix this problem
        setTimeout(function () {
            _this.setYear(year);
            _this.calendarView();
        });
    };
    FsDatePickerCalendarComponent.prototype.yearChange = function (year) {
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().year(year));
    };
    FsDatePickerCalendarComponent.prototype.previousMonth = function (month) {
        // this.drawMonths(month.moment.subtract(1, 'months'));
        this.onDrawMonth.emit(month.moment.subtract(1, 'months'));
    };
    FsDatePickerCalendarComponent.prototype.nextMonth = function (month) {
        // this.drawMonths(month.moment.add(1, 'months'));
        this.onDrawMonth.emit(month.moment.add(1, 'months'));
    };
    FsDatePickerCalendarComponent.prototype.setMonth = function (monthNumber) {
        // this.drawMonths(moment(this.month.moment).set('month', monthNumber - 1));
        this.onDrawMonth.emit(moment(this.month.moment).set('month', monthNumber - 1));
    };
    FsDatePickerCalendarComponent.prototype.setYear = function (yearNumber) {
        // this.drawMonths(moment(this.month.moment).set('year', yearNumber));
        this.onDrawMonth.emit(moment(this.month.moment).set('year', yearNumber));
    };
    FsDatePickerCalendarComponent.prototype.drawMonths = function (date) {
        this.onDrawMonth.emit(date);
        this.month = this.createMonth(date);
    };
    FsDatePickerCalendarComponent.prototype.createMonth = function (date) {
        date = date.clone().date(1);
        var days = [], weeks = [];
        var week = [];
        var md = date.clone();
        md.subtract(date.day(), 'day');
        var daysInMonth = date.daysInMonth();
        for (var d = 0; d < daysInMonth + date.day() + (6 - date.clone().add(1, 'month').day() + 1); d++) {
            var number = md.format('DD');
            days.push({ number: number });
            if (d % 7 == 0) {
                week = [];
                weeks.push(week);
            }
            week.push({ mute: (d - date.day() < 0 || ((d - date.day() + 1) > daysInMonth)),
                date: md.format('YYYY-MM-DD'),
                number: md.format('D'),
                month: md.format('M'),
                year: md.format('YYYY'),
                disabled: this.isDayDisabled(md) });
            md.add(1, 'day');
        }
        return { name: date.format('MMMM'),
            number: date.format('M'),
            year: date.format('YYYY'),
            moment: date,
            date: date.format('YYYY') + '-' + date.format('M'),
            weeks: weeks,
            months: [{ name: date.format('MMMM'), value: date.format('M') }],
            years: [date.format('YYYY')] };
    };
    FsDatePickerCalendarComponent.prototype.updateDateDays = function () {
        var year = this.selected['year'] || 1904;
        var month = this.selected['month'] || 1;
        var max = new Date(year, month, 0).getDate();
        this.dateDays = [];
        for (var d = 1; d <= max; d++) {
            this.dateDays.push(d);
        }
        return this.dateDays;
    };
    FsDatePickerCalendarComponent.prototype.monthDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatePickerCalendarComponent.prototype.dayDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatePickerCalendarComponent.prototype.yearDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatePickerCalendarComponent.prototype.updateDate = function () {
        var m = moment([this.selected['year'], this.selected['month'] - 1, this.selected['day']]);
        var max = new Date(this.selected['year'] || 1904, this.selected['month'], 0).getDate();
        if (max < this.selected['day']) {
            this.selected['day'] = undefined;
        }
        if (m.isValid()) {
            this.setDate(m);
        }
    };
    FsDatePickerCalendarComponent.prototype.onMouseWheel = function ($event) {
        // $event.preventDefault();
    };
    FsDatePickerCalendarComponent.prototype.onTouchMove = function ($event) {
        $event.preventDefault();
    };
    FsDatePickerCalendarComponent.prototype.swipe = function (action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.previousMonth(this.month);
        }
        else if (action === this.SWIPE_ACTION.LEFT) {
            this.nextMonth(this.month);
        }
    };
    FsDatePickerCalendarComponent.prototype.ngOnDestroy = function () {
        if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
            var $date = this.element.nativeElement.querySelector('.date');
            $date.removeEventListener('mousewheel', this.dateScroll);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "highlightStartDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "highlightEndDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "dateMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "disabledDays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "drawMonth", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "onDateModeChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "onDrawMonth", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "hoverDay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "mouseLeaveCalendar", void 0);
    FsDatePickerCalendarComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerCalendar',
            template: __webpack_require__("./components/fsdatepickercalendar/fsdatepickercalendar.component.html"),
            styles: [__webpack_require__("./components/fsdatepickercalendar/fsdatepickercalendar.component.scss")],
            host: {
                '(mousewheel)': 'onMouseWheel($event)',
                '(touchmove)': 'onTouchMove($event)'
            },
            providers: [
                {
                    provide: platform_browser_1.HAMMER_GESTURE_CONFIG,
                    useClass: fshammer_config_1.FsHammerConfig
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickermodel_service_1.FsDatePickerModel,
            core_1.IterableDiffers])
    ], FsDatePickerCalendarComponent);
    return FsDatePickerCalendarComponent;
}());
exports.FsDatePickerCalendarComponent = FsDatePickerCalendarComponent;


/***/ }),

/***/ "./components/fsdatepickerpresets/fsdatepickerpresets.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"presets.length\" class=\"presets\">\n  <ng-container *ngFor=\"let item of presets; let i = index\">\n    <a (click)=\"setPreset(item)\" *ngIf=\"i < 4\">{{ item.name }}</a>\n  </ng-container>\n  <ng-container *ngIf=\"presets.length > 4\">\n    <button mat-icon-button [matMenuTriggerFor]=\"presetsMenu\">\n      <mat-icon>more_horiz</mat-icon>\n    </button>\n    <mat-menu #presetsMenu=\"matMenu\" [overlapTrigger]=\"false\">\n      <ng-container *ngFor=\"let item of presets; let i = index\">\n        <button mat-menu-item (click)=\"setPreset(item)\" *ngIf=\"i >= 4\">{{ item.name }}</button>\n      </ng-container>\n    </mat-menu>\n  </ng-container>\n</div>\n"

/***/ }),

/***/ "./components/fsdatepickerpresets/fsdatepickerpresets.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickerpresets/fsdatepickerpresets.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./components/fsdatepickerpresets/fsdatepickerpresets.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepickermodel_service_1 = __webpack_require__("./services/fsdatepickermodel.service.ts");
var FsDatepickerPresetsComponent = (function () {
    function FsDatepickerPresetsComponent(fsDatePickerModel) {
        this.fsDatePickerModel = fsDatePickerModel;
        this.datesChange = new core_1.EventEmitter();
        this.presets = [];
    }
    FsDatepickerPresetsComponent.prototype.ngOnInit = function () {
        this.presets = this.fsDatePickerModel.presets;
    };
    FsDatepickerPresetsComponent.prototype.setPreset = function (preset) {
        this.datesChange.emit(preset.value);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatepickerPresetsComponent.prototype, "datesChange", void 0);
    FsDatepickerPresetsComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerPresets',
            template: __webpack_require__("./components/fsdatepickerpresets/fsdatepickerpresets.component.html"),
            styles: [__webpack_require__("./components/fsdatepickerpresets/fsdatepickerpresets.component.scss")]
        }),
        __metadata("design:paramtypes", [fsdatepickermodel_service_1.FsDatePickerModel])
    ], FsDatepickerPresetsComponent);
    return FsDatepickerPresetsComponent;
}());
exports.FsDatepickerPresetsComponent = FsDatepickerPresetsComponent;


/***/ }),

/***/ "./components/fsdatepickerrange/fsdatepickerrange.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fs-datetime-backdrop\" [hidden]=\"!parentInstance.opened\" (click)=\"close($event)\"></div>\n\n<div class=\"fs-datetime-dialog fs-datetime-range dialog-view-{{ fsDatePickerModel.view }}\" tabindex=\"0\"\n[ngClass]=\"{ opened: parentInstance.opened,\n  'has-date': (fsDatePickerModel.components.calendarStart || fsDatePickerModel.components.calendarEnd),\n  'has-time': (fsDatePickerModel.components.timeStart || fsDatePickerModel.components.timeEnd) }\">\n  <div class=\"wrap\">\n\n    <div class=\"header\">\n      <fsDatePickerSummary\n      [startDate]=\"parentInstance.ngModelStart\"\n      [endDate]=\"parentInstance.ngModelEnd\"\n      (componentsChange)=\"setComponents($event)\"\n      ></fsDatePickerSummary>\n      <!--\n      <fsDatePickerPresets\n      *ngIf=\"!fsDatePickerModel.components.timeStart && !fsDatePickerModel.components.timeEnd\"\n      (datesChange)=\"onDatesChange($event)\"\n      ></fsDatePickerPresets>\n      -->\n    </div>\n\n    <div class=\"date-time\">\n      <div class=\"date-range\">\n          <fsDatePickerCalendar\n          *ngIf=\"fsDatePickerModel.components.calendarStart\"\n          [date]=\"parentInstance.ngModelStart\"\n          [highlightStartDate]=\"highlightStartDate\"\n          [highlightEndDate]=\"highlightEndDate\"\n          [dateMode]=\"fsDatePickerModel.dateMode.start_date\"\n          [drawMonth]=\"startCalendarMonth\"\n          (onChange)=\"setStartDate($event)\"\n          (onDateModeChange)=\"setDateModeStart($event)\"\n          (onDrawMonth)=\"startCalendarDrawMonth($event)\"\n          (hoverDay)=\"hoverCalendar($event)\"\n          (mouseLeaveCalendar)=\"onMouseLeaveCalendar($event)\"\n          ></fsDatePickerCalendar>\n\n          <fsDatePickerCalendar\n          *ngIf=\"fsDatePickerModel.components.calendarEnd\"\n          [date]=\"parentInstance.ngModelEnd\"\n          [highlightStartDate]=\"highlightStartDate\"\n          [highlightEndDate]=\"highlightEndDate\"\n          [dateMode]=\"fsDatePickerModel.dateMode.end_date\"\n          [disabledDays]=\"toDisabledDays\"\n          [drawMonth]=\"endCalendarMonth\"\n          (onChange)=\"setEndDate($event)\"\n          (onDateModeChange)=\"setDateModeEnd($event)\"\n          (onDrawMonth)=\"endCalendarDrawMonth($event)\"\n          (hoverDay)=\"hoverCalendar($event)\"\n          (mouseLeaveCalendar)=\"onMouseLeaveCalendar($event)\"\n          ></fsDatePickerCalendar>\n      </div>\n\n      <div class=\"time-range\">\n        <fsDatePickerTime\n          *ngIf=\"fsDatePickerModel.components.timeStart\"\n          [date]=\"parentInstance.ngModelStart\"\n          (onChange)=\"setStartTime($event)\"\n        ></fsDatePickerTime>\n        <fsDatePickerTime\n          *ngIf=\"fsDatePickerModel.components.timeEnd\"\n          [date]=\"parentInstance.ngModelEnd\"\n          [disabledTimes]=\"toDisabledTimes\"\n          (onChange)=\"setEndTime($event)\"\n        ></fsDatePickerTime>\n      </div>\n\n    </div>\n\n    <div class=\"done\">\n      <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"close($event)\">Done</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./components/fsdatepickerrange/fsdatepickerrange.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepickermodel_service_1 = __webpack_require__("./services/fsdatepickermodel.service.ts");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var moment = __webpack_require__("moment-timezone");
var FsDatepickerRangeComponent = (function () {
    function FsDatepickerRangeComponent(fsDatePickerModel, fsDatePickerCommon, element, _iterableDiffers) {
        this.fsDatePickerModel = fsDatePickerModel;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.element = element;
        this._iterableDiffers = _iterableDiffers;
        this.parentInstance = null;
        this.toDisabledDays = [];
        this.toDisabledTimes = [];
        this.startCalendarMonth = null;
        this.endCalendarMonth = null;
        this.highlightStartDate = null;
        this.highlightEndDate = null;
        this.modelDiffer = null;
        this.modelDiffer = this._iterableDiffers.find([]).create(null);
    }
    FsDatepickerRangeComponent.prototype.ngOnInit = function () {
        this.calendarsDrawMonth(this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd);
    };
    FsDatepickerRangeComponent.prototype.ngDoCheck = function () {
        if (this.modelDiffer.diff([this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd])) {
            var startDate = this.parentInstance.ngModelStart;
            var endDate = this.parentInstance.ngModelEnd;
            // Don't remove
            // this.toDisabledDaysUpdate(startDate, endDate);
            this.toDisabledTimesUpdate(startDate, endDate);
            this.highlightStartDate = startDate;
            this.highlightEndDate = endDate || startDate;
        }
    };
    FsDatepickerRangeComponent.prototype.setStartDate = function (date) {
        var startDate = date;
        var endDate = this.parentInstance.ngModelEnd;
        this.setDates(startDate, endDate);
        if (startDate && endDate) {
            if (moment(startDate).format('YYYY-MM') === moment(endDate).format('YYYY-MM')) {
                this.endCalendarDrawMonth(moment(endDate).add(1, 'month'));
            }
            else {
                this.endCalendarDrawMonth(endDate);
            }
        }
        if (startDate) {
            this.startCalendarDrawMonth(startDate);
        }
    };
    FsDatepickerRangeComponent.prototype.setEndDate = function (date) {
        var startDate = date;
        var endDate = this.parentInstance.ngModelEnd;
        this.setDates(startDate, endDate);
        if (date) {
            this.endCalendarDrawMonth(date);
        }
    };
    FsDatepickerRangeComponent.prototype.setStartTime = function (date) {
        var endDate = this.parentInstance.ngModelEnd;
        // In time mode, if end date is empty - user not able switch to end time picker
        if (this.fsDatePickerModel.view === 'time' && !endDate) {
            endDate = date;
        }
        if (date && endDate && date.isAfter(endDate)) {
            endDate = date;
        }
        this.parentInstance.writeValue(date, endDate);
    };
    FsDatepickerRangeComponent.prototype.setEndTime = function (date) {
        this.parentInstance.writeValue(this.parentInstance.ngModelStart, date);
    };
    FsDatepickerRangeComponent.prototype.setDates = function (startDate, endDate) {
        if (this.parentInstance.ngModelStart && !this.parentInstance.ngModelEnd) {
            endDate = startDate;
            startDate = this.parentInstance.ngModelStart;
        }
        else if (this.parentInstance.ngModelStart && this.parentInstance.ngModelEnd) {
            endDate = null;
        }
        if (startDate && endDate && startDate.isAfter(endDate)) {
            startDate = endDate;
            endDate = null;
        }
        this.parentInstance.writeValue(startDate, endDate);
    };
    FsDatepickerRangeComponent.prototype.onDatesChange = function (data) {
        this.setDates(data.start, data.end);
        this.calendarsDrawMonth(data.start, data.end);
    };
    FsDatepickerRangeComponent.prototype.toDisabledDaysUpdate = function (startDate, endDate) {
        this.toDisabledDays = startDate ? [[moment().subtract(99, 'year'), startDate.clone()]] : [];
    };
    FsDatepickerRangeComponent.prototype.toDisabledTimesUpdate = function (startDate, endDate) {
        this.toDisabledTimes = [];
        if (startDate && endDate && startDate.isSame(endDate, 'day')) {
            var from = parseInt(startDate.format('m')) + (parseInt(startDate.format('H')) * 60);
            var to = parseInt(endDate.format('m')) + (parseInt(endDate.format('H')) * 60);
            if (startDate) {
                this.toDisabledTimes.push([0, from]);
            }
        }
    };
    FsDatepickerRangeComponent.prototype.setDateModeStart = function (mode) {
        this.fsDatePickerModel.dateMode.start_date = mode;
    };
    FsDatepickerRangeComponent.prototype.setDateModeEnd = function (mode) {
        this.fsDatePickerModel.dateMode.end_date = mode;
    };
    FsDatepickerRangeComponent.prototype.setComponents = function (data) {
        this.fsDatePickerModel.components = data;
    };
    FsDatepickerRangeComponent.prototype.calendarsDrawMonth = function (startDate, endDate) {
        this.endCalendarDrawMonth(endDate);
        this.startCalendarDrawMonth(startDate);
    };
    FsDatepickerRangeComponent.prototype.startCalendarDrawMonth = function (date) {
        this.startCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);
        if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
            this.endCalendarMonth = moment(this.startCalendarMonth).add(1, 'month');
        }
    };
    FsDatepickerRangeComponent.prototype.endCalendarDrawMonth = function (date) {
        this.endCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);
        if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
            this.startCalendarMonth = moment(this.endCalendarMonth).subtract(1, 'month');
        }
    };
    FsDatepickerRangeComponent.prototype.rangeCalendarsConflict = function (startDate, endDate) {
        return moment(startDate).isAfter(endDate) ||
            moment(startDate).format('YYYY-MM') === moment(endDate).format('YYYY-MM');
    };
    FsDatepickerRangeComponent.prototype.hoverCalendar = function (day) {
        var date = moment(day.date);
        if (this.parentInstance.ngModelStart &&
            !this.parentInstance.ngModelEnd &&
            moment(this.parentInstance.ngModelStart).isBefore(date)) {
            this.highlightEndDate = date;
        }
        else {
            this.highlightEndDate = this.parentInstance.ngModelEnd;
        }
    };
    FsDatepickerRangeComponent.prototype.onMouseLeaveCalendar = function () {
        this.highlightEndDate = this.parentInstance.ngModelEnd;
    };
    FsDatepickerRangeComponent.prototype.close = function ($event) {
        this.parentInstance.opened = false;
    };
    FsDatepickerRangeComponent.prototype.documentKeydown = function (e) {
        if (e.keyCode === 27) {
            // Be careful with preventing default events. Breaking page refresh functional
            e.preventDefault();
            this.close(e);
        }
    };
    __decorate([
        core_1.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatepickerRangeComponent.prototype, "documentKeydown", null);
    FsDatepickerRangeComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerRange',
            template: __webpack_require__("./components/fsdatepickerrange/fsdatepickerrange.component.html"),
            styles: [__webpack_require__("./styles.scss")],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [fsdatepickermodel_service_1.FsDatePickerModel]
        }),
        __metadata("design:paramtypes", [fsdatepickermodel_service_1.FsDatePickerModel,
            fsdatepickercommon_service_1.FsDatePickerCommon,
            core_1.ElementRef,
            core_1.IterableDiffers])
    ], FsDatepickerRangeComponent);
    return FsDatepickerRangeComponent;
}());
exports.FsDatepickerRangeComponent = FsDatepickerRangeComponent;


/***/ }),

/***/ "./components/fsdatepickersummary/fsdatepickersummary.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"formattedStartDate || formattedEndDate\" class=\"summary\" [ngClass]=\"{ 'summary-time': (fsDatePickerModel.components.timeStart || fsDatePickerModel.components.timeEnd) }\">\n  <ng-container *ngIf=\"formattedStartDate\">\n    <div\n      (click)=\"onComponentsChange({ calendarStart: true, calendarEnd: true })\"\n      [ngClass]=\"{ active: fsDatePickerModel.components.calendarStart }\">{{ formattedStartDate.date }}\n    </div>\n    <div\n      (click)=\"onComponentsChange({ timeStart: true })\"\n      [ngClass]=\"{ active: fsDatePickerModel.components.timeStart }\">{{ formattedStartDate.time }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"formattedStartDate && formattedEndDate\">&nbsp;-&nbsp;</ng-container>\n  <ng-container *ngIf=\"formattedEndDate\">\n    <div\n      (click)=\"onComponentsChange({ calendarStart: true, calendarEnd: true })\"\n      [ngClass]=\"{ active: fsDatePickerModel.components.calendarEnd }\">{{ formattedEndDate.date }}\n    </div>\n    <div\n      (click)=\"onComponentsChange({ timeEnd: true })\"\n      [ngClass]=\"{ active: fsDatePickerModel.components.timeEnd }\">{{ formattedEndDate.time }}\n    </div>\n  </ng-container>\n</div>\n"

/***/ }),

/***/ "./components/fsdatepickersummary/fsdatepickersummary.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickersummary/fsdatepickersummary.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./components/fsdatepickersummary/fsdatepickersummary.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var fsdatepickermodel_service_1 = __webpack_require__("./services/fsdatepickermodel.service.ts");
var FsDatepickerSummaryComponent = (function () {
    function FsDatepickerSummaryComponent(fsDatePickerCommon, fsDatePickerModel) {
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatePickerModel = fsDatePickerModel;
        this.startDate = null;
        this.endDate = null;
        this.componentsChange = new core_1.EventEmitter();
        this.formattedStartDate = null;
        this.formattedEndDate = null;
    }
    FsDatepickerSummaryComponent.prototype.ngOnInit = function () {
    };
    FsDatepickerSummaryComponent.prototype.ngOnChanges = function (changes) {
        this.formattedStartDate = null;
        this.formattedEndDate = null;
        if (changes && changes.startDate && changes.startDate.currentValue) {
            this.formattedStartDate = {
                date: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue),
                time: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue, 'time')
            };
        }
        if (changes && changes.endDate && changes.endDate.currentValue) {
            this.formattedEndDate = {
                date: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue),
                time: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue, 'time')
            };
        }
    };
    FsDatepickerSummaryComponent.prototype.onComponentsChange = function (view) {
        this.componentsChange.emit(view);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatepickerSummaryComponent.prototype, "startDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatepickerSummaryComponent.prototype, "endDate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatepickerSummaryComponent.prototype, "componentsChange", void 0);
    FsDatepickerSummaryComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerSummary',
            template: __webpack_require__("./components/fsdatepickersummary/fsdatepickersummary.component.html"),
            styles: [__webpack_require__("./components/fsdatepickersummary/fsdatepickersummary.component.scss")]
        }),
        __metadata("design:paramtypes", [fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickermodel_service_1.FsDatePickerModel])
    ], FsDatepickerSummaryComponent);
    return FsDatepickerSummaryComponent;
}());
exports.FsDatepickerSummaryComponent = FsDatepickerSummaryComponent;


/***/ }),

/***/ "./components/fsdatepickertime/fsdatepickertime.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"time\">\n  <div class=\"wraper\">\n    <ng-container *ngIf=\"!expanded\">\n      <div class=\"hours-group\">\n        <div class=\"hours\" *ngFor=\"let group of timeHoursCollapsed; let i = index\">\n          <div class=\"lbl\">Hour {{ i ? 'PM' : 'AM' }}</div>\n            <table>\n              <tr *ngFor=\"let hours of group\">\n                <td *ngFor=\"let hour of hours\" class=\"hour\" (click)=\"hourClick(hour)\" [ngClass]=\"{ disabled: disabledTimeHours[hour], selected: hour == selected.hour }\">\n                  <div class=\"number\">\n                    <span *ngIf=\"hour < 12\">{{ hour ? hour : 12 }}<span class=\"am-pm\">am</span></span>\n                    <span *ngIf=\"hour >= 12\">{{ hour==12 ? 12 : hour-12 }}<span class=\"am-pm\">pm</span></span>\n                  </div>\n                </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n      <div class=\"minutes\">\n        <div class=\"lbl\">Minute</div>\n        <table>\n          <tr *ngFor=\"let minutes of timeMinutesCollapsed\">\n            <td *ngFor=\"let minute of minutes\" class=\"minute\"\n            [ngClass]=\"{ disabled: disabledTimeMinutes[minute] || (disabledGroupedMinutes[selected.hour] && disabledGroupedMinutes[selected.hour][minute]), selected: minute == selected.minute }\"\n            (click)=\"minuteClick(minute)\">\n              <div class=\"number\">{{ minute }}</div>\n            </td>\n          </tr>\n        </table>\n        <a (click)=\"expanded = true\" class=\"button-expand\">More</a>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"expanded\">\n      <div class=\"hours\">\n        <div class=\"lbl\">Hour</div>\n          <table>\n            <tr *ngFor=\"let hours of timeHoursExpanded\">\n              <td *ngFor=\"let hour of hours\" class=\"hour\" (click)=\"hourClick(hour)\" [ngClass]=\"{ disabled: disabledTimeHours[hour], selected: hour == selected.hour }\">\n                <div class=\"number\">\n                  <span *ngIf=\"hour < 12\">{{ hour ? hour : 12 }}<span class=\"am-pm\">am</span></span>\n                  <span *ngIf=\"hour >= 12\">{{ hour==12 ? 12 : hour-12 }}<span class=\"am-pm\">pm</span></span>\n                </div>\n              </td>\n          </tr>\n        </table>\n      </div>\n      <div class=\"minutes\">\n\n        <div class=\"lbl\">Minute</div>\n        <table>\n          <tr *ngFor=\"let minutes of timeMinutesExpanded\">\n            <td *ngFor=\"let minute of minutes\" class=\"minute\"\n            [ngClass]=\"{ disabled: disabledTimeMinutes[minute] || (disabledGroupedMinutes[selected.hour] && disabledGroupedMinutes[selected.hour][minute]), selected: minute == selected.minute }\"\n            (click)=\"minuteClick(minute)\">\n              <div class=\"number\">{{ minute }}</div>\n            </td>\n          </tr>\n        </table>\n        <a (click)=\"expanded = false\" class=\"button-expand\">Less</a>\n      </div>\n    </ng-container>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./components/fsdatepickertime/fsdatepickertime.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./components/fsdatepickertime/fsdatepickertime.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./components/fsdatepickertime/fsdatepickertime.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var fsdatepickermodel_service_1 = __webpack_require__("./services/fsdatepickermodel.service.ts");
var FsDatePickerTimeComponent = (function () {
    function FsDatePickerTimeComponent(element, fsDatePickerCommon, fsDatePickerModel, _iterableDiffers) {
        this.element = element;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatePickerModel = fsDatePickerModel;
        this._iterableDiffers = _iterableDiffers;
        this.date = null;
        this.disabledMinutes = [];
        this.disabledHours = [];
        this.disabledTimes = [];
        this.onChange = new core_1.EventEmitter();
        this.selected = {};
        this.expanded = false;
        this.disabledTimeMinutes = {};
        this.disabledTimeHours = {};
        this.disabledGroupedMinutes = {};
        this.disabledMinutesDiffer = null;
        this.disabledHoursDiffer = null;
        this.disabledTimesDiffer = null;
        this.timeHoursCollapsed = [
            [
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11]
            ],
            [
                [12, 13, 14, 15],
                [16, 17, 18, 19],
                [20, 21, 22, 23]
            ]
        ];
        this.timeMinutesCollapsed = [[0, 5], [10, 15], [20, 25], [30, 35], [40, 45], [50, 55]];
        this.timeHoursExpanded = [[0, 12], [1, 13], [2, 14], [3, 15], [4, 16], [5, 17], [6, 18], [7, 19], [8, 20], [9, 21], [10, 22], [11, 23]];
        this.timeMinutesExpanded = [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29],
            [30, 31, 32, 33, 34],
            [35, 36, 37, 38, 39],
            [40, 41, 42, 43, 44],
            [45, 46, 47, 48, 49],
            [50, 51, 52, 53, 54],
            [55, 56, 57, 58, 59]
        ];
        this.disabledHoursDiffer = this._iterableDiffers.find([]).create(null);
        this.disabledMinutesDiffer = this._iterableDiffers.find([]).create(null);
        this.disabledTimesDiffer = this._iterableDiffers.find([]).create(null);
    }
    FsDatePickerTimeComponent.prototype.ngOnInit = function () {
        this.checkDisabledTime();
    };
    FsDatePickerTimeComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.date) {
            this.selected = this.fsDatePickerCommon.getSelected(this.date);
        }
    };
    FsDatePickerTimeComponent.prototype.ngDoCheck = function () {
        if (this.disabledHoursDiffer.diff(this.disabledHours) ||
            this.disabledMinutesDiffer.diff(this.disabledMinutes) ||
            this.disabledTimesDiffer.diff(this.disabledTimes)) {
            this.checkDisabledTime();
        }
    };
    FsDatePickerTimeComponent.prototype.checkDisabledTime = function () {
        this.disabledTimeMinutes = {};
        this.disabledTimeHours = {};
        this.disabledGroupedMinutes = {};
        if (this.disabledMinutes !== undefined) {
            for (var _i = 0, _a = this.disabledMinutes; _i < _a.length; _i++) {
                var range = _a[_i];
                this.addDisabledMinutes(range);
            }
            ;
        }
        if (this.disabledHours !== undefined) {
            for (var _b = 0, _c = this.disabledHours; _b < _c.length; _b++) {
                var range = _c[_b];
                this.addDisabledHours(range);
            }
            ;
        }
        if (this.disabledTimes !== undefined) {
            for (var _d = 0, _e = this.disabledTimes; _d < _e.length; _d++) {
                var range = _e[_d];
                var min = Math.min(range[0], range[1]);
                var max = Math.max(range[0], range[1]);
                var minMinutes = min % 60;
                var maxMinutes = max % 60;
                var minHour = Math.floor(min / 60);
                var maxHour = Math.floor(max / 60);
                for (var h = 0; h <= 24; h++) {
                    this.disabledGroupedMinutes[h] = {};
                    if (h > minHour && h < maxHour) {
                        this.addDisabledHours(h);
                    }
                    else if (h == minHour && !minMinutes && minHour != maxHour) {
                        this.addDisabledHours(h);
                    }
                    if (h >= minHour && h <= maxHour) {
                        for (var m = minMinutes; m < maxMinutes; m++) {
                            var minute = h * m;
                            if (minute >= range[0] && minute <= range[1]) {
                                this.disabledGroupedMinutes[h][m] = true;
                            }
                        }
                    }
                }
            }
            ;
        }
    };
    FsDatePickerTimeComponent.prototype.addDisabledMinutes = function (range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        if (Array.isArray(range)) {
            for (var i = min; i <= max; i++) {
                this.disabledTimeMinutes[i] = true;
            }
        }
        else {
            this.disabledTimeMinutes[range] = true;
        }
    };
    FsDatePickerTimeComponent.prototype.addDisabledHours = function (range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        if (Array.isArray(range)) {
            for (var i = min; i <= max; i++) {
                this.disabledTimeHours[i] = true;
            }
        }
        else {
            this.disabledTimeHours[range] = true;
        }
    };
    FsDatePickerTimeComponent.prototype.createModel = function () {
        if (!this.date) {
            this.setDate(this.fsDatePickerCommon.createMoment());
        }
    };
    FsDatePickerTimeComponent.prototype.setDate = function (date) {
        this.date = date;
        this.onChange.emit(date);
    };
    FsDatePickerTimeComponent.prototype.hourClick = function (hour) {
        if (this.disabledTimeHours[hour]) {
            return;
        }
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().hour(hour));
    };
    FsDatePickerTimeComponent.prototype.minuteClick = function (minute) {
        if (this.disabledTimeMinutes[minute]) {
            return;
        }
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().minute(minute));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "disabledMinutes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "disabledHours", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "disabledTimes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "onChange", void 0);
    FsDatePickerTimeComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerTime',
            template: __webpack_require__("./components/fsdatepickertime/fsdatepickertime.component.html"),
            styles: [__webpack_require__("./components/fsdatepickertime/fsdatepickertime.component.scss")]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickermodel_service_1.FsDatePickerModel,
            core_1.IterableDiffers])
    ], FsDatePickerTimeComponent);
    return FsDatePickerTimeComponent;
}());
exports.FsDatePickerTimeComponent = FsDatePickerTimeComponent;


/***/ }),

/***/ "./configs/fshammer.config.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("@angular/platform-browser");
var FsHammerConfig = (function (_super) {
    __extends(FsHammerConfig, _super);
    function FsHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            swipe: { velocity: 0.4, threshold: 20 }
        };
        return _this;
    }
    return FsHammerConfig;
}(platform_browser_1.HammerGestureConfig));
exports.FsHammerConfig = FsHammerConfig;


/***/ }),

/***/ "./directives/fsdatepick.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepicker_value_accessor_1 = __webpack_require__("./value-accessors/fsdatepicker.value-accessor.ts");
var fsdatepickerfactory_service_1 = __webpack_require__("./services/fsdatepickerfactory.service.ts");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var moment = __webpack_require__("moment-timezone");
var FsDatePickDirective = (function () {
    function FsDatePickDirective(_elementRef, renderer, factoryResolver, viewContainerRef, fsDatePickerCommon, fsDatepickerFactory) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.factoryResolver = factoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatepickerFactory = fsDatepickerFactory;
        this.minYear = null;
        this.maxYear = null;
        this.view = 'date';
        this.presets = [];
        this.change$ = new core_1.EventEmitter();
        this._model = null;
        this.opened = false;
        this.$dialog = null;
        this.rootViewContainer = null;
        this._onTouched = function () { };
        this._onChange = function (value) { };
        this.onFocused = function (event) { };
    }
    FsDatePickDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    FsDatePickDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    FsDatePickDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._elementRef.nativeElement.setAttribute('readonly', true);
        });
    };
    FsDatePickDirective.prototype.onChangeInterceptor = function ($event) {
        this.writeValue($event.target.value);
    };
    FsDatePickDirective.prototype.writeValue = function (value) {
        if (value) {
            if (moment(value).isValid()) {
                value = moment(value);
            }
            else {
                value = undefined;
            }
            this._model = value;
            this._onChange(value);
            this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTime(value, this.view);
            this.change$.emit(value);
        }
    };
    FsDatePickDirective.prototype.getValue = function () {
        return this._model ? moment(this._model) : this._model;
    };
    FsDatePickDirective.prototype.open = function () {
        var _this = this;
        this.opened = true;
        if (this.$dialog) {
            this.enableDefaultComponent();
            return;
        }
        this.fsDatepickerFactory.setRootViewContainerRef(this.viewContainerRef);
        this.$dialog = this.fsDatepickerFactory.addDynamicComponent();
        this.$dialog.instance.parentInstance = this;
        this.$dialog.instance.fsDatePickerModel.view = this.view;
        this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
        this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
        this.$dialog.instance.fsDatePickerModel.presets = this.presets;
        this.$dialog.instance.fsDatePickerModel.dateMode = 'date';
        this.enableDefaultComponent();
        setTimeout(function () {
            _this.fsDatePickerCommon.positionDialog(_this.$dialog, _this._elementRef);
        });
    };
    FsDatePickDirective.prototype.enableDefaultComponent = function () {
        if (this.view === 'time') {
            this.$dialog.instance.fsDatePickerModel.components = { timeStart: true };
        }
        else {
            this.$dialog.instance.fsDatePickerModel.components = { calendarStart: true };
        }
    };
    FsDatePickDirective.prototype.inputClick = function (e) {
        var _this = this;
        this.fsDatePickerCommon.inputClick(e, function () {
            _this.open();
        });
    };
    FsDatePickDirective.prototype.inputKeyup = function (e) {
        if (e.keyCode === 13) {
            this.inputBlur(e);
        }
    };
    FsDatePickDirective.prototype.inputBlur = function (event) { };
    FsDatePickDirective.prototype.onWindowResize = function (event) {
        this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
    };
    FsDatePickDirective.prototype.ngOnDestroy = function () {
        if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
            this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "minYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "maxYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "view", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FsDatePickDirective.prototype, "presets", void 0);
    __decorate([
        core_1.Output('change'),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "change$", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatePickDirective.prototype, "onWindowResize", null);
    FsDatePickDirective = __decorate([
        core_1.Directive({
            host: {
                '(input)': 'onChangeInterceptor($event)',
                '(click)': 'inputClick($event)',
                '(keyup)': 'inputKeyup($event)',
                '(blur)': 'inputBlur($event)',
            },
            selector: '[fsDatePicker]',
            providers: [fsdatepicker_value_accessor_1.DATEPICKER_VALUE_ACCESSOR]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.Renderer)),
        __param(2, core_1.Inject(core_1.ComponentFactoryResolver)),
        __param(3, core_1.Inject(core_1.ViewContainerRef)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer, Object, Object, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickerfactory_service_1.FsDatepickerFactory])
    ], FsDatePickDirective);
    return FsDatePickDirective;
}());
exports.FsDatePickDirective = FsDatePickDirective;


/***/ }),

/***/ "./directives/fsdatepickrange.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepickerrange_value_accessors_1 = __webpack_require__("./value-accessors/fsdatepickerrange.value-accessors.ts");
var fsdatepickerrangefactory_service_1 = __webpack_require__("./services/fsdatepickerrangefactory.service.ts");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var moment = __webpack_require__("moment-timezone");
var FsDatePickRangeDirective = (function () {
    function FsDatePickRangeDirective(_elementRef, renderer, factoryResolver, viewContainerRef, fsDatePickerCommon, fsDatepickerRangeFactory) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.factoryResolver = factoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatepickerRangeFactory = fsDatepickerRangeFactory;
        this.minYear = null;
        this.maxYear = null;
        this.view = 'date';
        this.ngModelStart = null;
        this.ngModelEnd = null;
        this.presets = [];
        this.ngModelStartChange = new core_1.EventEmitter();
        this.ngModelEndChange = new core_1.EventEmitter();
        this.change$ = new core_1.EventEmitter();
        this.opened = false;
        this.$dialog = null;
        this.rootViewContainer = null;
        this._onTouched = function () { };
        this._onChange = function (value) { };
        this.onFocused = function (event) { };
    }
    FsDatePickRangeDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    FsDatePickRangeDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    FsDatePickRangeDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._elementRef.nativeElement.setAttribute('readonly', true);
        });
    };
    FsDatePickRangeDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!changes) {
            return;
        }
        if (changes.ngModelStart || changes.ngModelEnd) {
            if (typeof this.ngModelStart === 'string' || typeof this.ngModelEnd === 'string') {
                setTimeout(function () {
                    _this.writeValue(_this.ngModelStart, _this.ngModelEnd);
                });
                return;
            }
            var viewData = { start_date: this.ngModelStart, end_date: this.ngModelEnd };
            this._onChange(viewData);
            this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTimeRange(viewData, this.view);
            this.change$.emit(viewData);
        }
    };
    FsDatePickRangeDirective.prototype.writeValue = function (startDate, endDate) {
        this.ngModelStartChange.emit(startDate && moment(startDate).isValid() ? moment(startDate) : startDate);
        this.ngModelEndChange.emit(endDate && moment(endDate).isValid() ? moment(endDate) : endDate);
    };
    FsDatePickRangeDirective.prototype.open = function () {
        var _this = this;
        this.opened = true;
        if (this.$dialog) {
            this.enableDefaultComponent();
            return;
        }
        this.fsDatepickerRangeFactory.setRootViewContainerRef(this.viewContainerRef);
        this.$dialog = this.fsDatepickerRangeFactory.addDynamicComponent();
        this.$dialog.instance.parentInstance = this;
        this.$dialog.instance.fsDatePickerModel.view = this.view;
        this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
        this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
        this.$dialog.instance.fsDatePickerModel.presets = this.presets;
        this.$dialog.instance.fsDatePickerModel.dateMode = { start_date: 'date', end_date: 'date' };
        this.enableDefaultComponent();
        setTimeout(function () {
            _this.fsDatePickerCommon.positionDialog(_this.$dialog, _this._elementRef);
        });
    };
    FsDatePickRangeDirective.prototype.enableDefaultComponent = function () {
        if (this.view === 'time') {
            this.$dialog.instance.fsDatePickerModel.components = { timeStart: true };
        }
        else {
            this.$dialog.instance.fsDatePickerModel.components = { calendarStart: true, calendarEnd: true };
        }
    };
    FsDatePickRangeDirective.prototype.inputClick = function (e) {
        var _this = this;
        this.fsDatePickerCommon.inputClick(e, function () {
            _this.open();
        });
    };
    FsDatePickRangeDirective.prototype.inputKeyup = function (e) {
        if (e.keyCode === 13) {
            this.inputBlur(e);
        }
    };
    FsDatePickRangeDirective.prototype.inputBlur = function (event) { };
    FsDatePickRangeDirective.prototype.onWindowResize = function (event) {
        this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
    };
    FsDatePickRangeDirective.prototype.ngOnDestroy = function () {
        if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
            this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "minYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "maxYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "view", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelStart", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelEnd", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FsDatePickRangeDirective.prototype, "presets", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelStartChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelEndChange", void 0);
    __decorate([
        core_1.Output('change'),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "change$", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatePickRangeDirective.prototype, "onWindowResize", null);
    FsDatePickRangeDirective = __decorate([
        core_1.Directive({
            host: {
                '(input)': 'onChangeInterceptor($event)',
                '(click)': 'inputClick($event)',
                '(keyup)': 'inputKeyup($event)',
                '(blur)': 'inputBlur($event)',
            },
            selector: '[fsDatePickerRange]',
            providers: [fsdatepickerrange_value_accessors_1.DATEPICKER_RANGE_VALUE_ACCESSOR]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.Renderer)),
        __param(2, core_1.Inject(core_1.ComponentFactoryResolver)),
        __param(3, core_1.Inject(core_1.ViewContainerRef)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer, Object, Object, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickerrangefactory_service_1.FsDatepickerRangeFactory])
    ], FsDatePickRangeDirective);
    return FsDatePickRangeDirective;
}());
exports.FsDatePickRangeDirective = FsDatePickRangeDirective;


/***/ }),

/***/ "./directives/fsisscroll.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var IScroll = __webpack_require__("iscroll");
var FsIsscrollDirective = (function () {
    function FsIsscrollDirective(element) {
        this.element = element;
        this.fsOptions = {};
        this.fsInstance = {};
    }
    FsIsscrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.fsOptions = Object.assign({
                momentum: false,
                hScrollbar: false,
                mouseWheel: true,
                click: true,
                scrollToElement: _this.element.nativeElement
                    .getElementsByClassName('iscroll-scroller')[0]
                    .getElementsByClassName('year today selected')[0]
            }, _this.fsOptions);
            var instance = new IScroll(_this.element.nativeElement, _this.fsOptions);
            if (_this.fsOptions['scrollToElement']) {
                instance.scrollToElement(_this.fsOptions['scrollToElement'], 0);
            }
            if (_this.fsOptions['scrollTo']) {
                instance.scrollTo(_this.fsOptions['scrollTo'].x, _this.fsOptions['scrollTo'].y, _this.fsOptions['scrollTo'].time);
            }
            if (_this.fsInstance) {
                _this.fsInstance = Object.assign({}, _this.fsInstance, instance);
                Object.setPrototypeOf(_this.fsInstance, instance);
            }
        });
    };
    FsIsscrollDirective.prototype.ngOnDestroy = function () {
        if (this.fsInstance) {
            this.fsInstance['destroy']();
        }
    };
    __decorate([
        core_1.Input('fsOptions'),
        __metadata("design:type", Object)
    ], FsIsscrollDirective.prototype, "fsOptions", void 0);
    __decorate([
        core_1.Input('fsInstance'),
        __metadata("design:type", Object)
    ], FsIsscrollDirective.prototype, "fsInstance", void 0);
    FsIsscrollDirective = __decorate([
        core_1.Directive({
            selector: '[fsIscroll]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FsIsscrollDirective);
    return FsIsscrollDirective;
}());
exports.FsIsscrollDirective = FsIsscrollDirective;


/***/ }),

/***/ "./fsdatepicker.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var common_1 = __webpack_require__("@angular/common");
var forms_1 = __webpack_require__("@angular/forms");
var material_1 = __webpack_require__("@angular/material");
var material_2 = __webpack_require__("@angular/material");
var fsdatepick_directive_1 = __webpack_require__("./directives/fsdatepick.directive.ts");
var fsdatepickrange_directive_1 = __webpack_require__("./directives/fsdatepickrange.directive.ts");
var fsisscroll_directive_1 = __webpack_require__("./directives/fsisscroll.directive.ts");
var fsdatepicker_component_1 = __webpack_require__("./components/fsdatepicker/fsdatepicker.component.ts");
var fsdatepickerrange_component_1 = __webpack_require__("./components/fsdatepickerrange/fsdatepickerrange.component.ts");
var fsdatepickersummary_component_1 = __webpack_require__("./components/fsdatepickersummary/fsdatepickersummary.component.ts");
var fsdatepickerpresets_component_1 = __webpack_require__("./components/fsdatepickerpresets/fsdatepickerpresets.component.ts");
var fsdatepickercalendar_component_1 = __webpack_require__("./components/fsdatepickercalendar/fsdatepickercalendar.component.ts");
var fsdatepickertime_component_1 = __webpack_require__("./components/fsdatepickertime/fsdatepickertime.component.ts");
var fsdatepickerfactory_service_1 = __webpack_require__("./services/fsdatepickerfactory.service.ts");
var fsdatepickerrangefactory_service_1 = __webpack_require__("./services/fsdatepickerrangefactory.service.ts");
var fsdatepickercommon_service_1 = __webpack_require__("./services/fsdatepickercommon.service.ts");
var FsDatePickerModule = (function () {
    function FsDatePickerModule() {
    }
    FsDatePickerModule_1 = FsDatePickerModule;
    FsDatePickerModule.forRoot = function () {
        return {
            ngModule: FsDatePickerModule_1,
            providers: [fsdatepickerfactory_service_1.FsDatepickerFactory, fsdatepickerrangefactory_service_1.FsDatepickerRangeFactory, fsdatepickercommon_service_1.FsDatePickerCommon]
        };
    };
    FsDatePickerModule = FsDatePickerModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatButtonModule,
                material_2.MatTabsModule,
                material_1.MatIconModule,
                material_1.MatMenuModule
            ],
            exports: [
                fsdatepick_directive_1.FsDatePickDirective,
                fsdatepickrange_directive_1.FsDatePickRangeDirective
            ],
            entryComponents: [
                fsdatepicker_component_1.FsDatepickerComponent,
                fsdatepickerrange_component_1.FsDatepickerRangeComponent
            ],
            declarations: [
                fsdatepick_directive_1.FsDatePickDirective,
                fsdatepickrange_directive_1.FsDatePickRangeDirective,
                fsdatepickersummary_component_1.FsDatepickerSummaryComponent,
                fsdatepickerpresets_component_1.FsDatepickerPresetsComponent,
                fsdatepicker_component_1.FsDatepickerComponent,
                fsdatepickerrange_component_1.FsDatepickerRangeComponent,
                fsisscroll_directive_1.FsIsscrollDirective,
                fsdatepickercalendar_component_1.FsDatePickerCalendarComponent,
                fsdatepickertime_component_1.FsDatePickerTimeComponent
            ],
            providers: [
                fsdatepickerfactory_service_1.FsDatepickerFactory,
                fsdatepickerrangefactory_service_1.FsDatepickerRangeFactory,
                fsdatepickercommon_service_1.FsDatePickerCommon
            ],
        })
    ], FsDatePickerModule);
    return FsDatePickerModule;
    var FsDatePickerModule_1;
}());
exports.FsDatePickerModule = FsDatePickerModule;


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./fsdatepicker.module.ts"));
__export(__webpack_require__("./value-accessors/fsdatepicker.value-accessor.ts"));
__export(__webpack_require__("./value-accessors/fsdatepickerrange.value-accessors.ts"));
__export(__webpack_require__("./directives/fsdatepick.directive.ts"));
__export(__webpack_require__("./directives/fsdatepickrange.directive.ts"));
__export(__webpack_require__("./directives/fsisscroll.directive.ts"));
__export(__webpack_require__("./components/fsdatepicker/fsdatepicker.component.ts"));
__export(__webpack_require__("./components/fsdatepickerrange/fsdatepickerrange.component.ts"));
__export(__webpack_require__("./components/fsdatepickersummary/fsdatepickersummary.component.ts"));
__export(__webpack_require__("./components/fsdatepickerpresets/fsdatepickerpresets.component.ts"));
__export(__webpack_require__("./components/fsdatepickercalendar/fsdatepickercalendar.component.ts"));
__export(__webpack_require__("./components/fsdatepickertime/fsdatepickertime.component.ts"));
__export(__webpack_require__("./services/fsdatepickerfactory.service.ts"));
__export(__webpack_require__("./services/fsdatepickerrangefactory.service.ts"));
__export(__webpack_require__("./services/fsdatepickercommon.service.ts"));
__export(__webpack_require__("./services/fsdatepickermodel.service.ts"));


/***/ }),

/***/ "./services/fsdatepickercommon.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var util_1 = __webpack_require__("@firestitch/common/util");
var moment = __webpack_require__("moment-timezone");
var FsDatePickerCommon = (function () {
    function FsDatePickerCommon() {
    }
    FsDatePickerCommon.prototype.getSelected = function (date) {
        var result = {};
        if (date && moment(date).isValid()) {
            result['date'] = moment(date).format('YYYY-MM-DD');
            result['hour'] = parseInt(moment(date).format('H'));
            result['minute'] = parseInt(moment(date).format('m'));
            result['year'] = parseInt(moment(date).format('YYYY'));
            result['month'] = parseInt(moment(date).format('M'));
            result['day'] = parseInt(moment(date).format('D'));
        }
        else {
            result['date'] = undefined;
            result['hour'] = undefined;
            result['minute'] = undefined;
            result['year'] = undefined;
            result['month'] = undefined;
            result['day'] = undefined;
        }
        return result;
    };
    FsDatePickerCommon.prototype.isSameDay = function (startDate, endDate) {
        return moment(startDate).format('YYYY-MM-DD') === moment(endDate).format('YYYY-MM-DD');
    };
    FsDatePickerCommon.prototype.createMoment = function () {
        return moment().startOf('day');
    };
    FsDatePickerCommon.prototype.getMomentSafe = function (date) {
        return moment(date).isValid() ? date : this.createMoment();
    };
    FsDatePickerCommon.prototype.positionDialog = function (dialog, elementRef) {
        if (!dialog || window.innerWidth < 500) {
            return;
        }
        var input = elementRef.nativeElement;
        var parent = input.parentElement.parentElement;
        var dialogContainer = dialog.instance.element.nativeElement.querySelector('.fs-datetime-dialog');
        var dialogContainerStyles = window.getComputedStyle(dialogContainer);
        var inputBound = input.getBoundingClientRect();
        var parentBound = parent.getBoundingClientRect();
        var dialogBound = dialog.instance.element.nativeElement.getBoundingClientRect();
        var dialogContainerBound = dialogContainer.getBoundingClientRect();
        var top = 0;
        if (parent.className.match(/mat-input-flex/)) {
            top = parseInt(parentBound.top);
        }
        else {
            top = parseInt(inputBound.top) + inputBound.height;
        }
        var css = { top: '', bottom: '', left: '', right: '' };
        if ((top + parseInt(dialogContainerStyles.height)) > window.innerHeight) {
            css.bottom = '10px';
            dialogContainer.classList.add('vertical-reposition');
        }
        else {
            css.top = top + 'px';
            dialogContainer.classList.remove('vertical-reposition');
        }
        var left = parseInt(inputBound.left);
        if ((left + parseInt(dialogContainerStyles.width)) > window.innerWidth) {
            css.right = '10px';
            css.left = '';
            dialogContainer.classList.add('horizontal-reposition');
        }
        else {
            css.left = left + 'px';
            css.right = '';
            dialogContainer.classList.remove('horizontal-reposition');
        }
        for (var i in css) {
            if (css[i] === undefined) {
                continue;
            }
            dialogContainer.style[i] = css[i];
        }
    };
    FsDatePickerCommon.prototype.formatDateTimeRange = function (value, view) {
        if (view === void 0) { view = 'date'; }
        var format = [];
        var startDate = this.formatDateTime(value.start_date, view);
        var endDate = this.formatDateTime(value.end_date, view);
        if (startDate) {
            format.push(startDate);
        }
        if (endDate) {
            format.push(endDate);
        }
        return format.join(' - ');
    };
    FsDatePickerCommon.prototype.formatDateTime = function (value, view) {
        if (view === void 0) { view = 'date'; }
        var result = '';
        var format = [];
        if (util_1.isNumeric(value)) {
            value = moment(new Date(value));
        }
        else if (typeof value === 'string') {
            if (moment(value).isValid()) {
                value = moment(value);
            }
            else {
                value = moment(Date.parse(value));
            }
        }
        if (value && moment(value).isValid()) {
            if (['date', 'datetime'].indexOf(view) != -1) {
                format.push('MMM D, YYYY');
            }
            if (['time', 'datetime'].indexOf(view) != -1) {
                format.push('h:mm a');
            }
            result = value.format(format.join(' '));
        }
        return result;
    };
    FsDatePickerCommon.prototype.formatSummary = function (date, view) {
        if (view === void 0) { view = 'date'; }
        if (view === 'date') {
            return moment(date).format('MMM D, YYYY');
        }
        if (view === 'time') {
            return moment(date).format('h:mm a');
        }
    };
    FsDatePickerCommon.prototype.inputClick = function (e, callback) {
        var x = e.clientX, y = e.clientY, stack = [];
        var el;
        do {
            el = document.elementFromPoint(x, y);
            var last = stack[stack.length - 1];
            if (last && last.isEqualNode(el)) {
                break;
            }
            el.classList.add('pointer-events-none');
            stack.push(el);
            if (el.className.match('/fs-datetime-backdrop/')) {
                setTimeout(function () {
                    el.click();
                });
                break;
            }
        } while (el.tagName !== 'HTML' && !el.tagName.match(/^FS-DATETIME/));
        for (var i = 0; i < stack.length; i += 1) {
            stack[i].classList.remove('pointer-events-none');
        }
        callback();
    };
    FsDatePickerCommon = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FsDatePickerCommon);
    return FsDatePickerCommon;
}());
exports.FsDatePickerCommon = FsDatePickerCommon;


/***/ }),

/***/ "./services/fsdatepickerfactory.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepicker_component_1 = __webpack_require__("./components/fsdatepicker/fsdatepicker.component.ts");
var FsDatepickerFactory = (function () {
    function FsDatepickerFactory(factoryResolver) {
        this.factoryResolver = null;
        this.rootViewContainer = null;
        this.factoryResolver = factoryResolver;
    }
    FsDatepickerFactory.prototype.setRootViewContainerRef = function (viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    };
    FsDatepickerFactory.prototype.addDynamicComponent = function () {
        var factory = this.factoryResolver
            .resolveComponentFactory(fsdatepicker_component_1.FsDatepickerComponent);
        var component = factory
            .create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);
        return component;
    };
    FsDatepickerFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(core_1.ComponentFactoryResolver)),
        __metadata("design:paramtypes", [Object])
    ], FsDatepickerFactory);
    return FsDatepickerFactory;
}());
exports.FsDatepickerFactory = FsDatepickerFactory;


/***/ }),

/***/ "./services/fsdatepickermodel.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var moment = __webpack_require__("moment-timezone");
var lodash_1 = __webpack_require__("lodash");
var FsDatePickerModel = (function () {
    function FsDatePickerModel() {
        this._minYear = null;
        this._maxYear = null;
        // @TODO create interfaces for all values
        /**
         * date | datetime | time
         * View is options selected on init. Can't be changed manually
         */
        this._view = 'date';
        /**
         * Visual components. Can be changed by summary widget but only if _view allowed to do this.
         */
        this._componentsDefault = {
            calendarStart: false,
            calendarEnd: false,
            timeStart: false,
            timeEnd: false
        };
        this._components = null;
        /**
         * year | month | date
         *
         * Current mode of calendar. For ranges consist values for both: start and end date
         */
        this.dateMode = null;
        this.presets = [];
    }
    Object.defineProperty(FsDatePickerModel.prototype, "components", {
        get: function () {
            return this._components;
        },
        set: function (value) {
            value = Object.assign({}, this._componentsDefault, value);
            var tempData = Object.assign({}, value);
            var allowable = [];
            if (['date', 'datetime'].indexOf(this._view) !== -1) {
                allowable.push('calendarStart');
                allowable.push('calendarEnd');
            }
            if (['time', 'datetime'].indexOf(this._view) !== -1) {
                allowable.push('timeStart');
                allowable.push('timeEnd');
            }
            lodash_1.forEach(tempData, function (item, index) {
                tempData[index] = allowable.indexOf(index) !== -1 ? item : false;
            });
            // Updating components only if all value object is valid
            if (lodash_1.isEqual(value, tempData)) {
                this._components = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsDatePickerModel.prototype, "minYear", {
        get: function () {
            return this._minYear;
        },
        set: function (minYear) {
            this._minYear = minYear || (parseInt(moment().format('YYYY')) - 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsDatePickerModel.prototype, "maxYear", {
        get: function () {
            return this._maxYear;
        },
        set: function (maxYear) {
            this._maxYear = maxYear || (parseInt(moment().format('YYYY')) + 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsDatePickerModel.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (view) {
            if (!view) {
                return;
            }
            this._view = view;
        },
        enumerable: true,
        configurable: true
    });
    FsDatePickerModel = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FsDatePickerModel);
    return FsDatePickerModel;
}());
exports.FsDatePickerModel = FsDatePickerModel;


/***/ }),

/***/ "./services/fsdatepickerrangefactory.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var fsdatepickerrange_component_1 = __webpack_require__("./components/fsdatepickerrange/fsdatepickerrange.component.ts");
var FsDatepickerRangeFactory = (function () {
    function FsDatepickerRangeFactory(factoryResolver) {
        this.factoryResolver = null;
        this.rootViewContainer = null;
        this.factoryResolver = factoryResolver;
    }
    FsDatepickerRangeFactory.prototype.setRootViewContainerRef = function (viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    };
    FsDatepickerRangeFactory.prototype.addDynamicComponent = function () {
        var factory = this.factoryResolver
            .resolveComponentFactory(fsdatepickerrange_component_1.FsDatepickerRangeComponent);
        var component = factory
            .create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);
        return component;
    };
    FsDatepickerRangeFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(core_1.ComponentFactoryResolver)),
        __metadata("design:paramtypes", [Object])
    ], FsDatepickerRangeFactory);
    return FsDatepickerRangeFactory;
}());
exports.FsDatepickerRangeFactory = FsDatepickerRangeFactory;


/***/ }),

/***/ "./styles.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js??ref--3-1!../node_modules/postcss-loader/lib/index.js??ref--3-2!../node_modules/resolve-url-loader/index.js??ref--3-3!../node_modules/sass-loader/lib/loader.js??ref--3-4!./styles.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./value-accessors/fsdatepicker.value-accessor.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fsdatepick_directive_1 = __webpack_require__("./directives/fsdatepick.directive.ts");
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
exports.DATEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return fsdatepick_directive_1.FsDatePickDirective; }),
    multi: true
};


/***/ }),

/***/ "./value-accessors/fsdatepickerrange.value-accessors.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fsdatepickrange_directive_1 = __webpack_require__("./directives/fsdatepickrange.directive.ts");
var core_1 = __webpack_require__("@angular/core");
var forms_1 = __webpack_require__("@angular/forms");
exports.DATEPICKER_RANGE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return fsdatepickrange_directive_1.FsDatePickRangeDirective; }),
    multi: true
};


/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "@angular/forms":
/***/ (function(module, exports) {

module.exports = require("@angular/forms");

/***/ }),

/***/ "@angular/material":
/***/ (function(module, exports) {

module.exports = require("@angular/material");

/***/ }),

/***/ "@angular/platform-browser":
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser");

/***/ }),

/***/ "@firestitch/common/util":
/***/ (function(module, exports) {

module.exports = require("@firestitch/common/util");

/***/ }),

/***/ "hammerjs":
/***/ (function(module, exports) {

module.exports = require("hammerjs");

/***/ }),

/***/ "iscroll":
/***/ (function(module, exports) {

module.exports = require("iscroll");

/***/ }),

/***/ "lodash":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment-range":
/***/ (function(module, exports) {

module.exports = require("moment-range");

/***/ }),

/***/ "moment-timezone":
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ })

/******/ });
});
//# sourceMappingURL=index.map