import { NextResponse } from "next/server";
import dbConnect from "@/lib/DBConnections/DBConnect";
import { EmployeeController } from "@/lib/DBModels/controllers";
import NotAuthorizedError from "@/errors/dbErrors/NotAuthorizedError";


export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const employee = await EmployeeController.getByEmpID(body.id);
    if (!employee) throw new NotAuthorizedError("User ID Is Invalid");
    
    if (!employee.pos_info.password) return NextResponse.json({ reset_password: true });

    if (employee.pos_info.password !== body.password) throw new NotAuthorizedError("Password Is Invalid");

    return NextResponse.json({
      _id: employee._id,
      name: employee.name,
      employment: employee.employment,
    }, { status: 200 });
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return NextResponse.json({ message: err.message }, { status: 401 });
    }

    console.log(err);
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}