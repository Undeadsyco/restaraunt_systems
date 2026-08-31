import { OrderController } from "@/lib/DBModels/controllers";
import CountersController from "@/lib/DBModels/controllers/counters";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    delete order._index;
    delete order._selected;
    console.log("order", order);

    const createdOrder = await OrderController.create({
      orderNumber: await CountersController.getNexOrderNumber(),
      name: order._name ?? undefined,
      type: order._type,
      items: order._items.map((item: any) => ({
        item: item._item,
        type: item._type,
        modifications: item._modifications.map(),
        discount: item._discount,
        comments: item._comments,
      }) as DataBase.Order.OrderedItem),
      payments: order._payments,
      status: order._status,
      date: new Date(),
    });
    if (!createdOrder) return NextResponse.json({ message: "Unable to create order" }, { status: 500 });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    
  }
} 