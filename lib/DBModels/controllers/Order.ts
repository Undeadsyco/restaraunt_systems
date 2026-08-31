import { model, models, Schema } from "mongoose";

const orderSchema = new Schema<DataBase.Order.Order>({
  orderNumber: { type: String, required: true },
  name: { type: String, required: false },
  type: { type: String, required: true, enum: ["walk in", "call in", "online"] },
  status: { type: String, required: true, enum: ["open", "closed"] },
  items: {
    type: [new Schema<DataBase.Order.OrderedItem>({
      item: { type: Schema.Types.ObjectId, refPath: "type", required: true },
      type: { type: String, enum: ["pizzas", "salads", "sides"] },
      modifications: {
        type: [new Schema<DataBase.Order.Modification>({
          topping: { type: Schema.Types.ObjectId, ref: "toppings", required: true },
          type: { type: String, required: true, enum: ["Add", "Remove", "Extra", "Less"] as POS.Types.modificationType[] }
        }, { _id: false, versionKey: false, })],
        required: false,
      },
      comments: {
        type: [new Schema({
          name: { type: String, required: true },
          message: { type: String, required: true },
        }, { _id: false, versionKey: false, })],
        required: false,
      },
      discount: {
        type: new Schema<DataBase.Order.Discount>({
          name: { type: String, required: true },
          amount: { type: Number, required: true },
        }, { _id: false, versionKey: false }),
        required: false
      }
    }, { _id: false, versionKey: false })],
    required: true
  },
  payments: {
    type: [new Schema<DataBase.Order.Payment>({
      source: { type: String, required: true, enum: ["Card", "Cash"] },
      amount: { type: Number, required: true, }
    })],
    required: true,
  },
  date: { type: Date, required: true }
}, { versionKey: false, });

export default class OrderController {
  private static model = models.orders || model("orders", orderSchema);

  public static create(order: Omit<DataBase.Order.Order, "_id">) {
    return this.model.create(order);
  }
}