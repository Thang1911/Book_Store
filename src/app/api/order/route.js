import db from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db.connect();
    const { userId, product, price, status } = await req.json();
    const newOrder = {
      userId,
      product,
      price,
      status,
    };
    await Order.create(newOrder);
    return NextResponse.json(
      { message: "Đặt đơn hàng thành công" },
      { status: 200 }
    );
  } catch (err) {
    // Trả về phản hồi lỗi nếu có lỗi xảy ra
    return new NextResponse(JSON.stringify(err.message), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await db.connect();
    
  } catch (err) {
    // Trả về phản hồi lỗi nếu có lỗi xảy ra
    return new NextResponse(JSON.stringify(err.message), { status: 500 });
  }
}
