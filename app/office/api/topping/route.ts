import { Error } from "mongoose";
import { ToppingController } from "@/lib/DBModels/controllers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const topping = await req.json();
    const newTopping = await ToppingController.create(topping);
    if (!newTopping) throw new Error("");
    return NextResponse.json({ ...newTopping._doc }, { status: 201 });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const errors = []
      if (error.errors.name) errors.push({ type: "name", message: "Name is required" })
      if (error.errors.type) errors.push({ type: "type", message: "Type is required" })
      if (error.errors.measurement) errors.push({ type: "measurement", message: "Measurement is required" });
      return NextResponse.json({ message: `${error.message}`, errors }, { status: 500 })
    }
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });

    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const topping = await req.json();
    const update = await ToppingController.update(topping);
    if (!update) return NextResponse.json({ message: `Was unable to update topping - ${topping.name}`}, { status: 404 });
    console.log(update)
    return NextResponse.json({ ...update._doc }, { status: 200 });
  } catch (error) {
    
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams;
    const id = queries.get("id");

    if (!id) return NextResponse.json({}, { status: 404 });

    const deletedTopping = await ToppingController.delete(id);
    if (!deletedTopping) NextResponse.json({ message: `Unable to find topping with id ${id}` }, { status: 404 });
    return NextResponse.json({ id }, { status: 200});
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}