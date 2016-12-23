/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = function (arg) {
	  if (arg instanceof HTMLElement) {
	    return new DOMNodeCollection([arg]);
	  } else if (typeof arg === 'function') {
	    let tid = setInterval( function () {
	      if ( document.readyState !== 'complete' ) return;
	      clearInterval( tid );
	      arg();
	    }, 100 );
	  } else {
	    const elementList = document.querySelectorAll(arg);

	    return new DOMNodeCollection(Array.from(elementList));
	  }
	};

	// $l.extend = function(objA, objB) {
	//   let result = {};
	//
	//   return result;
	// }


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor (array) {
	    this.elements = array;
	  }

	  html () {
	    if (arguments.length > 0) {
	      this.elements.forEach( (el) => {
	        el.innerHTML = arguments[0];
	      });
	    } else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty () {
	    this.html("");
	  }

	  append (arg) {
	    if (arg instanceof DOMNodeCollection) {
	      this.elements.forEach( (el) => {
	        arg.elements.forEach( (newEl) => {
	          el.innerHTML += newEl.outerHTML;
	        });
	      });
	    } else {
	      this.elements.forEach( (el) => {
	        if (arg instanceof HTMLElement) {
	          el.innerHTML += arg.outerHTML;
	        } else {
	          el.innerHTML += arg;
	        }
	      });
	    }
	  }

	  attr () {
	    if (arguments.length > 1) {
	      this.elements.forEach( (el) => {
	        el.setAttribute(arguments[0], arguments[1]);
	      });
	    } else {
	      return this.elements[0].getAttribute(arguments[0]);
	    }
	  }

	  addClass (classString) {
	    this.elements.forEach( (el) => {
	      if (el.className) {
	        el.className = el.className.split(" ").push(classString).join(" ");
	      } else {
	        el.className = classString;
	      }
	    });
	  }

	  removeClass (classString) {
	    this.elements.forEach( (el) => {
	      let classes = el.className.split(" ");
	      let filtered = classes.filter( (string) => {
	        return (string !== classString);
	      });
	      el.className = filtered.join(" ");
	    });
	  }

	  children () {
	    let result = [];

	    this.elements.forEach( (el) => {
	      let children = el.children;
	      result = result.concat(Array.from(children));
	    });

	    return new DOMNodeCollection(result);
	  }

	  parent () {
	    let result = [];

	    this.elements.forEach( (el) => {
	      result = result.concat([el.parentElement]);
	    });

	    return new DOMNodeCollection(result);
	  }

	  find (selector) {
	    let children = this.children().elements;
	    let matches = children.filter( (el) => el.matches(selector) );

	    return new DOMNodeCollection(matches);
	  }

	  remove () {
	    if (arguments.length > 0) {
	      let elementsToRemove = this.elements.filter( el => el.matches(arguments[0]) );
	      this.elements.forEach( (el) => {
	        if (elementsToRemove.includes(el)) {
	          el.innerHTML = "";
	        }
	      });

	      let filtered = this.elements.filter( (el) => {
	        return !elementsToRemove.includes(el);
	      });

	      this.elements = filtered;
	    } else {
	      this.empty();
	      this.elements = [];
	    }
	  }

	  on (type, callback) {
	    this.elements.forEach ( (el) => {
	      el.addEventListener(type, callback);
	    });

	    if (this.listeners) {

	    } else {
	      this.listeners = {};
	    }

	    this.listeners[type] = callback;
	  }

	  off (type, callback) {
	    this.elements.forEach ( (el) => {
	      if (arguments.length > 1) {
	        el.removeEventListener(type, callback);
	      } else {
	        el.removeEventListener(type, this.listeners[type]);
	      }
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);