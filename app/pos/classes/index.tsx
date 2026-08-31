import axios from "axios";
import { v4 } from "uuid";

const isItemComponent = (item: any): item is ItemComponent => ("getParent" in item);
export const isPizza = (item: any): item is Pizza => (item instanceof Pizza);
export const isModification = (item: any): item is Modification => (item instanceof Modification);
export const isComment = (item: any): item is Comment => (item instanceof Comment);
export const isDiscount = (item: any): item is Discount => (item instanceof Discount);
export const isPayment = (item: any): item is Payment => (item instanceof Payment);

export class ItemComponent {
  constructor(parent: OrderItem) {
    this._parent = parent;
  }

  private _parent!: OrderItem;
  get parent() { return this._parent; }
}

export class Discount extends ItemComponent {
  constructor(parent: OrderItem, text: string, amount: number) {
    super(parent);
    this._text = text;
    this._amount = amount;
  }

  private _text!: string;
  get text() { return this._text; }

  private _amount!: number;
  get amount() { return this._amount; }
}

export class Comment extends ItemComponent {
  constructor(parent: OrderItem, message: string) {
    super(parent);
    this._message = message;
  }
  private _message!: string;
  get message() { return this._message; }
}

export class Modification extends ItemComponent {
  constructor(parent: Pizza, type: POS.Types.modificationType, topping: DataBase.Menu.ITopping, price: number) {
    super(parent);
    this._type = type;
    this._topping = topping;
    this._price = price;
  }
  private _type!: POS.Types.modificationType;
  get type() { return this._type; }

  private _topping!: DataBase.Menu.ITopping;
  get topping() { return this._topping; }

  private _price!: number;
  get price() { return this._price; }
}

export class OrderItem {
  constructor(item: string, type: ("pizzas" | "salads" | "sides"), price: number) {
    this._id = v4();
    this._item = item;
    this._type = type;
    this._price = price;
    this._isFinalized = false;
  }

  private _id!: string;
  get id() { return this._id; }

  private _item!: string;
  get item() { return this._item; }

  private _type!: ("pizzas" | "salads" | "sides");
  get type() { return this._type; }

  private _price!: number;
  get price() { return this._price; }

  private _isFinalized!: boolean;
  get finalized() { return this._isFinalized; }
  finalize() { this._isFinalized = true; }

  private _discount?: Discount;
  get discount() { return this._discount; }
  addDiscount(text: string, amount: number) { this._discount = new Discount(this, text, amount); }
  removeDiscount() { this._discount = undefined; }

  private _comments: Comment[] = [];
  get comments() { return this._comments; }
  addComent(message: string) { this._comments.push(new Comment(this, message)); }
  removeComment(val: Comment) {
    const index = this._comments.indexOf(val);
    console.log("remove comment", index);
    if (index > -1) {
      this._comments.splice(index, 1);
    }
  }
}

export class Pizza extends OrderItem {
  constructor(
    item: string,
    price: number,
    size: string,
    toppings: string[],
  ) {
    super(item, "pizzas", price);
    this._size = size;
    this._toppings = toppings;
  }

  private _size!: string;
  get size() { return this._size; }
  set size(value: string) { this._size = value; }

  private _toppings!: string[];
  get toppings() { return this._toppings; }

  getTotalPrice() {
    const removed = this._modifications[0].filter(m => m.topping.type !== "sauce");
    const added = this._modifications[1].filter(m => m.topping.type !== "sauce");
    const extra = this._modifications[2].filter(m => m.topping.type !== "sauce");
    const loop = (added.length + extra.length) - removed.length;
    let aditional = 0;
    for (let i = 0; i < loop; i += 1) {
      aditional += 1.5;
    }
    return this.price + aditional;
    // return this.price
  }

