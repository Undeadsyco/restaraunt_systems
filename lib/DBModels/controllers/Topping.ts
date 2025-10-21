import { HydratedDocument, Schema, model, models, RootFilterQuery } from "mongoose";
import { DataNotFound } from "@/errors";
import { optional } from "@/types";

type ToppingFilters = RootFilterQuery<DataBase.Menu.ITopping>;
type ToppingDocument = HydratedDocument<DataBase.Menu.ITopping>;
// type NewToppingDocument = HydratedDocument<Raw

const toppingSchema = new Schema<DataBase.Menu.ITopping>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  measurement: { type: String, required: true },
  price: { type: Number, required: true },
}, { versionKey: false });

export default class ToppingController {
  private static model = models.toppings || model<DataBase.Menu.ITopping>("toppings", toppingSchema);

  static async create(topping: DataBase.Menu.ITopping) {
    return await this.model.create(topping);
  }

  static async getAll(filters?: ToppingFilters): Promise<ToppingDocument[]> {
    return await this.model.find({ ...filters });;
  }

  static async getOne(filters: ToppingFilters): Promise<ToppingDocument | null> {
    return await this.model.findOne({ ...filters });
  }

  static async getByToppingType(type: string): Promise<ToppingDocument[]> {
    return await this.model.find({ type });
  }

  static async update(topping: DataBase.Menu.ITopping) {
    return await this.model.findByIdAndUpdate(topping._id, topping, { new: true });
  }

  static async delete(id: string): Promise<ToppingDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }
}