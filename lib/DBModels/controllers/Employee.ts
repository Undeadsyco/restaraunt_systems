import { model, models, Schema } from "mongoose";

const employeeSchema = new Schema<POS.Data.IEmployee>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  number: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: [new Schema<POS.Data.IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  })], required: true },
  birthdate: { type: Date, required: true },
  emp_id: { type: String, required: true, unique: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: false },
  hourly_rate: { type: Number, required: true },
  position: { type: String, required: true, enum: ["Crew", "Shift", "Asst", "Mana"] },
  employeed: { type: Boolean, required: true },
  clocked_in: { type: Boolean, required: true },
  on_break: { type: Boolean, required: true }
});

export default class EmployeeController {
  private static model = models.employees || model("employees", employeeSchema);

  public static async createOne(data: POS.Data.IEmployee): Promise<POS.Data.IEmployee> {
    return await this.model.create(data);
  }

  public static async getOne(filters: POS.Data.IEmployee): Promise<POS.Data.IEmployee | null> {
    return await this.model.findById({ ...filters });
  }

  public static async getAll(filters?: POS.Data.IEmployee): Promise<POS.Data.IEmployee[]> {
    return await this.model.find({ ...filters });
  }

  public static async getByEmpID(emp_id: string): Promise<POS.Data.IEmployee | null> {
    return await this.model.findOne({ emp_id });
  }

  public static async updateOne(employee: POS.Data.IEmployee): Promise<POS.Data.IEmployee | null> {
    return await this.model.findByIdAndUpdate(employee._id, employee);
  }

  public static async deleteOne(id: string): Promise<POS.Data.IEmployee | null> {
    return await this.model.findByIdAndDelete(id);
  }
}