const Router = require('./router.js');
const Inbox = require('./Inbox.js');

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
