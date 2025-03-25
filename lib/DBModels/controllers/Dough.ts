import { model, models, Schema } from "mongoose";
import { optionals } from "@/types";



const doughSchema = new Schema<POS.Data.IDough>({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  measurement: { type: String, required: true },
});

export default class DoughController {
  private static model = models.doughs || model("doughs", doughSchema)

  public static async create(data: POS.Data.IDough): Promise<POS.Data.IDough> {
    const dough = await this.model.create(data);
    if (!dough) throw new Error("Dough not created");
    return dough;
  }

  public static async getAll(filters?: optionals<POS.Data.IDough>): Promise<POS.Data.IDough[]> {
    const doughs = await this.model.find({ ...filters });
    if (!doughs) throw new Error("Doughs not found");
    return doughs;
  }

  public static async getOne(filters: optionals<POS.Data.IDough>): Promise<POS.Data.IDough> {
    const dough = await this.model.findOne({ ...filters });
    if (!dough) throw new Error("Dough not found");
    return dough;
  }
}