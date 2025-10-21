import dbConnect from "@/lib/DBConnections/DBConnect";
import { EmployeeController, TimePunchController } from "@/lib/DBModels/controllers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const user: POS.Reducer.Employee = body.user;
    const punchType: DataBase.Types.PunchTypes = body.punchType;

    const employee = await EmployeeController.getByEmpID(user.employment.id);

    if (!employee) return NextResponse.json({ message: "Unable to find user" }, { status: 401 });

    employee.employment.clocked_in = true;
    await employee.save();

    const punchTime = TimePunchController.create({ employee: employee._id, type: punchType, time: new Date() });

    if (!punchTime) return NextResponse.json({ message: `Was unable to ${punchType.split("_").join(" ")}` });

    return NextResponse.json({ punchTime }, { status: 200 });

  } catch (error) {
    console.log(error);
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    else return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}