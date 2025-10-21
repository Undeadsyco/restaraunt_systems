import { HydratedDocument, model, models, Schema } from "mongoose";

type ICounter = { _id: string, sequence_value: number }
type CounterDocument = HydratedDocument<ICounter>

export default class CountersController {
  static model = models.counters || model("counters", new Schema<ICounter>({
    _id: String,
    sequence_value: { type: Number, default: 0 },
  }, { versionKey: false }));

  public static async findOrCreate(id: string): Promise<CounterDocument> {
    const counter = await this.model.findById(id);
    if (!counter) return await this.model.create({ _id: id });
    return counter;
  }

  public static async findAndIncrement(id: string): Promise<CounterDocument> {
    const counter = await this.findOrCreate(id);
    counter.sequence_value += 1;
    await counter.save();
    return counter;
  }

  public static async getNextEmployeeId() {
    let id = (await CountersController.findAndIncrement("employees")).sequence_value.toString();
    for (let i = id.length; i < 4; i += 1) { id = `0${id}`; }
    return id;
  }
}