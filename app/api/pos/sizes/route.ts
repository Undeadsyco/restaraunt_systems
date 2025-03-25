import { NextResponse } from "next/server";

import { DoughController } from "@/lib/DBModels/controllers";

export async function GET() {
  return NextResponse.json({
    sizes: JSON.stringify(await DoughController.getAll()),
  })
}