import { DataNotFound } from "@/errors";
import NotAuthorizedError from "@/errors/dbErrors/NotAuthorizedError";
import dbConnect from "@/lib/DBConnections/DBConnect";
import { DoughController, EmployeeController, PizzaController, SectionController, ToppingController } from "@/lib/DBModels/controllers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    return NextResponse.json({
      dough: await DoughController.getAll(),
      sections: await SectionController.getAll(),
      pizzas: await PizzaController.getAll(),
      toppings: await ToppingController.getAll(),
    });
  } catch (err) {
    if (typeof err === "string") console.log(err);
    if (err instanceof Error) console.log(err.message);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const userId = (body.password as string).slice(0, 4);
    const password = (body.password as string).slice(4);

    const employee = await EmployeeController.getByEmpID(userId);
    if (!employee || employee.password !== password) throw new NotAuthorizedError("User Id Or Password Is Invalid");


    cookies().set("user", JSON.stringify({ id: employee.emp_id, name: employee.name, pos: employee.position }));
    return NextResponse.json({ status: 201 });
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return NextResponse.json({ message: err.message }, { status: 401 });
    }

    console.log(err);
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}