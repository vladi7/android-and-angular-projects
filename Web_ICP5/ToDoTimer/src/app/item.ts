export class Item {
  id: number;
  text = '';
  complete = false;
  // Object for each item
  // tslint:disable-next-line:ban-types
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
