import { NextResponse } from "next/server";
import NotAuthorizedError from "@/errors/dbErrors/NotAuthorizedError";
import dbConnect from "@/lib/DBConnections/DBConnect";
import { EmployeeController } from "@/lib/DBModels/controllers";

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    await dbConnect();

    const body = await req.json()

    const employee = await EmployeeController.getByEmpID(id);
    if (!employee) throw new NotAuthorizedError("Unable to find employee");

    const today = new Date();

    employee.pos_info.password = body.password;
    employee.pos_info.reset_date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);
    await employee.save();

    return NextResponse.json({
      _id: employee._id,
      name: employee.name,
      employment: employee.employment,
    }, { status: 200 });
  } catch (error) {
    console.log(error)
    if (error instanceof NotAuthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}