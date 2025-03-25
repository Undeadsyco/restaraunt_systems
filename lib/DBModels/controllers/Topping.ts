import { optionals } from "@/types";
import { Schema, Types, model, models } from "mongoose";
import { DataNotFound } from "@/errors";



const sizeAmountSchema = new Schema<POS.Data.IPortion>({
  size: { type: Schema.Types.ObjectId, ref: "doughs" },
  amount: { type: Number, required: true }
}, { _id: false });

const toppingSchema = new Schema<POS.Data.ITopping>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  measurement: { type: String, required: true },
  price: { type: Number, required: true },
  amount_per_size: { type: [sizeAmountSchema], required: true }
});

export default class ToppingController {
  private static model = models.toppings || model<POS.Data.ITopping>("toppings", toppingSchema);

  static async createOne(topping: POS.Data.ITopping): Promise<POS.Data.ITopping> {
    const newTopping = await this.model.create(topping);
    if (!newTopping) throw new Error("Topping not created");
    return newTopping;
  }

  static async createMany(toppings: POS.Data.ITopping[]): Promise<POS.Data.ITopping[]> {
    const newToppings = await this.model.insertMany(toppings);
    if (!newToppings) throw new Error("Toppings not created");
    return newToppings;
  }
  
  static async getOne(filters: optionals<POS.Data.ITopping>): Promise<POS.Data.ITopping> {
    const topping = await this.model.findOne({ ...filters });
    if (!topping) throw new DataNotFound("Topping not found");
    return topping;
  }

  static async getAll(filters?: optionals<POS.Data.ITopping>): Promise<POS.Data.ITopping[]> {
    const toppings = await this.model.find({ ...filters });
    if (!toppings) throw new DataNotFound("Toppings not found");
    return toppings;
  }

  static async getPizzaToppings(): Promise<POS.Data.ITopping[]> {
    const toppings = await this.model.find({ type: { $in: ["meat", "produce", "cheese", "sauce", "seaasoning"] } })
    if (!toppings) throw new DataNotFound("Toppings not found");
    return toppings;
  }

  static async updateOne(topping: POS.Data.ITopping): Promise<POS.Data.ITopping> {
    const newTopping = await this.model.findByIdAndUpdate(topping._id, topping, { new: true });
    if (!newTopping) throw new Error("Topping not created");
    return newTopping;
  }

  static async updateMany(toppings: POS.Data.ITopping[]): Promise<POS.Data.ITopping[]> {
    const newToppings = await Promise.all(toppings.map((topping) => this.updateOne(topping)));
    if (!newToppings) throw new Error("Toppings not created");
    return newToppings;
  }

  static async deleteOne(filters: optionals<POS.Data.ITopping>): Promise<POS.Data.ITopping> {
    const topping = await this.model.findOneAndDelete({ ...filters });
    if (!topping) throw new DataNotFound("Topping not found");
    return topping;
  }

  static async deleteMany(filters: optionals<POS.Data.ITopping>): Promise<POS.Data.ITopping[]> {
    const toppings = await this.model.find({ ...filters });
    if (!toppings) throw new DataNotFound("Toppings not found");
    await this.model.deleteMany({ ...filters });
    return toppings;
  }
}