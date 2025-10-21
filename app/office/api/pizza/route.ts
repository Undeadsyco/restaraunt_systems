import { NextRequest, NextResponse } from "next/server";
import { PizzaController, SectionController } from "@/lib/DBModels/controllers";
import { Error } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const pizza = await req.json();

    if (!pizza.section) delete pizza.section;

    const newPizza = (await PizzaController.create(pizza))._doc;
    if (!newPizza) return NextResponse.json({ message: "Was unable to create pizza" }, { status: 500 });

    await SectionController.addPizza(newPizza.section, newPizza._id);

    return NextResponse.json({ ...newPizza }, { status: 201 });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const errors = [];
      for (const name in error.errors) {
        errors.push({ path: error.errors[name].path, message: error.errors[name].message })
      }

      return NextResponse.json({ errors }, { status: 500 });
    }
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const pizza = await req.json();

    const edit = await PizzaController.update(pizza);

    if (!edit) return NextResponse.json({ message: "was unable to find pizza" }, { status: 404 });
    if (edit === pizza) return NextResponse.json({ message: "was unable to update pizza" }, { status: 500 });

    return NextResponse.json({ ...edit._doc }, { status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams;
    
    const id = queries.get("id");
    if (!id) return NextResponse.json({ message: "No ID provided"}, { status: 404 });

    const deletedPizza = await PizzaController.deleteOne(id);
    if (!deletedPizza) return NextResponse.json({ message: `Unable to find or delete pizza with given id of ${id}` }, { status: 404 });

    await SectionController.removePizza(deletedPizza.section, id);

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}