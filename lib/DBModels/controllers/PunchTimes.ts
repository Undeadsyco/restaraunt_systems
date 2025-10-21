import { HydratedDocument, model, models, Schema, } from "mongoose";
import { optional } from "@/types";

type TimePunchFilters = optional<DataBase.Labor.ITimePunch>;
type TimePunchDocument = HydratedDocument<DataBase.Labor.ITimePunch>

const timePunchSchema = new Schema<DataBase.Labor.ITimePunch>({
  employee: { type: Schema.Types.ObjectId, ref: "employees", required: true },
  type: { type: String, required: true, enum: ["clock_in", "clock_out", "break_in", "break_out"] },
  time: { type: Date, required: true }
}, { versionKey: false });

export default class TimePunchController {
  private static model = models.time_punches || model("time_punches", timePunchSchema);

  public static async create(timePunch: DataBase.Labor.ITimePunch): Promise<TimePunchDocument> {
    return await this.model.create(timePunch)
  }

  public static async getAll(filters: any): Promise<TimePunchDocument[]> {
    return await this.model.find({ ...filters })
  }
}