import { SectionController } from "@/lib/DBModels/controllers";
import { Error } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const name = (await req.json()).name;
    const newSection = await SectionController.create({ name, pizzas: [] });

    if (!newSection) return NextResponse.json({ message: "unable to create new section" }, { status: 500 });

    return NextResponse.json({ ...newSection._doc }, { status: 201 });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const errors = [];
      if (error.errors.name) errors.push({ type: "name", message: "Name is a required field"});
      return NextResponse.json({ message: "Validation Failed", errors }, { status: 500 });
    }
    if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 500 });
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams;
    const id = queries.get("id");

    if (!id) return NextResponse.json({ message: "No ID provided" }, { status: 404 })

    const deletedSection = await SectionController.delete(id);
    if (!deletedSection) return NextResponse.json({ message: "" }, { status: 500 });

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}