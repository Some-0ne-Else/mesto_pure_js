export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._targetContainer = document.querySelector(classSelector);
  }

  renderItems(){
    this._renderedItems.forEach(item => this._renderer(item));
  }
  addItem(element) {
    this._targetContainer.prepend(element);
  }
  addInitialItem(element){
    this._targetContainer.append(element);
  }
}


