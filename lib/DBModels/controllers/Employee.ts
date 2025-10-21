import { HydratedDocument, model, models, Schema } from "mongoose";
import { optional } from "@/types";

type EmployeeFilters = optional<DataBase.People.IEmployee>
type EmployeeDocument = HydratedDocument<DataBase.People.IEmployee>

const employeeSchema = new Schema<DataBase.People.IEmployee>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  number: { type: String, required: true },
  birthdate: { type: Date, required: true },
  ssn: { type: String, required: true },
  address: {
    type: new Schema<DataBase.People.Info.IAddress>({
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    }, { _id: false, versionKey: false }),
    required: true,
  },
  emergency_contacts: {
    type: [new Schema<DataBase.People.Info.IContactDetails>({
      name: { type: String, required: true, },
      number: { type: String, required: true, },
      relation: { type: String, required: false },
    }, { versionKey: false, _id: false })],
    required: true,
    default: [],
  },
  employment: {
    type: new Schema<DataBase.People.Info.IEmployment>({
      id: { type: String, required: true, unique: true },
      position: {
        type: String,
        required: true,
        default: "Crew Member",
        enum: ["Crew Member", "Shift Leader", "Assistant Manager", "Store Manager", "General Manager"],
      },
      pay_rate: { type: Number, required: true, default: 10 },
      employeed: { type: Boolean, required: true, default: true },
      clocked_in: { type: Boolean, required: true, default: false },
      on_break: { type: Boolean, required: true, default: false },
      start_date: { type: Date, required: true },
      years_worked: { type: Number, required: true, default: 0 },
      end_date: { type: Date, required() { return !this.employeed } }
    }, { _id: false, versionKey: false }),
    required: true,
  },
  pos_info: {
    type: new Schema<DataBase.People.Info.IPosInfo>({
      access: { type: Number, required: true, default: 0 },
      reset_date: { type: Date, required: true },
      password: { type: String, required: false, default: "" },
    }, { _id: false, versionKey: false }),
    required: true,
  },
  office_info: {
    type: new Schema<DataBase.People.Info.IOfficeInfo>({
      access: { type: Boolean, required: true, default: false },
      username: { type: String, required() { return this.access } },
      password: { type: String, required() { return this.access } },
      reset_date: { type: Date, required() { return this.access } }
    }, { _id: false, versionKey: false }),
    required() { return this.office_info?.access }
  }
}, { versionKey: false });
export default class EmployeeController {
  private static model = models.employees || model("employees", employeeSchema);

  public static async createOne(data: DataBase.People.IEmployee): Promise<EmployeeDocument> {
    return await this.model.create(data);
  }

  public static async getOne(filters: EmployeeFilters): Promise<EmployeeDocument | null> {
    return await this.model.findOne({ ...filters });
  }

  public static async getAll(filters?: EmployeeFilters): Promise<EmployeeDocument[]> {
    return await this.model.find({ ...filters });
  }

  public static async getByOfficeUsername(username: string): Promise<EmployeeDocument | undefined> {
    return (await this.model.find({ "office_info.username": username }))[0];
  }

  public static async getByEmpID(emp_id: string): Promise<EmployeeDocument | null> {
    return await this.model.findOne({ "employment.id": emp_id });
  }

  public static async updateOne(employee: DataBase.People.IEmployee): Promise<EmployeeDocument | null> {
    return await this.model.findByIdAndUpdate(employee._id, employee, { returnNewDocument: true });
  }

  public static async deleteOne(id: string): Promise<EmployeeDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }
}