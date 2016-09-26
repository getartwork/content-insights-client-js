(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("node-tokens"), require("request-promise-native"));
	else if(typeof define === 'function' && define.amd)
		define("content-insights-client", ["node-tokens", "request-promise-native"], factory);
	else if(typeof exports === 'object')
		exports["content-insights-client"] = factory(require("node-tokens"), require("request-promise-native"));
	else
		root["content-insights-client"] = factory(root["node-tokens"], root["request-promise-native"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var manageTokens = __webpack_require__(1);
	var request = __webpack_require__(2);
	
	var ContentInsightsApi = function () {
	  function ContentInsightsApi(host, tokenName, tokenConfig, agentConfig) {
	    _classCallCheck(this, ContentInsightsApi);
	
	    this._name = 'ContentInsights';
	    this.host = host;
	    this.tokenName = tokenName || 'mint';
	    this.agentConfig = agentConfig || {};
	    this.tokens = manageTokens({
	      'kio': { scope: ['uid'] },
	      'mint': { scope: ['uid'] }
	    }, tokenConfig);
	  }
	
	  _createClass(ContentInsightsApi, [{
	    key: 'get',
	    value: function get(path, parameters) {
	      return request({
	        uri: this.host + path,
	        qs: parameters,
	        headers: this.getAuthHeaders(this.tokenName),
	        agentOptions: this.agentConfig,
	        resolveWithFullResponse: true,
	        simple: false
	      });
	    }
	  }, {
	    key: 'getAuthHeaders',
	    value: function getAuthHeaders() {
	      var token = this.tokens.get(this.tokenName);
	
	      if (!token) {
	        throw Error('Could not get a token for: ' + this.tokenName);
	      }
	      return {
	        'Authorization': 'Bearer ' + token,
	        'Accept': 'application/x.zalando.content-article+json',
	        'Content-Type': 'application/json'
	      };
	    }
	  }, {
	    key: 'search',
	    value: function search(query, start, end, limit, offset, domain, sort, normalizeEntities) {
	      var parameters = { q: query };
	
	      if (start !== undefined) {
	        parameters.start = start;
	      }
	      if (end !== undefined) {
	        parameters.end = end;
	      }
	      if (limit !== undefined) {
	        parameters.limit = limit;
	      }
	      if (offset !== undefined) {
	        parameters.offset = offset;
	      }
	      if (domain !== undefined) {
	        parameters.domain = domain;
	      }
	      if (sort !== undefined) {
	        parameters.sort = sort;
	      }
	      if (normalizeEntities !== undefined) {
	        parameters['normalize_entities'] = normalizeEntities;
	      }
	      return this.get('/api/content-articles/search', parameters);
	    }
	  }, {
	    key: 'timeseries',
	    value: function timeseries(query, start, end, limit, offset, domain, sort, timeWindow, normalizeEntities) {
	      var parameters = { q: query };
	
	      if (start !== undefined) {
	        parameters.start = start;
	      }
	      if (end !== undefined) {
	        parameters.end = end;
	      }
	      if (limit !== undefined) {
	        parameters.limit = limit;
	      }
	      if (offset !== undefined) {
	        parameters.offset = offset;
	      }
	      if (domain !== undefined) {
	        parameters.domain = domain;
	      }
	      if (sort !== undefined) {
	        parameters.sort = sort;
	      }
	      if (timeWindow !== undefined) {
	        parameters.window = timeWindow;
	      }
	      if (normalizeEntities !== undefined) {
	        parameters['normalize_entities'] = normalizeEntities;
	      }
	      return this.get('/api/content-articles/timeseries', parameters);
	    }
	  }, {
	    key: 'article',
	    value: function article(id, normalizeEntities) {
	      var parameters = {};
	
	      if (normalizeEntities !== undefined) {
	        parameters['normalize_entities'] = normalizeEntities;
	      }
	      return this.get('/api/content-articles/' + id);
	    }
	  }]);
	
	  return ContentInsightsApi;
	}();
	
	exports.default = ContentInsightsApi;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=content-insights-client.js.map