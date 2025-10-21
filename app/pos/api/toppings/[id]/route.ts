import dbConnect from "@/lib/DBConnections/DBConnect"
import { ToppingController } from "@/lib/DBModels/controllers";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params: { id }}: { params: { id: string }}) {
  await dbConnect();

  const topping = await ToppingController.getOne({ _id: id });
  if (!topping) throw new Error(`Unable to find topping with given ID`);

  return NextResponse.json({ topping }, { status: 200 });
}