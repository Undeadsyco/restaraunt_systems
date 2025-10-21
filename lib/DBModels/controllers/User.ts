import { HydratedDocument, models, Schema } from "mongoose";
import { model } from "mongoose";

type UserDocument = HydratedDocument<DataBase.People.IUser>

const userSchema = new Schema<DataBase.People.IUser>({name: { type: String, required: true },
  number: { type: String, required: true },
  age: { type: Number, required: true },
  birthdate: { type: Date, required: true },
  address: {
    type: new Schema<DataBase.People.Info.IAddress>({
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    }),
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { versionKey: false });

export default class UserController {
  private static model = models.users || model("users", userSchema);

  public static async createOne(data: DataBase.People.IUser): Promise<UserDocument> {
    return await this.model.create(data);
  }

  public static async getOne(id: string): Promise<UserDocument | null> {
    return await this.model.findById(id);
  }

  public static async getAll(): Promise<UserDocument[]> {
    return await this.model.find();
  }

  public static async updateOne(id: string, data: DataBase.People.IUser): Promise<UserDocument | null> {
    return await this.model.findByIdAndUpdate(id, data);
  }

  public static async deleteOne(id: string): Promise<UserDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }
}