  private _modifications: Modification[][] = [
    [], [], [], []];
  get modifications() { return this._modifications; }
  hasModifications() {
    for (const list of this._modifications) {
      if (list.length) return true;
    }
    return false;
  }
  findModification(topping: string) {
    for (const list of this._modifications) {
      const mod = list.find(m => m.topping._id === topping);
      if (mod) return mod;
    }
  }
  addModification(topping: DataBase.Menu.ITopping, portion?: Exclude<POS.Types.modificationType, ("Add" | "Remove")>) {
    if (this.toppings.includes(topping._id)) {
      if (!portion) this._modifications[0].push(new Modification(this, "Remove", topping, 0));
      else {
        if (portion === "Extra") this._modifications[2].push(new Modification(this, portion, topping, topping.price));
        if (portion === "Less") this._modifications[3].push(new Modification(this, portion, topping, topping.price));
      }
    } else {
      this._modifications[1].push(new Modification(this, "Add", topping, topping.price));
      if (portion) {
        if (portion === "Extra") this._modifications[2].push(new Modification(this, portion, topping, topping.price));
        if (portion === "Less") this._modifications[3].push(new Modification(this, portion, topping, topping.price));
      }
    }
  }
  removeModification(mod: Modification) {
    for (const list of this._modifications) {
      const index = list.indexOf(mod);
      if (index >= 0) list.splice(index, 1);
    }
  }


}

export class Payment implements DataBase.Order.Payment {
  constructor({ source, amount }: { source: ("Card" | "Cash"), amount: number }) {
    this._source = source;
    this._amount = amount;
  }

  private _source!: ("Card" | "Cash")
  get source() { return this._source; }

  private _amount!: number;
  get amount() { return this._amount; }
}

export class Order {
  constructor() { }

  private _type: POS.Types.orderType = "walk in";
  get type(): POS.Types.orderType { return this._type; }
  set type(type: POS.Types.orderType) { this._type = type; }

  private _index: number = 0;

  private _selected?: OrderItem | Modification | Comment | Discount | Payment;
  get selected(): typeof this._selected { return this._selected; }
  set selected(item: OrderItem | Modification) {
    this._selected = item;

    if (item instanceof Pizza) this._index = this._items.indexOf(item);
    if (isItemComponent(item)) this._index = this._items.indexOf(item.parent);
  }

  private _portion?: POS.Types.portionType;
  get portion(): POS.Types.portionType | undefined { return this._portion; }
  set portion(val: POS.Types.portionType | undefined) { this._portion = val; }

  private _name?: string;
  set name(val: string) { this._name = val; }
  get name(): string | undefined { return this._name; }

  private _items: OrderItem[] = [];
  get items(): OrderItem[] { return this._items; }
  addItem({ item, type, cost, size, toppings }: { item: string, type: "pizza" | "side", cost: number, size: string, toppings: string[] }) {
    if (type === "pizza") this._items.push(new Pizza(item, cost, size, toppings));
    this._index = this._items.length - 1;
    this._selected = this._items[this._index];
    this.updatePricing();
  }
  removeItem() {
    this._items.splice(this._index, 1);
    this._index = 0;
    this._selected = this._items.length > 0 ? this._items[this._index] : undefined;
    this.updatePricing()
  }
  replaceItem(item: OrderItem) {
    this._items.splice(this._index, 1, item);
    this._selected = item;
    this.updatePricing();
  }

  private _subtotal = 0;
  get subtotal(): number { return this._subtotal; }
  private _tax = 0;
  get tax(): number { return this._tax; }
  private _total = 0;
  get total(): number { return this._total; }
  updatePricing() {
    this._subtotal = this.items.reduce((prev, item) => isPizza(item) ? prev + item.getTotalPrice() : prev + item.price, 0);
    this._tax = this._subtotal * 0.02;
    this._total = this._subtotal + this._tax;
  }

  private _payments: Payment[] = [];
  get payments(): Payment[] { return this._payments; }
  hasPayments = (): boolean => (this._payments.length > 0);
  addPayment(source: ("Card" | "Cash"), amount: number) {
    this._items.forEach(item => item.finalize());
    this._payments.push(new Payment({ source, amount }));
    this.updateChange();
  }
  removePayment(item: Payment) {
    const index = this._payments.indexOf(item);
    if (index >= 0) this._payments.splice(index, 1);
    this.updateChange();
  }
  get paid(): number { return this._payments.reduce((prev, payment) => prev + payment.amount, 0); }

  private _change = 0;
  get change(): number { return this._change; }
  updateChange() {
    const totalPaid = this.paid;
    if (totalPaid > this._total) {
      this._change = parseFloat((totalPaid - this._total).toFixed(2));
      this._status = "closed";
    } else this._change = 0;
  }

  private _status: POS.Types.orderStatus = "open";
  get status(): POS.Types.orderStatus { return this._status; }
}