export class BaseElement {
  constructor(htmlElement) {
    if (htmlElement.startsWith(".")) {
      const selection = document.querySelector(htmlElement);
      if (selection) this.el = selection;
    } else this.el = document.createElement(htmlElement);
  }

  append(child) {
    const childElement = child instanceof BaseElement ? child.el : child;
    this.el.appendChild(childElement);
  }

  setText(text) {
    this.el.textContent = text;
  }

  addClass(className) {
    this.el.classList.add(className);
  }
  removeClass(className) {
    this.el.classList.remove(className);
  }

  addAttribute(attrName, attrValue) {
    this.el.setAttribute(attrName, attrValue);
  }
  getAttribute(attrName) {
    return this.el.getAttribute(attrName);
  }

  addEventListener(type, listener) {
    return this.el.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    return this.el.removeEventListener(type, listener);
  }

  remove() {
    this.el.remove();
  }

  insertBefore(newNode, referenceNode) {
    this.el.insertBefore(newNode, referenceNode);
  }
}
