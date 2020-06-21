import Card from "./Card.js";

export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const card = new Card(item.title, item.url, '.element__template');
      const cardElement = card.generateCard();
      this.addItem(cardElement);
    })
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
