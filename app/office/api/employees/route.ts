import dbConnect from "@/lib/DBConnections/DBConnect";
import { EmployeeController } from "@/lib/DBModels/controllers";
import CountersController from "@/lib/DBModels/controllers/counters";
import { formatPhoneNumber } from "@/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    return NextResponse.json({ employees: await EmployeeController.getAll() }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // conncect to database if not already
    await dbConnect();

    // parse request body
    const body = await req.json();
    const employee: DataBase.People.IEmployee = body.employee;

    let office_info: DataBase.People.Info.IOfficeInfo | undefined = undefined;
    if (employee.office_info?.access) office_info = {
      ...employee.office_info,
      password: 'Password36!',
      reset_date: new Date(),
    }

    // return newly created employee using posted data and generated id
    return NextResponse.json({
      employee: await EmployeeController.createOne({
        ...employee,
        number: formatPhoneNumber(employee.number),
        emergency_contacts: employee.emergency_contacts.map(contact => ({ ...contact, number: formatPhoneNumber(contact.number)})),
        employment: {
          ...employee.employment,
          // await new generated employee ID
          id: await CountersController.getNextEmployeeId(),
          start_date: new Date()
        },
        pos_info: {
          access: 0,
          reset_date: new Date(),
          password: "",
        },
        office_info
      })
    }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ message: "Something went worng" }, { status: 500 });
  }
}