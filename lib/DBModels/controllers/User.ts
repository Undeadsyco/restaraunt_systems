import { model, models, Schema } from "mongoose";

const userSchema = new Schema<POS.Data.IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: false },
  password: { type: String, required: true },
  address: { type: [new Schema<POS.Data.IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  })], required: false },
  birthdate: { type: Date, required: false },
});

export default class UserController {
  private static model = models.users || model("users", userSchema);

  public static async createOne(data: POS.Data.IUser): Promise<POS.Data.IUser> {
    return await this.model.create(data);
  }

  public static async getOne(id: string): Promise<POS.Data.IUser | null> {
    return await this.model.findById(id);
  }

  public static async getAll(): Promise<POS.Data.IUser[]> {
    return await this.model.find();
  }

  public static async updateOne(id: string, data: POS.Data.IUser): Promise<POS.Data.IUser | null> {
    return await this.model.findByIdAndUpdate(id, data);
  }

  public static async deleteOne(id: string): Promise<POS.Data.IUser | null> {
    return await this.model.findByIdAndDelete(id);
  }
}