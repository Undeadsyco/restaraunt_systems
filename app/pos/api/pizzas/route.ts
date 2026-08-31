import { PizzaController } from "@/lib/DBModels/controllers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const sectionId = params.get("section");
    if (sectionId) {
      const pizzas = await PizzaController.getAll({ section: sectionId });
      if (pizzas.length === 0) return NextResponse.json({ message: `no pizzas found with id: ${sectionId}` }, { status: 404 });

      return NextResponse.json({ pizzas }, { status: 200 });
    }

    const pizzaId = params.get("pizza");
    if (pizzaId) {
      const pizza = await PizzaController.getOne({ _id: pizzaId });
      if (!pizza) return NextResponse.json({ message: `Pizza not found with given id - ${pizzaId}`}, { status: 404 });

      await pizza.populate("toppings.item");
      await pizza.populate("prices.size");

      return NextResponse.json({ pizza }, { status: 200 });
    }

    return NextResponse.json({ message: "No search paramater given to find pizzas" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}