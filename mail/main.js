const Router = require('./router.js');
const Inbox = require('./Inbox.js');
const Sent = require('./sent.js');

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
