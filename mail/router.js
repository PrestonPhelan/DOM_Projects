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
