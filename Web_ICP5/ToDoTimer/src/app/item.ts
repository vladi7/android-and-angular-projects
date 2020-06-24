export class Item {
  id: number;
  text = '';
  complete = false;

  // tslint:disable-next-line:ban-types
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
