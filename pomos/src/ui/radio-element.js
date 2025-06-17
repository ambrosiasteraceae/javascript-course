import { BaseElement } from "./base-element.js";

export class RadioElement extends BaseElement {
  constructor(htmlElement) {
    super(htmlElement);
    this.addType("radio");
  }
  addName(radioName) {
    this.el.name = radioName;
  }
  addType(radioType) {
    this.el.type = radioType;
  }

  setChecked(val) {
    this.el.checked = val;
  }
}
