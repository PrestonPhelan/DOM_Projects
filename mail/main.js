const Router = require('./router.js');

document.addEventListener("DOMContentLoaded", () => {
  let objects = document.querySelectorAll('.sidebar-nav li');
  objects.forEach( (el) => {
    el.addEventListener("click", e => {
      const newLocation = e.currentTarget.innerText;
      const name = newLocation.toLowerCase();
      window.location.hash = name;
    });
  });

  let updateNode = document.querySelector('.content');
  let router = new Router (updateNode);
  router.start();
});
