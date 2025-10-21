import NotAuthorizedError from "@/errors/dbErrors/NotAuthorizedError";
import dbConnect from "@/lib/DBConnections/DBConnect";
import { EmployeeController } from "@/lib/DBModels/controllers";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    await dbConnect();

    const body = await req.json();

    console.log("body", body);

    const employee = await EmployeeController.getOne({ _id: id });
    if (!employee) return NextResponse.json({ message: "unable to find employee" }, { status: 400 });
    if (employee.office_info?.password !== body.currentPassword)
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });

    const today = new Date();

    employee.office_info!.password = body.newPassword;
    employee.office_info!.reset_date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);
    await employee.save();

    return NextResponse.json({ message: "Password has been reset" }, { status: 200 })
  } catch (error) {
    if (error instanceof NotAuthorizedError) return NextResponse.json({ message: error.message }, { status: 401 });
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ error }, { status: 500 });
  }
}