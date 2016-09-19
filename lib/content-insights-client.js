(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("node-tokens"), require("node-fetch"));
	else if(typeof define === 'function' && define.amd)
		define("content-insights-client", ["node-tokens", "node-fetch"], factory);
	else if(typeof exports === 'object')
		exports["content-insights-client"] = factory(require("node-tokens"), require("node-fetch"));
	else
		root["content-insights-client"] = factory(root["node-tokens"], root["node-fetch"]);
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
	var fetch = __webpack_require__(2);
	
	var ContentInsightsApi = function () {
	  function ContentInsightsApi(host, tokenName, tokenConfig) {
	    _classCallCheck(this, ContentInsightsApi);
	
	    this._name = 'ContentInsights';
	    this.host = host;
	    this.tokenName = tokenName || 'mint';
	    this.tokens = manageTokens({
	      'kio': { scope: ['uid'] },
	      'mint': { scope: ['uid'] }
	    }, tokenConfig);
	  }
	
	  _createClass(ContentInsightsApi, [{
	    key: 'get',
	    value: function get(path) {
	      var headers = this.getAuthHeaders(this.tokenName);
	
	      return fetch(this.host + path, { headers: headers }).then(function (response) {
	        return response.json().then(function (json) {
	          return { json: json, response: response };
	        });
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
	        'Content-Type': 'application/json',
	        'X-Tenant-Id': 'Dougal'
	      };
	    }
	  }, {
	    key: 'search',
	    value: function search(query, start, end, limit, offset, domain, sort) {
	      var parameters = [];
	
	      if (start !== undefined) {
	        parameters.push('start=' + encodeURIComponent(start));
	      }
	      if (end !== undefined) {
	        parameters.push('end=' + encodeURIComponent(end));
	      }
	      if (limit !== undefined) {
	        parameters.push('limit=' + encodeURIComponent(limit));
	      }
	      if (offset !== undefined) {
	        parameters.push('offset=' + encodeURIComponent(offset));
	      }
	      if (domain !== undefined) {
	        parameters.push('domain=' + encodeURIComponent(domain));
	      }
	      if (sort !== undefined) {
	        parameters.push('sort=' + encodeURIComponent(sort));
	      }
	      return this.get('/api/content-articles-search?q=' + encodeURIComponent(query) + '&' + parameters.join('&'));
	    }
	  }, {
	    key: 'timeseries',
	    value: function timeseries(query, start, end, limit, offset, domain, sort, timeWindow, normalizeEntities) {
	      var parameters = [];
	
	      if (start !== undefined) {
	        parameters.push('start=' + encodeURIComponent(start));
	      }
	      if (end !== undefined) {
	        parameters.push('end=' + encodeURIComponent(end));
	      }
	      if (limit !== undefined) {
	        parameters.push('limit=' + encodeURIComponent(limit));
	      }
	      if (offset !== undefined) {
	        parameters.push('offset=' + encodeURIComponent(offset));
	      }
	      if (domain !== undefined) {
	        parameters.push('domain=' + encodeURIComponent(domain));
	      }
	      if (sort !== undefined) {
	        parameters.push('sort=' + encodeURIComponent(sort));
	      }
	      if (timeWindow !== undefined) {
	        parameters.push('window=' + encodeURIComponent(timeWindow));
	      }
	      if (normalizeEntities !== undefined) {
	        parameters.push('normalize_entities=' + normalizeEntities);
	      }
	      return this.get('/api/content-articles-timeseries?q=' + encodeURIComponent(query) + '&' + parameters.join('&'));
	    }
	  }, {
	    key: 'article',
	    value: function article(id) {
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