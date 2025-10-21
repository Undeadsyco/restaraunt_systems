import dbConnect from "@/lib/DBConnections/DBConnect";
import { EmployeeController } from "@/lib/DBModels/controllers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete("user");

  if (!cookies().has("user")) return NextResponse.json({ message: "There was an error logging out" }, { status: 500 });
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const employee = await EmployeeController.getByOfficeUsername(body.username);

    if (!employee) throw new Error("Unable to find employee by username");
    if (body.password !== employee.office_info?.password) throw new Error("Password is Incorrect");

    cookies().set("user", JSON.stringify({ name: employee.name, position: employee.employment.position }), { httpOnly: true })

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}