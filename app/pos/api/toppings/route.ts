import dbConnect from "@/lib/DBConnections/DBConnect";
import { ToppingController } from "@/lib/DBModels/controllers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const toppingIds: string[] = (await req.json()).ids;
  const toppings: DataBase.Menu.ITopping[] = [];
  
  for (let i=0; i<toppingIds.length; i+=1) {
    const topping = await ToppingController.getOne({ _id: toppingIds[i] })
    toppings.push(topping);
  }

  if (toppings.length !== toppingIds.length)
    return NextResponse.json({ message: "Unable to get all toppings" }, { status: 500 });

  return NextResponse.json({ toppings }, { status: 200 });
}