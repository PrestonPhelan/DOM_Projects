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

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);

	document.addEventListener("DOMContentLoaded", () => {
	  let objects = document.querySelectorAll('.sidebar-nav li');
	  objects.forEach( (el) => {
	    el.addEventListener("click", e => {
	      const newLocation = e.currentTarget.innerText;
	      const name = newLocation.toLowerCase();
	      window.location.hash = name;
	    });
	  });

	  let routes = {
	    inbox: Inbox
	  };

	  let updateNode = document.querySelector('.content');
	  let router = new Router (updateNode, routes);
	  router.start();

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor (node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start () {
	    window.addEventListener("hashchange", this.render.bind(this));
	    this.render();
	  }

	  activeRoute () {
	    let hashFrag = window.location.hash;
	    let hashName = hashFrag.slice(1);
	    return this.routes[hashName];
	    //return a route
	  }

	  render () {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    if (component !== undefined) {
	      let newNode = component.render();
	      this.node.appendChild(newNode);
	    }
	    // newNode.innerHTML = active;
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Inbox = {
	  render: () => {
	    let ul = document.createElement('ul');
	    ul.className = 'messages';
	    ul.innerHTML = 'An Inbox Message';
	    return ul;
	  }
	};

	module.exports = Inbox;


/***/ }
/******/ ]);