const DOMNodeCollection = require('./dom_node_collection.js');

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
