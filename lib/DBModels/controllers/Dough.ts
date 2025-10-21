import { HydratedDocument, model, models, RootFilterQuery, Schema } from "mongoose";

type DoughFilters = RootFilterQuery<DataBase.Menu.IDough>;
type DoughDocument = HydratedDocument<DataBase.Menu.IDough>;

const doughSchema = new Schema<DataBase.Menu.IDough>(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    measurement: { type: String, required: true },
    abbreviation: { type: String, required: true },
  },
  { versionKey: false }
);

export default class DoughController {
  private static model = models.doughs || model("doughs", doughSchema)

  public static async create(data: DataBase.Menu.IDough): Promise<any> {
    return await this.model.create(data);
  }

  public static async getAll(filters?: DoughFilters): Promise<DoughDocument[]> {
    return await this.model.find({ ...filters });
  }

  public static async getOne(filters: DoughFilters): Promise<DoughDocument | null> {
    return await this.model.findOne({ ...filters });
  }

  public static async updateOne(id: string, values: DataBase.Menu.IDough) {
    return await this.model.findByIdAndUpdate(id, values, { new: true })
  }

  public static async delete(id: string): Promise<DoughDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }
}