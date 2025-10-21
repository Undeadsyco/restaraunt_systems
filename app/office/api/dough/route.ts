import { DoughController } from "@/lib/DBModels/controllers";
import { Error } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body._id !== undefined) delete body._id;

    const dough = await DoughController.create(body);
    if (!dough) throw new Error("Unable to create new dough in collection");

    return NextResponse.json({ ...dough._doc }, { status: 201 });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const errors = [];
      for (const name in error.errors) {
        errors.push({ path: error.errors[name].path, message: error.errors[name].message });
      }
      return NextResponse.json({ errors }, { status: 500 });
    }
    // console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const doughUpdate = await DoughController.updateOne(body._id, body);
    if (!doughUpdate) throw new Error(`Unable to find or update dough ${body.name}`);

    return NextResponse.json({ ...doughUpdate._doc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams;
    const id = queries.get("id");
    if (!id) return NextResponse.json({ message: "id not provided" })

    const deletedDough = await DoughController.delete(id);
    if (!deletedDough) throw new Error(`Unable to find or delete dough with given id ${id}`);

    return NextResponse.json({ id: deletedDough._id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}