(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("node-tokens"), require("node-fetch"));
	else if(typeof define === 'function' && define.amd)
		define("content-insights-client", ["node-tokens", "node-fetch"], factory);
	else if(typeof exports === 'object')
		exports["content-insights-client"] = factory(require("node-tokens"), require("node-fetch"));
	else
		root["content-insights-client"] = factory(root["node-tokens"], root["node-fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var manageTokens = __webpack_require__(2);
	var fetch = __webpack_require__(3);
	
	var ContentInsightsApi = function () {
	  function ContentInsightsApi(host, tokenName, config) {
	    _classCallCheck(this, ContentInsightsApi);
	
	    var tokenConfig = config || {};
	
	    this._name = 'ContentInsights';
	    this.host = host;
	    this.tokenName = tokenName;
	
	    tokenConfig.credentialsDir = process.env.CREDENTIALS_DIR || '.';
	    tokenConfig.oauthTokeninfoUrl = 'https://info.services.auth.zalando.com/oauth2/tokeninfo?access_token=';
	    tokenConfig.oauthTokenUrl = 'https://token.services.auth.zalando.com/oauth2/access_token?realm=/services';
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=content-insights-client.js.map