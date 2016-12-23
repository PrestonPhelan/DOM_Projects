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
	const Sent = __webpack_require__(4);

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
	    inbox: Inbox,
	    sent: Sent
	  };

	  let updateNode = document.querySelector('.content');
	  let router = new Router (updateNode, routes);
	  router.start();

	  window.location.hash = 'inbox';
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
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	const Inbox = {
	  render: () => {
	    let messages = MessageStore.getInboxMessages;
	    let ul = document.createElement('ul');
	    ul.className = 'messages';

	    messages.forEach( el => {
	      let messageNode = Inbox.renderMessage(el);
	      ul.appendChild(messageNode);
	    });
	    // ul.innerHTML = 'An Inbox Message';
	    return ul;
	  },

	  renderMessage: (message) => {
	    let li = document.createElement('li');
	    li.className = 'message';
	    li.innerHTML = `<span class='from'>${message.from}</span>
	    <span class='subject'>${message.subject}</span>
	    <span class='body'>${message.body}</span>`;

	    return li;
	  }
	};

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	let MessageStore = {
	  getInboxMessages: messages.inbox,
	  getSentMessages: messages.sent
	};

	module.exports = MessageStore;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	const Sent = {
	  render: () => {
	    let messages = MessageStore.getSentMessages;
	    let ul = document.createElement('ul');
	    ul.className = 'messages';

	    messages.forEach( el => {
	      let messageNode = Sent.renderMessage(el);
	      ul.appendChild(messageNode);
	    });
	    // ul.innerHTML = 'An Inbox Message';
	    return ul;
	  },

	  renderMessage: (message) => {
	    let li = document.createElement('li');
	    li.className = 'message';
	    li.innerHTML = `<span class='to'>${message.to}</span>
	    <span class='subject'>${message.subject}</span>
	    <span class='body'>${message.body}</span>`;

	    return li;
	  }
	};

	module.exports = Sent;


/***/ }
/******/ ]);