class Router {
  constructor (node) {
    this.node = node;
  }

  start () {
    window.addEventListener("hashchange", this.render.bind(this));
    this.render();
  }

  activeRoute () {
    let hashFrag = window.location.hash;
    return hashFrag.slice(1);
  }

  render () {
    this.node.innerHTML = "";
    let active = this.activeRoute();
    let newNode = document.createElement("p");
    newNode.innerHTML = active;
    this.node.appendChild(newNode);
  }
}

module.exports = Router;
