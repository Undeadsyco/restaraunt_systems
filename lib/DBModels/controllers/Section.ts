import { HydratedDocument, model, models, Schema } from "mongoose";
import { DataNotFound } from "@/errors";
import { optional } from "@/types";

type SectionFilters = optional<DataBase.Menu.ISection>;
type SectionDocument = HydratedDocument<DataBase.Menu.ISection>;

const sectionSchema = new Schema<DataBase.Menu.ISection>({
  name: { type: String, required: true },
  pizzas: [{ type: Schema.Types.ObjectId, ref: "pizzas" }]
}, { versionKey: false });

export default class SectionController {
  private static model = models.sections || model<DataBase.Menu.ISection>("sections", sectionSchema);

  public static async create(section: Omit<DataBase.Menu.ISection, "_id">): Promise<any> {
    return await this.model.create(section);
  }

  public static async getAll(filters?: SectionFilters): Promise<SectionDocument[]> {
    return await this.model.find({ ...filters });;
  }

  public static async getOne(filters: SectionFilters): Promise<SectionDocument | null> {
    return await this.model.findOne({ ...filters });;
  }

  public static async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  public static async addPizza(id: DataBase.Types.IDType, element: DataBase.Types.IDType) {
    return await this.model.findByIdAndUpdate(id, { $push: { pizzas: element }});
  }

  public static async removePizza(id: DataBase.Types.IDType, element: DataBase.Types.IDType) {
    return await this.model.findByIdAndUpdate(id, { $pull: { pizzas: element }});
  }
}