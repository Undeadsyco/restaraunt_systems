import dbConnect from "@/lib/DBConnections/DBConnect";
import { EmployeeController } from "@/lib/DBModels/controllers";
import { formatPhoneNumber } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
  try {
    await dbConnect();

    return NextResponse.json({ employee: await EmployeeController.getOne({ _id: id }) }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ message: "Something went worng" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    await dbConnect();

    const body = await req.json();

    const employee = await EmployeeController.updateOne(body.employee);
    if (!employee) return NextResponse.json({ message: "Employee was not found" }, { status: 400 });

    return NextResponse.json({
      ...employee,
      number: formatPhoneNumber(employee.number),
      emergency_contacts: employee.emergency_contacts.map(contact => ({
        ...contact,
        number: formatPhoneNumber(contact.number)
      }))
    }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ message: "Something went worng" }, { status: 500 });
  }
} 