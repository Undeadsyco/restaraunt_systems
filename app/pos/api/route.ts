import { DataNotFound } from "@/errors";
import NotAuthorizedError from "@/errors/dbErrors/NotAuthorizedError";
import dbConnect from "@/lib/DBConnections/DBConnect";
import { DoughController, EmployeeController, PizzaController, SectionController, TimePunchController, ToppingController } from "@/lib/DBModels/controllers";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const tomorrow = new Date();
    today.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return NextResponse.json({
      dough: await DoughController.getAll(),
      sections: await SectionController.getAll(),
      pizzas: await PizzaController.getAll(),
      toppings: await ToppingController.getAll(),
      employees: (await EmployeeController.getAll()).map(({ _id, name, employment, }) => ({
        _id,
        name,
        employment,
      })),
      timePunches: await TimePunchController.getAll({ time: { $gte: today, $lte: tomorrow } })
    });
  } catch (err) {
    if (typeof err === "string") console.log(err);
    if (err instanceof Error) console.log(err.message);
  }
}